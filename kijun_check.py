#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""公式問題集の基準（kijun.json）と、いまのサイトの中身を突き合わせる。

    python3 kijun_check.py n1_quiz.html N1

**納品の前に必ず通すこと。**「◯」以外が出たら、その大問は基準からずれている。
作問の条件（字数・発話数・選択肢の長さ）は、既存データの min/max ではなく
必ず kijun.json から取ること。既存データから取ると、いまのズレをそのまま固定してしまう。
"""
import json, re, sys, os, collections, statistics


def blocks(path):
    h = open(path, encoding='utf-8').read()
    out = {}
    for name in ('vocabQuestions', 'grammarQuestions', 'readingQuestions', 'otherQuestions'):
        m = re.search(r'const %s\s*=\s*' % name, h)
        if not m:
            continue
        i = h.index('{', m.end())
        d = 0
        for j in range(i, len(h)):
            if h[j] == '{':
                d += 1
            elif h[j] == '}':
                d -= 1
                if d == 0:
                    break
        out[name] = json.loads(h[i:j + 1])
    return out


def hit(arr, f):
    s = 0
    for q in arr:
        v = f(len(c) for c in q['choices'])
        cand = [c for c in q['choices'] if len(c) == v]
        s += (q['answer'] in cand) / len(cand)
    return s / len(arr) * 100


def mark(val, spec):
    """spec = [目標, 下, 上]"""
    if not isinstance(spec, list) or len(spec) != 3:
        return '  '
    t, lo, hi = spec
    if lo <= val <= hi:
        return '◯'
    return '×'


def line(name, val, spec, unit=''):
    if isinstance(spec, list) and len(spec) == 3:
        print(f'  {mark(val, spec)} {name:16} {val:8.1f}{unit}   公式 {spec[0]:6.1f}（{spec[1]}〜{spec[2]}）')
    else:
        print(f'    {name:16} {val:8.1f}{unit}')


def main(path, level):
    K = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'kijun.json'),
                       encoding='utf-8'))
    if level not in K or '_出典' in K[level] and '未分析' in K[level]['_出典']:
        print(f'× {level} の基準がまだ入っていません。公式問題集を分析して kijun.json を埋めてください。')
        sys.exit(1)
    kj = K[level]
    B = blocks(path)
    print(f'\n=== {os.path.basename(path)} を {level} の公式基準と突き合わせ ===')
    print(f'（出典 {kj["_出典"]}）')

    # ── 聴解 ──────────────────────────
    if 'otherQuestions' in B and '聴解' in B['otherQuestions']:
        oth = B['otherQuestions']['聴解']
        g = collections.defaultdict(list)
        for q in oth:
            g[q['type']].append(q)
        print('\n【聴解】')
        allq = []
        same_total = 0
        for k, spec in kj['聴解'].items():
            if k.startswith('_') or k not in g:
                continue
            a = g[k]
            allq += a
            body = lambda q: [s for s in q['script'] if s.get('speaker') != 'N']
            ns = [len(body(q)) for q in a]
            cs = [len(x) for q in a for x in q['choices']]
            diff = [max(len(x) for x in q['choices']) - min(len(x) for x in q['choices']) for q in a]
            same = sum(1 for q in a if len(body(q)) >= 2 and len(set(s['speaker'] for s in body(q))) == 1)
            same_total += same
            print(f'\n ▼ {k}（{len(a)}問）')
            line('発話数', statistics.mean(ns), spec['発話数'], '回')
            line('台本字数', statistics.mean(sum(len(s['text']) for s in body(q)) for q in a) if False else
                 statistics.mean([sum(len(s['text']) for s in body(q)) for q in a]), spec['台本字数'], '字')
            line('選択肢字数', statistics.mean(cs), spec['選択肢字数'], '字')
            line('肢の長短差', statistics.mean(diff), spec['肢の長短差'], '字')
            if same:
                print(f'  × 同性ペア           {same}問   公式は 0問（男女に分ける）')
        z = kj['聴解']['_全体']
        print(f'\n ▼ 聴解ぜんたい（{len(allq)}問）')
        line('最長肢正解率', hit(allq, max), z['最長肢正解率'], '%')
        line('最短肢正解率', hit(allq, min), z['最短肢正解率'], '%')
        line('同性ペア', same_total, z['同性ペア'], '問')

    # ── 読解 ──────────────────────────
    if 'readingQuestions' in B:
        print('\n【読解】')
        allr = []
        for k, v in B['readingQuestions'].items():
            allr += v
            print(f'    {k:16} {len(v):4}問   最長{hit(v,max):5.1f}%  最短{hit(v,min):5.1f}%')
        z = kj['読解']['_全体']
        print(f'\n ▼ 読解ぜんたい（{len(allr)}問）')
        line('最長肢正解率', hit(allr, max), z['最長肢正解率'], '%')
        line('最短肢正解率', hit(allr, min), z['最短肢正解率'], '%')
        d = [max(len(x) for x in q['choices']) - min(len(x) for x in q['choices']) for q in allr]
        line('肢の長短差', statistics.mean(d), z['肢の長短差'], '字')
        same = sum(1 for q in allr if len(set(len(x) for x in q['choices'])) == 1) / len(allr)
        line('完全同字数の割合', same, z['完全同字数の割合'])

    # ── 文字・語彙／文法 ────────────────
    for nm, key in (('vocabQuestions', '文字・語彙'), ('grammarQuestions', '文法')):
        if nm not in B:
            continue
        print(f'\n【{key}】')
        alla = []
        for k, v in B[nm].items():
            alla += v
            print(f'    {k:16} {len(v):5}問   最長{hit(v,max):5.1f}%  最短{hit(v,min):5.1f}%')
        z = kj[key]['_全体']
        print(f'\n ▼ {key}ぜんたい（{len(alla)}問）')
        line('最長肢正解率', hit(alla, max), z['最長肢正解率'], '%')
        line('最短肢正解率', hit(alla, min), z['最短肢正解率'], '%')

    print('\n【まだ確認していないこと】（公式のCD・冊子を見て kijun.json に書き足すこと）')
    for s in K['_未確認']:
        print('  -', s)
    print()


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else 'N1')
