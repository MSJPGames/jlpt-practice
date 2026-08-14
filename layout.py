#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""N2公式読解の本文レイアウトを測る（段落数・1段落の字数）。
段落の切れ目は「字下げ（x座標が1字ぶん右）」で判定する。行の長さでは判定しない
（下線が引かれた箇所で行が割れるため）。"""
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer, LTChar, LAParams
import collections, json, statistics
SRC='/mnt/user-data/uploads/JLPT PRACTICE/N2資料/N2③読解.pdf'
PAGES={}
for pno,page in enumerate(extract_pages(SRC,laparams=LAParams(char_margin=2.0,line_margin=0.3)),1):
    rows=collections.defaultdict(list)
    for el in page:
        if not isinstance(el,LTTextContainer): continue
        for line in el:
            for ch in line:
                if isinstance(ch,LTChar) and ch.get_text().strip():
                    rows[round(ch.y0)].append((ch.x0,ch.get_text(),round(ch.size)))
    L=[]
    for y in sorted(rows,reverse=True):
        cs=sorted(rows[y]); t=''.join(c[1] for c in cs)
        L.append(dict(y=y,x=round(cs[0][0],1),size=collections.Counter(c[2] for c in cs).most_common(1)[0][0],t=t))
    PAGES[pno]=L
SKIP=('選びなさい','えらびなさい','答えなさい')
def body(pno):
    out=[]; started=False
    for r in PAGES[pno]:
        if r['x']>560 or r['x']<25: continue          # 縦の柱
        if '(cid:' in r['t']:
            if r['size']==9 and started: break        # 設問の番号（□つき）
            continue
        if r['size']!=11: continue
        if r['t'] in ('１','２','３','４','５','Ａ','Ｂ'): continue
        if any(s in r['t'] for s in SKIP): continue
        if r['t'].startswith('（') and r['t'].endswith('）'): continue   # 出典
        if r['t'].startswith('以下は') or r['t'].startswith('次の'): continue
        started=True; out.append(r)
    return out
def paras(pgs):
    ps=[]
    for p in pgs:
        rows=body(p)
        if not rows: continue
        base=min(r['x'] for r in rows)
        cur=''
        for r in rows:
            if r['x']>base+5 and cur: ps.append(cur); cur=''
            cur+=r['t']
        if cur: ps.append(cur)
    return ps
MAP={'短文1':[1],'短文2':[2],'短文3':[3,4],'短文4':[5,6],'短文5':[7,8],
     '中文1':[9,10],'中文2':[11,12],'中文3':[13,14],
     '統合理解A+B':[15,16],'主張理解（長文）':[17,18],'情報検索の資料':[19,20]}
res={}
for k,pgs in MAP.items():
    ps=paras(pgs); n=[len(x) for x in ps]
    res[k]=dict(段落数=len(ps),本文字数=sum(n),各段落の字数=n)
    print(f'{k:16} 段落{len(ps):2}  本文{sum(n):4}字  各段落 {n}')
json.dump(res,open('layout_n2.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
