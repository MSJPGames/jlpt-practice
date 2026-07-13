# -*- coding: utf-8 -*-
"""
BJT 第1部 聴解 練習用の音声を作るスクリプト（edge-tts 使用）
- bjt_choukai_data.js を読み、各問題の音声を audio/bjt_<id>.mp3 として作ります。
- 声：ナレーター=女性A、女=女性B、男=男性（自動で選択）。
- 追加ソフトは不要（ffmpegも不要）。edge-tts だけ使います。

使い方（Windows）:
  1) このファイルと bjt_choukai_data.js を同じフォルダに置く
  2) コマンドで:  py -m pip install edge-tts
  3)             py make_bjt_audio.py
  4) 出来た audio フォルダを、HTMLと同じ場所に置いてアップロードする

ログは _bjt_audio_log.txt にも書き出します。
"""
import os, re, json, sys, asyncio, traceback

HERE = os.path.dirname(os.path.abspath(__file__))
DATA_JS = os.path.join(HERE, "bjt_choukai_data.js")
OUT_DIR = os.path.join(HERE, "audio")
LOG = os.path.join(HERE, "_bjt_audio_log.txt")

def log(msg):
    line = str(msg)
    print(line)
    try:
        with open(LOG, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass

def load_items():
    s = open(DATA_JS, encoding="utf-8").read()
    i = s.index("window.BJT_CHOUKAI")
    arr = s[s.index("[", i): s.rindex("]") + 1]
    arr = re.sub(r"/\*.*?\*/", "", arr, flags=re.S)   # ブロックコメント除去
    return json.loads(arr)

async def pick_voices():
    """利用できる ja-JP 音声から ナ/女/男 を選ぶ。取得に失敗したら既定値。"""
    default = {"ナ": "ja-JP-NanamiNeural", "女": "ja-JP-AoiNeural", "男": "ja-JP-KeitaNeural"}
    try:
        import edge_tts
        voices = await edge_tts.list_voices()
        ja = [v["ShortName"] for v in voices if v.get("Locale") == "ja-JP"]
        def first(cands, fallback):
            for c in cands:
                for name in ja:
                    if c.lower() in name.lower():
                        return name
            return fallback if fallback in ja or not ja else ja[0]
        narr = first(["Nanami", "Mayu", "Shiori", "Aoi"], "ja-JP-NanamiNeural")
        # 女は ナ と別の声にする
        fem_cands = [c for c in ["Aoi", "Mayu", "Shiori", "Nanami"]]
        fem = None
        for c in fem_cands:
            for name in ja:
                if c.lower() in name.lower() and name != narr:
                    fem = name; break
            if fem: break
        if not fem: fem = narr
        male = first(["Keita", "Daichi", "Naoki"], "ja-JP-KeitaNeural")
        vmap = {"ナ": narr, "女": fem, "男": male}
        log("使用する音声: " + json.dumps(vmap, ensure_ascii=False))
        log("（この環境で使える ja-JP 音声: " + ", ".join(ja) + "）")
        return vmap
    except Exception as e:
        log("音声一覧の取得に失敗したため既定の声を使います: " + repr(e))
        return default

def segments_for(it):
    """音声の順序: setup(ナ) → turns(男/女) → q(ナ)"""
    segs = []
    if it.get("setup"):
        segs.append(("ナ", it["setup"]))
    for t in it["turns"]:
        segs.append((t["w"], t["t"]))
    if it.get("q"):
        segs.append(("ナ", it["q"]))
    return segs

async def synth(text, voice, path, rate="+0%"):
    import edge_tts
    c = edge_tts.Communicate(text, voice, rate=rate)
    await c.save(path)

async def main():
    open(LOG, "w", encoding="utf-8").close()
    log("=== BJT 聴解 音声生成 開始 ===")
    try:
        import edge_tts  # noqa
    except Exception:
        log("!! edge-tts が入っていません。先に:  py -m pip install edge-tts")
        return
    items = load_items()
    log("問題数: %d" % len(items))
    os.makedirs(OUT_DIR, exist_ok=True)
    vmap = await pick_voices()
    tmp = os.path.join(OUT_DIR, "_tmp_seg.mp3")
    ok = 0
    for idx, it in enumerate(items, 1):
        out = os.path.join(OUT_DIR, "bjt_%s.mp3" % it["id"])
        try:
            parts = []
            for (who, text) in segments_for(it):
                voice = vmap.get(who, vmap["ナ"])
                rate = "-4%" if who == "ナ" else "+0%"
                await synth(text, voice, tmp, rate)
                parts.append(open(tmp, "rb").read())
            with open(out, "wb") as w:      # mp3 をそのまま連結（ffmpeg不要）
                for b in parts:
                    w.write(b)
            ok += 1
            log("[%02d/%d] OK  %s  (%d セリフ)" % (idx, len(items), it["id"], len(parts)))
        except Exception as e:
            log("[%02d/%d] 失敗 %s : %s" % (idx, len(items), it["id"], repr(e)))
            log(traceback.format_exc())
    try:
        if os.path.exists(tmp): os.remove(tmp)
    except Exception:
        pass
    log("=== 完了：%d / %d 個の音声を audio フォルダに作りました ===" % (ok, len(items)))
    log("audio フォルダを HTML と同じ場所に置いてアップロードしてください。")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        log("エラー: " + repr(e))
        log(traceback.format_exc())
