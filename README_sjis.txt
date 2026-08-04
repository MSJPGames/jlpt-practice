「日本語の部屋」更新ファイル（2026-08-03）
==========================================

この3つのファイルを、OneDrive の JLPT PRACTICE フォルダに
そのまま上書きコピーしてください（すべてルート直下です）。

  langdata.js
  games.html
  hajimete.html

※ すでに Cowork から OneDrive に書き戻しずみです。
　 これは念のための控え（同じ中身）です。


何を直したか
------------

1) langdata.js
   注音符号のページ（zhuyin.html）が、どこからもリンクされて
   いない状態になっていました。台湾華語（zhtw）と台湾語（nan）の
   extras の先頭にリンクを戻しました。
     zhtw → zhuyin.html
     nan  → zhuyin.html?from=nan
   zhuyin.html 側は元から ?from=nan で「もどる」先を切り替える
   作りになっているので、ページ側の修正は不要でした。

2) games.html
   なぞり書き（nazori.html）も、どこからもリンクされていません
   でした。「道案内ゲーム」の下にカードを追加しました。
   CSS に .hero-nazori（ブルー #3D6FA8 / #27486E）を新設しています。

3) hajimete.html
   「発音・発声」のリンク先が learn/hatsuon_renshu.html でしたが、
   このファイルは存在しません（リンク切れ）。
   learn/hatsuon.html に向け直しました。
   あわせて 6言語（ja/en/zh/vi/pt/tl）の説明文を、実際のページの
   中身に合わせて書き換えています。
     旧「お手本を聞き、自分の声を録音して聞き比べられます。」
     新「口の形、リズム、アクセント、方言まで。図と例で確認できます。」
   learn/hatsuon.html は解説ページで録音機能はありません。
   今後「録音して聞き比べ」のページを作るなら、
   learn/hatsuon_renshu.html という名前にすれば説明文を戻すだけで
   済みます。


このあとやること
----------------

1. 上書きコピー（すでに書き戻しずみなら不要）
2. sitemap を作り直す
     cd "OneDrive\JLPT PRACTICE"
     python make_sitemap.py
3. GitHub に上げる
     langdata.js / games.html / hajimete.html / sitemap.xml


手作業でお願いしたいこと（Cowork からはできません）
--------------------------------------------------

次の2ファイルを _archive_古いファイル\ に移してください。
どちらも新版に置きかわった旧版で、サイト内リンクは0件です。

  zh_grammar.html    → 後継は grammar.html?code=zh
  gomi_bunbetsu.html → 後継は gomi_rush.html
                       （外部データ gomi_data.js・2モード・難易度3段階）

移したあと make_sitemap.py を走らせれば、sitemap から自動で消えます。
移したくない場合は、make_sitemap.py の EXCLUDE に足すだけでも
検索エンジンには出なくなります。


まだ残っている宿題
------------------

・kyoin_yogo_* 108件のうち39件が、ナビからたどれません。
・learn/hiragana.html、learn/katakana.html、learn/hira_a.html に
  旧 play/ フォルダへのリンクが残っています。play/ を消すときは
  ここも直す必要があります。
