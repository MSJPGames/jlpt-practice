# -*- coding: utf-8 -*-
"""
N1 listening audio generator (edge-tts only; no ffmpeg / no pydub).

★N1の音声を作ります。間の長さは公式CD（N2Q1〜Q5。N1は未実測なのでN2の値を使う）を実測して決めた値です。
   声の設定（Nanami/Keita と rate・pitch）は前のままです。声は変わりません。
   変わるのは「場面のあと」「設問の前」「選択肢と選択肢の間」に無音が入ることだけです。
   無音は mp3 の無音フレームを並べて作るので、ffmpeg も pydub も要りません。

   間の長さ（秒）は下の MA で決めています。このサイトのコンセプトは
   「サクッと毎日少しずつ」なので、本試験にある
     ・解答の間（12.2秒・8.2秒）・問番号の読み上げ・例題・ポイント理解の20.2秒
   は入れていません。1問の中の短い間だけを入れます。
   模擬試験モードを作るときは n1_audio_timing.json の「本試験どおり」の値を使ってください。

Reads n1_listening_manifest.json and, for each question, synthesizes each line
with edge-tts, then joins the MP3 parts by binary concatenation into
  audio/n1_qX_YY.mp3

Incremental / auto-update:
  A small signature file (audio/_n1_audio_sig.json) records a hash of each
  question's script text + voice settings + pause settings. On every run, a
  question is (re)generated when the mp3 is MISSING or when anything CHANGED.

Voices (edge-tts has only 2 Japanese voices, so the narrator is set apart by a
lower, slower tone so it is clearly different from the conversation voices):
  Narrator (situation / question) : ja-JP-NanamiNeural  (lower & slower)
  Conversation woman              : ja-JP-NanamiNeural  (normal, a bit higher)
  Conversation man                : ja-JP-KeitaNeural

Run: make_n1_listening_audio.bat  (Windows)  or  python make_n1_listening_audio.py
Put the "audio" folder next to your HTML files, then upload it.
"""
import os, sys, json, asyncio, hashlib, base64, time

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST = os.path.join(HERE, "n1_listening_manifest.json")
DAIMON = os.path.join(HERE, "file_to_daimon.json")
OUTDIR = os.path.join(HERE, "audio")
LOG = os.path.join(HERE, "_n1_listening_log.txt")
SIGFILE = os.path.join(OUTDIR, "_n1_audio_sig.json")

# Bump this if you ever change the voice mapping below; it forces every mp3 to
# be regenerated on the next run.
VOICE_VERSION = "n1-v2-ma"  # 間（ま）を入れた作りに変えたので全部作り直す

# role -> (voice, options).  All voices are Nanami/Keita (the only ja voices in edge-tts).
# ★ここは v1 のままです。触らないでください（触ると声が変わります）。
ROLE_VOICE = {"N":"ja-JP-NanamiNeural", "F":"ja-JP-NanamiNeural", "M":"ja-JP-KeitaNeural",
              "F2":"ja-JP-NanamiNeural", "M2":"ja-JP-KeitaNeural"}
ROLE_OPTS  = {"N":{"rate":"-10%","pitch":"-16Hz"},   # narrator: low & slow -> clearly different
              "F":{"rate":"+3%","pitch":"+13Hz"},     # conversation woman: a bit higher/livelier
              "M":{},                                  # conversation man
              "F2":{"pitch":"+24Hz"}, "M2":{"pitch":"-10Hz"}}

# ★間の長さ（秒）。公式CDの実測から決めた値です。
MA = {
    "課題理解":     {"after_intro":2.0, "before_question":2.2, "choice_first":None, "choice_gap":None},
    "ポイント理解": {"after_intro":2.0, "before_question":2.2, "choice_first":None, "choice_gap":None},
    "概要理解":     {"after_intro":2.1, "before_question":2.0, "choice_first":2.0,  "choice_gap":3.0},
    "即時応答":     {"after_intro":None,"before_question":None,"choice_first":2.0,  "choice_gap":2.0},
    "統合理解":     {"after_intro":2.0, "before_question":2.0, "choice_first":2.0,  "choice_gap":3.0},
    # 音声の特徴（もんだい6）は、聞こえた語を選ぶ聞き分けの練習。
    # ナレーターも選択肢の読み上げも無いので、間は入れない。
    "音声の特徴":   {"after_intro":None,"before_question":None,"choice_first":None, "choice_gap":None},
}
# ファイル名から大問が分からないときの予備（file_to_daimon.json が無い場合）
PREFIX_KIND = {"n1_q1":"課題理解", "n1_q2":"ポイント理解", "n1_q3":"概要理解",
               "n1_q4":"即時応答", "n1_q5":"統合理解", "n1_q6":"音声の特徴"}

# 24kHz・モノラル・48kbps の「無音1フレーム」＝144バイト＝0.024秒。
# edge-tts が出す mp3 と同じ形式なので、そのまま並べれば無音になります。
FRAME = base64.b64decode('//NkxHwAAANIAAAAAFVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV')
FRAME_SEC = 0.024
# ★この1行を改行で折り返さないこと。折り返すと文字が欠けて、
#   フレームが144バイトでなくなり、mp3として壊れる（2026-08-14 に実際に起きた）。
assert len(FRAME) == 144, '無音フレームが%dバイト。144バイトでないと壊れたmp3になります' % len(FRAME)


def log(msg):
    print(msg)
    try:
        with open(LOG, "a", encoding="utf-8") as f: f.write(msg + "\n")
    except Exception:
        pass


def ma(sec):
    """無音を作る（mp3の無音フレームを並べるだけ）"""
    if not sec:
        return b""
    return FRAME * max(1, int(round(sec / FRAME_SEC)))


_BR = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]
_SR = [22050, 24000, 16000]


def frames_ok(data):
    """できあがった mp3 が、頭からしっぽまで正しいフレームの列になっているかを見る。
    ffmpeg も外部ライブラリも要らない。
    ★2026-08-14：無音フレームが141バイト（正しくは144）になっていて、
      182本すべてが壊れた mp3 になっていた。目と耳では気づけなかったので、
      作るたびに機械で確かめる。
    返り値： (よいか, フレーム数, 秒数, だめだった位置)"""
    i, n, sec = 0, 0, 0.0
    if data[:3] == b'ID3':
        i = 10 + ((data[6] << 21) | (data[7] << 14) | (data[8] << 7) | data[9])
    while i + 4 <= len(data):
        if data[i] != 0xFF or (data[i + 1] & 0xE0) != 0xE0:
            return False, n, sec, i
        ver, lay = (data[i + 1] >> 3) & 3, (data[i + 1] >> 1) & 3
        bi, si, pad = (data[i + 2] >> 4) & 15, (data[i + 2] >> 2) & 3, (data[i + 2] >> 1) & 1
        if lay != 1 or bi in (0, 15) or si == 3:
            return False, n, sec, i
        br, sr = _BR[bi] * 1000, _SR[si] // (1 if ver == 3 else 1)
        spf = 1152 if ver == 3 else 576      # MPEG1 / MPEG2 の Layer III
        ln = (spf // 8) * br // sr + pad
        if ln <= 4 or i + ln > len(data):
            return False, n, sec, i
        i += ln; n += 1; sec += spf / sr
    return True, n, sec, -1


def kind_of(fname, kinds):
    k = kinds.get(fname)
    if k in MA:
        return k
    return PREFIX_KIND.get(fname[:5])


def is_choice(seg):
    """選択肢の読み上げ行か。マニフェストの choice を見る。
    古いマニフェストで choice が無いときは「いち、」「に、」…で始まる行を選択肢とみなす。"""
    if seg.get("choice"):
        return True
    return any(seg["text"].startswith(x) for x in ("いち、", "に、", "さん、", "よん、"))


def signature(it, kind):
    """Hash of everything that affects the audio: voice version + pauses +
    each line's role, text, voice and options."""
    h = hashlib.sha256()
    h.update(VOICE_VERSION.encode("utf-8"))
    h.update((kind + json.dumps(MA.get(kind, {}), sort_keys=True)).encode("utf-8"))
    for seg in it["segments"]:
        role = seg["role"]
        voice = ROLE_VOICE.get(role, "ja-JP-NanamiNeural")
        opts = ROLE_OPTS.get(role, {})
        h.update(("\x1f".join([role, seg["text"], voice, json.dumps(opts, sort_keys=True),
                               "1" if is_choice(seg) else "0"]) + "\x1e").encode("utf-8"))
    return h.hexdigest()


async def say(text, role, retry=4):
    """1つの発話を読み上げて mp3 のバイト列を返す"""
    import edge_tts
    voice = ROLE_VOICE.get(role, "ja-JP-NanamiNeural")
    opts = ROLE_OPTS.get(role, {})
    last = None
    for k in range(retry):
        try:
            c = edge_tts.Communicate(text, voice, **opts)
            b = b""
            async for ch in c.stream():
                if ch["type"] == "audio":
                    b += ch["data"]
            if b:
                return b
            last = "empty audio"
        except Exception as e:
            last = e
        if k < retry - 1:
            await asyncio.sleep(2 * (k + 1))
    raise RuntimeError("読み上げに失敗(%s): %s" % (last, text[:20]))


async def build(it, kind):
    """1問ぶんの mp3 を組み立てる"""
    m = MA[kind]
    segs = it["segments"]
    body = [s for s in segs if not is_choice(s)]
    choices = [s for s in segs if is_choice(s)]
    if m["choice_gap"] and not choices:
        raise RuntimeError("選択肢の読み上げ行が見つかりません")
    if not body:
        raise RuntimeError("本体の行がありません")
    out = b""

    if kind in ("課題理解", "ポイント理解", "概要理解", "統合理解"):
        # 1行目＝場面（と設問）、最後＝設問をもう一度、その間が会話または話
        out += await say(body[0]["text"], body[0]["role"]) + ma(m["after_intro"])
        for s in body[1:-1]:
            out += await say(s["text"], s["role"])
        out += ma(m["before_question"])
        out += await say(body[-1]["text"], body[-1]["role"])
    else:
        # 即時応答＝相手の一言だけ（場面説明も設問の読み上げも無い）
        for s in body:
            out += await say(s["text"], s["role"])

    for k, s in enumerate(choices):
        out += ma(m["choice_first"] if k == 0 else m["choice_gap"])
        out += await say(s["text"], s["role"])
    return out


async def main():
    force = "--force" in sys.argv
    only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None

    try:
        import edge_tts  # noqa
    except ImportError:
        log("[ERROR] edge-tts not installed. Run: pip install edge-tts")
        sys.exit(1)
    if not os.path.exists(MANIFEST):
        log("[ERROR] n1_listening_manifest.json not found next to this script.")
        sys.exit(1)

    man = json.load(open(MANIFEST, encoding="utf-8"))
    items = man["items"]
    try:
        kinds = json.load(open(DAIMON, encoding="utf-8"))
    except Exception:
        kinds = {}
        log("[INFO] file_to_daimon.json が無いので、ファイル名から大問を判断します。")
    os.makedirs(OUTDIR, exist_ok=True)
    open(LOG, "w", encoding="utf-8").close()
    log("items = %d   (VOICE_VERSION=%s)" % (len(items), VOICE_VERSION))

    try:
        sigs = json.load(open(SIGFILE, encoding="utf-8"))
        if not isinstance(sigs, dict): sigs = {}
    except Exception:
        sigs = {}

    made = updated = skipped = failed = 0
    t0 = time.time()
    n = 0
    for idx, it in enumerate(items, 1):
        fname = it["file"]
        kind = kind_of(fname, kinds)
        if kind not in MA:
            log("[NG ] %s  (大問が分かりません)" % fname); failed += 1; continue
        if only and kind != only:
            continue
        out = os.path.join(OUTDIR, fname)
        sig = signature(it, kind)
        exists = os.path.exists(out) and os.path.getsize(out) > 0
        # ★v1 と違う点：署名が無いものは「作り直す」。
        #   （間を入れる改修で 182本すべて中身が変わるため）
        if exists and not force and sigs.get(fname) == sig:
            skipped += 1
            continue
        reason = "new" if not exists else "changed"
        n += 1
        try:
            data = await build(it, kind)
            # ★書く前に、mp3として壊れていないかを機械で確かめる
            ok, nf, sec2, badpos = frames_ok(data)
            if not ok:
                raise RuntimeError("mp3が壊れています（%dバイト目でフレームが切れた）" % badpos)
            with open(out, "wb") as f:
                f.write(data)
            sigs[fname] = sig
            if reason == "new": made += 1
            else: updated += 1
            sec = len(data) / (48000 / 8.0)
            nokori = (time.time() - t0) / n * (len(items) - idx)
            log("[OK ] %3d/%d  %-14s %-6s %5.1f秒  のこり約%.0f分  (%s)"
                % (idx, len(items), fname, kind, sec, nokori / 60, reason))
            # 署名はこまめに保存する（途中で止まっても続きからできるように）
            if n % 10 == 0:
                try: json.dump(sigs, open(SIGFILE, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
                except Exception: pass
        except Exception as e:
            failed += 1
            log("[NG ] %s  (%s)" % (fname, e))

    try:
        json.dump(sigs, open(SIGFILE, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    except Exception as e:
        log("[WARN] could not write signature file: %s" % e)

    log("---- done: new %d / updated %d / skipped %d / failed %d / %.1f分 ----"
        % (made, updated, skipped, failed, (time.time() - t0) / 60))
    if failed:
        log("失敗したものは、もう一度実行すれば、そのぶんだけ作り直します。")
    log("Put the audio folder next to your HTML files, then upload it to GitHub.")


async def test():
    """声の設定を耳で確かめる用。test_N.mp3 などができます"""
    for role in ("N", "F", "M"):
        b = await say("これは、こえの　テストです。日本語の部屋、エヌ3。", role)
        open(os.path.join(HERE, "test_%s.mp3" % role), "wb").write(b)
        print("test_%s.mp3 をつくりました（%s %s）" % (role, ROLE_VOICE[role], ROLE_OPTS[role]))


if __name__ == "__main__":
    try:
        asyncio.run(test() if "--test" in sys.argv else main())
    except KeyboardInterrupt:
        pass
