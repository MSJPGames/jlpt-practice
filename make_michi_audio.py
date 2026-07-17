# -*- coding: utf-8 -*-
"""
道案内ゲーム（michi_annai.html）の自然な読み上げ音声を生成する。
michi_audio_manifest.json を読み、edge-tts（ja-JP-NanamiNeural）で
audio/mi_<id>.mp3 を作成する。作った audio フォルダを HTML と同じ場所に置くこと。

使い方: make_michi_audio.bat をダブルクリック（Windows）
または:  python make_michi_audio.py
"""
import os, sys, json, asyncio

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST = os.path.join(HERE, "michi_audio_manifest.json")
OUTDIR = os.path.join(HERE, "audio")
LOG = os.path.join(HERE, "_michi_audio_log.txt")

def log(msg):
    print(msg)
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(msg + "\n")

async def main():
    try:
        import edge_tts
    except ImportError:
        log("[ERROR] edge-tts が見つかりません。pip install edge-tts を実行してください。")
        sys.exit(1)

    if not os.path.exists(MANIFEST):
        log("[ERROR] michi_audio_manifest.json が見つかりません。HTML と同じフォルダに置いてください。")
        sys.exit(1)

    with open(MANIFEST, "r", encoding="utf-8") as f:
        man = json.load(f)

    voice = man.get("voice", "ja-JP-NanamiNeural")
    prefix = man.get("prefix", "mi_")
    items = man.get("items", [])
    os.makedirs(OUTDIR, exist_ok=True)

    # ログ初期化
    open(LOG, "w", encoding="utf-8").close()
    log("voice = %s / items = %d" % (voice, len(items)))

    made, skipped, failed = 0, 0, 0
    for i, it in enumerate(items, 1):
        fid = it["id"]; text = it["text"]
        out = os.path.join(OUTDIR, "%s%s.mp3" % (prefix, fid))
        if os.path.exists(out) and os.path.getsize(out) > 0:
            skipped += 1
            continue
        try:
            comm = edge_tts.Communicate(text, voice, rate="-5%")
            await comm.save(out)
            made += 1
            log("[OK ] %3d/%d  %s%s.mp3  <= %s" % (i, len(items), prefix, fid, text))
        except Exception as e:
            failed += 1
            log("[NG ] %s  (%s)  %s" % (fid, text, e))

    log("---- 完了: 新規 %d / スキップ %d / 失敗 %d ----" % (made, skipped, failed))
    log('audio フォルダを HTML と同じ場所に置いてから、GitHub にアップロードしてください。')

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass
