#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""「本文（台本）なしで解けてしまうか」を測るための道具。

  python3 blindtest.py make  n1_quiz.html 主張理解（長文） 40 > /dev/null
      → 設問と選択肢だけを取り出した blind_in.json と、正解の blind_key.json を作る
  python3 blindtest.py score blind_key.json blind_out.json
      → 当てた率を出す。25%（3択なら33%）に近いほど健全。

blind_in.json を、正解を知らない担当に渡して解かせる。
「形や定石だけでどれだけ当たるか」を見るので、当てずっぽうでも必ず1つ選ばせること。
"""
import json, re, sys, random


def load(path):
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
        for k, v in json.loads(h[i:j + 1]).items():
            out[k] = v
    return out


def stem(q):
    """本文を落として、設問の一行と場面だけ残す。"""
    if 'situation' in q:                       # 聴解
        return (q.get('situation', '') + ' ／ ' + q.get('question', ''))[:200]
    p = [x for x in q.get('question', '').split('\n') if x.strip()]
    return p[-1][-100:] if p else ''


def main():
    if sys.argv[1] == 'make':
        path, sec, n = sys.argv[2], sys.argv[3], int(sys.argv[4])
        items = load(path)[sec]
        rng = random.Random(7)
        idx = sorted(rng.sample(range(len(items)), min(n, len(items))))
        blind, key = [], {}
        for k in idx:
            q = items[k]
            ch = q['choices'][:]
            rng.shuffle(ch)
            i = f'{sec[:2]}_{k:03d}'
            blind.append({'id': i, '設問': stem(q), 'choices': ch})
            key[i] = q['answer']
        json.dump(blind, open('blind_in.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        json.dump(key, open('blind_key.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(f'{sec} から {len(blind)} 問 → blind_in.json / blind_key.json')
    else:
        key = json.load(open(sys.argv[2], encoding='utf-8'))
        got = json.load(open(sys.argv[3], encoding='utf-8'))
        ok = sum(1 for x in got if key.get(x['id']) == x['答え'])
        print(f'本文なしの正答 {ok}/{len(got)} = {ok/len(got)*100:.0f}%'
              f'（4択のまぐれは25%、3択は33%）')


if __name__ == '__main__':
    main()
