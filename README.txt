英語も大阪市の公式表記に（4言語目）＋修正2件
========================================

【入っているファイル】

  gomi_data.js    英語89件を差しかえ ＋ 修正
  gomi_rush.html  出典シート
  gomi_check.js   データ検査（手元用・サイトには置かない）
  claude_公的情報の定期確認メモ.md   更新版

  ★ これまでの gomi 関連 zip はすべて不要です。
    このzipの gomi_data.js と gomi_rush.html だけで最新になります。


【英語を優先した理由】

  英語は他の全言語のフォールバック先です。
  ある言語の訳が無いとき、ゲームは英語を表示します。
  つまり英語が正しくないと、未整備の言語すべてに影響します。


【英語で直った主なもの】

  普通ごみ    Regular garbage    → Household waste
  資源ごみ    Recyclables        → Recyclable waste
  古紙・衣類  Paper and cloth    → Used paper and clothing
  生ごみ      Food scraps        → Kitchen garbage and food scraps
  空き缶      Aluminium cans     → Used cans
  乾電池      Used dry-cell battery → Dry cell batteries
  蛍光灯      Burnt-out fluorescent tube → Fluorescent lamps
  新聞        Newspaper          → Newspaper and ad inserts
  紙おむつ    Used diaper        → Disposable diapers

  安全の説明4本も大阪市の公式文に。


【掲示のことばに公式表記が見つかりました】

  先ほど私が推測で英語を入れた10語のうち、
  大阪市の資料に実際の表記がありました。

     収集日   → Collection date
     粗大ごみ → Bulky waste
     手数料   → Disposal charge
     不用品   → 不用品 (Unwanted item)   ← 公式
     キケン   → キケン (Danger)           ← 公式

  推測を公式表記に置きかえました。


【★ 修正が2件出ました】

  ■ 1. 検査ファイルが2つに分裂していた

     check_gomi.js と gomi_check.js の2つがあり、
     片方に足した検査がもう片方に無い状態でした。
     同じものに2つ名前を付けた私の不注意です。
     gomi_check.js に統合し、もう片方は削除しました。

  ■ 2. ポルトガル語で別区分が同じ訳になっていた

     「古紙・衣類」と「紙・布」が どちらも Papéis e tecidos。
     別の都市で使う別区分なので訳し分けが必要でした。
       古紙・衣類 → Papéis usados e roupas
       紙・布     → Papéis e tecidos

     なお同種の「同じ訳」46件のうち45件は同義語
     （可燃／燃える／燃やせる／普通ごみ など）で、
     同じ訳が正しいものです。検査が同義語を区別するようにしました。


【いまの状態】

  CC BY 4.0 の裏付けあり（4言語）
    英語・韓国語・ベトナム語・ネパール語

  まだ規約未確認の自治体由来（5言語）
    簡体中文・ポルトガル語・タガログ語・スペイン語・インドネシア語

  大阪市には簡体中文版もあります。
  ポルトガル語は浜松市（CC BY 2.1）が候補です。


【検証】

  gomi_check.js  ✔問題なし
  6言語×5都市×3難易度で文字切れ 0
  pageerror 0
