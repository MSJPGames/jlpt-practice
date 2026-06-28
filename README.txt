JLPT Practice — ファイル構成

[ルート]
  index.html ... 入口。JLPTレベル選択に加え、「あそぶ（ゲーム）」「まなぶ（解説）」への入口バナー。
  ※ 既存の n5_quiz.html / n4_quiz.html / n3_quiz.html もこのルートに置いてください（zip未収録）。

[play/] 遊び
  games.html / kana_rush.html / katakana_rush.html
  ※ 各ラッシュの結果画面に「もっとくわしく学ぶ」→ learn/ への導線あり。

[learn/] 解説
  hiragana.html / katakana.html（五十音表・各マスが個別ページにリンク）
  hira_*.html (46) / kata_*.html (46)（書き順アニメ等）

公開：既存のGitHubリポジトリに中身を追加（index.htmlは上書き）し、commit & push。
フォルダ間リンクは調整済みです。
筆順データ：KanjiVG (https://kanjivg.tagaini.net) CC BY-SA 3.0
