#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""公式問題集の基準（kijun.json）と、いまのサイトの中身を突き合わせる。

    python3 kijun_check.py n1_quiz.html N1

**納品の前に必ず通すこと。**「◯」以外が出たら、その大問は基準からずれている。
作問の条件（字数・発話数・選択肢の長さ）は、既存データの min/max ではなく
必ず kijun.json から取ること。既存データから取ると、いまのズレをそのまま固定してしまう。
"""
import json, re, sys, os, math, collections, statistics


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


def se(sample):
    """こちらの平均の標準誤差。30問の平均は、同じ作り方をしてもこれくらいは動く。
    資料の幅がこれより狭いとき、幅ちょうどに合わせようとするのは
    「たまたまの値に合わせにいく」ことになる。"""
    if not isinstance(sample, (list, tuple)) or len(sample) < 2:
        return 0.0
    try:
        return statistics.stdev(sample) / math.sqrt(len(sample))
    except statistics.StatisticsError:
        return 0.0


def line(name, val, spec, unit='', src='公式', judge=True, sample=None):
    """val は数（平均）。sample を渡すと、こちらの平均のブレ（標準誤差）だけ幅を広げて判定する。"""
    if isinstance(sample, (list, tuple)) and sample:
        val = statistics.mean(sample)
    e = se(sample)
    if isinstance(spec, list) and len(spec) == 3:
        lo, hi = spec[1] - e, spec[2] + e
        inside = lo <= val <= hi
        w = f'±{e:.1f}' if e >= 0.05 else '    '
    if isinstance(spec, list) and len(spec) == 3 and judge:
        print(f'  {"◯" if inside else "×"} {name:16} {val:8.1f}{unit}   '
              f'{src} {spec[0]:6.1f}（{spec[1]}〜{spec[2]}）{w}')
    elif isinstance(spec, list) and len(spec) == 3 and not judge:
        if inside:
            print(f'  ・ {name:16} {val:8.1f}{unit}   資料が食い違うので追いかけない'
                  f'（資料の幅 {spec[1]}〜{spec[2]}の中）')
        else:
            print(f'  × {name:16} {val:8.1f}{unit}   ★どの資料よりも'
                  f'{"下" if val < lo else "上"}（資料の幅 {spec[1]}〜{spec[2]}{w}）')
    else:
        print(f'    {name:16} {val:8.1f}{unit}')


def band(spec, key):
    """★3資料（公式・市販SM・パターン別ドリル）を突き合わせて決めた「採用平均_」があれば
    そちらで判定する。公式だけの値は問数が少なく（大問あたり3〜8問）、
    たまたまの値を追いかけてしまうため。

    ★資料どうしが食い違っていて「追いかけない」と決めた項目は、数字だけ出して◯×を付けない。
      付けると、追いかけないと決めたはずの値を追いかけてしまう。"""
    ic = spec.get('_3資料の一致', {}) or {}
    if '追いかけない' in str(ic.get(key, '')):
        # 数字は追いかけないが、**どの資料よりも外**に出ているならそれは別の話。
        # 「資料が食い違う」は「どこでもいい」ではない。資料の幅の外なら×にする。
        a = spec.get('採用平均_' + key) or spec.get(key)
        return a, '（追わない）', False
    a = spec.get('採用平均_' + key)
    if isinstance(a, list) and len(a) == 3:
        return a, '3資料', True
    return spec.get(key), '公式  ', True


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
            # ★選択肢の読み上げ行（choice付き）は「会話・発話」ではないので、
            #   発話数にも台本字数にも数えない。数えると本文が長く見えてしまう。
            talk = lambda q: [s for s in q['script'] if not s.get('choice')]
            body = lambda q: [s for s in talk(q) if s.get('speaker') != 'N']
            ns = [len(body(q)) for q in a]
            # ★平均のブレを見るため、1問1つの値にする（肢を全部並べると問数を水増ししてしまう）
            cs = [statistics.mean([len(x) for x in q['choices']]) for q in a]
            diff = [max(len(x) for x in q['choices']) - min(len(x) for x in q['choices']) for q in a]
            # 音声の組み立ての検査
            nonarr = [q for q in a
                      if k not in ('即時応答', '音声の特徴')
                      and (not talk(q) or talk(q)[0].get('speaker') != 'N'
                           or talk(q)[-1].get('speaker') != 'N')]
            if k in ('課題理解', 'ポイント理解', '統合理解'):
                bb = [[s['speaker'] for s in body(q)] for q in a]
                same = sum(1 for b in bb if len(set(b)) < 2
                           or any(b[x] == b[x + 1] for x in range(len(b) - 1)))
            elif k == '概要理解':
                two = sum(1 for q in a if len(set(s['speaker'] for s in body(q))) > 1)
                lim = spec.get('二人以上が話す割合', [0.17, 0, 0.17])[2]
                same = 0 if two <= lim * len(a) else two
            else:
                same = 0
            same_total += same
            print(f'\n ▼ {k}（{len(a)}問）')
            if k == '概要理解':
                # ★概要理解は独話7〜8割・会話2〜3割にする（3資料の結論）ので、
                #   発話数の平均は1.0にならない。独話の問だけで1.0かを見て、
                #   会話をどれだけ混ぜたかは「二人以上が話す割合」で別に見る。
                mono = [n for n in ns if n <= 1]
                line('発話数（独話の問）', 0, *band(spec, '発話数')[:1], '回',
                     *band(spec, '発話数')[1:], sample=mono)
            else:
                line('発話数', 0, *band(spec, '発話数')[:1], '回', *band(spec, '発話数')[1:], sample=ns)
            line('台本字数', 0, *band(spec, '台本字数')[:1], '字', *band(spec, '台本字数')[1:],
                 sample=[sum(len(s['text']) for s in body(q)) for q in a])
            line('選択肢字数', 0, *band(spec, '選択肢字数')[:1], '字',
                 *band(spec, '選択肢字数')[1:], sample=cs)
            line('肢の長短差', 0, *band(spec, '肢の長短差')[:1], '字',
                 *band(spec, '肢の長短差')[1:], sample=diff)
            if k == '概要理解' and isinstance(spec.get('二人以上が話す割合'), list):
                tw = [100.0 if len(set(s['speaker'] for s in body(q))) > 1 else 0.0 for q in a]
                line('二人以上が話す割合', 0,
                     [x * 100 for x in spec['二人以上が話す割合']], '%', '3資料', sample=tw)
            want = spec.get('選択肢の数')
            if want:
                bad = collections.Counter(len(q['choices']) for q in a
                                          if len(q['choices']) not in want)
                if bad:
                    print(f'  × 選択肢の数がちがう  公式は{want}つ → '
                          + '／'.join(f'{n}つが{c}問' for n, c in bad.most_common()))
            if spec.get('選択肢を音声で読む') and not all(
                    sum(1 for s in q['script'] if s.get('choice')) == len(q['choices']) for q in a):
                print('  × 公式は選択肢を音声で読む（画面に出さない）。当サイトは画面に出している')
            if nonarr:
                print(f'  × 場面か設問が音声に入っていない  {len(nonarr)}問   '
                      f'（最初と最後にナレーターが要る）')
                print(f'      {" ".join(sorted(os.path.basename(q["audio"]).rsplit(".",1)[0] for q in nonarr))}')
            if same:
                lab = ('二人以上が話している（公式は6問中1問まで）' if k == '概要理解'
                       else '同じ話者が続けて話す／話者が一人だけ')
                print(f'  × {lab}  {same}問')
        z = kj['聴解'].get('_全体')
        if not allq or not z:
            print(f'  ★ 聴解が {len(oth)}問しかありません。'
                  f'{"基準の_全体もまだです。" if not z else ""}公式は'
                  f'{sum(v["設問数"] for k, v in kj["聴解"].items() if isinstance(v, dict) and "設問数" in v)}問')
            print('\n ▼ 聴解ぜんたい … 中身が無いので判定できません')
            z = None
        if z:
            print(f'\n ▼ 聴解ぜんたい（{len(allq)}問）')
            line('最長肢正解率', hit(allq, max), z['最長肢正解率'], '%')
            line('最短肢正解率', hit(allq, min), z['最短肢正解率'], '%')
            line('話者の組み立ての不備', same_total, z['同性ペア'], '%')

    # ── 読解 ──────────────────────────
    if 'readingQuestions' in B:
        print('\n【読解】')
        allr = []
        for k, v in B['readingQuestions'].items():
            allr += v
            print(f'    {k:16} {len(v):4}問   最長{hit(v,max):5.1f}%  最短{hit(v,min):5.1f}%')
            spec = kj['読解'].get(k)
            if not isinstance(spec, dict):
                continue
            cs = [statistics.mean([len(x) for x in q['choices']]) for q in v]
            dd = [max(len(x) for x in q['choices']) - min(len(x) for x in q['choices']) for q in v]
            line('  選択肢字数', 0, *band(spec, '選択肢字数')[:1], '字',
                 *band(spec, '選択肢字数')[1:], sample=cs)
            line('  肢の長短差', 0, *band(spec, '肢の長短差')[:1], '字',
                 *band(spec, '肢の長短差')[1:], sample=dd)
            # 本文字数：本文は question の中の ━ ではさまれた部分
            hon = []
            for q in v:
                seg = q['question'].split('━━━━━━━━━━━━━━━━━━')
                if len(seg) == 3:
                    hon.append(len(re.sub(r'[\s　]', '', seg[1])))
            if hon:
                line('  本文字数', 0, *band(spec, '本文字数')[:1], '字',
                     *band(spec, '本文字数')[1:], sample=hon)
            # ★段落の作り（2026-08-14 追加）。公式の読解ページを実測して入れた。
            #   本文が1段落ベタだと、公式の見た目から離れるだけでなく読みにくい。
            if isinstance(spec.get('段落数'), list):
                seen, pn, pl = set(), [], []
                for q in v:
                    sg = q['question'].split('━' * 18)
                    if len(sg) != 3 or sg[1] in seen:
                        continue
                    seen.add(sg[1])
                    ps = [x.strip() for x in sg[1].strip().split('\n') if x.strip()]
                    # 本文の段落だけを数える。見出し・ラベル行（「日にち　9月2日」など）・
                    # 注記（※）・署名は段落ではない
                    ps = [x for x in ps
                          if len(x) >= 20 and x.endswith(('。', '。」'))
                          and not x.startswith('※') and '　' not in x]
                    if not ps:
                        continue
                    pn.append(len(ps)); pl += [len(x) for x in ps]
                if pn:
                    line('  段落数', 0, spec['段落数'], '段落', sample=pn)
                    line('  1段落の字数', 0, spec['1段落の字数'], '字', sample=pl)
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
            spec = kj[key].get(k)
            if not isinstance(spec, dict):
                continue
            cs = [statistics.mean([len(x) for x in q['choices']]) for q in v]
            df = [max(len(x) for x in q['choices']) - min(len(x) for x in q['choices']) for q in v]
            # ★読解と同じように、資料が複数あるときは「採用平均_」で見る（2026-08-14）。
            #   資料が1つ（公式だけ）のときは band() が公式の値を返すので、動きは変わらない。
            if isinstance(band(spec, '選択肢字数')[0], list):
                line('  選択肢字数', 0, *band(spec, '選択肢字数')[:1], '字',
                     *band(spec, '選択肢字数')[1:], sample=cs)
            if isinstance(band(spec, '肢の長短差')[0], list):
                line('  肢の長短差', 0, *band(spec, '肢の長短差')[:1], '字',
                     *band(spec, '肢の長短差')[1:], sample=df)
            if isinstance(spec.get('会話形式の割合'), list):
                # 会話形式＝「　」のせりふか、話者名＋コロンで書かれている問
                kw = [100.0 if re.search(r'[^\n]{1,8}[「『]|^\s*\S{1,6}\s*[：:]',
                                         q['question'].split('\n\n', 1)[-1], re.M) else 0.0 for q in v]
                line('  会話形式の割合', 0, spec['会話形式の割合'], '%', sample=kw)
        z = kj[key]['_全体']
        print(f'\n ▼ {key}ぜんたい（{len(alla)}問）')
        line('最長肢正解率', hit(alla, max), z['最長肢正解率'], '%')
        line('最短肢正解率', hit(alla, min), z['最短肢正解率'], '%')

    # ── ★正解の位置の偏り ──────────────
    # 2026-08-13、★5で聴解の画面の並べ替えを止めたとき、データ側では正解が全問1番目に
    # 固まっていたため「画面でも音声でも答えはいつも1番」になった。
    # 画面の作りに頼らず、データそのものを毎回ここで点検する。
    print('\n【正解の位置の偏り】（データの中で、正解が何番目に置かれているか）')
    ng = 0
    for nm, key in (('otherQuestions', '聴解'), ('readingQuestions', '読解'),
                    ('vocabQuestions', '文字・語彙'), ('grammarQuestions', '文法')):
        if nm not in B:
            continue
        for k, v in B[nm].items():
            if not v:
                continue
            c = collections.Counter(q['choices'].index(q['answer']) + 1 for q in v
                                    if q.get('answer') in q.get('choices', []))
            n = len(v)
            top, cnt = c.most_common(1)[0]
            share = cnt / n
            lim = 1.0 / max(1, max(len(q['choices']) for q in v)) + 0.15
            if share > lim:
                ng += 1
                print(f'  × {key} {k:14}{n:5}問  {top}番目に{cnt}問（{share*100:.0f}%）'
                      f'  {dict(sorted(c.items()))}')
    if not ng:
        print('  ◯ どの大問も、正解の位置は散っている')

    # ── ★話者の声の割り当て ──────────────
    # 本試験では、場面の説明で先に名前が出た人が先に話す。
    # また、音声は女声・男声の2つしかないので、同性のペアは作れない。
    F_W = ['女の人', '女性', 'お母さん', '母', '妻', '娘', '姉', '妹', 'おばあさん', '祖母',
           '女の学生', '女子', 'おばさん']
    M_W = ['男の人', '男性', 'お父さん', '父', '夫', '息子', '兄', '弟', 'おじいさん', '祖父',
           '男の学生', '男子', 'おじさん']
    PAT = '|'.join(sorted(F_W + M_W, key=len, reverse=True))
    if 'otherQuestions' in B and '聴解' in B['otherQuestions']:
        print('\n【話者の声の割り当て】')
        same, rev = [], []
        for q in B['otherQuestions']['聴解']:
            if q.get('type') in ('発話表現', '即時応答'):
                continue
            intro = (q.get('situation') or '').split('。')[0]
            pp = []
            for mm in re.finditer(PAT, intro):
                if pp and mm.start() < pp[-1].start() + len(pp[-1].group(0)):
                    continue
                pp.append(mm)
            if len(pp) < 2:
                continue
            g = ['F' if x.group(0) in F_W else 'M' for x in pp][:2]
            v = []
            for sg in q.get('script', []):
                if sg.get('choice') or sg['speaker'] == 'N':
                    continue
                if sg['speaker'] not in v:
                    v.append(sg['speaker'])
            nm = os.path.basename(q.get('audio', '')).rsplit('.', 1)[0]
            if len(set(g)) == 1:
                same.append(f'{nm}（{intro}）')
            elif len(v) >= 2 and g != v[:2]:
                rev.append(f'{nm}（{intro}）')
        if same:
            print(f'  × 同性どうしの会話が{len(same)}問  声は女声・男声の2つしかないので作れません')
            print('      ' + ' / '.join(same[:5]))
        if rev:
            print(f'  × 場面の並びと話す順が逆の問が{len(rev)}問  '
                  f'本試験は先に名前が出た人から話します')
            print('      ' + ' / '.join(rev[:5]))
        if not same and not rev:
            print('  ◯ 場面に出てくる順と、話す順は合っている')
        # ★本試験は もんだい1・2 で「場面 → 設問 → 会話 → 設問」。設問を先に読む。
        nq = []
        for q in B['otherQuestions']['聴解']:
            if q.get('type') not in ('課題理解', 'ポイント理解'):
                continue
            sc = [x for x in q.get('script', []) if not x.get('choice')]
            if not sc or q.get('question', '') not in sc[0].get('text', ''):
                nq.append(os.path.basename(q.get('audio', '')).rsplit('.', 1)[0])
        if nq:
            print(f'  × 会話の前に設問を読んでいない問が{len(nq)}問  '
                  f'本試験は「場面 → 設問 → 会話 → 設問」の順です')
            print('      ' + ' / '.join(nq[:8]))
        else:
            print('  ◯ 課題理解・ポイント理解は「場面 → 設問 → 会話 → 設問」の順')

    # ── ★解説が選択肢を番号で呼んでいないか ──────────────
    # 画面では選択肢を毎回並べ替えるので、「①が正しい」のような書き方は意味を持たない。
    # （文の文法2の「★（3番目）」と、文章の文法・情報検索の①〜⑤は、選択肢ではなく
    #   問題文や資料の中の位置を指しているので、対象から外す。）
    NUM = re.compile(r'[①-④]\s*(が|は|を|の)?\s*(正しい|正解)|選択肢\s*[1-4１-４]'
                     r'|(?<![★（(])[1-4１-４]\s*(番目|つ目)|[②③④]{2,}')
    skip = {'文の文法2', '文章の文法', '情報検索'}
    bad = []
    for nm in ('vocabQuestions', 'grammarQuestions', 'readingQuestions', 'otherQuestions'):
        for k, v in B.get(nm, {}).items():
            if k in skip:
                continue
            for q in v:
                if NUM.search(q.get('explanation', '')):
                    bad.append((k, q.get('explanation', '')[:40]))
    print('\n【解説の書き方】')
    if bad:
        print(f'  × 解説で選択肢を番号で呼んでいる問が{len(bad)}問（画面では並べ替えられるので通じません）')
        for k, e in bad[:5]:
            print(f'      {k}: {e}')
    else:
        print('  ◯ 解説で選択肢を番号で呼んでいる問はない')

    print('\n【まだ確認していないこと】（公式のCD・冊子を見て kijun.json に書き足すこと）')
    for s in K['_未確認']:
        print('  -', s)
    print()


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else 'N1')
