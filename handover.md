> 📕 **これは指示書ではなく「詳細リファレンス（辞書・変更履歴）」です。** 指示の入口は唯一の指示書 **`project_instructions.md`**。まずそちらを読み、各ページの細かい仕様・過去の落とし穴を調べたいときにこの文書を引く。

# JLPTクイズサイト 引き継ぎ文書

> **⚠ BJTの問題を作成・増量するときは、必ず `BJT_問題作成ルール.md`（このフォルダ内）に従うこと。**
>
> **⚠ 納品ルール：GitHubにアップロードすべきファイルが2つ以上あるときは、必ず1つのZIPにまとめて渡すこと（1ファイルだけのときはそのまま）。詳細は下記「納品ルール（ZIP）」。**
> 要点：レベルはJ5〜J1まで幅広く／各セクション +20問ずつ追記（既存は消さない）／4択・正解はデータ上 index 0（表示でシャッフル）／やさしい日本語・分かち書きを維持／BJTの出題形式（聴解＝場面把握・表現・総合／読解＝語彙文法・表現・総合）に沿って場面全般をカバー。データは bjt_dokkai.html の `/*<DATA>*/…/*</DATA>*/` と、bjt_choukai_data.js の `window.BJT_CHOUKAI`（聴解は make_bjt_audio.py と単一ソース）。

> ## 【現行版の判断ルール】（2026-07-11 追記）
> このフォルダ（OneDrive / GitHub）には、同名ファイルの**旧コピー**が混在しています。編集・参照のときは次のルールに従ってください。
>
> - **更新日時が新しいものが現行版。** 参照・編集は原則 **root 直下**の新しいファイルを使う。
> - `jlpt-site/`（`learn/`・`play/` を含む）と、古い `games/` 内の重複ファイルは**旧世代の丸ごとコピー**。指定がない限り参照・編集しない。
> - 例：`index.html` は root ／ `games/` ／ `jlpt-site/` の3か所にあるが、現行は **root 直下**（7月付）。同名ファイルが複数あるときは、いちばん更新日時が新しいものを正とする。
> - 編集時は必ず**フルパスを明示**し、書き込む前に確認する。root 以外（`jlpt-site/` 等）は勝手に触らない。
>
> ### 動詞活用ドリル（renshu.html）メモ
> - 変形ドリル `renshu.html`（root 直下）に「教科書＋◯課まで」の範囲しぼり・音声認識・自動採点・効果音・出題起点(辞書形/ます形)あり。
> - 動詞データはファイル冒頭の `VERBS` 配列（みんなの日本語 初級Ⅰ・Ⅱ＝288語）。各語に `group`(1/2/3) と `lesson`（みんなの日本語の課）を持つ。形容詞は `IADJ`/`NAADJ`。
> - **複数教科書対応**：`BOOKS`（minna/tsunagu/genki）で切替。各語の課番号は minna＝`lesson`、他教科書＝`alt:{tsunagu:○, genki:△}`。`lessonOf(w)` が現在の教科書の課を返す。教科書を有効化するには `BOOKS.xxx.ready=true`。
> - **つなぐにほんご**：`VERBS` 配列の直後に `TSUNAGU_LESSON`（既存語 dict→つなぐ課のマップ）と、つなぐ独自動詞97語の `push` がある。第1〜30課・動詞309語対応。課は公式語彙リスト（アスク出版）のます形照合による初出。
> - **げんき（第3版）**：有効。`VERBS` 直後に `GENKI_LESSON`（既存語 dict→げんき課）と独自44語の `push`。会話・文法編 L3〜23・動詞248語。単語さくいん(会Lx)＋Web照合による初出。敬語の不規則ます形（いらっしゃる/おっしゃる/くださる/なさる）と〜ていく複合・ある は活用が崩れるため除外。
> - **形容詞の教科書別課**：形容詞は計103語（い67・な36）。`IADJ`/`NAADJ` の直後に、追加形容詞の `push` と `ADJ_TSUNAGU`/`ADJ_GENKI`（既存36語→課）マップがある。各語は `alt.tsunagu`/`alt.genki` に課を持つ。つなぐ＝公式xlsx（`（な）`表記でな形判定、確定）、げんき＝さくいんOCR（目安・要確認、`adj_checklist.md` 参照）。みんなの形容詞は当初の36語のみ（みんなの語彙索引が未提供のため）。独自動詞のグループは外部照合で検証済み（誤り0件）。
> - **データ確定状況**：つなぐ（動詞・形容詞）＝アスク出版公式xlsx由来で確定。げんき動詞＝公式さくいん(会Lx)＋Web照合で確定寄り。げんき形容詞＝さくいんOCR推定で要確認。みんな＝当方の知識ベースで目安。各チェックリスト（`verb_checklist.md`/`genki_checklist.md`/`adj_checklist.md`）で最終確認可。
> - 課の割り当ては要確認データ。教科書の語彙索引で検証すること（`verb_checklist.md` 参照）。
> - 原本のバックアップ：`renshu_backup_20260711.html`。

## プロジェクト概要
JLPTのN1〜N5対策練習クイズサイト。
GitHub Pages（https://msjpgames.github.io/jlpt-practice/）で公開済み。
スマホ利用者（特に中国在住者）を主対象とする。
Googleフォント削除済み・システムフォント使用（中国対応）。

---

## ファイル構成（GitHubリポジトリ）

```
jlpt-practice/
├── index.html          ← トップページ（N3/N4/N5利用可能、N1/N2準備中）
├── n5_quiz.html        ← N5クイズ（聴解・音声プレイヤー・スクリプト表示機能あり）
├── n4_quiz.html        ← N4クイズ
├── n3_quiz.html        ← N3クイズ
└── audio/              ← N5聴解音声ファイル（MP3形式）
    ├── n5_q1_01.mp3   ← もんだい1・1番
    ├── n5_q1_02.mp3
    ...
    └── n5_q4_06.mp3   ← もんだい4・6番（計24ファイル）
```

---

## 各レベルの問題構成

### N5
- **文字・語彙**：漢字読み・表記・文脈規定・言い換え類義（各20問）
- **文法**：文の文法1・文の文法2・文章の文法（各20問）
- **読解**：内容理解（短文）9問・内容理解（中文）2問・情報検索10問
- **聴解**：もんだい1（課題理解）7問・もんだい2（ポイント理解）6問・もんだい3（発話表現）5問・もんだい4（即時応答）6問　計24問
  - 音声ファイル（MP3）あり
  - スクリプト表示ボタンあり

### N4
- **文字・語彙**：漢字読み・表記・文脈規定・言い換え類義・用法（各20問）
- **文法**：文の文法1・文の文法2・文章の文法（各20問）
- **読解**：内容理解（短文）4問・内容理解（中文）4問・情報検索10問

### N3
- **文字・語彙**：漢字読み・表記・文脈規定・言い換え類義・用法（各20問）
- **文法**：文の文法1・文の文法2・文章の文法（各20問）
- **読解**：内容理解（短文）4問・内容理解（中文）3問・内容理解（長文）4問・情報検索10問

---

## 編集パスワード

**全ページ共通：`msjptest`**（2026-07-19 統一）。JLPT N1〜N5・J.TEST(ac/de/fg)・BJT(読解/聴解/聴読解) の各ページの編集エディタ、および統合編集ページ `edit_all.html` は、すべてこの1つのパスワード。SHA-256ハッシュで照合（平文は保持しない）。旧パスワード（`miurasuehisaJLPTNx` / `miurasuehisaJTEST` / `miurasuehisaBJT`）は廃止。

---

## 主な実装機能

### 共通
- システムフォント使用（Google fonts不使用）
- ダークモード対応
- 問題報告機能（Formspree: https://formspree.io/f/xlgygdzd）
- 編集機能（パスワード認証後、問題の編集・確認済みマーク）
- `actualTotal`グローバル変数で実問題数を動的管理（10問未満サブタイプ対応）
- ルビ機能：N5未出漢字にルビを自動付与（JSのaddRuby関数）

### 情報検索問題のビジュアル
10種類のvisualHTMLを定義（映画館・バス時刻表・スポーツセンター・文化センターなど）。
各問題に`visual`キーを持ち、表示時にHTMLとして描画。

| キー | 内容 | 使用レベル |
|------|------|-----------|
| eiga | 映画館（暗背景・金アクセント） | N5 |
| bus | バス時刻表（緑） | N5 |
| sports | スポーツセンター（青） | N5 |
| midori | みどり市文化センター（公文書・明朝体） | N4 |
| gym | えき前スポーツジム（ダークモダン） | N4 |
| nihongo | みどり日本語教室（紫） | N4 |
| pool | 市民プール（水色） | N4 |
| sakura | さくら日本語学校（赤・桜） | N3 |
| event | 地域センターイベント（オレンジ・秋） | N3 |
| shisetsu | 市民会館会議室（公文書・明朝体） | N3 |

### N5聴解
- 公式形式準拠（もんだい1〜4）
- Voicevoxで生成した音声ファイル（MP3）を使用
- 話者割り当て：
  - 若い女性F → 四国めたん
  - 大人女性・先生F → 春日部つむぎ
  - 若い男性M → 白上虎太郎
  - 大人男性・先生M → 玄野武宏
- スクリプト表示/非表示ボタン
- スクリプト編集ボタン（✎ 編集 → ✓ 保存）

---

## 今後の課題（新チャットで対応予定）

### 最優先
- **各レベルの問題を語彙・文法リストに合わせて修正**
  - N5の問題に「ので」「〜ようになります」などN5範囲外の語彙・文法が含まれている
  - 各レベルで使用できる語彙・文法を正確に確認して修正が必要

### その他
- N4・N3の聴解スクリプト作成（公式形式に準拠）
- N4・N3のVoicevox音声化
- N1・N2の問題作成（後回し）

---

## 技術的な注意事項

### ファイル更新時の注意
- GitHubにアップロード後、ブラウザのキャッシュが残ることがある
- 確認方法：F12 → 更新ボタン右クリック → 「キャッシュの消去とハード再読み込み」
- またはシークレットモード（Ctrl+Shift+N）で確認

### HTMLファイルの更新手順
1. GitHubで既存ファイルを削除
2. 新しいファイルをアップロード
3. シークレットモードで確認

### JS構造上の重要な注意点
- `actualTotal`：グローバル変数でpool実数を管理
- `visualHTML`：IIFEで定義、10種類のキーを持つ
- `addRuby()`：トークン分割方式でルビを付与（重複防止済み）
- `renderChoices()`：try-catchでvisual処理を保護
- 選択肢比較は`btn.dataset.value`で行う（textContent比較はNG）
- `renderQuestion()`で`if (!q) { showResult(); return; }`ガードあり

### Formspree報告機能
エンドポイント：`https://formspree.io/f/xlgygdzd`

---

## 追記：作業メモと落とし穴（2026-07-14）

### 文字化け（mojibake）の予防
- **HTML**：必ず先頭に `<meta charset="UTF-8">`。ファイルはUTF-8で保存する。編集ツールがUTF-8で書き出しているか確認。
- **.bat ファイル**：Windowsの既定は Shift-JIS。日本語を `echo` すると文字化けする。対策は次のどちらか。
  - `echo` の文言を**英語（ASCII）だけ**にする（今回の make_ne_audio.bat / make_bjt_audio.bat はこの方式で解決）。
  - どうしても日本語を出すなら、先頭に `chcp 65001 >nul`（UTF-8化）を入れ、.bat 自体を **UTF-8(BOM付き)** で保存。
  - 日本語を含むパスは `"%~dp0..."` のように**必ずダブルクオートで囲む**。
- **.bat から Python 呼び出し**：`python` がPATHに無い環境が多い。`where py` → `where python` の順で検出して `%PYCMD%` に入れ、`%PYCMD% "%~dp0script.py"` の形で実行する（今回これで「ダブルクリックしても生成されない」を解決）。Python側は出力先を `os.path.join(os.path.dirname(os.path.abspath(__file__)),"audio")` で.bat基準にする。
- **CSV**：Excelで開くなら UTF-8 **BOM付き**にすると文字化けしにくい。

### フォント・字形の描画（かなの成り立ちアニメで判明・重要）
- グリフを **SVGパスに変換して塗る**方式（opentype.js の `getPath` → `<path fill>`）は、一部の筆文字グリフ（例：**武・也・由**）が正しく塗れず、欠ける／真っ黒になる。原因は opentype.js の数値処理が特定の二次ベジェ字形で不安定なこと（座標変換をパスへ焼き込むと悪化）。
  - **対策：字形は「テキスト（埋め込みフォントのサブセット）」で表示する。** ブラウザのテキスト描画は全字正しい。各ページに必要な数文字だけ `@font-face` でサブセット埋め込みすれば軽い（1ページ数KB）。
- `fontTools` の `merge.Merger` は一部グリフを壊すことがある（opentype読み取りは失敗するが、**ブラウザ表示は正常**）。テキスト描画用途なら実害なし。
- `flubber` のモーフ（字→字の変形）は複雑な字形で計算が終わらず実用外。変化の演出は**クロスフェード**で代替した。
- 検証は Playwright（Chromium）でスクショ確認が有効。字形の欠けは目視でしか気づけない。

### OneDrive ↔ GitHub のズレ・二重フォルダ（再掲＋対処）
- OneDrive内の `jlpt-site/`（`learn/`・`play/` 一式）が「**learnフォルダが2つある**」状態の正体。かなの各文字ページ（`learn/hira_*.html`・`kata_*.html`）と五十音表（root直下 `hiragana.html`）が別の場所にあると、リンクが切れる（多くの文字リンクが404だった原因）。
  - **統一方針**：文字ページ一式は `learn/` にそろえ、root直下の `hiragana.html`・`katakana.html` は `learn/…` へ**転送（meta refresh）**する。`play/` も root直下に置く（`../play/…` 参照のため）。
  - `jlpt-site/` は復元に使ったあと `_archive_古いファイル/` へ退避してよい。
- **device_stage_files は編集直後のファイルで“古いキャッシュ”を返すことがある。** `device_list_dir` のサイズは最新なので、サイズ照合で現行版を判断する。

### かな学習ページ（`learn/` フォルダ）2026-07-14 に追加した内容
- 各文字ページに「**成り立ち（なりたち）**」アニメ（発音欄の上）。
  - ひらがな：楷書→行書→草書→今のひらがな（クロスフェード・草書で一旦停止）。字源は あ←安 等の標準対応。
  - カタカナ：漢字の**一部だけをとる（省略）**演出。取る部分は字ごとに指定（例：ウ←宇の上、ア←阿の左）。
- **例語すべてに IPA** を追記（かな→IPA変換ルールで自動生成。促音・長音・撥音・拗音対応）。
- **イ段**に「口蓋化」、**ら行**に「流音」、**い・う**に「母音の無声化」の解説。
- **ん・ン**：撥音の音変化 [m]/[n]/[ŋ]/[ɴ] を実例で説明。「んで始まる語は外国の地名・人名にあり（例：ンジャメナ）」。
- 新ページ：**dakuten.html**（濁音・半濁音）、**yoon.html**（拗音）＝解説＋表（IPA付）＋例語＋例文。五十音表（hiragana.html / katakana.html）下部からリンク。
- 素材：字源データ・かな→IPA変換器・フォントサブセットの生成スクリプトは作業環境側にある（再生成可能）。字源や「取る部分」は標準的な対応を使用（要調整なら個別修正可）。

### 各レベルの隠しリンク・編集/報告（かな以外の既存機能・確認済み）
- JLPT N1〜N5、J.TEST（ac/de/fg）、BJT（読解・聴解）に**編集機能＋報告ボタン**あり。
- パスワード：**全ページ共通 `msjptest`**（2026-07-19 統一。旧レベル別 `miurasuehisa…` は廃止）。
- 統合編集ページ **`edit_all.html`**：全レベル・全種類を1ページで確認・修正（閲覧自由／編集は `msjptest`）。書き出しは各元ファイル形式のまま。「テスト対策」ページ `taisaku.html` のフッターに隠しリンク（✎）あり。
- 編集の書き出しは、ページ自身のソースを取得し `// <DATA> … // </DATA>`（BJT聴解は `window.BJT_CHOUKAI`）を差し替えてダウンロードする方式。

### ⚠ OneDrive/ステージングの「キャッシュのズレ」対策（重要・2026-07-15 追記）
- **症状**：デバイス側ファイルを取り込む（stage）と、ファイル情報上のサイズは新しいのに、**実際に読める中身が古い版**になることがある。`bjt_dokkai.html` で発生（サイズは174→234前の174問版を示すのに、中身は114問版しか読めなかった）。同じ mtime のままだと再ステージしても更新されない。
- **見分け方**：`device_list_dir` の **size は新しい（信頼できる）**。取り込んだファイルの**実バイト数が size と食い違う**ときはキャッシュが古い。必ず「実バイト数 vs 一覧の size」を突き合わせる。
- **回避策（確実）**：ユーザーに、対象ファイルを**別名でコピー**してもらう（例：エクスプローラーで `Ctrl+C`→`Ctrl+V`＝「〜 - コピー.html」）。**新しいパスはキャッシュされていないので正しい最新中身が読める**。そのコピーを基に編集し、元ファイル名で書き戻す。コピーは後で削除。
- **原則**：BJTのように「既存に追記」する作業では、**上書き前に必ず現在の実データを確認**する（問題数など）。確認できないまま古い版に追記して上書きすると、前回分を失う。ユーザーにサイト上の「計◯◯問」表示を聞くのも有効。

### BJT 問題数の最新（2026-07-15 時点・OneDrive反映済み）
- **第3部 読解 `bjt_dokkai.html`**：**234問**（語彙・文法90／表現読解80／総合読解64）。音声なし。
- **第1部 聴解 `bjt_choukai_data.js`**：**84問**（場面をつかむ28／発言を聞き取る28／会話・説明を聞く28）。音声は `make_bjt_audio.py`（`audio/bjt_<id>.mp3`）。
- **第2部 聴読解 `bjt_choudokkai.html` ＋ `bjt_choudokkai_data.js`（新規）**：**25問**（状況をつかむ5／資料を見て聞く10／総合的に聞く10）。各問に視覚資料（メール・表・時刻表・地図・棒グラフ・座席図などをHTML/SVGで描画）。選択肢は文字。音声は **`make_choudokkai_audio.py`（`audio/cd_<id>.mp3`）**。`bjt.html` ハブに第2部リンクを追加済み。
- **聴解・聴読解を増やしたら**、PCで該当の `make_*_audio.bat` を回して mp3 を生成し、`audio` フォルダごとGitHubへ上げる。第3部読解は音声不要。

### 納品ルール（ZIP）2026-07-16 追記（Henrique指示）
- **GitHubにアップロードすべきファイルが2つ以上あるときは、必ず1つのZIPにまとめて渡す。** 1ファイルだけのときはZIP不要。
- ZIP名は内容が分かる名前にする（例：`korean_update.zip`、`bjt_update.zip`）。中身はGitHubのフォルダ構成そのままの相対パスにする（フォルダ階層があるときはそれも保つ）。
- OneDriveへの反映（device_commit_files）はこれまで通り各ファイルを個別に行い、**ユーザーに渡すのはZIP**、という運用でよい（ユーザーはZIPを解凍してGitHubに上げる）。
- 個別ファイルも見たい場合に備え、ZIPと一緒に主要ファイルを個別に渡してもよいが、基本は「複数＝ZIP」。

---

## 追記：外国語（多言語）学習セクション（2026-07-16）

### 概要
- 日本語以外の言語を学ぶ「外国語」セクション。一覧 `gaikokugo.html` → 個別ページ `lang.html?code=XX`。
- スマホ前提・自己完結HTML・共通デザイントークン（`--bg:#F7F5F0; --surface:#FFFFFF; --border:#E2DDD6; --text:#1C1C1C; --text-muted:#6B6560; --text-hint:#9E9890; --radius:14px`、`--accent` は言語ごと）。
- 音声はすべて端末のTTS（`SpeechSynthesis`）。各言語の `tts` コード（例 zh-CN, ko-KR, ar-SA, ru-RU）で読み上げる。`[data-say]` 属性＋IIFEの単一クリックリスナー方式。

### データは3ファイル（それぞれ担当ページが読む）
1. **`langdata.js`** … `window.LANGS`（配列）。1言語＝1オブジェクト。`lang.html`（個別）と `gaikokugo.html`（一覧）が読む。**ここに1件足すだけで両方に自動反映**。
   - 主なフィールド：`code, jp, autonym, en, chip, region, script, family, order, tts, accent, bg, note, phrases[[日本語,表記,カナ]], numbers[[表記,カナ]], selfintro[[日本語,表記,カナ]], tips[]`。
   - 任意：`grammar / grammarTitle / grammarDesc`（文法ページへのリンク）、`extras:[{href,title,desc}]`（解説ページへのリンク）、`group`（例「漢語」）、`core / resident / learner / sov`（一覧フィルタ用）、`resRank / learnRank`。
2. **`chardata.js`** … `window.CHARS[code] = {type, intro, chars:[[文字,読み], ...]}`。`moji.html?code=XX`（なぞり書き）が読む。ラテン文字言語は共通の `LATIN` を使い、必要なら特殊文字を `concat` する。
3. **`grammardata.js`** … `window.GRAMMAR[code] = {code, test, testFull, note, src, levels:[...]}`。`grammar.html?code=XX` が読む。CEFR言語は6レベル（A1〜C2）×各12項目。各項目は `{p, py, ja, ex, epy, ej, note}`（**ex＝対象言語の例文＝TTSで読み上げる**、epy＝読み、ej＝和訳、note＝一言補足）。

### `extras` 機構（解説ページの接続）
- langdata の各言語に `extras:[{href,title,desc}]` を足すと、`lang.html` が文法リンクの後に **CTAリンク（.moji-cta）** として描画する。
- 声調・発音・文字・語形成などの「読み物」ページはこれで接続。解説ページ側は自己完結HTML＋`lang.html?code=XX` への戻りリンク＋`[data-say]` 音声ボタン（IIFEの `speak()`）＋言語ごとの accent 色。
- これまで作った解説ページ：
  - 声調：`zh_tones`(四声)／`yue_tones`(6声)／`vi_tones`(6声)／`th_tones`(5声)
  - 発音：`en_pronunciation`／`es_pronunciation`／`pt_pronunciation`(鼻母音)／`fr_nasal`(鼻母音・リエゾン)
  - 文字：`hi_writing`(デーヴァナーガリー)／`ar_script`(アラビア文字・右書き)／`ru_cyrillic`(キリル文字・硬音/軟音)
  - 語形成：`id_grammar`(接辞・畳語)
  - 韓国語：`korean_consonants`(平音/激音/濃音)／`korean_keigo`(待遇表現)

### 新しい言語を「丸ごと」追加する手順
1. `langdata.js` に LANGS エントリを追加（あいさつ・数字・自己紹介・tips まで）。→ 個別ページと一覧が自動生成。`gaikokugo.html` は「すべて」フィルタで全件表示するので自動的に出る。
2. `chardata.js` に CHARS エントリを追加（なぞり書き用）。**`lang.html` は文字ページ(moji)リンクを常に出す**ので、CHARSが無いと moji が「言語がありません」になる。必ず足す。
3. 文法ページも要るなら `grammardata.js` に GRAMMAR エントリを追加し、langdata に `grammar:'grammar.html?code=XX'` を足す。**文法データが無いうちは langdata の `grammar` フィールドを付けない**（文法リンクは条件付き表示なので、付けなければ出ない＝リンク切れ防止。moji リンクは常に出るので CHARS だけは必須）。
4. 3ファイルとも「複数＝ZIP」ルールでまとめて渡す。OneDrive へは個別コミット。

### 実績（2026-07-16 追加）
- **アラビア語(ar)**：accent `#2E7D64`、tts `ar-SA`。文字解説 `ar_script.html`、なぞり書き（アラビア文字28字）、文法 A1〜C2×12。
- **ロシア語(ru)**：accent `#B0303A`、tts `ru-RU`。文字解説 `ru_cyrillic.html`、なぞり書き（キリル文字33字）、文法 A1〜C2×12。
- フランス語(fr) に `fr_nasal.html`（鼻母音・リエゾン）を接続。
- 外国語一覧はこの時点で計23カード（`gaikokugo.html` の「すべて」）。文法データ（`grammardata.js`）を持つのは22言語。
- 単語ゲーム `gaikokugo_game.html`（langdata から出題・多言語・`games.html` から入口）も稼働。

### `grammardata.js` の安全な編集法
- 中身は1つの巨大な `window.GRAMMAR = {..JSON..};`。手で文字列編集すると壊しやすい。
- **推奨**：Node で `global.window={}; require('./grammardata.js')` して読み込み → `window.GRAMMAR.<code> = {...}` でキー追加 → `'window.GRAMMAR = ' + JSON.stringify(G) + ';'` で書き戻す。全既存データを保ったまま追加できる（整形は消えてファイルは縮むが、機能は同じ）。書き戻し後にレベル数・各12項目を検証する。

### Playwright 検証（外国語ページ）
- Chromium：`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`。ESM は `/home/claude/node_modules/playwright/index.mjs`。
- `file://` で各ページを開き、**`pageerror` だけ**を見る（単体で開くと共有アセットの `ERR_FILE_NOT_FOUND` が出るが無害なので除外）。確認項目：`lang.html?code=XX` に extras/grammar のCTAが出るか、`moji.html?code=XX` の字数、`grammar.html?code=XX` の項目数(72)とタブ絞り込み、`gaikokugo.html` に新言語カードが出るか、`langdata.js`/`chardata.js`/`grammardata.js` がパースできるか。

### 敬語AIロールプレイ・会話練習（既存・参考）
- `keigo.html`（敬語ハブ）→ `keigo_business.html`（ビジネス敬語）／`keigo_kaiwa.html`（4択クイズ）／`keigo_roleplay.html`（AIロールプレイ）。文法ハブ `bunpou.html` は〈活用〉(`katsuyo.html`/`renshu.html`)と〈文型・表現〉(`bunkei.html`/`keigo.html`/`hinshi.html`)に整理済み。
- `keigo_roleplay.html` と `kaiwa.html` は **Gemini の無料APIキー（BYO）方式**。キーは学習者が入力し `localStorage('gemini_key')` に保存、Google 以外へは送らない（HTMLソースに鍵は入れない）。カテゴリ→場面の2段選択、細かい設定プルダウン、課題の合否審査つき。キーの取り方は `無料Geminiキーの取り方ガイド.md/.pdf`。

### プロジェクト運用（2026-07-16〜）
- 本サイトの保守は Claude の「プロジェクト」で継続する方針。共有前提（本 handover の要点・標準ルール）はプロジェクトのカスタム指示／ナレッジに置き、作業はテーマごとに別チャットで進める。
- **真実の元（source of truth）は OneDrive のまま**。プロジェクトにアップした資料はスナップショットなので、実ファイルは毎回 OneDrive から最新をステージングして作業する。

---

## 追記：ハブ名の巻き戻り 再発防止（2026-07-16）

> **事象**：「日本語を学ぶ」(`manabu.html`) 内のリンク名と、文法ハブ `bunpou.html` のタイトル・見出しが、正しい「**文法と表現を学ぶ**」から旧名「文法を学ぶ」に巻き戻っていた（本文の 活用／文型・表現 の構成自体は生きていた）。公開GitHub版＝OneDrive実ファイルで一致していたので、同期ズレではなく**実ファイル自体の巻き戻り**。OneDrive内の別コピーが原因ではなかった（`bunpou.html`/`manabu.html` の重複は root 直下のみ、`games/`・`_archive_古いファイル/`・`jlpt-site/` には無い）。

### 正準状態（この名前・リンクが「正」。旧名に戻っていたら直す）
- **`bunpou.html`**：`<title>` と `.app-title` は **「文法と表現を学ぶ」**（旧「文法を学ぶ」／さらに旧「文法」は誤り）。`.app-sub`＝「活用と文型・表現・品詞・ビジネス日本語 ・ Grammar」。構成は〈活用〉(`katsuyo.html`/`renshu.html`)＋〈文型・表現〉(`bunkei.html`/`keigo.html`/`hinshi.html`/**`bijinesu_hyougen.html`**)。
- **`manabu.html`**：`bunpou.html` へのリンクの `entry-title` は **「文法と表現を学ぶ」**、`entry-sub`＝「活用（確認・ドリル）と、文型・敬語・品詞・ビジネス日本語」。
- **`bijinesu_hyougen.html`**（新規：ビジネス日本語 場面別 語彙・表現集、端末TTS＝[data-say]付き。8点のPDF由来）：戻るリンクは `bunpou.html`（「‹ 文法と表現を学ぶにもどる」）。「文法と表現を学ぶ」配下に置く。

### 巻き戻りの原因になりうるもの／防止策
- **旧`*_top.html` を昇格・再アップロードしない**：`bunpou_top.html`（見出し「文法」だけの旧版）と `bunkei_top.html` は **2026-07-16 に `_archive_古いファイル/` へ退避済み**。現行ハブは `bunpou.html`／`bunkei.html`。これらを現行名で上書きアップロードしないこと。
- **孤立した旧ページ（現行から未リンク）**：`hyougen.html`／`kihon_bunkei.html`／`hinshi_top.html`／`moji_top.html` は、退避された旧ハブ `bunpou_top.html` からしか辿れない孤立ページ（現行の `index`／`manabu`／`bunpou`／`bunkei` 等からはリンクなし）。よって旧`*_top`退避で**現行の到達可能なリンクは切れていない**。これら4つも整理として退避してよい（中身はアーカイブに残る）。デバイスブリッジは移動・削除ができないため、退避はエクスプローラーで手動。
- **ステージング・キャッシュずれで旧版を書き戻さない**：編集前に「取り込んだ実バイト数 vs `device_list_dir` の size」を必ず突き合わせる（既出ルール）。**ハブ系（manabu/bunpou/bunkei 等）を編集したら、書き戻し後にタイトル文字列を必ず再確認**する。
- **アップロード源に注意**：GitHub に上げるのは必ず最新版（作業チャットで配布したZIP等）。古いローカルDownloadやCamScannerの旧HTMLを上げない。

### アップロード後の検証チェック
- 公開URL `…/bunpou.html`・`…/manabu.html` を開き、名前が **「文法と表現を学ぶ」** になっていること、`bunpou.html` に「**ビジネス日本語を見る**」項目（→`bijinesu_hyougen.html`）が出ることを確認。
- **GitHub のコミット履歴が復元ポイント**（万一また巻き戻ったら、正しいコミットへ戻す／このメモの正準状態に合わせて直す）。
