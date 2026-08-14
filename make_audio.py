#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""JLPT N3 聴解 182本の mp3 を作り直す。

つかいかた（Windows・Mac・Linux 共通）
  1) pip install edge-tts
  2) このファイルと n3_listening_manifest.json、file_to_daimon.json を同じフォルダに置く
  3) python make_audio.py
     → 同じフォルダの audio/ に n3_q1_01.mp3 … が 182本できます

  途中で止まっても、もう一度実行すれば **できていないぶんだけ** 作り直します。
  ぜんぶ作り直したいときは:  python make_audio.py --force
  1つの大問だけ:            python make_audio.py --only 課題理解
  声を試したいときは:        python make_audio.py --test

ffmpeg は要りません。無音は mp3 のフレームをそのまま並べて作ります。
"""
import asyncio, base64, json, os, sys, time

# ─────────────────────────────────────────────
# ★声の設定。いまお使いの生成プログラムと同じ値にそろえてください。
#   edge-tts の日本語は Nanami（女声）と Keita（男声）の2つです。
#   N（ナレーター）は Nanami を少し低く・ゆっくりにして、F と区別しています。
VOICE = {
    'N':  dict(voice='ja-JP-NanamiNeural', rate='-10%', pitch='-10Hz'),
    'F':  dict(voice='ja-JP-NanamiNeural', rate='+0%',  pitch='+10Hz'),
    'M':  dict(voice='ja-JP-KeitaNeural',  rate='+0%',  pitch='+0Hz'),
    'M2': dict(voice='ja-JP-KeitaNeural',  rate='+0%',  pitch='-6Hz'),
}

# ★間の長さ（秒）。公式CDを実測して決めた値です。
#   このサイトは「サクッと毎日少しずつ」なので、
#   解答の間・問番号・例題・ポイント理解の20秒は入れません。
MA = {
    '課題理解':     dict(after_intro=2.0, before_question=2.2, choice_first=None, choice_gap=None),
    'ポイント理解':  dict(after_intro=2.0, before_question=2.2, choice_first=None, choice_gap=None),
    '概要理解':     dict(after_intro=2.1, before_question=2.0, choice_first=2.0,  choice_gap=3.0),
    '発話表現':     dict(after_intro=2.0, before_question=None, choice_first=2.0, choice_gap=2.1),
    '即時応答':     dict(after_intro=None, before_question=None, choice_first=2.0, choice_gap=2.1),
}
# ─────────────────────────────────────────────

OUT = 'audio'
FRAME = base64.b64decode('//NkxHwAAANIAAAAAFVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV')   # 24kHz・モノラル・48kbps の無音1フレーム＝0.024秒
FRAME_SEC = 0.024


def ma(sec):
    """無音を作る（mp3のフレームを並べるだけ。ffmpegは要らない）"""
    if not sec:
        return b''
    return FRAME * max(1, int(round(sec / FRAME_SEC)))


async def say(text, role, retry=4):
    """1つの発話を読み上げて mp3 のバイト列を返す"""
    import edge_tts
    v = VOICE.get(role) or VOICE['N']
    for k in range(retry):
        try:
            c = edge_tts.Communicate(text, v['voice'], rate=v['rate'], pitch=v['pitch'])
            b = b''
            async for ch in c.stream():
                if ch['type'] == 'audio':
                    b += ch['data']
            if b:
                return b
        except Exception as e:
            if k == retry - 1:
                raise
            await asyncio.sleep(2 * (k + 1))
    raise RuntimeError('読み上げに失敗: ' + text[:20])


async def build(item, kind):
    """1問ぶんの mp3 を組み立てる"""
    m = MA[kind]
    segs = item['segments']
    # 選択肢の読み上げ行の見分け方：マニフェストの choice。
    # 古いマニフェストで choice が無いときは、「いち、」「に、」…で始まる行を選択肢とみなす。
    def is_choice(s):
        if s.get('choice'):
            return True
        return any(s['text'].startswith(x) for x in ('いち、', 'に、', 'さん、', 'よん、'))
    body = [s for s in segs if not is_choice(s)]
    choices = [s for s in segs if is_choice(s)]
    if MA[kind]['choice_gap'] and not choices:
        raise RuntimeError(item['file'] + ': 選択肢の読み上げ行が見つかりません')
    out = b''

    if kind in ('課題理解', 'ポイント理解', '概要理解'):
        # 1行目＝場面（と設問）、最後＝設問をもう一度、その間が会話または話
        out += await say(body[0]['text'], body[0]['role']) + ma(m['after_intro'])
        for s in body[1:-1]:
            out += await say(s['text'], s['role'])
        out += ma(m['before_question'])
        out += await say(body[-1]['text'], body[-1]['role'])
    else:
        # 発話表現＝ナレーターが場面と設問／即時応答＝相手の一言だけ
        for s in body:
            out += await say(s['text'], s['role'])

    for k, s in enumerate(choices):
        out += ma(m['choice_first'] if k == 0 else m['choice_gap'])
        out += await say(s['text'], s['role'])
    return out


async def main():
    force = '--force' in sys.argv
    only = None
    if '--only' in sys.argv:
        only = sys.argv[sys.argv.index('--only') + 1]

    man = json.load(open('n3_listening_manifest.json', encoding='utf-8'))
    kinds = json.load(open('file_to_daimon.json', encoding='utf-8'))
    os.makedirs(OUT, exist_ok=True)

    items = [x for x in man['items'] if not only or kinds.get(x['file']) == only]
    todo = [x for x in items if force or not os.path.exists(os.path.join(OUT, x['file']))]
    print(f'ぜんぶで {len(items)} 本 ／ 作るのは {len(todo)} 本')
    if not todo:
        print('もうできています。作り直すときは --force を付けてください。')
        return

    t0 = time.time()
    ng = []
    for n, it in enumerate(todo, 1):
        kind = kinds.get(it['file'])
        if kind not in MA:
            print(f'  ? {it["file"]}: 大問が分かりません。とばします'); continue
        try:
            data = await build(it, kind)
            open(os.path.join(OUT, it['file']), 'wb').write(data)
            sec = len(data) / (48000 / 8)
            done = time.time() - t0
            nokori = done / n * (len(todo) - n)
            print(f'  [{n:3}/{len(todo)}] {it["file"]:14} {kind:6} {sec:5.1f}秒  '
                  f'のこり約{nokori/60:.0f}分')
        except Exception as e:
            ng.append((it['file'], str(e)[:60]))
            print(f'  × {it["file"]}: {e}')

    print(f'\nできました。{len(todo)-len(ng)}本／かかった時間 {(time.time()-t0)/60:.1f}分')
    if ng:
        print('うまくいかなかったもの（もう一度実行すれば、このぶんだけ作り直します）:')
        for f, e in ng:
            print('   ', f, e)


async def test():
    """声の設定を耳で確かめる用。test_N.mp3 などができます"""
    for role in ('N', 'F', 'M'):
        b = await say('これは、こえの　テストです。日本語の部屋、エヌ3。', role)
        open(f'test_{role}.mp3', 'wb').write(b)
        print(f'test_{role}.mp3 をつくりました（{VOICE[role]}）')


if __name__ == '__main__':
    asyncio.run(test() if '--test' in sys.argv else main())
