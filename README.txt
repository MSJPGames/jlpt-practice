Search Console 確認用（index.html だけ差しかえ）
========================================

【入っているファイル】

  index.html    確認タグを貼ったもの（これを上書き）
  sitemap.xml   念のため同梱（もう上げてあるなら不要）


【貼った場所】

  <head> の中、<title> の直前に1行入れました。

      <meta name="google-site-verification"
            content="AsWuV7hfxUBOIb2mOSGi7zNbryGNf8tILxyx6jlsxWk" />

  ほかは何も変えていません。
  （入口カード5つ、更新履歴、すべてそのままです）


【手順】

  1. この index.html を jlpt-practice フォルダに上書きアップロード

  2. 1〜2分待つ
     （GitHub Pages は反映に少し時間がかかります）

  3. ブラウザで
        https://msjpgames.github.io/jlpt-practice/
     を開き、Ctrl+F5（Macは Cmd+Shift+R）で強制再読みこみ

  4. Search Console の画面に戻って「確認」を押す

     → 「所有権を確認しました」と出れば成功です


【うまくいかないとき】

  ・「確認できませんでした」と出たら、
    まだ反映されていない可能性が高いです。
    2〜3分おいて、もう一度「確認」を押してください。

  ・それでも駄目なら、ページ上で右クリック →
    「ページのソースを表示」で
    google-site-verification の行があるか見てください。
    無ければ、アップロードが反映されていません。

  ・タグは確認後も消さないでください。
    消すと所有権が外れます。


【確認できたら】

  左メニューの「サイトマップ」を開いて

        sitemap.xml

  と入力して送信してください。これで登録は完了です。

  データが出るまで数日〜数週間かかります。
  最初は「データがありません」と表示されますが、正常です。
