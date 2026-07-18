# -*- coding: utf-8 -*-
"""
N3 聴解（n3_quiz.html）の音声を作る。
n3_listening_manifest.json を読み、問題ごとに
  ナレーター（状況・質問）／男／女 の声で各セリフを合成し、
  少しの間（ま）をはさんでつなげて  audio/n3_qX_YY.mp3  を作ります。

声（edge-tts）：
  ナレーター（指示文・状況・質問）… ja-JP-DaichiNeural（男性・落ち着いた声）
  会話の男                        … ja-JP-KeitaNeural（男性）
  会話の女                        … ja-JP-NanamiNeural（女性）
  ※ 指示文（ナレーション）の声は、会話の声と必ず別にしています（聞き分けやすくするため）。
  ※ もし環境に Daichi の声が無い場合は、低めにした男性の声へ自動でフォールバックします。

使い方: make_n3_listening_audio.bat をダブルクリック（Windows）
または:  python make_n3_listening_audio.py
出来た audio フォルダを HTML と同じ場所に置いて、GitHub にアップロードしてください。
"""
import os, sys, json, asyncio, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST = os.path.join(HERE, "n3_listening_manifest.json")
OUTDIR = os.path.join(HERE, "audio")
LOG = os.path.join(HERE, "_n3_listening_log.txt")

# 役割ごとの声の細かい調整（間や高さ）
ROLE_OPTS = {
    "N":  {"rate": "-6%"},              # ナレーター：少し落ち着いて
    "F":  {"rate": "+0%"},
    "M":  {"rate": "+0%"},
    "F2": {"rate": "+0%", "pitch": "+8Hz"},
    "M2": {"rate": "+0%", "pitch": "-6Hz"},
}
# その声が使えないときのフォールバック（voice, opts）。
# ナレーターは必ず会話の声と別になるよう、低め・ゆっくりの男性声に落とす。
FALLBACK = {
    "N":  ("ja-JP-KeitaNeural",  {"rate": "-8%", "pitch": "-26Hz"}),
    "F2": ("ja-JP-NanamiNeural", {"rate": "+0%", "pitch": "+12Hz"}),
    "M2": ("ja-JP-KeitaNeural",  {"rate": "+0%", "pitch": "-10Hz"}),
}
GAP_MS = 450      # セリフの間
LEAD_MS = 300     # 最初の無音

def log(msg):
    print(msg)
    try:
        with open(LOG, "a", encoding="utf-8") as f:
            f.write(msg + "\n")
    except Exception:
        pass

async def synth(text, voice, opts, out):
    import edge_tts
    comm = edge_tts.Communicate(text, voice, **opts)
    await comm.save(out)

def synth_seg(text, voice, opts, role, out):
    """まず指定の声で合成。だめなら（声が無い等）フォールバックの声で合成する。"""
    try:
        asyncio.run(synth(text, voice, opts, out))
        if os.path.exists(out) and os.path.getsize(out) > 0:
            return voice
        raise RuntimeError("empty audio")
    except Exception as e:
        if role in FALLBACK:
            fv, fo = FALLBACK[role]
            asyncio.run(synth(text, fv, fo, out))
            log("   [fallback] %s: %s -> %s (%s)" % (role, voice, fv, e))
            return fv
        raise

def main():
    # 依存の確認
    try:
        import edge_tts  # noqa
    except ImportError:
        log("[ERROR] edge-tts が見つかりません。『pip install edge-tts』を実行してください。")
        sys.exit(1)
    try:
        from pydub import AudioSegment
    except ImportError:
        log("[ERROR] pydub が見つかりません。『pip install pydub』を実行してください。")
        sys.exit(1)
    try:
        import imageio_ffmpeg
        AudioSegment.converter = imageio_ffmpeg.get_ffmpeg_exe()
    except Exception as e:
        log("[WARN] imageio-ffmpeg が使えません（%s）。システムの ffmpeg を使います。" % e)

    if not os.path.exists(MANIFEST):
        log("[ERROR] n3_listening_manifest.json が見つかりません。HTML と同じフォルダに置いてください。")
        sys.exit(1)

    man = json.load(open(MANIFEST, encoding="utf-8"))
    voices = man["voices"]
    items = man["items"]
    os.makedirs(OUTDIR, exist_ok=True)
    open(LOG, "w", encoding="utf-8").close()
    log("items = %d / voices = %s" % (len(items), voices))

    made = skipped = failed = 0
    for i, it in enumerate(items, 1):
        out = os.path.join(OUTDIR, it["file"])
        if os.path.exists(out) and os.path.getsize(out) > 0:
            skipped += 1
            continue
        try:
            combined = AudioSegment.silent(duration=LEAD_MS)
            for seg in it["segments"]:
                role = seg["role"]
                voice = voices.get(role, voices.get("N"))
                opts = ROLE_OPTS.get(role, {})
                tmp = tempfile.mktemp(suffix=".mp3")
                synth_seg(seg["text"], voice, opts, role, tmp)
                part = AudioSegment.from_file(tmp, format="mp3")
                try:
                    os.remove(tmp)
                except Exception:
                    pass
                combined += part + AudioSegment.silent(duration=GAP_MS)
            combined.export(out, format="mp3")
            made += 1
            log("[OK ] %2d/%d  %s  (%d セリフ)" % (i, len(items), it["file"], len(it["segments"])))
        except Exception as e:
            failed += 1
            log("[NG ] %s  (%s)" % (it["file"], e))

    log("---- 完了: 新規 %d / スキップ %d / 失敗 %d ----" % (made, skipped, failed))
    log("audio フォルダを HTML と同じ場所に置いてから、GitHub にアップロードしてください。")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        pass
