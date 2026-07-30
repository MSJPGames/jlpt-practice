/* bousai_data.js — 防災ゲームのデータ
 * このファイルだけを編集すれば、ゲーム本体（bousai_game.html）は触らずに直せます。
 *
 * ★内容は命に関わるので、出典を明記しておく：
 *   ・警戒レベル（1〜5）と避難情報の名称：内閣府／政府広報オンライン
 *     レベル3「高齢者等避難」、レベル4「避難指示」、レベル5「緊急安全確保」
 *     ※2021年5月の災害対策基本法改正で「避難勧告」は廃止され「避難指示」に一本化
 *   ・新しい防災気象情報（2026年5月29日運用開始／気象庁）
 *     情報名称の前に警戒レベルの数字が付く。レベル4相当の「危険警報」が新設。
 *     例：レベル4大雨危険警報／レベル4土砂災害危険警報／レベル4高潮危険警報
 *         レベル5大雨特別警報
 *     ※河川氾濫・大雨・土砂災害・高潮 以外はレベル表記なし
 *   ・災害用伝言ダイヤル 171（NTT）
 *
 * danger:true … まちがえると命に関わるもの。ゲームで強い警告を出す。
 * lv    1=まずこれだけ  2=つぎに  3=くわしく
 */

const CATS = {
  quake: { label:"じしん",        ja:"地震",        en:"Earthquake",  emoji:"🏚️", color:"q" },
  rain:  { label:"おおあめ・たいふう", ja:"大雨・台風", en:"Heavy rain / Typhoon", emoji:"🌀", color:"r" },
  evac:  { label:"ひなん",        ja:"避難",        en:"Evacuation",  emoji:"🏃", color:"e" },
  prep:  { label:"そなえ",        ja:"備え",        en:"Preparation", emoji:"🎒", color:"p" }
};

/* 警戒レベル（2026年5月29日からの新しい名称を併記） */
const LEVELS = [
{ n:1, name:"早期注意情報", easy:"気をつけはじめる",
  who:"気象庁", act:"天気予報を見る。心の準備をする。",
  jma:"", color:"#3E6B2F" },
{ n:2, name:"大雨注意報・洪水注意報", easy:"じゅんびを かくにん",
  who:"気象庁", act:"ハザードマップで、自分の家が危ないかを見ておく。",
  jma:"レベル2大雨注意報", color:"#8A6D00" },
{ n:3, name:"高齢者等避難", easy:"お年より・体の不自由な人は にげる",
  who:"市町村", act:"高齢の人、障害のある人、その支援者は避難する。ほかの人も準備する。",
  jma:"レベル3大雨警報", color:"#B5541F" },
{ n:4, name:"避難指示", easy:"みんな にげる",
  who:"市町村", act:"危険な場所にいる人は全員、すぐ避難する。ここが一番大事。",
  jma:"レベル4大雨危険警報／レベル4土砂災害危険警報／レベル4高潮危険警報",
  color:"#A0392E", key:true },
{ n:5, name:"緊急安全確保", easy:"もう にげられない。いのちを まもる",
  who:"市町村", act:"すでに災害が起きている。移動が危ないなら、家の上の階など、その場で少しでも安全な場所へ。",
  jma:"レベル5大雨特別警報", color:"#6B1E14" }
];

/* 出題。q=問い（やさしい日本語）／opts=選択肢／a=正解の番号／why=解説 */
const QS = [

/* ── 地震 ───────────────────────────────────── */
{c:"quake", lv:1, danger:true,
 sit:"いま、ゆれています。へやの中にいます。",
 q:"どうしますか。",
 opts:["つくえの下に入って、頭をまもる","そとに にげる","火を けしに行く","エレベーターで 下に行く"],
 a:0,
 why:"ゆれている間は 動きません。まず 頭を まもります。そとは 物が落ちてきて あぶないです。火は ゆれが止まってから けします。",
 warn:"ゆれている間に そとへ 出ると、落ちてくる物で けがをします。"},

{c:"quake", lv:1,
 sit:"ゆれが とまりました。",
 q:"はじめに することは。",
 opts:["くつを はく","そとに 出る","テレビを つける","おふろに 水を ためる"],
 a:0,
 why:"ゆかに ガラスが おちています。はだしで あるくと けがをします。くつを はいてから 動きます。ガスも とめます。"},

{c:"quake", lv:2,
 sit:"ゆれが とまりました。マンションの 5かいに います。",
 q:"下に おりるとき、どうしますか。",
 opts:["かいだんを つかう","エレベーターを つかう","まどから おりる","そこに いる"],
 a:0,
 why:"じしんの あとは エレベーターが とまることが あります。中に とじこめられます。かいだんを つかいます。",
 danger:true, warn:"エレベーターに とじこめられると、たすけが 来るまで 何時間も かかります。"},

{c:"quake", lv:2, danger:true,
 sit:"海の ちかくに います。ゆれは 小さかったです。",
 q:"どうしますか。",
 opts:["すぐ 高いところへ にげる","海を 見に行く","家で まつ","車で とおくへ 行く"],
 a:0,
 why:"ゆれが 小さくても、大きい つなみが 来ることが あります。すぐ 高いところへ にげます。車は じゅうたいで 動けなくなります。",
 warn:"つなみを 見に行って なくなった人が たくさんいます。ぜったいに 見に行きません。"},

{c:"quake", lv:3,
 sit:"じしんの あと、ガスの においが します。",
 q:"どうしますか。",
 opts:["まどを あけて、外に出る。電気のスイッチは さわらない","かんきせんを つける","ライターで たしかめる","そのまま ねる"],
 a:0,
 why:"スイッチを おすと、小さい火花が でて ばくはつすることが あります。まどを あけて 外に出て、ガス会社に れんらくします。",
 danger:true, warn:"電気のスイッチも かんきせんも、火花が でます。ぜったいに さわりません。"},

/* ── 大雨・台風 ─────────────────────────────── */
{c:"rain", lv:1, danger:true,
 sit:"けいかいレベル4「ひなんしじ」が 出ました。",
 q:"どうしますか。",
 opts:["すぐ みんなで にげる","レベル5に なったら にげる","家の中に いる","雨が やむのを まつ"],
 a:0,
 why:"レベル4は「危険な場所から 全員 ひなん」です。レベル5に なってからでは、安全に にげられません。",
 warn:"レベル5「緊急安全確保」は、すでに 災害が おきている段階です。そこまで まちません。"},

{c:"rain", lv:1,
 sit:"けいかいレベル3「こうれいしゃ等ひなん」が 出ました。あなたは 25さいです。",
 q:"どうしますか。",
 opts:["ひなんの じゅんびを する","なにも しない","すぐ ねる","もう にげなくていい"],
 a:0,
 why:"レベル3は お年よりや 体の不自由な人が にげる段階です。ほかの人も、いつでも にげられるように じゅんびします。"},

{c:"rain", lv:2,
 sit:"テレビで「レベル4 大雨危険警報」と 言っています。",
 q:"これは どのくらい あぶないですか。",
 opts:["ひなんしじ と おなじ。ぜんいん にげる","注意するだけ","もう おわった","わからない"],
 a:0,
 why:"2026年5月から、気象庁の情報の名前に レベルの数字が つきました。「危険警報」は レベル4です。ひなんしじ と おなじ あぶなさです。"},

{c:"rain", lv:2,
 sit:"台風が 来ます。まだ 雨は ふっていません。",
 q:"いま することは。",
 opts:["ハザードマップで 家が あぶないか 見る","なにも しない","かいものに 行く","そとを 見に行く"],
 a:0,
 why:"ハザードマップは 市のホームページで 見られます。自分の家が 水に つかる場所か、どこに にげるかを 先に しらべます。"},

{c:"rain", lv:3, danger:true,
 sit:"道に 水が たまっています。ふかさは わかりません。",
 q:"どうしますか。",
 opts:["歩いて わたらない","走って わたる","車で わたる","くつを ぬいで わたる"],
 a:0,
 why:"水の下は マンホールが 開いていたり、みぞが あったりします。ふかさが わからない水には 入りません。",
 warn:"30センチの 水でも、車は 動かなくなります。歩く人は 流されます。"},

/* ── 避難 ───────────────────────────────────── */
{c:"evac", lv:1,
 sit:"「ひなんばしょ」と「ひなんじょ」、ちがいは。",
 q:"「ひなんじょ」は どっちですか。",
 opts:["とまる ところ","にげこむ ところ","こうえん","えき"],
 a:0,
 why:"ひなんばしょ（避難場所）＝ あぶないところから にげこむ場所。ひなんじょ（避難所）＝ しばらく とまる場所。どちらも 市が 決めています。先に しらべておきます。"},

{c:"evac", lv:1,
 sit:"ひなんじょに 行きます。",
 q:"かならず 持っていくものは。",
 opts:["在留カード・パスポート","ノートパソコン","ふとん","じてんしゃ"],
 a:0,
 why:"在留カードは 身分をしめす 大事なものです。ほかに くすり、水、けいたい電話と じゅうでんき、げんきん。げんきんは ていでんのとき カードが つかえないからです。"},

{c:"evac", lv:2,
 sit:"かぞくと れんらくが とれません。電話も つながりません。",
 q:"どうしますか。",
 opts:["171（さいがい用伝言ダイヤル）を つかう","何回も 電話する","ひなんじょで 大きい声で よぶ","歩いて さがしに行く"],
 a:0,
 why:"171 は さいがいのとき つかえる でんごんサービスです。電話が こんざつしていても メッセージを のこせます。SNSも つながりやすいです。"},

{c:"evac", lv:2,
 sit:"ひなんじょに ペットの ねこが います。",
 q:"どうしますか。",
 opts:["先に、ペットと 行ける ひなんじょを しらべておく","つれて行けば 大丈夫","家に のこす","かんがえない"],
 a:0,
 why:"ひなんじょは ペットの ルールが ばしょごとに ちがいます。入れない ところも あります。さいがいの前に しらべておきます。"},

{c:"evac", lv:3,
 sit:"ひなんじょの かべに 紙が はってあります。",
 q:"「給水」と 書いてあります。いみは。",
 opts:["水を もらえる","水が とまる","water を すてる","おふろ"],
 a:0,
 why:"給水（きゅうすい）＝ 水を くばること。だんすい（断水）＝ 水が とまること。にた ことばですが 反対の いみです。"},

/* ── 備え ───────────────────────────────────── */
{c:"prep", lv:1,
 sit:"水を 用意します。ひとり 何日ぶんですか。",
 q:"めやすは。",
 opts:["1日 3リットル × 3日ぶん","1日 1リットル × 1日ぶん","10リットル × 10日ぶん","用意しなくていい"],
 a:0,
 why:"ひとり 1日 3リットル、3日ぶんが めやすです。飲む水と りょうりの水を あわせた りょうです。"},

{c:"prep", lv:1,
 sit:"けいたい電話の せっていです。",
 q:"かならず オンに するものは。",
 opts:["きんきゅう速報メール（緊急地震速報・避難情報）","カメラ","ゲームの通知","音楽"],
 a:0,
 why:"きんきゅう速報メールは、じしんや ひなんの おしらせが 自動で とどきます。せっていで オフに なっていることが あるので、たしかめます。"},

{c:"prep", lv:2,
 sit:"日本語が まだ よく わかりません。",
 q:"さいがいのとき、どうしますか。",
 opts:["市の やさしい日本語・多言語の防災ページを 先に 見ておく","日本語を おぼえてから","何もしない","ともだちに まかせる"],
 a:0,
 why:"多くの市が やさしい日本語や 外国語で 防災の じょうほうを 出しています。さいがいが おきてから さがすのは たいへんです。先に ブックマークします。"},

{c:"prep", lv:2,
 sit:"ひなんばしょは どこか、しっていますか。",
 q:"いつ しらべますか。",
 opts:["いま しらべる","さいがいのとき しらべる","だれかに 聞く","しらべなくていい"],
 a:0,
 why:"さいがいのときは 電気も インターネットも つかえないことが あります。今のうちに、家から ひなんばしょまで じっさいに 歩いてみます。"},

{c:"prep", lv:3,
 sit:"家の 家具です。",
 q:"じしんの まえに することは。",
 opts:["たおれないように かべに とめる","そのままで いい","たかい ところに 物を おく","うごかす"],
 a:0,
 why:"じしんの けがの 多くは、たおれた 家具や 落ちた物が げんいんです。とくに ねる場所の ちかくに 高い家具を おきません。"}
];

/* 防災のことば（掲示や放送で よく 見る・聞く） */
const WORDS = [
{ja:"避難",       yomi:"ひなん",       easy:"あぶないところから にげること", en:"evacuation"},
{ja:"避難所",     yomi:"ひなんじょ",   easy:"しばらく とまる ところ",       en:"evacuation shelter (to stay)"},
{ja:"避難場所",   yomi:"ひなんばしょ", easy:"すぐ にげこむ ところ",         en:"evacuation site (to escape to)"},
{ja:"避難指示",   yomi:"ひなんしじ",   easy:"みんな にげてください（レベル4）", en:"evacuation order (level 4)"},
{ja:"警戒レベル", yomi:"けいかいレベル", easy:"あぶなさの 5だんかい",        en:"warning level (1–5)"},
{ja:"危険警報",   yomi:"きけんけいほう", easy:"レベル4。すぐ にげる",        en:"danger warning (level 4)"},
{ja:"特別警報",   yomi:"とくべつけいほう", easy:"レベル5。いちばん あぶない", en:"emergency warning (level 5)"},
{ja:"津波",       yomi:"つなみ",       easy:"海から 大きい水が くる",       en:"tsunami"},
{ja:"余震",       yomi:"よしん",       easy:"あとから くる じしん",         en:"aftershock"},
{ja:"断水",       yomi:"だんすい",     easy:"水が とまる",                 en:"water outage"},
{ja:"給水",       yomi:"きゅうすい",   easy:"水を くばる",                 en:"water distribution"},
{ja:"停電",       yomi:"ていでん",     easy:"電気が とまる",               en:"power outage"},
{ja:"炊き出し",   yomi:"たきだし",     easy:"ごはんを くばる",             en:"free hot meals"},
{ja:"安否確認",   yomi:"あんぴかくにん", easy:"むじかどうか たしかめる",     en:"safety confirmation"},
{ja:"立入禁止",   yomi:"たちいりきんし", easy:"入っては いけない",           en:"no entry"},
{ja:"土砂災害",   yomi:"どしゃさいがい", easy:"山や がけが くずれる",        en:"landslide"},
{ja:"高潮",       yomi:"たかしお",     easy:"台風で 海の水が 上がる",       en:"storm surge"},
{ja:"ハザードマップ", yomi:"ハザードマップ", easy:"あぶない場所の ちず",     en:"hazard map"}
];

/* 画面に必ず出す文言 */
const BOUSAI_NOTE =
 "この内容は、内閣府・気象庁の 公開している じょうほうを もとに つくりました。" +
 "じっさいの さいがいのときは、住んでいる 市区町村の しじに したがってください。";


/* ============ 多言語（気象庁の多言語辞書より） ============
 * 出典：気象庁ホームページ https://www.data.jma.go.jp/developer/multilingual.html
 *       「多言語辞書」（2026年3月26日更新）を加工して作成
 *       公共データ利用規約（第1.0版）に準拠
 * ※ 避難所・給水・断水・炊き出し等の 生活のことばは この辞書に無いため、
 *    まだ日本語と英語だけです。内閣府・消防庁の多言語資料が次の候補。
 */
const TR = {
 "langs": [
  {
   "id": "en",
   "label": "English"
  },
  {
   "id": "zh",
   "label": "简体中文"
  },
  {
   "id": "zhHant",
   "label": "繁體中文"
  },
  {
   "id": "ko",
   "label": "한국어"
  },
  {
   "id": "pt",
   "label": "Português"
  },
  {
   "id": "es",
   "label": "Español"
  },
  {
   "id": "id",
   "label": "Bahasa Indonesia"
  },
  {
   "id": "vi",
   "label": "Tiếng Việt"
  },
  {
   "id": "tl",
   "label": "Tagalog"
  },
  {
   "id": "th",
   "label": "ไทย"
  },
  {
   "id": "ne",
   "label": "नेपाली"
  },
  {
   "id": "km",
   "label": "ខ្មែរ"
  },
  {
   "id": "my",
   "label": "မြန်မာ"
  },
  {
   "id": "mn",
   "label": "Монгол"
  }
 ],
 "levels": {
  "1": {
   "en": "Alert level 1",
   "zh": "警戒等级1",
   "zhHant": "警戒等級1",
   "ko": "경계 레벨 1",
   "pt": "Nível de alerta 1",
   "es": "Nivel de alerta 1",
   "id": "tingkat peringatan 1",
   "vi": "Cấp độ cảnh giác 1",
   "tl": "Antas 1 na babala sa pag-ingat",
   "th": "เตรียมรับมือระดับ 1",
   "ne": "सतर्क श्रेणी १",
   "km": "ការប្រកាសព្រមានកំរិត 1",
   "my": "ဘေးအန္တရာယ် သတိပေးချက် အဆင့် ၁",
   "mn": "Сануулах төвшин 1"
  },
  "2": {
   "en": "Alert level 2",
   "zh": "警戒等级2",
   "zhHant": "警戒等級2",
   "ko": "경계 레벨 2",
   "pt": "Nível de alerta 2",
   "es": "Nivel de alerta 2",
   "id": "tingkat peringatan 2",
   "vi": "Cấp độ cảnh giác 2",
   "tl": "Antas 2 na babala sa pag-ingat",
   "th": "เตรียมรับมือระดับ 2",
   "ne": "सतर्क श्रेणी २",
   "km": "ការប្រកាសព្រមានកំរិត 2",
   "my": "ဘေးအန္တရာယ် သတိပေးချက် အဆင့် ၂",
   "mn": "Сануулах төвшин 2"
  },
  "3": {
   "en": "Alert level 3",
   "zh": "警戒等级3",
   "zhHant": "警戒等級3",
   "ko": "경계 레벨 3",
   "pt": "Nível de alerta 3",
   "es": "Nivel de alerta 3",
   "id": "tingkat peringatan 3",
   "vi": "Cấp độ cảnh giác 3",
   "tl": "Antas 3 na babala sa pag-ingat",
   "th": "เตรียมรับมือระดับ 3",
   "ne": "सतर्क श्रेणी ३",
   "km": "ការប្រកាសព្រមានកំរិត 3",
   "my": "ဘေးအန္တရာယ် သတိပေးချက် အဆင့် ၃",
   "mn": "Сануулах төвшин 3"
  },
  "4": {
   "en": "Alert level 4",
   "zh": "警戒等级4",
   "zhHant": "警戒等級4",
   "ko": "경보 레벨 4",
   "pt": "Nível de alerta 4",
   "es": "Nivel de alerta 4",
   "id": "tingkat peringatan 4",
   "vi": "Cấp độ cảnh giác 4",
   "tl": "Antas 4 na babala sa pag-ingat",
   "th": "เตรียมรับมือระดับ 4",
   "ne": "सतर्क श्रेणी ४",
   "km": "ការប្រកាសព្រមានកំរិត 4",
   "my": "ဘေးအန္တရာယ် သတိပေးချက် အဆင့် ၄",
   "mn": "Сануулах төвшин 4"
  },
  "5": {
   "en": "Alert level 5",
   "zh": "警戒等级5",
   "zhHant": "警戒等級5",
   "ko": "경보 레벨 5",
   "pt": "Nível de alerta 5",
   "es": "Nivel de alerta 5",
   "id": "tingkat peringatan 5",
   "vi": "Cấp độ cảnh giác 5",
   "tl": "Antas 5 na babala sa pag-ingat",
   "th": "เตรียมรับมือระดับ 5",
   "ne": "सतर्क श्रेणी ५",
   "km": "ការប្រកាសព្រមានកំរិត 5",
   "my": "ဘေးအန္တရာယ် သတိပေးချက် အဆင့် ၅",
   "mn": "Сануулах төвшин 5"
  }
 },
 "words": {
  "避難": {
   "en": "Evacuation",
   "zh": "避难",
   "zhHant": "避難",
   "ko": "피난",
   "pt": "Evacuação",
   "es": "Evacuar",
   "id": "pengungsian",
   "vi": "Lánh nạn",
   "tl": "Lumisan",
   "th": "อพยพ",
   "ne": "सुरक्षित ठाउँमा जाने",
   "km": "ការជម្លៀសខ្លួន",
   "my": "ရွှေ့ပြောင်းပါ",
   "mn": "Нүүлгэн шилжүүлэлт"
  },
  "警戒レベル": {
   "en": "Alert level",
   "zh": "警戒水准",
   "zhHant": "警戒水準",
   "ko": "경계 수준",
   "pt": "Nível de alerta",
   "es": "Nivel de alerta",
   "id": "tingkat peringatan",
   "vi": "Mức độ cảnh giác",
   "tl": "Antas ng pag-iingat",
   "th": "ระดับการเตรียมรับมือ",
   "ne": "सतर्कतापूर्वक अवलोकन गर्नुपर्ने स्तर",
   "km": "កំរិតនៃការប្រកាសព្រមាន",
   "my": "ဘေးအန္တရာယ် သတိပေးချက် အဆင့်",
   "mn": "Сануулах төвшин"
  },
  "高齢者等避難": {
   "en": "Evacuation of the elderly, etc.",
   "zh": "老年人等进行避难",
   "zhHant": "老年人等疏散",
   "ko": "고령자 등의 대피",
   "pt": "Evacuação de Idosos e outros grupos",
   "es": "Evacuación de personas mayores, etc.",
   "id": "Proses Evakuasi Lansia, dll.",
   "vi": "Sơ tán người cao tuổi, v.v…",
   "tl": "Lumisan ang mga matatanda atbp.",
   "th": "การหลบภัยของผู้สูงอายุ ฯลฯ",
   "ne": "वृद्धवृद्धा आदिलाई सुरक्षित स्थानमा लैजाने कार्य",
   "km": "ការភៀសខ្លួនមនុស្សចាស់។ល។",
   "my": "သက်ကြီးရွယ်အို စသည်တို့ ခိုလှုံခြင်း",
   "mn": "Өндөр настан зэрэг хүмүүс аюулгүй газарт хоргодох"
  },
  "津波警報": {
   "en": "Tsunami Warning",
   "zh": "海啸警报",
   "zhHant": "海嘯警報",
   "ko": "지진해일 경보",
   "pt": "Alerta de Tsunami",
   "es": "Alerta de Tsunami",
   "id": "peringatan bahaya tsunami skala kecil",
   "vi": "Cảnh báo sóng thần",
   "tl": "Babala ng tsunami.",
   "th": "เตือนภัยสึนามิ",
   "ne": "सुनामी चेतावनी",
   "km": "ការប្រកាសអាសន្នអំពីរលកស៊ូណាមិ",
   "my": "ဆူနာမီ ဘေးအန္တရာယ် သတိပေးချက်",
   "mn": "Цунамигийн сэрэмжлүүлэг"
  },
  "大津波警報": {
   "en": "Major Tsunami Warning",
   "zh": "大海啸警报",
   "zhHant": "大海嘯警報",
   "ko": "대형 지진해일 경보",
   "pt": "Alerta de Mega Tsunami",
   "es": "Alerta de Mega Tsunami",
   "id": "peringatan bahaya tsunami skala besar",
   "vi": "Cảnh báo sóng thần lớn",
   "tl": "Babala ng malaking tsunami.",
   "th": "เตือนภัยสึนามิใหญ่",
   "ne": "ठूलो सुनामी चेतावनी",
   "km": "ការប្រកាសអាសន្នអំពីរលកយក្សស៊ូណាមិ",
   "my": "အပြင်းစား ဆူနာမီ ဘေးအန္တရာယ် သတိပေးချက်",
   "mn": "Томоохон цунамигийн сэрэмжлүүлэг"
  },
  "津波注意報": {
   "en": "Tsunami Advisory",
   "zh": "海啸注意警报",
   "zhHant": "海嘯注意警報",
   "ko": "지진해일 주의보",
   "pt": "Alerta Preventivo de Tsunami",
   "es": "Advertencia de Tsunami",
   "id": "pemberitahuan tsunami",
   "vi": "Thông tin lưu ý sóng thần",
   "tl": "Payo na mag-ingat sa tsunami.",
   "th": "เฝ้าระวังสึนามิ",
   "ne": "सुनामी सावधानी",
   "km": "ការព្រមានជាមុនអំពីរលកស៊ូណាមិ",
   "my": "ဆူနာမီ သတိပေးချက်",
   "mn": "Цунамигийн анхааруулга"
  },
  "緊急地震速報": {
   "en": "Earthquake Early Warning (EEW)",
   "zh": "紧急地震警报",
   "zhHant": "緊急地震警報",
   "ko": "긴급 지진 속보",
   "pt": "Alerta Urgente de Terremoto",
   "es": "Alerta Temprana de Terremoto",
   "id": "peringatan dini gempa bumi",
   "vi": "Tin nhanh về động đất khẩn cấp",
   "tl": "Kagyat na Babala sa Lindol",
   "th": "แจ้งด่วนเตือนแผ่นดินไหว",
   "ne": "भर्खरै प्राप्त भूकम्प आपत्कालिन जानकारी",
   "km": "ព័ត៌មានអាសន្នទាន់ហេតុការណ៍អំពីការរញ្ជួយដី",
   "my": "အရေးပေါ် ငလျင် သတိပေးချက်",
   "mn": "Газар хөдлөлтийн шуурхай мэдээ"
  },
  "土砂災害": {
   "en": "Landslide",
   "zh": "土石流",
   "zhHant": "土石流",
   "ko": "토사 재해",
   "pt": "Deslizamento de terra",
   "es": "Desastre por deslizamiento de tierra",
   "id": "tanah longsor",
   "vi": "Tai họa sạt lở đất",
   "tl": "Sakuna ng pagguho ng lupa",
   "th": "ดินถล่ม",
   "ne": "पहिरो विपद्",
   "km": "គ្រោះមហន្តរាយបាក់ដី",
   "my": "မြေပြိုခြင်း",
   "mn": "Хөрсний нуралтын гамшиг"
  },
  "土砂災害警戒情報": {
   "en": "Landslide Alert Information",
   "zh": "土石流灾害警戒通知",
   "zhHant": "土石流災害警戒通知",
   "ko": "산사태 경계 정보",
   "pt": "Informação de alerta de desmoronamento.",
   "es": "Información de alerta de deslizamiento de tierra",
   "id": "informasi tentang kewaspadaan tanah longsor",
   "vi": "Thông tin cảnh giác tai họa sạt lở đất",
   "tl": "Impormasyon sa pag-iingat sa guho",
   "th": "ข้อมูลเตรียมรับมือภัยดินโคลนถล่ม",
   "ne": "पहिरो विपद् सतर्कतापूर्वक अवोलकन जानकारी",
   "km": "ព័ត៌មានអំពីការប្រកាសព្រមានគ្រោះមហន្តរាយបាក់ដី",
   "my": "မြေပြိုမှု ဘေးအန္တရာယ် သတိပေးချက် ထုတ်ပြန်ခြင်း",
   "mn": "Хөрс нурах гамшгийг сануулах мэдээ"
  },
  "高潮": {
   "en": "Storm surge",
   "zh": "暴潮",
   "zhHant": "暴潮",
   "ko": "고조<바다의 물이 늘어남>",
   "pt": "Maré alta",
   "es": "Marea alta",
   "id": "Gelombang pasang",
   "vi": "Triều cường",
   "tl": "Daluyong o pagtaas ng tubig sa dagat",
   "th": "น้ำทะเลหนุนสูง",
   "ne": "उच्च समुन्द्र सतह",
   "km": "ទឹកឡើងខ្ពស់",
   "my": "မုန်တိုင်းကြောင့် ပို၍ မြင့်တက်လာသော ရေလှိုင်း",
   "mn": "Тэнгисийн түлхэлт"
  },
  "大雨": {
   "en": "Heavy rain",
   "zh": "大雨",
   "zhHant": "大雨",
   "ko": "폭우",
   "pt": "Chuva forte",
   "es": "Lluvia torrencial",
   "id": "hujan deras",
   "vi": "Mưa to",
   "tl": "Malakas na ulan",
   "th": "ฝนตกหนัก",
   "ne": "ठूलो वर्षा",
   "km": "ភ្លៀងធ្លាក់ខ្លាំង",
   "my": "မိုးသည်းထန်စွာရွာခြင်း",
   "mn": "Аадар бороо"
  },
  "大雨注意報": {
   "en": "Heavy Rain Advisory",
   "zh": "大雨注意报",
   "zhHant": "大雨注意報",
   "ko": "호우 주의보",
   "pt": "Aviso de atenção para chuvas fortes",
   "es": "Advertencia de lluvia torrencial",
   "id": "pemberitahuan hujan lebat",
   "vi": "Thông tin lưu ý mưa to",
   "tl": "Payo na mag-ingat sa malakas na ulan",
   "th": "ประกาศระวังภัยฝนตกหนัก",
   "ne": "ठूलो वर्षा सावधानी",
   "km": "ការប្រកាសព្រមានជាមុនអំពីភ្លៀងធ្លាក់ខ្លាំង",
   "my": "မိုးသည်းထန်စွာရွာမှု သတိပေးချက်",
   "mn": "Аадар борооны анхааруулга"
  },
  "地震情報": {
   "en": "Earthquake information",
   "zh": "地震信息",
   "zhHant": "地震資訊",
   "ko": "지진 정보",
   "pt": "Informações de terremoto",
   "es": "Información de terremoto",
   "id": "informasi gempa bumi",
   "vi": "Thông tin động đất",
   "tl": "Impormasyon sa lindol",
   "th": "ข้อมูลแผ่นดินไหว",
   "ne": "भूकम्पको जानकारी",
   "km": "ព័ត៌មានអំពីការរញ្ជួយដី",
   "my": "ငလျင်သတင်း",
   "mn": "Газар хөдлөлтийн мэдээ"
  },
  "台風情報": {
   "en": "Tropical Cyclone Information",
   "zh": "台风情报",
   "zhHant": "颱風情報",
   "ko": "태풍 정보",
   "pt": "Informação sobre o tufão",
   "es": "Información de Tifón",
   "id": "informasi angin topan",
   "vi": "Thông tin bão",
   "tl": "Impormasyon sa Bagyo",
   "th": "ข้อมูลพายุไต้ฝุ่น",
   "ne": "ताइफुन जानकारी",
   "km": "ព័ត៌មានអំពីព្យុះទីហ្វុង",
   "my": "တိုင်ဖုန်းမုန်တိုင်း နှင့်ပက်သက်သော သတင်းအချက်အလက်",
   "mn": "Хар салхины талаарх мэдээ"
  }
 },
 "newnames": {
  "レベル２高潮注意報": {
   "en": "Level 2 Advisory (Storm Surge)",
   "zh": "等级2 暴潮注意报",
   "zhHant": "2級暴潮注意報",
   "ko": "레벨 2 폭풍 해일 주의보",
   "pt": "Alerta preventivo de nível 2 (maré alta)",
   "es": "Advertencia de nivel 2 (marejada)",
   "id": "Pemberitahuan Gelombang Pasang Tingkat 2",
   "vi": "Thông tin lưu ý triều cường cấp độ 2",
   "tl": "Antas 2 Payo na mag-ingat sa daluyong o pagtaas ng tubig sa dagat",
   "th": "ประกาศเฝ้าระวังคลื่นพายุซัดฝั่งระดับ 2",
   "ne": "श्रेणी २ उच्च समुद्र सतह सावधानी",
   "km": "ការប្រកាសប្រុងប្រយ័ត្នជាមុនអំពីទឹកឡើងខ្ពស់កម្រិត 2",
   "my": "အဆင့် ၂ ဒီရေလှိုင်းကြီးလာမှု သတိပေးချက်",
   "mn": "2-р түвшний далайн түлхэлтийн анхааруулга"
  },
  "レベル３高潮警報": {
   "en": "Level 3 Warning (Storm Surge)",
   "zh": "等级3 暴潮警报",
   "zhHant": "3級暴潮警報",
   "ko": "레벨 3 폭풍 해일 경보",
   "pt": "Alerta de nível 3 (maré alta)",
   "es": "Alerta de nivel 3 (marejada)",
   "id": "Peringatan Gelombang Pasang Tingkat 3",
   "vi": "Cảnh báo triều cường cấp độ 3",
   "tl": "Antas 3 Babala ng daluyong o pagtaas ng tubig sa dagat",
   "th": "ประกาศเตือนภัยคลื่นพายุซัดฝั่งระดับ 3",
   "ne": "श्रेणी ३ उच्च समुद्र सतह चेतावनी",
   "km": "ការប្រកាសអាសន្នអំពីទឹកឡើងខ្ពស់កម្រិត 3",
   "my": "အဆင့် ၃ ဒီရေလှိုင်းကြီးလာမှုသတိပေးချက်",
   "mn": "3-р түвшний далайн түлхэлтийн сэрэмжлүүлэг"
  },
  "レベル４高潮危険警報": {
   "en": "Level 4 Urgent Warning (Storm Surge)",
   "zh": "等级4 暴潮危险警报",
   "zhHant": "4級暴潮危險警報",
   "ko": "레벨 4 폭풍 해일 위험 경보",
   "pt": "Alerta Urgente de Nível 4 (Maré Alta)",
   "es": "Alerta urgente de nivel 4 (marejada)",
   "id": "Peringatan Darurat Gelombang Pasang Tingkat 4",
   "vi": "Cảnh báo khẩn cấp triều cường cấp độ 4",
   "tl": "Antas 4 Apurahang babala ng panganib ng daluyong o pagtaas ng tubig sa dagat",
   "th": "ประกาศเตือนภัยฉุกเฉินน้ำทะเลหนุนสูงระดับ 4",
   "ne": "श्रेणी ४ उच्च समुद्र सतह जोखिम चेतावनी",
   "km": "ការប្រកាសអាសន្នគ្រោះថ្នាក់អំពីទឹកសមុទ្រឡើងខ្ពស់កម្រិត 4",
   "my": "အဆင့် ၄ ဒီရေလှိုင်းကြီးလာမှု အန္တရာယ်သတိပေးချက်",
   "mn": "4-р түвшний далайн түлхэлтийн яаралтай сэрэмжлүүлэг"
  },
  "レベル５高潮特別警報": {
   "en": "Level 5 Emergency Warning (Storm Surge)",
   "zh": "等级5 暴潮特别警报",
   "zhHant": "5級暴潮特別警報",
   "ko": "레벨 5 폭풍 해일 특별 경보",
   "pt": "Alerta especial de nível 5 (maré alta)",
   "es": "Alerta especial de nivel 5 (marejada)",
   "id": "Peringatan Khusus Gelombang Pasang Tingkat 5",
   "vi": "Cảnh báo đặc biệt triều cường cấp độ 5",
   "tl": "Antas 5 Malubhang babala ng daluyong o pagtaas ng tubig sa dagat",
   "th": "ประกาศเตือนภัยพิเศษคลื่นพายุซัดฝั่งระดับ 5",
   "ne": "श्रेणी ५ उच्च समुद्र सतह ओभरफ्लो चेतावनी",
   "km": "ការប្រកាសអាសន្នពិសេសអំពីទឹកឡើងខ្ពស់កម្រិត 5",
   "my": "အဆင့် ၅ ဒီရေလှိုင်းကြီးလာမှု အရေးပေါ်သတိပေးချက်",
   "mn": "5-р түвшний далайн түлхэлтийн тусгай сэрэмжлүүлэг"
  }
 },
 "sources": [
  {
   "name": "気象庁「多言語辞書」（2026年3月26日更新）",
   "url": "https://www.data.jma.go.jp/developer/multilingual.html",
   "note": "公共データ利用規約（第1.0版）に準拠。出典表示のうえ利用。"
  }
 ],
 "note_ja": "◯印のことばは 気象庁の 多言語辞書の 訳です。印の ないものは まだ 訳が ありません。",
 "note_en": "Terms marked ◯ are official translations from the Japan Meteorological Agency multilingual dictionary."
};
