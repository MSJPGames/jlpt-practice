これ1つで最新版になります（まとめ版）
========================================

  今までお渡ししたZipには、同じファイルが何度も入っていました。
  古い版で上書きしてしまう事故を防ぐため、
  すべての最終版をこの1つにまとめました。

  ★ 前のZipは、もう使わないでください。
    これだけを使えば正しい状態になります。


────────────────────────────────────────
【1】アップロードする
────────────────────────────────────────

  この中の28ファイルを、すべて
  jlpt-practice フォルダの中（他のhtmlと同じ場所）に置きます。
  同じ名前のファイルは上書きしてください。
  フォルダは作らないでください。画像もhtmlと同じ場所です。

  ■ 差しかわるもの（3）
      index.html          入口カードを1つ追加、更新履歴を1件追加
      gaikokugo.html      読みものカードを1つ追加
      langdata.js         中国語系4言語に新ページを登録

  ■ 新しいページ（9）
      chinese_start.html      用中文底子學日文（入口）
      chinese_katakana.html   片假名
      chinese_doushi.html     動詞變化
      chinese_bunkei.html     各動詞形の使い道
      chinese_joshi.html      助詞
      chinese_keigo.html      敬語
      onyomi_cantonese.html   廣東話で音読み（解説）
      onyomi_game.html        音読みゲーム
      cangjie.html            倉頡字根

  ■ ゲームのデータと編集ページ（5）
      onyomi_data.js      音読みゲームのデータ
      onyomi_edit.html    その編集ページ（自分用）
      gomi_rush.html      ゴミ分別ゲーム（OGP追加・題名修正）
      gomi_data.js        そのデータ
      gomi_edit.html      その編集ページ（自分用）

  ■ SNS用のカード画像（10）
      og_chinese_start.png / og_katakana.png / og_doushi.png
      og_bunkei.png / og_joshi.png / og_keigo.png
      og_onyomi.png / og_onyomi_game.png / og_cangjie.png / og_gomi.png

  ■ 検索用（1）
      sitemap.xml         サイト全体のページ一覧（122件）


────────────────────────────────────────
【2】上げたあと、3つだけ確認する
────────────────────────────────────────

  ① トップページに「🈶 用中文底子學日文」のカードが出るか
     → 出たら、そこを押して入口ページに飛べるか

  ② 入口ページの下のほうに、リンクが12個並んでいるか

  ③ ゴミ分別ゲームで「街をえらぶ」を押して、
     東京・大阪などのカードが並ぶか
     （並ばなければ gomi_data.js が入っていません）

  うまく出ないときは Ctrl+F5（Macは Cmd+Shift+R）を一度。


────────────────────────────────────────
【3】Google Search Console に登録する
────────────────────────────────────────

  ここまでが「作る」作業、ここからが「見つけてもらう」作業です。
  15分ほどで終わります。

  1. https://search.google.com/search-console を開いてログイン

  2. 「プロパティを追加」→「URL プレフィックス」を選び
         https://msjpgames.github.io/jlpt-practice/
     と入力

  3. 所有権の確認 →「HTMLタグ」を選ぶと、
     こういうタグが表示されます：

         <meta name="google-site-verification" content="……" />

     ★ このタグをコピーして、こちらに送ってください。
       index.html に貼った状態でお返しします。
       （中身はあなた専用の文字列なので、こちらでは作れません）

  4. 貼った index.html を上げてから「確認」を押す

  5. 確認できたら、左メニュー「サイトマップ」を開き
         sitemap.xml
     と入力して送信


────────────────────────────────────────
【4】そのあと
────────────────────────────────────────

  データが出るまで数日〜数週間かかります。
  すぐには何も起きないので、しばらく放っておいて構いません。

  次にやることがあるとすれば、
  実際に人がいる場所（香港の日本語学習者が集まるところ）に
  出すことです。そこは準備ができたときに。


────────────────────────────────────────
【補足】robots.txt について
────────────────────────────────────────

  今回は入れていません。
  GitHub Pages では robots.txt をドメインの一番上
  （msjpgames.github.io/robots.txt）に置かないと読まれず、
  jlpt-practice フォルダの中では無視されるためです。

  sitemap は Search Console から直接送れるので、
  robots.txt は無くても困りません。

  管理用ページを検索に載せない対策としては、
  ページに noindex を入れる方法が確実です。
  gomi_edit.html と onyomi_edit.html には入っています。
  edit_all.html にも入れておくと安全です。

      <head> の中に
      <meta name="robots" content="noindex,nofollow">
