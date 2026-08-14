#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""市販教材（スキャンPDF）を OCR して、選択肢の字数だけを測る。

★著作権：本文・選択肢の文字列は保存しない。字数・個数・位置だけを取る。
★OCRは1文字ずつ完璧ではないが、**字数の統計**を取るには足りる
   （誤読しても字数はほぼ変わらないため）。1問ずつの内容には使わない。
"""
import re, sys, os, json, statistics, collections
import pypdfium2 as pdfium
import pytesseract

NUM = '1234'


def ocr(path, scale=3, psm=6, pages=None):
    d = pdfium.PdfDocument(path)
    out = []
    rng = range(len(d)) if pages is None else pages
    for i in rng:
        im = d[i].render(scale=scale).to_pil()
        out.append(pytesseract.image_to_string(im, lang='jpn', config=f'--psm {psm}'))
    return out


def clean(lines):
    drop = re.compile(r'^(\d+\s*$|模|回|に拓|談回|[EＥ]$)')
    out = []
    for l in lines:
        s = l.strip()
        if not s or drop.match(s):
            continue
        if '選びなさい' in s or 'えらびなさい' in s or s.startswith('問題'):
            continue
        out.append(s)
    return out


def head_num(l):
    """行頭が『1 』『2 』…なら その数字"""
    m = re.match(r'^([1-4])[\s　]', l.strip())
    return m.group(1) if m else None


def split_inline(s):
    """『1 あ 2 い 3 う 4 え』を4つに割る。番号は 空白のあとの1〜4 とみなす。"""
    pos = []
    start = 0
    for n in NUM:
        m = re.search(r'(?:^|[\s　])' + n + r'[\s　]', s[start:])
        if not m:
            return None
        i = start + m.start() + (0 if m.start() == 0 and s[start] == n else 1)
        pos.append(i)
        start = i + 1
    cs = []
    for k, i in enumerate(pos):
        j = pos[k + 1] if k + 1 < len(pos) else len(s)
        cs.append(re.sub(r'[\s　]', '', s[i + 1:j]))
    return cs if all(len(c) >= 1 for c in cs) else None


def choice_blocks(lines):
    """1行に4つ／4行に1つずつ の両方に対応"""
    out, i = [], 0
    while i < len(lines):
        # 4行に1つずつ（用法など）
        if i + 3 < len(lines) and [head_num(lines[i + k]) for k in range(4)] == list(NUM):
            cs = [re.sub(r'[\s　]', '', lines[i + k].strip()[1:]) for k in range(4)]
            if all(cs):
                out.append(cs); i += 4; continue
        c = split_inline(lines[i])
        if c:
            out.append(c); i += 1; continue
        # 2行に2つずつ
        if i + 1 < len(lines):
            c = split_inline(lines[i] + ' ' + lines[i + 1])
            if c:
                out.append(c); i += 2; continue
        i += 1
    return out


def stats(name, sets):
    L = [[len(x) for x in cs] for cs in sets]
    allc = [n for x in L for n in x]
    diff = [max(x) - min(x) for x in L]
    same = sum(1 for x in L if len(set(x)) == 1)
    return {
        '設問数': len(sets),
        '選択肢字数': [round(statistics.mean(allc), 1), min(allc), max(allc)],
        '肢の長短差': [round(statistics.mean(diff), 1), min(diff), max(diff)],
        '4肢完全同字数の割合': round(same / len(sets) * 100, 1),
    }


HEAD = re.compile(r'[問間]\s*題\s*(\d+)')


def sections(pages_text, heads):
    """『問題N』の見出しで区切る。heads = {番号: 大問名}
    ★OCRは「問題」を「間題」「間 題」と読むことがある。ゆるく拾う。
      見出しの行はページの飾り枠の文字が混じるので、行の途中にあっても拾う。"""
    out = collections.defaultdict(list)
    k, buf = None, []
    for ln in '\n'.join(pages_text).split('\n'):
        m = HEAD.search(ln)
        if m and int(m.group(1)) in heads:
            if k:
                out[k] += choice_blocks(clean(buf))
            k, buf = heads[int(m.group(1))], []
            continue
        buf.append(ln)
    if k:
        out[k] += choice_blocks(clean(buf))
    return out


if __name__ == '__main__':
    path, spec = sys.argv[1], json.loads(sys.argv[2])
    heads = {int(k): v for k, v in spec.items()}
    t = ocr(path)
    S = sections(t, heads)
    res = {k: stats(k, v) for k, v in S.items() if v}
    print(json.dumps(res, ensure_ascii=False, indent=1))
