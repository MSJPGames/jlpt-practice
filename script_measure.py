#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""N2公式の聴解スクリプトから、台本の字数と発話数を測る。
ふりがな（サイズ4.5）は落とし、本文（サイズ9）だけを見る。
★中身は保存しない。字数と回数だけ。"""
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer, LTChar, LAParams
import collections, re, json, statistics
SRC='/mnt/user-data/uploads/JLPT PRACTICE/N2資料/N2script.pdf'
lines=[]
for page in extract_pages(SRC, laparams=LAParams(char_margin=2.0, line_margin=0.3)):
    rows=collections.defaultdict(list)
    def walk(o):
        if isinstance(o, LTChar):
            if o.get_text().strip() and o.size >= 8:
                rows[round(o.y0)].append((o.x0, o.get_text()))
        elif hasattr(o, '__iter__'):
            for c in o:
                walk(c)
    walk(page)
    for y in sorted(rows,reverse=True):
        t=''.join(c[1] for c in sorted(rows[y])).strip()
        if t and '聴解スクリプト' not in t:
            lines.append(t)
open('script_lines.txt','w',encoding='utf-8').write('\n'.join(lines))

HEAD=re.compile(r'^問題\s*(\d+)')
ITEM=re.compile(r'^(例|\d+)\s*番?$')
SPK=re.compile(r'^[ＭＦMF]\s*[：:]')
KIND={1:'課題理解',2:'ポイント理解',3:'概要理解',4:'即時応答',5:'統合理解'}
items=[]; cur=None; kind=None
for t in lines:
    m=HEAD.match(t)
    if m:
        kind=KIND.get(int(m.group(1)))
        continue
    if ITEM.match(t):
        if cur: items.append(cur)
        cur=dict(kind=kind, no=t, turns=[], narr=[])
        continue
    if cur is None: continue
    if SPK.match(t):
        cur['turns'].append(re.sub(r'^[ＭＦMF]\s*[：:]\s*','',t))
    elif cur['turns']:
        cur['turns'][-1]+=t      # 前の発話の続き
    else:
        cur['narr'].append(t)    # 場面説明
if cur: items.append(cur)

out={}
for k in ('課題理解','ポイント理解','概要理解','即時応答','統合理解'):
    # ★通し番号だけの行を拾いそこねると、中身が空の「問」ができる。台本が空のものは数えない。
    a=[x for x in items if x['kind']==k and x['no']!='例'
       and sum(len(t) for t in x['turns'])>0]
    if not a: continue
    n=[len(x['turns']) for x in a]
    c=[sum(len(t) for t in x['turns']) for x in a]
    s=[sum(len(t) for t in x['narr']) for x in a]
    out[k]=dict(問数=len(a),
                発話数=[round(statistics.mean(n),1),min(n),max(n)],
                台本字数=[round(statistics.mean(c),1),min(c),max(c)],
                場面説明の字数=[round(statistics.mean(s),1),min(s),max(s)])
    print(f'{k:8}{len(a):3}問  発話数{out[k]["発話数"]}  台本字数{out[k]["台本字数"]}  場面説明{out[k]["場面説明の字数"]}')
json.dump(out,open('script_n2.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
