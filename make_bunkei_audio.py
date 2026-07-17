# -*- coding: utf-8 -*-
"""
文型・表現の練習ページ（bunkei_renshu.html）のモデル音声を作るスクリプト（edge-tts 使用）
- bunkei_renshu_audio.json を読み、各モデル文の音声を audio/bk_<id>.mp3 として作ります。
- 声：ja-JP-NanamiNeural（自然な女性の声）。追加ソフト不要（ffmpegも不要）。
- ページ側は audio/bk_<id>.mp3 があればそれを再生し、無ければ端末TTSにフォールバックします。

使い方（Windows）:
  1) このファイルと bunkei_renshu_audio.json を、bunkei_renshu.html と同じフォルダに置く
  2) make_bunkei_audio.bat をダブルクリック（または: py make_bunkei_audio.py）
  3) 出来た audio フォルダを、HTMLと同じ場所（GitHubの同じ階層）に置いてアップロードする

ログは _bunkei_audio_log.txt にも書き出します。
"""
import os, json, sys, asyncio, traceback

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST = os.path.join(HERE, "bunkei_renshu_audio.json")
OUT_DIR = os.path.join(HERE, "audio")
LOG = os.path.join(HERE, "_bunkei_audio_log.txt")

VOICE = "ja-JP-NanamiNeural"   # 自然な女性の声。男性にするなら ja-JP-KeitaNeural
RATE  = "-5%"                  # 少しゆっくり（学習者向け）

def log(msg):
    line = str(msg)
    print(line)
    try:
        with open(LOG, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass

def load_items():
    with open(MANIFEST, encoding="utf-8") as f:
        return json.load(f)

async def synth(text, path):
    import edge_tts
    c = edge_tts.Communicate(text, VOICE, rate=RATE)
    await c.save(path)

async def main():
    open(LOG, "w", encoding="utf-8").close()
    log("=== 文型練習 モデル音声 生成 開始 ===")
    try:
        import edge_tts  # noqa
    except Exception:
        log("!! edge-tts が入っていません。先に:  py -m pip install edge-tts")
        return
    if not os.path.exists(MANIFEST):
        log("!! bunkei_renshu_audio.json が見つかりません。HTMLと同じフォルダに置いてください。")
        return
    items = load_items()
    log("音声の数: %d" % len(items))
    os.makedirs(OUT_DIR, exist_ok=True)
    ok = 0
    for idx, it in enumerate(items, 1):
        out = os.path.join(OUT_DIR, "%s.mp3" % it["id"])
        try:
            await synth(it["text"], out)
            ok += 1
            log("[%02d/%d] OK  %s  %s" % (idx, len(items), it["id"], it["text"]))
        except Exception as e:
            log("[%02d/%d] 失敗 %s : %s" % (idx, len(items), it["id"], repr(e)))
            log(traceback.format_exc())
    log("=== 完了：%d / %d 個の音声を audio フォルダに作りました ===" % (ok, len(items)))
    log("audio フォルダを HTML と同じ場所に置いてアップロードしてください。")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        log("エラー: " + repr(e))
        log(traceback.format_exc())
