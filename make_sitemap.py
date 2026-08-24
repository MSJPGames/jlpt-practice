# -*- coding: utf-8 -*-
"""sitemap.xml を作り直す（PC で実行）

    cd "OneDrive\\JLPT PRACTICE"
    python make_sitemap.py

- 実ファイルの更新日時から <lastmod> を入れる（Asia/Shanghai, UTC+8 の日付）。
- 対象：ルート直下の *.html ＋ learn/*.html ＋ bunkei/*.html
- voz/ は個人用の練習ページ。SUBDIRS に入っていないので出力されない。**足さないこと。**
      ＋ langdata.js から作る多言語のクエリ付きURL（lang / grammar / goi）
- 下の EXCLUDE に入っているものは出力しない。
- 既存の sitemap.xml は sitemap_backup.xml に退避してから上書きする。

新しいページを足したら、これを実行して sitemap.xml を GitHub に上げるだけでよい。
"""
import os, re, shutil, datetime

BASE = 'https://msjpgames.github.io/jlpt-practice/'
TZ   = datetime.timezone(datetime.timedelta(hours=8))   # Asia/Shanghai

# 出力しないページ ------------------------------------------------------------
EXCLUDE = {
    'index.html',                                            # → / として出力
    # 編集・開発用
    'edit_all.html', 'listening_check.html', 'n1_vocab_preview.html',
    'gomi_edit.html', 'bousai_edit.html', 'onyomi_edit.html',
    # 作業用の別版
    'bunkei_final.html', 'onomatope_final.html',
    # learn/ へのリダイレクト
    'hiragana.html', 'katakana.html',
    # 未リンクの重複（現行は learn/hatsuon.html と bunkei/nitsuite.html）
    'hatsuon.html', 'nitsuite.html',
    # 授業用（教科書内容を含むので公開しない）
    'kaiwa_class.html',
    # ?code= を付けて出すので素のページは出さない
    'lang.html', 'grammar.html', 'goi.html',
    # 配布zipに入れた作業メモ（サイトの一部ではない）
    'README.html',
    # 個人用のスペイン語練習ページ（voz/voz.html への転送）。noindex・どこからもリンクしない
    'es_voz.html',
}
EXCLUDE_PREFIX = ('会話練習_',)          # 会話ログの書き出し
EXCLUDE_DIRS   = {'play', 'games', '_archive_古いファイル', '_企画メモ',
                  'audio', 'audio_backup', 'onomatope_img', '.obsidian',
                  'J.TEST', 'ビジネス', 'N1資料', 'N2資料', 'N3資料', 'N4資料', 'N5資料',
                  '_generator',
                  'voz',           # 個人用のスペイン語練習ページ。SUBDIRS に足さないこと
                  '語学', '_テンプレート'}   # サイトの一部ではない
SUBDIRS = ('learn', 'bunkei')            # ルート以外で出力するフォルダ


def lastmod(path):
    ts = os.path.getmtime(path)
    return datetime.datetime.fromtimestamp(ts, TZ).strftime('%Y-%m-%d')


def collect():
    urls = []                                   # (パス, lastmod)
    if os.path.exists('index.html'):
        urls.append(('', lastmod('index.html')))

    for f in sorted(os.listdir('.')):
        if not f.endswith('.html') or f in EXCLUDE: continue
        if f.startswith(EXCLUDE_PREFIX): continue
        if not os.path.isfile(f): continue
        urls.append((f, lastmod(f)))

    # 多言語のクエリ付きURL（langdata.js から）
    if os.path.exists('langdata.js'):
        lj = open('langdata.js', encoding='utf-8').read()
        ljdate = lastmod('langdata.js')
        for code in re.findall(r"\{\s*\n?\s*code *: *'([a-z]+)'", lj):
            urls.append(('lang.html?code=%s' % code, ljdate))
        gdate = lastmod('grammar.html') if os.path.exists('grammar.html') else ljdate
        for g in sorted(set(re.findall(r"grammar *: *'(grammar\.html\?code=[a-z]+)'", lj))):
            urls.append((g, gdate))
        godate = lastmod('goi.html') if os.path.exists('goi.html') else ljdate
        for g in sorted(set(re.findall(r"href *: *'(goi\.html\?code=[a-z]+)'", lj))):
            urls.append((g, godate))

    for d in SUBDIRS:
        if not os.path.isdir(d) or d in EXCLUDE_DIRS: continue
        for f in sorted(os.listdir(d)):
            if f.endswith('.html') and os.path.isfile(os.path.join(d, f)):
                urls.append(('%s/%s' % (d, f), lastmod(os.path.join(d, f))))

    # 重複除去（先に出たほうを残す）
    seen, out = set(), []
    for p, m in urls:
        if p in seen: continue
        seen.add(p); out.append((p, m))
    return out


def main():
    urls = collect()
    body = '\n'.join(
        '  <url>\n    <loc>%s%s</loc>\n    <lastmod>%s</lastmod>\n  </url>' % (BASE, p, m)
        for p, m in urls)
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           + body + '\n</urlset>\n')

    if os.path.exists('sitemap.xml'):
        shutil.copy2('sitemap.xml', 'sitemap_backup.xml')
        old = len(re.findall(r'<loc>', open('sitemap.xml', encoding='utf-8').read()))
        print('旧 sitemap.xml を sitemap_backup.xml に退避しました（%d URL）' % old)

    open('sitemap.xml', 'w', encoding='utf-8', newline='\n').write(xml)
    print('sitemap.xml を書き出しました：%d URL' % len(urls))

    n = {'ルート': 0, 'learn/': 0, 'bunkei/': 0, 'クエリ付き': 0}
    for p, _ in urls:
        k = ('bunkei/' if p.startswith('bunkei/') else
             'learn/'  if p.startswith('learn/')  else
             'クエリ付き' if '?' in p else 'ルート')
        n[k] += 1
    print('  内訳：' + ' / '.join('%s %d' % (k, v) for k, v in n.items()))
    print('\nこのあと sitemap.xml を GitHub に上げ、Search Console で再送信してください。')


if __name__ == '__main__':
    main()
