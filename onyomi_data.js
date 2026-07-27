/* onyomi_data.js — 粵音から日本語の音読みを予測するゲームのデータ
 * このファイルだけを編集すれば、ゲーム本体（onyomi_game.html）は触らずに直せます。
 * 編集は onyomi_edit.html から行い、書き出したものでこのファイルを置きかえてください。
 *
 * coda  k / t / p … 入声（日本語で「っ」が出る）
 *       m / n     … 日本語は「ん」
 *       ng        … 日本語は長音
 * end   その韻尾が日本語でどうなるか（く・つ・う・ん・長音）
 * jp    日本の漢字（繁体字と形が違うときだけ）
 * lv    1=よく使う  2=ふつう  3=むずかしい
 * note  例外・注意（あれば画面に出ます）
 */

const CODAS = {
  k:  { label:"-k",  end:"く",   jp:"く・き",   hint:"入声",   color:"k"  },
  t:  { label:"-t",  end:"つ",   jp:"つ・ち",   hint:"入声",   color:"t"  },
  p:  { label:"-p",  end:"う",   jp:"う（ふ）", hint:"入声",   color:"p"  },
  m:  { label:"-m",  end:"ん",   jp:"ん",       hint:"鼻音",   color:"m"  },
  n:  { label:"-n",  end:"ん",   jp:"ん",       hint:"鼻音",   color:"m"  },
  ng: { label:"-ng", end:"長音", jp:"長音",     hint:"鼻音",   color:"ng" }
};

const CHARS = [
/* ── -k ───────────────────────────────────────── */
{c:"學", jp:"学", jyut:"hok6",   coda:"k",  on:"がく",   w:"学校",  wr:"がっこう",   lv:1},
{c:"國", jp:"国", jyut:"gwok3",  coda:"k",  on:"こく",   w:"国家",  wr:"こっか",     lv:1},
{c:"百", jp:"",   jyut:"baak3",  coda:"k",  on:"ひゃく", w:"百円",  wr:"ひゃくえん", lv:1},
{c:"食", jp:"",   jyut:"sik6",   coda:"k",  on:"しょく", w:"食事",  wr:"しょくじ",   lv:1},
{c:"力", jp:"",   jyut:"lik6",   coda:"k",  on:"りょく", w:"努力",  wr:"どりょく",   lv:1},
{c:"白", jp:"",   jyut:"baak6",  coda:"k",  on:"はく",   w:"白紙",  wr:"はくし",     lv:2},
{c:"客", jp:"",   jyut:"haak3",  coda:"k",  on:"きゃく", w:"客室",  wr:"きゃくしつ", lv:2},
{c:"特", jp:"",   jyut:"dak6",   coda:"k",  on:"とく",   w:"特急",  wr:"とっきゅう", lv:1},
{c:"北", jp:"",   jyut:"bak1",   coda:"k",  on:"ほく",   w:"北海道",wr:"ほっかいどう",lv:1},
{c:"六", jp:"",   jyut:"luk6",   coda:"k",  on:"ろく",   w:"六本",  wr:"ろっぽん",   lv:1},
{c:"目", jp:"",   jyut:"muk6",   coda:"k",  on:"もく",   w:"目的",  wr:"もくてき",   lv:1},
{c:"木", jp:"",   jyut:"muk6",   coda:"k",  on:"もく",   w:"木曜日",wr:"もくようび", lv:1},
{c:"作", jp:"",   jyut:"zok3",   coda:"k",  on:"さく",   w:"作品",  wr:"さくひん",   lv:2},
{c:"式", jp:"",   jyut:"sik1",   coda:"k",  on:"しき",   w:"形式",  wr:"けいしき",   lv:2},
{c:"直", jp:"",   jyut:"zik6",   coda:"k",  on:"ちょく", w:"直接",  wr:"ちょくせつ", lv:2},
{c:"的", jp:"",   jyut:"dik1",   coda:"k",  on:"てき",   w:"目的",  wr:"もくてき",   lv:2},
{c:"約", jp:"",   jyut:"joek3",  coda:"k",  on:"やく",   w:"約束",  wr:"やくそく",   lv:2},
{c:"石", jp:"",   jyut:"sek6",   coda:"k",  on:"せき",   w:"石油",  wr:"せきゆ",     lv:2},
{c:"竹", jp:"",   jyut:"zuk1",   coda:"k",  on:"ちく",   w:"竹林",  wr:"ちくりん",   lv:3},
{c:"築", jp:"",   jyut:"zuk1",   coda:"k",  on:"ちく",   w:"建築",  wr:"けんちく",   lv:3},
{c:"極", jp:"",   jyut:"gik6",   coda:"k",  on:"きょく", w:"極端",  wr:"きょくたん", lv:3},
{c:"落", jp:"",   jyut:"lok6",   coda:"k",  on:"らく",   w:"落第",  wr:"らくだい",   lv:3},

/* ── -t ───────────────────────────────────────── */
{c:"一", jp:"",   jyut:"jat1",   coda:"t",  on:"いち",   w:"一本",  wr:"いっぽん",   lv:1},
{c:"日", jp:"",   jyut:"jat6",   coda:"t",  on:"にち",   w:"日記",  wr:"にっき",     lv:1},
{c:"月", jp:"",   jyut:"jyut6",  coda:"t",  on:"げつ",   w:"月曜日",wr:"げつようび", lv:1},
{c:"發", jp:"発", jyut:"faat3",  coda:"t",  on:"はつ",   w:"発表",  wr:"はっぴょう", lv:1},
{c:"出", jp:"",   jyut:"ceot1",  coda:"t",  on:"しゅつ", w:"出発",  wr:"しゅっぱつ", lv:1},
{c:"實", jp:"実", jyut:"sat6",   coda:"t",  on:"じつ",   w:"実行",  wr:"じっこう",   lv:2},
{c:"熱", jp:"",   jyut:"jit6",   coda:"t",  on:"ねつ",   w:"熱心",  wr:"ねっしん",   lv:2},
{c:"質", jp:"",   jyut:"zat1",   coda:"t",  on:"しつ",   w:"質問",  wr:"しつもん",   lv:2},
{c:"別", jp:"",   jyut:"bit6",   coda:"t",  on:"べつ",   w:"特別",  wr:"とくべつ",   lv:1},
{c:"活", jp:"",   jyut:"wut6",   coda:"t",  on:"かつ",   w:"活動",  wr:"かつどう",   lv:1},
{c:"物", jp:"",   jyut:"mat6",   coda:"t",  on:"ぶつ",   w:"物質",  wr:"ぶっしつ",   lv:2},
{c:"八", jp:"",   jyut:"baat3",  coda:"t",  on:"はち",   w:"八百",  wr:"はっぴゃく", lv:1},
{c:"七", jp:"",   jyut:"cat1",   coda:"t",  on:"しち",   w:"七月",  wr:"しちがつ",   lv:1},
{c:"失", jp:"",   jyut:"sat1",   coda:"t",  on:"しつ",   w:"失敗",  wr:"しっぱい",   lv:2},
{c:"結", jp:"",   jyut:"git3",   coda:"t",  on:"けつ",   w:"結果",  wr:"けっか",     lv:2},
{c:"決", jp:"",   jyut:"kyut3",  coda:"t",  on:"けつ",   w:"決定",  wr:"けってい",   lv:2},
{c:"說", jp:"説", jyut:"syut3",  coda:"t",  on:"せつ",   w:"説明",  wr:"せつめい",   lv:2},
{c:"達", jp:"",   jyut:"daat6",  coda:"t",  on:"たつ",   w:"達成",  wr:"たっせい",   lv:3},
{c:"察", jp:"",   jyut:"caat3",  coda:"t",  on:"さつ",   w:"観察",  wr:"かんさつ",   lv:3},
{c:"術", jp:"",   jyut:"seot6",  coda:"t",  on:"じゅつ", w:"技術",  wr:"ぎじゅつ",   lv:3},
{c:"必", jp:"",   jyut:"bit1",   coda:"t",  on:"ひつ",   w:"必要",  wr:"ひつよう",   lv:2},
{c:"筆", jp:"",   jyut:"bat1",   coda:"t",  on:"ひつ",   w:"筆記",  wr:"ひっき",     lv:3},
{c:"血", jp:"",   jyut:"hyut3",  coda:"t",  on:"けつ",   w:"血液",  wr:"けつえき",   lv:3},

/* ── -p ───────────────────────────────────────── */
{c:"十", jp:"",   jyut:"sap6",   coda:"p",  on:"じゅう", w:"十分",  wr:"じゅっぷん", lv:1},
{c:"急", jp:"",   jyut:"gap1",   coda:"p",  on:"きゅう", w:"急行",  wr:"きゅうこう", lv:1},
{c:"習", jp:"",   jyut:"zaap6",  coda:"p",  on:"しゅう", w:"習慣",  wr:"しゅうかん", lv:2},
{c:"入", jp:"",   jyut:"jap6",   coda:"p",  on:"にゅう", w:"入学",  wr:"にゅうがく", lv:1},
{c:"業", jp:"",   jyut:"jip6",   coda:"p",  on:"ぎょう", w:"業界",  wr:"ぎょうかい", lv:2},
{c:"答", jp:"",   jyut:"daap3",  coda:"p",  on:"とう",   w:"答案",  wr:"とうあん",   lv:2},
{c:"合", jp:"",   jyut:"hap6",   coda:"p",  on:"ごう",   w:"合計",  wr:"ごうけい",   lv:1},
{c:"集", jp:"",   jyut:"zaap6",  coda:"p",  on:"しゅう", w:"集合",  wr:"しゅうごう", lv:2},
{c:"給", jp:"",   jyut:"kap1",   coda:"p",  on:"きゅう", w:"給料",  wr:"きゅうりょう",lv:2},
{c:"吸", jp:"",   jyut:"kap1",   coda:"p",  on:"きゅう", w:"呼吸",  wr:"こきゅう",   lv:3},
{c:"及", jp:"",   jyut:"kap6",   coda:"p",  on:"きゅう", w:"普及",  wr:"ふきゅう",   lv:3},
{c:"立", jp:"",   jyut:"laap6",  coda:"p",  on:"りつ",   w:"建立",  wr:"こんりゅう", lv:3,
  note:"例外。ふつうは「りつ」だが、建立 こんりゅう には規則どおりの古い音が残っている。"},
{c:"雜", jp:"雑", jyut:"zaap6",  coda:"p",  on:"ざつ",   w:"雑木林",wr:"ぞうきばやし",lv:3,
  note:"例外。「ざつ」が普通だが、雑木林 ぞうきばやし には規則どおりの「ぞう」が残っている。"},
{c:"接", jp:"",   jyut:"zip3",   coda:"p",  on:"せつ",   w:"接近",  wr:"せっきん",   lv:3,
  note:"例外。規則どおりなら「しょう」だが、慣用で「せつ」。"},

/* ── -m ───────────────────────────────────────── */
{c:"三", jp:"",   jyut:"saam1",  coda:"m",  on:"さん",   w:"三人",  wr:"さんにん",   lv:1},
{c:"心", jp:"",   jyut:"sam1",   coda:"m",  on:"しん",   w:"安心",  wr:"あんしん",   lv:1},
{c:"金", jp:"",   jyut:"gam1",   coda:"m",  on:"きん",   w:"金曜日",wr:"きんようび", lv:1},
{c:"音", jp:"",   jyut:"jam1",   coda:"m",  on:"おん",   w:"音楽",  wr:"おんがく",   lv:1},
{c:"南", jp:"",   jyut:"naam4",  coda:"m",  on:"なん",   w:"南北",  wr:"なんぼく",   lv:2},
{c:"點", jp:"点", jyut:"dim2",   coda:"m",  on:"てん",   w:"点数",  wr:"てんすう",   lv:2},
{c:"感", jp:"",   jyut:"gam2",   coda:"m",  on:"かん",   w:"感動",  wr:"かんどう",   lv:2},
{c:"今", jp:"",   jyut:"gam1",   coda:"m",  on:"こん",   w:"今度",  wr:"こんど",     lv:1},
{c:"森", jp:"",   jyut:"sam1",   coda:"m",  on:"しん",   w:"森林",  wr:"しんりん",   lv:2},
{c:"林", jp:"",   jyut:"lam4",   coda:"m",  on:"りん",   w:"森林",  wr:"しんりん",   lv:2},
{c:"店", jp:"",   jyut:"dim3",   coda:"m",  on:"てん",   w:"書店",  wr:"しょてん",   lv:2},
{c:"談", jp:"",   jyut:"taam4",  coda:"m",  on:"だん",   w:"相談",  wr:"そうだん",   lv:3},
{c:"檢", jp:"検", jyut:"gim2",   coda:"m",  on:"けん",   w:"検査",  wr:"けんさ",     lv:3},

/* ── -n ───────────────────────────────────────── */
{c:"山", jp:"",   jyut:"saan1",  coda:"n",  on:"さん",   w:"火山",  wr:"かざん",     lv:1},
{c:"新", jp:"",   jyut:"san1",   coda:"n",  on:"しん",   w:"新聞",  wr:"しんぶん",   lv:1},
{c:"天", jp:"",   jyut:"tin1",   coda:"n",  on:"てん",   w:"天気",  wr:"てんき",     lv:1},
{c:"先", jp:"",   jyut:"sin1",   coda:"n",  on:"せん",   w:"先生",  wr:"せんせい",   lv:1},
{c:"萬", jp:"万", jyut:"maan6",  coda:"n",  on:"まん",   w:"一万",  wr:"いちまん",   lv:1},
{c:"電", jp:"",    jyut:"din6",   coda:"n",  on:"でん",   w:"電話",  wr:"でんわ",     lv:1},
{c:"文", jp:"",   jyut:"man4",   coda:"n",  on:"ぶん",   w:"文化",  wr:"ぶんか",     lv:1},
{c:"安", jp:"",   jyut:"on1",    coda:"n",  on:"あん",   w:"安全",  wr:"あんぜん",   lv:1},
{c:"間", jp:"",    jyut:"gaan1",  coda:"n",  on:"かん",   w:"時間",  wr:"じかん",     lv:1},
{c:"本", jp:"",   jyut:"bun2",   coda:"n",  on:"ほん",   w:"日本",  wr:"にほん",     lv:1},
{c:"問", jp:"",   jyut:"man6",   coda:"n",  on:"もん",   w:"質問",  wr:"しつもん",   lv:1},
{c:"半", jp:"",   jyut:"bun3",   coda:"n",  on:"はん",   w:"半分",  wr:"はんぶん",   lv:1},
{c:"運", jp:"",   jyut:"wan6",   coda:"n",  on:"うん",   w:"運動",  wr:"うんどう",   lv:2},
{c:"建", jp:"",   jyut:"gin3",   coda:"n",  on:"けん",   w:"建設",  wr:"けんせつ",   lv:2},
{c:"言", jp:"",   jyut:"jin4",   coda:"n",  on:"げん",   w:"言語",  wr:"げんご",     lv:2},
{c:"番", jp:"",   jyut:"faan1",  coda:"n",  on:"ばん",   w:"番号",  wr:"ばんごう",   lv:2},
{c:"返", jp:"",   jyut:"faan2",  coda:"n",  on:"へん",   w:"返事",  wr:"へんじ",     lv:3},

/* ── -ng ──────────────────────────────────────── */
{c:"東", jp:"",    jyut:"dung1",  coda:"ng", on:"とう",   w:"東京",  wr:"とうきょう", lv:1},
{c:"中", jp:"",   jyut:"zung1",  coda:"ng", on:"ちゅう", w:"中国",  wr:"ちゅうごく", lv:1},
{c:"京", jp:"",   jyut:"ging1",  coda:"ng", on:"きょう", w:"東京",  wr:"とうきょう", lv:1},
{c:"明", jp:"",   jyut:"ming4",  coda:"ng", on:"めい",   w:"説明",  wr:"せつめい",   lv:1},
{c:"長", jp:"",    jyut:"coeng4", coda:"ng", on:"ちょう", w:"社長",  wr:"しゃちょう", lv:1},
{c:"上", jp:"",   jyut:"soeng6", coda:"ng", on:"じょう", w:"上手",  wr:"じょうず",   lv:1},
{c:"生", jp:"",   jyut:"sang1",  coda:"ng", on:"せい",   w:"学生",  wr:"がくせい",   lv:1},
{c:"英", jp:"",   jyut:"jing1",  coda:"ng", on:"えい",   w:"英語",  wr:"えいご",     lv:1},
{c:"王", jp:"",   jyut:"wong4",  coda:"ng", on:"おう",   w:"王子",  wr:"おうじ",     lv:2},
{c:"方", jp:"",   jyut:"fong1",  coda:"ng", on:"ほう",   w:"方法",  wr:"ほうほう",   lv:1},
{c:"場", jp:"",    jyut:"coeng4", coda:"ng", on:"じょう", w:"会場",  wr:"かいじょう", lv:2},
{c:"行", jp:"",   jyut:"hang4",  coda:"ng", on:"こう",   w:"銀行",  wr:"ぎんこう",   lv:1},
{c:"成", jp:"",   jyut:"sing4",  coda:"ng", on:"せい",   w:"成功",  wr:"せいこう",   lv:2},
{c:"定", jp:"",   jyut:"ding6",  coda:"ng", on:"てい",   w:"決定",  wr:"けってい",   lv:2},
{c:"經", jp:"経", jyut:"ging1",  coda:"ng", on:"けい",   w:"経験",  wr:"けいけん",   lv:2},
{c:"通", jp:"",   jyut:"tung1",  coda:"ng", on:"つう",   w:"交通",  wr:"こうつう",   lv:1},
{c:"動", jp:"",    jyut:"dung6",  coda:"ng", on:"どう",   w:"運動",  wr:"うんどう",   lv:1},
{c:"用", jp:"",   jyut:"jung6",  coda:"ng", on:"よう",   w:"使用",  wr:"しよう",     lv:1},
{c:"青", jp:"",   jyut:"cing1",  coda:"ng", on:"せい",   w:"青年",  wr:"せいねん",   lv:2},
{c:"兄", jp:"",   jyut:"hing1",  coda:"ng", on:"きょう", w:"兄弟",  wr:"きょうだい", lv:3},
{c:"農", jp:"",    jyut:"nung4",  coda:"ng", on:"のう",   w:"農業",  wr:"のうぎょう", lv:3}
];

/* 促音になるか・ならないか（同じ字で対になっているもの）
   q:true = っ が出る／q:false = 出ない */
const SOKUON = [
{w:"学校",   r:"がっこう",     q:true,  base:"学 がく ＋ 校 こう",  why:"-k のうしろに か行 → っ"},
{w:"学生",   r:"がくせい",     q:false, base:"学 がく ＋ 生 せい",  why:"うしろが さ行なので「く」のまま"},
{w:"国家",   r:"こっか",       q:true,  base:"国 こく ＋ 家 か",    why:"-k のうしろに か行 → っ"},
{w:"国民",   r:"こくみん",     q:false, base:"国 こく ＋ 民 みん",  why:"うしろが ま行なので変わらない"},
{w:"発表",   r:"はっぴょう",   q:true,  base:"発 はつ ＋ 表 ひょう", why:"-t のうしろに は行 → っ＋ぱ行"},
{w:"発言",   r:"はつげん",     q:false, base:"発 はつ ＋ 言 げん",  why:"うしろが濁音なので変わらない"},
{w:"一本",   r:"いっぽん",     q:true,  base:"一 いち ＋ 本 ほん",  why:"-t のうしろに は行 → っ＋ぱ行"},
{w:"一年",   r:"いちねん",     q:false, base:"一 いち ＋ 年 ねん",  why:"うしろが な行なので変わらない"},
{w:"十分",   r:"じゅっぷん",   q:true,  base:"十 じゅう ＋ 分 ふん", why:"-p のうしろに は行 → っ＋ぱ行"},
{w:"十年",   r:"じゅうねん",   q:false, base:"十 じゅう ＋ 年 ねん", why:"うしろが な行なので変わらない"},
{w:"失敗",   r:"しっぱい",     q:true,  base:"失 しつ ＋ 敗 はい",  why:"-t のうしろに は行 → っ＋ぱ行"},
{w:"失礼",   r:"しつれい",     q:false, base:"失 しつ ＋ 礼 れい",  why:"うしろが ら行なので変わらない"},
{w:"出発",   r:"しゅっぱつ",   q:true,  base:"出 しゅつ ＋ 発 はつ", why:"-t のうしろに は行 → っ＋ぱ行"},
{w:"出現",   r:"しゅつげん",   q:false, base:"出 しゅつ ＋ 現 げん", why:"うしろが濁音なので変わらない"},
{w:"雑誌",   r:"ざっし",       q:true,  base:"雑 ざつ ＋ 誌 し",    why:"-p のうしろに さ行 → っ"},
{w:"雑音",   r:"ざつおん",     q:false, base:"雑 ざつ ＋ 音 おん",  why:"うしろが母音なので変わらない"},
{w:"特急",   r:"とっきゅう",   q:true,  base:"特 とく ＋ 急 きゅう", why:"-k のうしろに か行 → っ"},
{w:"特別",   r:"とくべつ",     q:false, base:"特 とく ＋ 別 べつ",  why:"うしろが濁音なので変わらない"},
{w:"日記",   r:"にっき",       q:true,  base:"日 にち ＋ 記 き",    why:"-t のうしろに か行 → っ"},
{w:"日曜日", r:"にちようび",   q:false, base:"日 にち ＋ 曜 よう",  why:"うしろが や行なので変わらない"},
{w:"結果",   r:"けっか",       q:true,  base:"結 けつ ＋ 果 か",    why:"-t のうしろに か行 → っ"},
{w:"結論",   r:"けつろん",     q:false, base:"結 けつ ＋ 論 ろん",  why:"うしろが ら行なので変わらない"},
{w:"八百",   r:"はっぴゃく",   q:true,  base:"八 はち ＋ 百 ひゃく", why:"-t のうしろに は行 → っ＋ぱ行"},
{w:"八人",   r:"はちにん",     q:false, base:"八 はち ＋ 人 にん",  why:"うしろが な行なので変わらない"},
{w:"北海道", r:"ほっかいどう", q:true,  base:"北 ほく ＋ 海 かい",  why:"-k のうしろに か行 → っ"},
{w:"北部",   r:"ほくぶ",       q:false, base:"北 ほく ＋ 部 ぶ",    why:"うしろが濁音なので変わらない"},
{w:"物質",   r:"ぶっしつ",     q:true,  base:"物 ぶつ ＋ 質 しつ",  why:"-t のうしろに さ行 → っ"},
{w:"物理",   r:"ぶつり",       q:false, base:"物 ぶつ ＋ 理 り",    why:"うしろが ら行なので変わらない"},
{w:"実行",   r:"じっこう",     q:true,  base:"実 じつ ＋ 行 こう",  why:"-t のうしろに か行 → っ"},
{w:"実力",   r:"じつりょく",   q:false, base:"実 じつ ＋ 力 りょく", why:"うしろが ら行なので変わらない"}
];
