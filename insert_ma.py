#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""公式CDと同じ「間」を入れて mp3 を組み立てる見本。

いまお使いの生成プログラムに、この考え方を足してください。
やっていることは1つだけです：**セグメントとセグメントの間に、決まった長さの無音を入れる**。

必要なもの
  pip install pydub   （ffmpeg も要ります）
"""
import json
from pydub import AudioSegment

TIMING = json.load(open('n3_audio_timing.json', encoding='utf-8'))
MAN = json.load(open('n3_listening_manifest.json', encoding='utf-8'))


def ma(sec):
    """無音を作る"""
    return AudioSegment.silent(duration=int(sec * 1000))


def build(item, kind, tts):
    """item … マニフェストの1問（file と segments）
       kind … 課題理解／ポイント理解／概要理解／発話表現／即時応答
       tts  … tts(role, text) -> AudioSegment  を返す関数（いまお使いのものを渡す）
    """
    segs = item['segments']
    # choice付き（選択肢の読み上げ）かどうかで分ける
    body = [s for s in segs if not s.get('choice')]
    choices = [s for s in segs if s.get('choice')]

    out = AudioSegment.empty()

    # ★このサイトは「サクッと毎日少しずつ」がコンセプトなので、
    #   問題と問題の間の時間（解答の間・問番号・例題・ポイント理解の20秒）は入れません。
    #   1問の中の短い間だけを入れます。ここを詰めると聞き取りにくくなるためです。
    #   模擬試験モードを作るときは、n3_audio_timing.json の「本試験どおり」の値を使ってください。

    if kind in ('課題理解', 'ポイント理解'):
        # 場面＋設問 → 2.0秒 → 会話 → 2.2秒 → 設問
        # ★本試験のポイント理解はここが20秒（選択肢を読む時間）だが、
        #   このサイトは1問ずつ自分のペースで解くので入れない。
        #   かわりに画面に「音声を聞く前に、選択肢を読んでおきましょう。」と出している。
        out += tts(body[0]['role'], body[0]['text']) + ma(2.0)
        for s in body[1:-1]:
            out += tts(s['role'], s['text'])
        out += ma(2.2)
        out += tts(body[-1]['role'], body[-1]['text'])         # 設問をもう一度

    elif kind == '概要理解':
        # 場面 → 2.1秒 → 話 → 2.0秒 → 設問 → 3.0秒ごとに選択肢4つ
        out += tts(body[0]['role'], body[0]['text']) + ma(2.1)
        for s in body[1:-1]:
            out += tts(s['role'], s['text'])
        out += ma(2.0) + tts(body[-1]['role'], body[-1]['text'])
        for k, s in enumerate(choices):
            out += ma(2.0 if k == 0 else 3.0) + tts(s['role'], s['text'])

    else:  # 発話表現・即時応答
        # 場面＋設問（または発話）→ 2.0秒 → 2.1秒ごとに選択肢3つ
        for s in body:
            out += tts(s['role'], s['text'])
        for k, s in enumerate(choices):
            out += ma(2.0 if k == 0 else 2.1) + tts(s['role'], s['text'])

    return out


# ── 使いかたの例 ──
# from your_tts import speak            # いまお使いの読み上げ関数
# kinds = {...}                          # file名 -> 大問名（n3_q1_* なら課題理解、など）
# for it in MAN['items']:
#     kind = kinds[it['file']]
#     build(it, kind, speak).export('audio/' + it['file'], format='mp3')
