SNSでカード表示にするための一式（OGP）
====================================

【なにをするものか】

  ページのリンクを LINE・Facebook・X・Discord などに貼ったとき、
  タイトル・説明・画像つきの「カード」で表示されるようにします。

  今までは、貼っても素っ気ない文字列のままでした。
  クリックされるかどうかに直結する部分です。


【入っているファイル】

  ■ 差しかえる HTML（5つ）
    chinese_start.html
    onyomi_cantonese.html
    onyomi_game.html
    cangjie.html
    gomi_rush.html

  ■ 新しく置く画像（5つ・1200×630）
    og_chinese_start.png
    og_onyomi.png
    og_onyomi_game.png
    og_cangjie.png
    og_gomi.png

  ぜんぶ jlpt-practice フォルダの中（htmlと同じ場所）に置いてください。
  画像も同じ場所です。フォルダは作らないでください。
  （タグの中で、同じ場所にある前提でURLを書いています）


【変更点】

  ・5ページに OGP・Twitterカード・canonical のタグを追加
  ・gomi_rush.html のタイトルを直しました
      旧：ゴミ分別ゲーム（試作版）｜ JLPT Practice
      新：ゴミ分別ゲーム｜日本語の部屋
    サイト名が他のページと違っていたので揃えました。


【確認のしかた】

  上げたあと、次のどれかにURLを貼ると確認できます。

  ・Facebook の共有デバッガ
      https://developers.facebook.com/tools/debug/
  ・X（Twitter）の Card Validator
  ・LINE や Discord のトーク欄に貼ってみる（一番早い）

  ※ すでに一度貼ったことのあるURLは、古い情報が残ることがあります。
    上のデバッガで「もう一度取得」すると更新されます。


【まだやっていないこと】

  ・画面に出ている「試作版」のバッジは、そのままにしてあります。
    もう試作の域は越えていると思うので、外すかどうかご判断ください。

  ・sitemap.xml は作っていません。
    サイト全体のページ一覧が必要なので、
    ファイル名の一覧をいただければ作ります。
