/* gomi_data.js — ゴミ分別ゲームのデータ
 * このファイルだけを編集すれば、ゲーム本体（gomi_rush.html）は触らずに内容を直せます。
 * 編集は gomi_edit.html（編集ページ）から行い、書き出したものでこのファイルを置きかえてください。
 * 最終更新：（書き出し時に自動で入ります）
 */

/* ============ ゴミ（具体的・材質つき・レベルつき） ============ */
const ITEMS = {
  nama:{name:'生ごみ（野菜くず）',emoji:'🥬',mat:'food',lv:1},
  pet:{name:'ペットボトル本体',emoji:'🥤',mat:'pet',lv:1},
  can:{name:'アルミ缶',emoji:'🥫',mat:'can',lv:1},
  bine:{name:'ガラスびん',emoji:'🍶',mat:'glass',lv:1},
  bento:{name:'プラの弁当容器',emoji:'🍱',mat:'plastic_pack',lv:1},
  cap:{name:'ペットボトルのキャップ',emoji:'🔵',mat:'plastic_pack',lv:1},

  news:{name:'新聞紙',emoji:'📰',mat:'paper_rec',lv:2},
  cardb:{name:'段ボール',emoji:'📦',mat:'paper_rec',lv:2},
  zasshi:{name:'読み終わった雑誌',emoji:'📖',mat:'paper_rec',lv:2},
  milk:{name:'牛乳などの紙パック',emoji:'🧃',mat:'paper_rec',lv:2},
  tray:{name:'食品トレイ（発泡）',emoji:'🍽️',mat:'plastic_pack',lv:2},
  cupmen:{name:'カップ麺の容器',emoji:'🍜',mat:'plastic_pack',lv:2},
  okashi:{name:'お菓子の袋（プラ）',emoji:'🍬',mat:'plastic_pack',lv:2},
  omutsu:{name:'使用済み紙おむつ',emoji:'👶',mat:'paper_burn',lv:2},
  tissue:{name:'使ったティッシュ',emoji:'🤧',mat:'paper_burn',lv:2},
  glassbroken:{name:'割れたガラスのコップ',emoji:'💥',mat:'broken',lv:2,danger:true},
  chawan:{name:'割れた茶わん（陶器）',emoji:'🥣',mat:'broken',lv:2,danger:true},
  spray:{name:'スプレー缶（中身なし）',emoji:'🧴',mat:'spray',lv:2,danger:true},
  spray_full:{name:'中身が残ったスプレー缶',emoji:'🫧',mat:'pretreat',lv:2,danger:true},
  cloth:{name:'古着（着られるTシャツ）',emoji:'👕',mat:'cloth',lv:2},
  frypan:{name:'使い古したフライパン',emoji:'🍳',mat:'metal',lv:2},
  bucket:{name:'プラのバケツ',emoji:'🪣',mat:'plastic_prod',lv:2},
  toy:{name:'こわれたおもちゃの車',emoji:'🚗',mat:'plastic_prod',lv:2},
  habrush:{name:'歯ブラシ',emoji:'🪥',mat:'plastic_prod',lv:2},
  cd:{name:'いらないCD・DVD',emoji:'💿',mat:'plastic_prod',lv:2},
  mirror:{name:'割れた鏡',emoji:'🪞',mat:'broken',lv:2,danger:true},
  waribashi:{name:'使った割り箸',emoji:'🥢',mat:'paper_burn',lv:2},
  pizzabox:{name:'油で汚れたピザの箱',emoji:'🍕',mat:'paper_burn',lv:2},
  receipt:{name:'レシート（感熱紙）',emoji:'🧾',mat:'paper_burn',lv:2},
  shoes:{name:'はき古した靴',emoji:'👟',mat:'paper_burn',lv:2},
  nuigurumi:{name:'こわれたぬいぐるみ',emoji:'🧸',mat:'paper_burn',lv:2},

  tv:{name:'こわれたテレビ',emoji:'📺',mat:'kaden',lv:3},
  fridge:{name:'古い冷蔵庫',emoji:'🧊',mat:'kaden',lv:3},
  washer:{name:'こわれた洗濯機',emoji:'🧺',mat:'kaden',lv:3},
  aircon:{name:'古いエアコン',emoji:'🌬️',mat:'kaden',lv:3},
  futon:{name:'古い布団',emoji:'🛏️',mat:'bulky',lv:3},
  bicycle:{name:'こわれた自転車',emoji:'🚲',mat:'bulky',lv:3},
  chair:{name:'こわれたイス',emoji:'🪑',mat:'bulky',lv:3},
  suitcase:{name:'こわれたスーツケース',emoji:'🧳',mat:'bulky',lv:3},
  battery:{name:'使い終わった乾電池',emoji:'🔋',mat:'depot',lv:3,danger:true},
  lighter:{name:'使い捨てライター',emoji:'🔥',mat:'depot',lv:3,danger:true},
  fluor:{name:'切れた蛍光灯',emoji:'💡',mat:'depot',lv:3,danger:true},
  pc:{name:'こわれたノートパソコン',emoji:'💻',mat:'pc',lv:3},
  desktop:{name:'デスクトップパソコン',emoji:'🖥️',mat:'pc',lv:3},
  printer:{name:'こわれたプリンター',emoji:'🖨️',mat:'bulky',lv:3},
  fan:{name:'こわれた扇風機',emoji:'🌀',mat:'bulky',lv:3},
  gamem:{name:'こわれたゲーム機',emoji:'🎮',mat:'bulky',lv:3},

  /* 使い終わった油：そのままは出せない → 処理してから燃えるごみ */
  abura_raw:{name:'使い終わった天ぷら油',emoji:'🫗',mat:'pretreat',lv:1,danger:true},
  abura_katameta:{name:'固めた油',emoji:'🧈',mat:'paper_burn',lv:1},
  abura_kami:{name:'新聞紙に吸わせた油',emoji:'🗞️',mat:'paper_burn',lv:1},
  abura_pan:{name:'フライパンに残った少しの油',emoji:'🧽',mat:'paper_burn',lv:1},

  /* 充電池が入っているもの：ふつうのごみに出すと発火する */
  mobilebatt:{name:'モバイルバッテリー',emoji:'🪫',mat:'libatt',lv:2,danger:true},
  handyfan:{name:'充電式のハンディファン',emoji:'💨',mat:'libatt',lv:2,danger:true},
  heattobacco:{name:'加熱式たばこ',emoji:'🚬',mat:'libatt',lv:2,danger:true},
  earphone:{name:'ワイヤレスイヤホン',emoji:'🎧',mat:'libatt',lv:2,danger:true},
  smartphone:{name:'こわれたスマートフォン',emoji:'📱',mat:'libatt',lv:2,danger:true}
};
const SPECIAL_MATS=['bulky','kaden','depot','pc','libatt','pretreat'];
const SPECIAL_BINS=[
  {id:'pretreat',label:'先に処理する',cls:'c-pretreat',ex:'使い終わった油は固めるか吸わせる。スプレー缶は使い切る。そのままでは出せない',lv:1},
  {id:'libatt',label:'充電池の回収へ',cls:'c-libatt',ex:'モバイルバッテリー・充電式の家電・加熱式たばこ。店や市の専用回収へ',lv:2},
  {id:'bulky',label:'役所に連絡',cls:'c-bulky',ex:'粗大ごみ（布団・自転車・大きな電化製品）。役所に申し込んで有料で出す',lv:3},
  {id:'kaden',label:'お店に連絡',cls:'c-kaden',ex:'テレビ・冷蔵庫・洗濯機・エアコンの4品目。お店が引き取り（有料）',lv:3},
  {id:'depot',label:'回収ボックスへ',cls:'c-depot',ex:'乾電池・ライター・蛍光灯。お店や施設の回収箱へ',lv:3},
  {id:'pc',label:'メーカーに連絡',cls:'c-pc',ex:'パソコン本体・モニター。メーカーが回収（無料のことも）',lv:3}
];
const MAT_WHY={
  bulky:'大きな家具や、家電4品目・パソコン以外の電化製品は「粗大ごみ」。役所に連絡して、有料で出します。',
  kaden:'テレビ・冷蔵庫・洗濯機・エアコンの4品目は、買ったお店や買いかえるお店に連絡して引き取ってもらいます（有料）。',
  pc:'パソコン本体とモニターは、メーカーに連絡して回収してもらいます（無料のことも）。プリンターは対象外で粗大ごみへ。',
  depot:'乾電池・ライター・蛍光灯などは、お店や施設の回収ボックスに入れます。',
  spray:'スプレー缶は中身を使い切ってから。街によって出す場所が違うので注意。穴をあけるかどうかは、市の案内にしたがってください。',
  libatt:'充電できる電池（リチウムイオン電池）が入っているものです。ふつうのごみに出すと、ごみ収集車やごみ処理場で発火します。店や市の専用の回収に出してください。',
  pretreat:'そのままでは出せないものです。「使い切る」「固める」「吸わせる」などの処理をしてから出します。'
};
const ITEM_WHY={
  pizzabox:'油で汚れた紙は古紙にできません。だから「燃えるゴミ」へ。',
  receipt:'レシートは感熱紙で、古紙としてリサイクルできません。「燃えるゴミ」へ。',
  habrush:'歯ブラシは小さなプラスチック製品。街によって出す場所が変わります。',
  cd:'CD・DVDはプラスチック製品。街によって出す場所が変わります。',
  mirror:'鏡はガラス（割れ物）。紙などに包んで、けがに注意して出します。',
  nuigurumi:'ぬいぐるみは古布ではなく「燃えるゴミ」です（大きければ粗大ごみ）。',
  shoes:'靴は多くの街で「燃えるゴミ」（大きいものは粗大ごみ）。',
  waribashi:'割り箸は木なので「燃えるゴミ」です。',

  milk:'紙パックは、洗って・切って開いて・かわかしてから「古紙」に出します。内側が銀色のものは資源にできないので、燃えるゴミへ。',
  abura_raw:'油はそのままでは出せません。冷ましてから、市販の凝固剤で固めるか、新聞紙や古い布に吸わせて「燃えるゴミ」へ。熱いまま袋に入れると発火することがあります。',
  abura_katameta:'凝固剤で固めた油は「燃えるゴミ」に出せます。冷えて固まってから袋に入れます。',
  abura_kami:'新聞紙や古い布に吸わせ、袋に入れて口をしばれば「燃えるゴミ」です。',
  abura_pan:'少しの油は、キッチンペーパーや新聞紙でふき取ってから洗います。ふき取った紙は「燃えるゴミ」へ。',
  spray_full:'中身が残ったまま出すと、収集車の中で爆発して火事になります。まず最後まで使い切ってください。',
  mobilebatt:'リチウムイオン電池が入っています。つぶれると激しく発火し、ごみの火事の原因でいちばん多いものです。ふつうのごみには絶対に入れません。',
  handyfan:'充電できるものには電池が入っています。分解すると危ないので、そのまま専用の回収へ。',
  heattobacco:'これも充電池が入っています。銘柄によってはお店が回収しています。',
  earphone:'小さくても充電池が入っています。ごみ袋に入れないでください。',
  smartphone:'充電池が入っています。中のデータを消してから、店や市の回収へ出します。'
};

/* 使い終わった油の出し方（学習用の補足） */
const OIL_TIP='油を流しに流すと、排水管がつまり、下水の処理にも大きな負担がかかります。'+
  '<b>①冷ます ②固める／新聞紙・古布に吸わせる ③袋の口をしばって燃えるゴミ</b>の順にします。'+
  '牛乳パックに新聞紙をつめて油を吸わせる方法もよく使われます。'+
  '市によっては、使い終わった油を集めている場所（拠点回収）もあります。';
/* 出す前に「処理」が必要なごみ。ok の選択をすると、処理ずみの品目に変わる。 */
const PREP={
  spray_full:{q:'中身が残っています。どうする？',sub:'そのままでは出せません',
    ok:[{i:'💨',t:'最後まで使い切る',to:'spray'}],
    traps:[{i:'🛍️',t:'そのまま袋へ',warn:true,why:'収集車の中でつぶれて爆発します。必ず使い切ってから出します。'},
           {i:'🕳️',t:'先に穴をあける',warn:true,why:'中身が残ったまま穴をあけると、火が出たり爆発したりします。まず使い切ってください。'}]},

  glassbroken:{q:'割れたガラス。どうやって出す？',sub:'集める人がけがをします',
    ok:[{i:'📄',t:'紙に包んで「キケン」と書く',to:'glassbroken'}],
    traps:[{i:'🛍️',t:'そのまま袋へ',warn:true,why:'袋がやぶれて、集める人がけがをします。紙に包んで「キケン」と書きます。'}]},

  mirror:{q:'割れた鏡。どうやって出す？',sub:'集める人がけがをします',
    ok:[{i:'📄',t:'紙に包んで「キケン」と書く',to:'mirror'}],
    traps:[{i:'🛍️',t:'そのまま袋へ',warn:true,why:'鏡はガラスです。包まないと、集める人がけがをします。'}]},

  bento:{q:'ソースがついています。どうする？',sub:'資源にするために',
    ok:[{i:'🚿',t:'かるく洗って乾かす',to:'bento'}],
    traps:[{i:'🛍️',t:'そのまま出す',why:'汚れたままだと資源になりません。かるくすすいで乾かします。'}]}
};

/* 順番どおりに押す手順。まちがいの選択肢は置かない（行程をそのまま覚えるため）。
   choose を持つ段は、どちらを選んでも正しい（＝方法が2つある）。 */
const PREP_SEQ={
  milk:{q:'紙パックを 出す じゅんび',sub:'上から じゅんばんに おします',steps:[
    {i:'🚿',t:'中を 水で洗う',note:'牛乳を のこさない'},
    {i:'✂️',t:'切って ひらく',note:'はさみで 平らに'},
    {i:'☀️',t:'かわかす',note:'ぬれたままは 出せない'}
  ]},
  abura_raw:{q:'油を出す じゅんび',sub:'上から じゅんばんに おします',steps:[
    {i:'🌡️',t:'冷ます',note:'熱いままは あぶない'},
    {choose:[{i:'🗞️',t:'新聞紙に吸わせる',to:'abura_kami'},
             {i:'🧈',t:'薬品で固める',to:'abura_katameta'}]},
    {i:'🎀',t:'袋の口をしばる',note:'もれないように'}
  ]}
};

const DANGER_WARN='この出し方は、ごみ収集車やごみ処理場の<b>火事・けが</b>につながります。ここはとくに気をつけてください。';
const CITIES=[
  {
    id:'fukuoka', name:'福岡市', region:'福岡県', emoji:'🌃', tag:'プラは燃える・缶は燃えない',
    lesson:'福岡市はプラを「燃えるごみ」で燃やし、缶は「燃えないごみ」。びんとペットボトルだけ1袋にまとめます。',
    bins:[
      {id:'burn',label:'燃える',cls:'c-burn',ex:'生ごみ・プラ全般・紙・古着',lv:1},
      {id:'nonburn',label:'燃えない',cls:'c-nonburn',ex:'缶・割れ物・金属・スプレー缶',lv:1},
      {id:'shigen',label:'びん・ペット',cls:'c-shigen',ex:'びんとペットボトル',lv:1}
    ],
    matMap:{food:'burn',pet:'shigen',plastic_pack:'burn',plastic_prod:'burn',can:'nonburn',glass:'shigen',
      broken:'nonburn',paper_rec:'burn',paper_burn:'burn',cloth:'burn',metal:'nonburn',spray:'nonburn'}
  },
  {
    id:'osaka', name:'大阪市', region:'大阪府', emoji:'🐙', tag:'缶・びん・ペットを資源ごみに一括！',
    lesson:'大阪市は缶・びん・ペットボトルを分けずに「資源ごみ」1袋へ。プラスチック容器だけ別（プラスチック資源）です。',
    bins:[
      {id:'burn',label:'普通ごみ',cls:'c-burn',ex:'生ごみ・紙おむつ・割れた食器',lv:1},
      {id:'shigen',label:'資源ごみ',cls:'c-shigen',ex:'缶・びん・ペット・金属',lv:1},
      {id:'plastic',label:'プラ資源',cls:'c-plastic',ex:'プラ容器・キャップ・トレイ',lv:1},
      {id:'paper',label:'古紙・衣類',cls:'c-paper',ex:'新聞・段ボール・古着',lv:2}
    ],
    matMap:{food:'burn',pet:'shigen',plastic_pack:'plastic',plastic_prod:'plastic',can:'shigen',glass:'shigen',
      broken:'burn',paper_rec:'paper',paper_burn:'burn',cloth:'paper',metal:'shigen',spray:'shigen'}
  },
  {
    id:'tokyo', name:'東京（新宿区）', region:'東京都', emoji:'🗼', tag:'標準的。プラは分けて資源に',
    lesson:'東京ではプラ容器は「プラ資源」、ペットボトルは「びん・缶・ペット」。区ごとに違うので引っ越したら要確認。',
    bins:[
      {id:'burn',label:'可燃',cls:'c-burn',ex:'生ごみ・紙おむつ・汚れた紙',lv:1},
      {id:'shigen',label:'びん缶ペット',cls:'c-shigen',ex:'びん・缶・ペットボトル本体',lv:1},
      {id:'plastic',label:'プラ資源',cls:'c-plastic',ex:'プラ容器・キャップ・トレイ',lv:1},
      {id:'nonburn',label:'不燃',cls:'c-nonburn',ex:'割れガラス・金属・スプレー缶',lv:2},
      {id:'paper',label:'古紙',cls:'c-paper',ex:'新聞・段ボール・古着',lv:2}
    ],
    matMap:{food:'burn',pet:'shigen',plastic_pack:'plastic',plastic_prod:'plastic',can:'shigen',glass:'shigen',
      broken:'nonburn',paper_rec:'paper',paper_burn:'burn',cloth:'paper',metal:'nonburn',spray:'nonburn'}
  },
  {
    id:'nagoya', name:'名古屋市', region:'愛知県', emoji:'🏯', tag:'分別が細かい。発火性危険ごみに注意！',
    lesson:'名古屋市は分別が細かい街。スプレー缶やライターは可燃でも不燃でもなく「発火性危険ごみ」に出します。',
    bins:[
      {id:'burn',label:'可燃',cls:'c-burn',ex:'生ごみ・紙おむつ',lv:1},
      {id:'shigen',label:'缶びんペット',cls:'c-shigen',ex:'缶・びん・ペットボトル',lv:1},
      {id:'plastic',label:'容器包装プラ',cls:'c-plastic',ex:'プラ容器・キャップ・トレイ',lv:1},
      {id:'nonburn',label:'不燃',cls:'c-nonburn',ex:'割れガラス・陶器・製品プラ',lv:2},
      {id:'paper',label:'紙・布',cls:'c-paper',ex:'新聞・段ボール・古着',lv:2},
      {id:'hazard',label:'発火性危険',cls:'c-hazard',ex:'スプレー缶・ライター',lv:2}
    ],
    matMap:{food:'burn',pet:'shigen',plastic_pack:'plastic',plastic_prod:'nonburn',can:'shigen',glass:'shigen',
      broken:'nonburn',paper_rec:'paper',paper_burn:'burn',cloth:'paper',metal:'nonburn',spray:'hazard'}
  },
  {
    id:'shunan', name:'周南市', region:'山口県', emoji:'🏭', tag:'プラを2種類に分ける！分別しっかり都市',
    lesson:'周南市はプラを「容器包装プラ（プラマークあり）」と「その他プラ（製品プラ）」に分けます。びんと缶は一緒でもペットボトルは別。乾電池・ライター・こわれ物は「処理困難物」へ。',
    bins:[
      {id:'burn',label:'燃やせる',cls:'c-burn',ex:'生ごみ・紙おむつ・汚れた布',lv:1},
      {id:'petb',label:'ペットボトル',cls:'c-shigen',ex:'ペットボトル本体（単独で）',lv:1},
      {id:'yoki',label:'容器包装プラ',cls:'c-plastic',ex:'プラマークのある容器・トレイ',lv:1},
      {id:'bincan',label:'びん・缶類',cls:'c-shigen',ex:'びんとアルミ/スチール缶（一緒に）',lv:2},
      {id:'otherpla',label:'その他プラ',cls:'c-depot',ex:'プラマークのない製品プラ（バケツ等）',lv:2},
      {id:'nonburn',label:'燃やせない',cls:'c-nonburn',ex:'金属・フライパン・傘',lv:2},
      {id:'paper',label:'古紙・衣類',cls:'c-paper',ex:'新聞・段ボール・古着',lv:2},
      {id:'hazard',label:'処理困難物',cls:'c-hazard',ex:'乾電池・ライター・スプレー缶・こわれ物',lv:2}
    ],
    matMap:{food:'burn',pet:'petb',plastic_pack:'yoki',plastic_prod:'otherpla',can:'bincan',glass:'bincan',
      broken:'hazard',paper_rec:'paper',paper_burn:'burn',cloth:'paper',metal:'nonburn',spray:'hazard'},
    special:{depot:'hazard'}
  }
];

const BAGCOLORS={
  nagoya:{burn:'red',nonburn:'green',shigen:'blue',plastic:'clear',paper:'clear',hazard:'clear'},
  shunan:{burn:'green',nonburn:'blue',yoki:'yellow',otherpla:'yellow',petb:'clear',bincan:'clear',paper:'kraft',hazard:'clear'},
  fukuoka:{burn:'orange',nonburn:'blue',shigen:'green'},
  osaka:{burn:'clear',shigen:'clear',plastic:'clear',paper:'clear'},
  tokyo:{burn:'clear',shigen:'clear',plastic:'clear',nonburn:'clear',paper:'clear'}
};

/* ============ 多言語（母語での意味表示） ============
   訳語は、自治体が実際に多言語版のごみ案内で使っている表記に合わせている。
   参照した公的資料（TR.sources に保持）：
     尾張旭市 ごみ出しカレンダー「ごみの種類 各言語対応表」（英・中・葡・西・越・タガログ）
     西尾市 家庭用ごみ収集カレンダー（英・葡・中・越）
     田原市 生活ガイド インドネシア語版／岸和田市 ごみの出し方（タガログ語・韓国語）
     那須烏山市 ごみ分別 多言語表（英・中）
     千葉市 ごみ分別 韓国語版
     名古屋市 ごみの分け方・出し方（やさしい日本語）
   用語（単語）は標準語彙として使用。説明文は当サイトのオリジナル。
   日本語学習のサイトなので、日本語は消さずに残し、母語は「支え」として下に出す。
   訳語は品目名・区分名・安全にかかわる説明・手順・掲示のことばに限定している。 */
const TR={
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
   "id": "vi",
   "label": "Tiếng Việt"
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
   "id": "tl",
   "label": "Tagalog"
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
   "id": "zhHant",
   "label": "繁體中文"
  }
 ],
 "bins": {
  "可燃": {
   "en": "Burnable garbage",
   "zh": "可燃垃圾",
   "vi": "Rác cháy được",
   "ko": "타는 쓰레기",
   "pt": "Lixo combustível",
   "tl": "Nasusunog na basura",
   "es": "Basura quemable",
   "id": "Sampah yang bisa dibakar",
   "zhHant": "可燃垃圾"
  },
  "燃える": {
   "en": "Burnable garbage",
   "zh": "可燃垃圾",
   "vi": "Rác cháy được",
   "ko": "타는 쓰레기",
   "pt": "Lixo combustível",
   "tl": "Nasusunog na basura",
   "es": "Basura quemable",
   "id": "Sampah yang bisa dibakar",
   "zhHant": "可燃垃圾"
  },
  "燃やせる": {
   "en": "Burnable garbage",
   "zh": "可燃垃圾",
   "vi": "Rác cháy được",
   "ko": "타는 쓰레기",
   "pt": "Lixo combustível",
   "tl": "Nasusunog na basura",
   "es": "Basura quemable",
   "id": "Sampah yang bisa dibakar",
   "zhHant": "可燃垃圾"
  },
  "普通ごみ": {
   "en": "Burnable garbage",
   "zh": "可燃垃圾",
   "vi": "Rác cháy được",
   "ko": "타는 쓰레기",
   "pt": "Lixo combustível",
   "tl": "Nasusunog na basura",
   "es": "Basura quemable",
   "id": "Sampah yang bisa dibakar",
   "zhHant": "可燃垃圾"
  },
  "不燃": {
   "en": "Non-burnable garbage",
   "zh": "不可燃垃圾",
   "vi": "Rác không cháy được",
   "ko": "타지 않는 쓰레기",
   "pt": "Lixo não-combustível",
   "tl": "Hindi nasusunog na basura",
   "es": "Basura no quemable",
   "id": "Sampah yang tidak bisa dibakar",
   "zhHant": "不可燃垃圾"
  },
  "燃えない": {
   "en": "Non-burnable garbage",
   "zh": "不可燃垃圾",
   "vi": "Rác không cháy được",
   "ko": "타지 않는 쓰레기",
   "pt": "Lixo não-combustível",
   "tl": "Hindi nasusunog na basura",
   "es": "Basura no quemable",
   "id": "Sampah yang tidak bisa dibakar",
   "zhHant": "不可燃垃圾"
  },
  "燃やせない": {
   "en": "Non-burnable garbage",
   "zh": "不可燃垃圾",
   "vi": "Rác không cháy được",
   "ko": "타지 않는 쓰레기",
   "pt": "Lixo não-combustível",
   "tl": "Hindi nasusunog na basura",
   "es": "Basura no quemable",
   "id": "Sampah yang tidak bisa dibakar",
   "zhHant": "不可燃垃圾"
  },
  "プラ資源": {
   "en": "Plastic recyclables",
   "zh": "塑料制容器包装",
   "vi": "Nhựa tái chế",
   "ko": "플라스틱 자원",
   "pt": "Plástico reciclável",
   "tl": "Mga recyclable na plastik",
   "es": "Plástico reciclable",
   "id": "Plastik daur ulang",
   "zhHant": "塑膠回收物"
  },
  "容器包装プラ": {
   "en": "Plastic containers and packaging",
   "zh": "塑料制容器包装",
   "vi": "Bao bì nhựa",
   "ko": "용기포장 플라스틱",
   "pt": "Recipientes e embalagens de plástico",
   "tl": "Mga plastik na lalagyan at packaging",
   "es": "Envases de plástico",
   "id": "Wadah dan kemasan plastik",
   "zhHant": "塑膠容器與包裝"
  },
  "その他プラ": {
   "en": "Other plastics",
   "zh": "其他塑料制品",
   "vi": "Nhựa khác",
   "ko": "기타 플라스틱",
   "pt": "Outros plásticos",
   "tl": "Ibang mga plastik",
   "es": "Otros plásticos",
   "id": "Plastik lainnya",
   "zhHant": "其他塑膠製品"
  },
  "ペットボトル": {
   "en": "PET bottles",
   "zh": "塑料瓶（PET）",
   "vi": "Chai nhựa PET",
   "ko": "페트병",
   "pt": "Garrafas PET",
   "tl": "Mga PET bottle",
   "es": "Botellas PET",
   "id": "Botol PET",
   "zhHant": "塑膠瓶"
  },
  "びん・ペット": {
   "en": "Bottles and PET bottles",
   "zh": "空瓶・塑料瓶",
   "vi": "Chai rỗng và chai nhựa PET",
   "ko": "빈 병·페트병",
   "pt": "Garrafas de vidro e PET",
   "tl": "Bote at PET bottle",
   "es": "Botellas de vidrio y PET",
   "id": "Botol kaca dan botol PET",
   "zhHant": "玻璃瓶與塑膠瓶"
  },
  "びん・缶類": {
   "en": "Bottles and cans",
   "zh": "空瓶・空罐",
   "vi": "Chai rỗng và lon rỗng",
   "ko": "빈 병·빈 캔",
   "pt": "Garrafas de vidro e latas",
   "tl": "Bote at lata",
   "es": "Botellas y latas",
   "id": "Botol dan kaleng",
   "zhHant": "玻璃瓶與鐵鋁罐"
  },
  "びん缶ペット": {
   "en": "Bottles, cans and PET bottles",
   "zh": "空瓶・空罐・塑料瓶",
   "vi": "Chai, lon và chai nhựa PET",
   "ko": "병·캔·페트병",
   "pt": "Vidro, latas e PET",
   "tl": "Bote, lata at PET bottle",
   "es": "Botellas, latas y PET",
   "id": "Botol, kaleng dan botol PET",
   "zhHant": "玻璃瓶、鐵鋁罐與塑膠瓶"
  },
  "缶びんペット": {
   "en": "Cans, bottles and PET bottles",
   "zh": "空罐・空瓶・塑料瓶",
   "vi": "Lon, chai và chai nhựa PET",
   "ko": "캔·병·페트병",
   "pt": "Latas, vidro e PET",
   "tl": "Lata, bote at PET bottle",
   "es": "Latas, botellas y PET",
   "id": "Kaleng, botol dan botol PET",
   "zhHant": "鐵鋁罐、玻璃瓶與塑膠瓶"
  },
  "資源ごみ": {
   "en": "Recyclables",
   "zh": "资源类废弃物",
   "vi": "Rác tái chế",
   "ko": "자원 쓰레기",
   "pt": "Lixo reciclável",
   "tl": "Mga recyclable na basura",
   "es": "Basura reciclable",
   "id": "Sampah daur ulang",
   "zhHant": "資源回收物"
  },
  "古紙": {
   "en": "Waste paper",
   "zh": "纸类",
   "vi": "Các loại giấy",
   "ko": "폐지",
   "pt": "Papéis",
   "tl": "Gamit na papel",
   "es": "Papel usado",
   "id": "Kertas bekas",
   "zhHant": "廢紙"
  },
  "古紙・衣類": {
   "en": "Paper and cloth",
   "zh": "纸类・布类",
   "vi": "Các loại giấy và các loại vải",
   "ko": "폐지·의류",
   "pt": "Papéis e tecidos",
   "tl": "Gamit na papel at lumang damit",
   "es": "Papel usado y ropa",
   "id": "Kertas bekas dan pakaian",
   "zhHant": "廢紙與舊衣物"
  },
  "紙・布": {
   "en": "Paper and cloth",
   "zh": "纸类・布类",
   "vi": "Các loại giấy và các loại vải",
   "ko": "폐지·의류",
   "pt": "Papéis e tecidos",
   "tl": "Papel at tela",
   "es": "Papel y tela",
   "id": "Kertas dan kain",
   "zhHant": "紙類與布類"
  },
  "発火性危険": {
   "en": "Fire-hazard waste",
   "zh": "易燃危险垃圾",
   "vi": "Rác dễ cháy nổ",
   "ko": "발화성 위험 쓰레기",
   "pt": "Lixo inflamável",
   "tl": "Nasusunog na mapanganib na bagay",
   "es": "Materiales peligrosos inflamables",
   "id": "Barang berbahaya mudah terbakar",
   "zhHant": "易燃危險垃圾"
  },
  "処理困難物": {
   "en": "Hard-to-process waste",
   "zh": "难处理垃圾",
   "vi": "Rác khó xử lý",
   "ko": "처리곤란 쓰레기",
   "pt": "Lixo de difícil tratamento",
   "tl": "Mahirap iprosesong basura",
   "es": "Residuos difíciles de tratar",
   "id": "Sampah yang sulit diolah",
   "zhHant": "難處理垃圾"
  },
  "先に処理する": {
   "en": "Treat it first",
   "zh": "先做处理",
   "vi": "Xử lý trước",
   "ko": "먼저 처리하기",
   "pt": "Trate antes",
   "tl": "Ihanda muna",
   "es": "Prepare primero",
   "id": "Olah dulu",
   "zhHant": "先行處理"
  },
  "充電池の回収へ": {
   "en": "To rechargeable-battery collection",
   "zh": "送充电电池回收点",
   "vi": "Đến nơi thu gom pin sạc",
   "ko": "충전지 수거함으로",
   "pt": "Ao ponto de coleta de baterias recarregáveis",
   "tl": "Sa koleksyon ng rechargeable battery",
   "es": "A la recogida de baterías recargables",
   "id": "Ke pengumpulan baterai isi ulang",
   "zhHant": "送充電電池回收點"
  },
  "回収ボックスへ": {
   "en": "To the collection box",
   "zh": "投入回收箱",
   "vi": "Bỏ vào hộp thu gom",
   "ko": "수거함으로",
   "pt": "Na caixa de coleta",
   "tl": "Sa collection box",
   "es": "A la caja de recogida",
   "id": "Ke kotak pengumpulan",
   "zhHant": "投入回收箱"
  },
  "役所に連絡": {
   "en": "Contact the city office",
   "zh": "联系市政府",
   "vi": "Liên hệ tòa thị chính",
   "ko": "시청에 연락",
   "pt": "Contate a prefeitura",
   "tl": "Makipag-ugnayan sa city hall",
   "es": "Contacte al ayuntamiento",
   "id": "Hubungi kantor kota",
   "zhHant": "聯絡市政府"
  },
  "お店に連絡": {
   "en": "Contact the shop",
   "zh": "联系购买的商店",
   "vi": "Liên hệ cửa hàng",
   "ko": "구입한 가게에 연락",
   "pt": "Contate a loja",
   "tl": "Makipag-ugnayan sa tindahan",
   "es": "Contacte a la tienda",
   "id": "Hubungi toko",
   "zhHant": "聯絡購買的商店"
  },
  "メーカーに連絡": {
   "en": "Contact the maker",
   "zh": "联系厂商",
   "vi": "Liên hệ nhà sản xuất",
   "ko": "제조사에 연락",
   "pt": "Contate o fabricante",
   "tl": "Makipag-ugnayan sa gumawa",
   "es": "Contacte al fabricante",
   "id": "Hubungi produsen",
   "zhHant": "聯絡製造商"
  }
 },
 "items": {
  "nama": {
   "en": "Food scraps (vegetable)",
   "zh": "厨余垃圾（菜叶）",
   "vi": "Rác thực phẩm (vỏ rau)",
   "ko": "음식물 쓰레기(채소 찌꺼기)",
   "pt": "Restos de comida (legumes)",
   "tl": "Mga tira ng pagkain",
   "es": "Restos de comida",
   "id": "Sisa makanan",
   "zhHant": "廚餘（蔬菜碎屑）"
  },
  "pet": {
   "en": "PET bottles",
   "zh": "塑料瓶（PET）",
   "vi": "Chai nhựa PET",
   "ko": "페트병",
   "pt": "Garrafas PET",
   "tl": "PET bottle",
   "es": "Botella PET",
   "id": "Botol PET",
   "zhHant": "塑膠瓶"
  },
  "can": {
   "en": "Aluminium cans",
   "zh": "铝罐",
   "vi": "Lon nhôm",
   "ko": "알루미늄 캔",
   "pt": "Latas de alumínio",
   "tl": "Latang aluminyo",
   "es": "Lata de aluminio",
   "id": "Kaleng aluminium",
   "zhHant": "鋁罐"
  },
  "bine": {
   "en": "Glass bottles",
   "zh": "空瓶",
   "vi": "Chai thủy tinh",
   "ko": "빈 병",
   "pt": "Garrafas de vidro",
   "tl": "Boteng salamin",
   "es": "Botella de vidrio",
   "id": "Botol kaca",
   "zhHant": "玻璃瓶"
  },
  "bento": {
   "en": "Plastic bento tray",
   "zh": "塑料便当盒",
   "vi": "Hộp cơm nhựa",
   "ko": "플라스틱 도시락 용기",
   "pt": "Marmita de plástico",
   "tl": "Plastik na lalagyan ng pagkain",
   "es": "Envase de plástico para comida",
   "id": "Wadah bento plastik",
   "zhHant": "塑膠便當盒"
  },
  "cap": {
   "en": "Bottle cap",
   "zh": "塑料瓶盖",
   "vi": "Nắp chai nhựa",
   "ko": "페트병 뚜껑",
   "pt": "Tampa de garrafa",
   "tl": "Takip ng bote",
   "es": "Tapa de botella",
   "id": "Tutup botol",
   "zhHant": "瓶蓋"
  },
  "news": {
   "en": "Newspaper",
   "zh": "报纸",
   "vi": "Báo",
   "ko": "신문지",
   "pt": "Jornais",
   "tl": "Diyaryo",
   "es": "Periódico",
   "id": "Koran",
   "zhHant": "報紙"
  },
  "cardb": {
   "en": "Cardboard",
   "zh": "纸板",
   "vi": "Thùng carton",
   "ko": "골판지",
   "pt": "Papelão",
   "tl": "Karton",
   "es": "Cartón",
   "id": "Kardus",
   "zhHant": "紙箱"
  },
  "zasshi": {
   "en": "Magazines and misc. paper",
   "zh": "杂志・杂纸",
   "vi": "Tạp chí và giấy vụn",
   "ko": "잡지·잡종이",
   "pt": "Revistas e papéis diversos",
   "tl": "Magasin",
   "es": "Revista",
   "id": "Majalah",
   "zhHant": "雜誌"
  },
  "milk": {
   "en": "Paper cartons",
   "zh": "纸包装",
   "vi": "Hộp giấy",
   "ko": "종이팩",
   "pt": "Cartonados",
   "tl": "Karton ng gatas",
   "es": "Cartón de leche",
   "id": "Karton susu",
   "zhHant": "紙盒包裝"
  },
  "tray": {
   "en": "Foam food tray",
   "zh": "泡沫食品托盘",
   "vi": "Khay xốp đựng thực phẩm",
   "ko": "스티로폼 식품 트레이",
   "pt": "Bandeja de isopor",
   "tl": "Tray na styrofoam",
   "es": "Bandeja de espuma",
   "id": "Nampan busa",
   "zhHant": "發泡膠食品托盤"
  },
  "cupmen": {
   "en": "Instant noodle cup",
   "zh": "泡面碗",
   "vi": "Cốc mì ăn liền",
   "ko": "컵라면 용기",
   "pt": "Copo de macarrão instantâneo",
   "tl": "Lalagyan ng cup noodles",
   "es": "Vaso de fideos instantáneos",
   "id": "Wadah mi instan",
   "zhHant": "杯麵容器"
  },
  "okashi": {
   "en": "Snack bag",
   "zh": "零食袋",
   "vi": "Túi bánh kẹo",
   "ko": "과자 봉지",
   "pt": "Embalagem de salgadinho",
   "tl": "Supot ng meryenda",
   "es": "Bolsa de snacks",
   "id": "Bungkus makanan ringan",
   "zhHant": "零食包裝袋"
  },
  "omutsu": {
   "en": "Used diaper",
   "zh": "用过的纸尿裤",
   "vi": "Bỉm đã dùng",
   "ko": "사용한 기저귀",
   "pt": "Fralda usada",
   "tl": "Gamit na lampin",
   "es": "Pañal usado",
   "id": "Popok bekas",
   "zhHant": "用過的紙尿褲"
  },
  "tissue": {
   "en": "Used tissue",
   "zh": "用过的纸巾",
   "vi": "Giấy ăn đã dùng",
   "ko": "사용한 휴지",
   "pt": "Lenço de papel usado",
   "tl": "Gamit na tissue",
   "es": "Pañuelo de papel usado",
   "id": "Tisu bekas",
   "zhHant": "用過的紙巾"
  },
  "glassbroken": {
   "en": "Broken glass cup",
   "zh": "打碎的玻璃杯",
   "vi": "Cốc thủy tinh vỡ",
   "ko": "깨진 유리컵",
   "pt": "Copo de vidro quebrado",
   "tl": "Basag na baso",
   "es": "Vaso de vidrio roto",
   "id": "Gelas kaca pecah",
   "zhHant": "破掉的玻璃杯"
  },
  "chawan": {
   "en": "Broken ceramic bowl",
   "zh": "打碎的陶瓷碗",
   "vi": "Bát sứ vỡ",
   "ko": "깨진 도자기 그릇",
   "pt": "Tigela de cerâmica quebrada",
   "tl": "Basag na mangkok na seramika",
   "es": "Tazón de cerámica roto",
   "id": "Mangkuk keramik pecah",
   "zhHant": "破掉的陶瓷碗"
  },
  "spray": {
   "en": "Spray cans (empty)",
   "zh": "喷雾罐（空）",
   "vi": "Lon xịt (đã hết)",
   "ko": "스프레이 캔(빈 것)",
   "pt": "Latas de spray (vazias)",
   "tl": "Spray can (walang laman)",
   "es": "Lata de aerosol (vacía)",
   "id": "Kaleng semprot (kosong)",
   "zhHant": "噴霧罐（已用完）"
  },
  "spray_full": {
   "en": "Spray can with contents left",
   "zh": "还有残留的喷雾罐",
   "vi": "Lon xịt còn chất bên trong",
   "ko": "내용물이 남은 스프레이 캔",
   "pt": "Lata de spray com conteúdo",
   "tl": "Spray can na may laman pa",
   "es": "Lata de aerosol con contenido",
   "id": "Kaleng semprot yang masih berisi",
   "zhHant": "仍有殘留的噴霧罐"
  },
  "cloth": {
   "en": "Fabric products",
   "zh": "旧衣物",
   "vi": "Các loại vải",
   "ko": "의류",
   "pt": "Tecidos",
   "tl": "Lumang damit",
   "es": "Ropa usada",
   "id": "Pakaian bekas",
   "zhHant": "舊衣物"
  },
  "frypan": {
   "en": "Worn-out frying pan",
   "zh": "用旧的平底锅",
   "vi": "Chảo cũ",
   "ko": "낡은 프라이팬",
   "pt": "Frigideira velha",
   "tl": "Lumang kawali",
   "es": "Sartén viejo",
   "id": "Wajan lama",
   "zhHant": "用舊的平底鍋"
  },
  "bucket": {
   "en": "Plastic bucket",
   "zh": "塑料水桶",
   "vi": "Xô nhựa",
   "ko": "플라스틱 양동이",
   "pt": "Balde de plástico",
   "tl": "Plastik na balde",
   "es": "Cubo de plástico",
   "id": "Ember plastik",
   "zhHant": "塑膠水桶"
  },
  "toy": {
   "en": "Broken toy car",
   "zh": "坏掉的玩具车",
   "vi": "Ô tô đồ chơi hỏng",
   "ko": "고장난 장난감 자동차",
   "pt": "Carrinho de brinquedo quebrado",
   "tl": "Sirang laruang kotse",
   "es": "Coche de juguete roto",
   "id": "Mobil mainan rusak",
   "zhHant": "壞掉的玩具車"
  },
  "habrush": {
   "en": "Toothbrush",
   "zh": "牙刷",
   "vi": "Bàn chải đánh răng",
   "ko": "칫솔",
   "pt": "Escova de dentes",
   "tl": "Sipilyo",
   "es": "Cepillo de dientes",
   "id": "Sikat gigi",
   "zhHant": "牙刷"
  },
  "cd": {
   "en": "Unwanted CD or DVD",
   "zh": "不要的CD・DVD",
   "vi": "Đĩa CD hoặc DVD không dùng",
   "ko": "필요 없는 CD·DVD",
   "pt": "CD ou DVD sem uso",
   "tl": "CD o DVD",
   "es": "CD o DVD",
   "id": "CD atau DVD",
   "zhHant": "不要的CD・DVD"
  },
  "mirror": {
   "en": "Broken mirror",
   "zh": "打碎的镜子",
   "vi": "Gương vỡ",
   "ko": "깨진 거울",
   "pt": "Espelho quebrado",
   "tl": "Basag na salamin",
   "es": "Espejo roto",
   "id": "Cermin pecah",
   "zhHant": "破掉的鏡子"
  },
  "waribashi": {
   "en": "Used disposable chopsticks",
   "zh": "用过的一次性筷子",
   "vi": "Đũa dùng một lần đã dùng",
   "ko": "사용한 나무젓가락",
   "pt": "Hashi descartável usado",
   "tl": "Gamit na disposable chopsticks",
   "es": "Palillos desechables usados",
   "id": "Sumpit sekali pakai bekas",
   "zhHant": "用過的免洗筷"
  },
  "pizzabox": {
   "en": "Greasy pizza box",
   "zh": "沾油的披萨盒",
   "vi": "Hộp pizza dính dầu mỡ",
   "ko": "기름 묻은 피자 상자",
   "pt": "Caixa de pizza engordurada",
   "tl": "Kahon ng pizza na may mantika",
   "es": "Caja de pizza con grasa",
   "id": "Kotak pizza berminyak",
   "zhHant": "沾油的薄餅盒"
  },
  "receipt": {
   "en": "Receipt (thermal paper)",
   "zh": "收据（热敏纸）",
   "vi": "Hóa đơn (giấy nhiệt)",
   "ko": "영수증(감열지)",
   "pt": "Recibo (papel térmico)",
   "tl": "Resibo",
   "es": "Recibo",
   "id": "Struk belanja",
   "zhHant": "收據（熱感應紙）"
  },
  "shoes": {
   "en": "Worn-out shoes",
   "zh": "穿旧的鞋",
   "vi": "Giày cũ",
   "ko": "낡은 신발",
   "pt": "Sapatos velhos",
   "tl": "Lumang sapatos",
   "es": "Zapatos viejos",
   "id": "Sepatu lama",
   "zhHant": "穿舊的鞋"
  },
  "nuigurumi": {
   "en": "Broken stuffed toy",
   "zh": "破损的毛绒玩具",
   "vi": "Thú nhồi bông hỏng",
   "ko": "망가진 인형",
   "pt": "Bicho de pelúcia estragado",
   "tl": "Sirang stuffed toy",
   "es": "Peluche roto",
   "id": "Boneka rusak",
   "zhHant": "破損的毛公仔"
  },
  "tv": {
   "en": "Broken TV",
   "zh": "坏掉的电视",
   "vi": "Tivi hỏng",
   "ko": "고장난 TV",
   "pt": "TV quebrada",
   "tl": "Sirang telebisyon",
   "es": "Televisor roto",
   "id": "Televisi rusak",
   "zhHant": "壞掉的電視"
  },
  "fridge": {
   "en": "Old refrigerator",
   "zh": "旧冰箱",
   "vi": "Tủ lạnh cũ",
   "ko": "오래된 냉장고",
   "pt": "Geladeira velha",
   "tl": "Lumang refrigerator",
   "es": "Refrigerador viejo",
   "id": "Kulkas lama",
   "zhHant": "舊雪櫃"
  },
  "washer": {
   "en": "Broken washing machine",
   "zh": "坏掉的洗衣机",
   "vi": "Máy giặt hỏng",
   "ko": "고장난 세탁기",
   "pt": "Máquina de lavar quebrada",
   "tl": "Sirang washing machine",
   "es": "Lavadora rota",
   "id": "Mesin cuci rusak",
   "zhHant": "壞掉的洗衣機"
  },
  "aircon": {
   "en": "Old air conditioner",
   "zh": "旧空调",
   "vi": "Điều hòa cũ",
   "ko": "오래된 에어컨",
   "pt": "Ar-condicionado velho",
   "tl": "Lumang aircon",
   "es": "Aire acondicionado viejo",
   "id": "AC lama",
   "zhHant": "舊冷氣機"
  },
  "futon": {
   "en": "Old futon bedding",
   "zh": "旧被褥",
   "vi": "Chăn đệm cũ",
   "ko": "오래된 이불",
   "pt": "Futon velho",
   "tl": "Lumang futon",
   "es": "Futón viejo",
   "id": "Futon lama",
   "zhHant": "舊棉被"
  },
  "bicycle": {
   "en": "Broken bicycle",
   "zh": "坏掉的自行车",
   "vi": "Xe đạp hỏng",
   "ko": "고장난 자전거",
   "pt": "Bicicleta quebrada",
   "tl": "Sirang bisikleta",
   "es": "Bicicleta rota",
   "id": "Sepeda rusak",
   "zhHant": "壞掉的單車"
  },
  "chair": {
   "en": "Broken chair",
   "zh": "坏掉的椅子",
   "vi": "Ghế hỏng",
   "ko": "부서진 의자",
   "pt": "Cadeira quebrada",
   "tl": "Sirang upuan",
   "es": "Silla rota",
   "id": "Kursi rusak",
   "zhHant": "壞掉的椅子"
  },
  "suitcase": {
   "en": "Broken suitcase",
   "zh": "坏掉的行李箱",
   "vi": "Vali hỏng",
   "ko": "망가진 여행가방",
   "pt": "Mala quebrada",
   "tl": "Sirang maleta",
   "es": "Maleta rota",
   "id": "Koper rusak",
   "zhHant": "壞掉的行李箱"
  },
  "battery": {
   "en": "Used dry-cell battery",
   "zh": "用完的干电池",
   "vi": "Pin đã dùng hết",
   "ko": "다 쓴 건전지",
   "pt": "Pilha usada",
   "tl": "Gamit na baterya",
   "es": "Pila usada",
   "id": "Baterai bekas",
   "zhHant": "用完的乾電池"
  },
  "lighter": {
   "en": "Disposable lighter",
   "zh": "一次性打火机",
   "vi": "Bật lửa dùng một lần",
   "ko": "일회용 라이터",
   "pt": "Isqueiro descartável",
   "tl": "Disposable na lighter",
   "es": "Encendedor desechable",
   "id": "Korek api sekali pakai",
   "zhHant": "即棄打火機"
  },
  "fluor": {
   "en": "Burnt-out fluorescent tube",
   "zh": "坏掉的荧光灯管",
   "vi": "Bóng đèn huỳnh quang cháy",
   "ko": "다 된 형광등",
   "pt": "Lâmpada fluorescente queimada",
   "tl": "Sirang fluorescent lamp",
   "es": "Tubo fluorescente fundido",
   "id": "Lampu neon mati",
   "zhHant": "壞掉的光管"
  },
  "pc": {
   "en": "Broken laptop",
   "zh": "坏掉的笔记本电脑",
   "vi": "Laptop hỏng",
   "ko": "고장난 노트북",
   "pt": "Notebook quebrado",
   "tl": "Sirang laptop",
   "es": "Portátil roto",
   "id": "Laptop rusak",
   "zhHant": "壞掉的手提電腦"
  },
  "desktop": {
   "en": "Desktop computer",
   "zh": "台式电脑",
   "vi": "Máy tính để bàn",
   "ko": "데스크톱 PC",
   "pt": "Computador de mesa",
   "tl": "Desktop computer",
   "es": "Computadora de escritorio",
   "id": "Komputer desktop",
   "zhHant": "桌上電腦"
  },
  "printer": {
   "en": "Broken printer",
   "zh": "坏掉的打印机",
   "vi": "Máy in hỏng",
   "ko": "고장난 프린터",
   "pt": "Impressora quebrada",
   "tl": "Sirang printer",
   "es": "Impresora rota",
   "id": "Printer rusak",
   "zhHant": "壞掉的打印機"
  },
  "fan": {
   "en": "Broken electric fan",
   "zh": "坏掉的电风扇",
   "vi": "Quạt điện hỏng",
   "ko": "고장난 선풍기",
   "pt": "Ventilador quebrado",
   "tl": "Sirang electric fan",
   "es": "Ventilador roto",
   "id": "Kipas angin rusak",
   "zhHant": "壞掉的風扇"
  },
  "gamem": {
   "en": "Broken game console",
   "zh": "坏掉的游戏机",
   "vi": "Máy chơi game hỏng",
   "ko": "고장난 게임기",
   "pt": "Videogame quebrado",
   "tl": "Sirang game console",
   "es": "Consola de videojuegos rota",
   "id": "Konsol game rusak",
   "zhHant": "壞掉的遊戲機"
  },
  "abura_raw": {
   "en": "Used cooking oil",
   "zh": "用过的食用油",
   "vi": "Dầu ăn đã qua sử dụng",
   "ko": "사용한 튀김 기름",
   "pt": "Óleo de fritura usado",
   "tl": "Gamit na mantika sa pagluluto",
   "es": "Aceite de cocina usado",
   "id": "Minyak goreng bekas",
   "zhHant": "用過的食油"
  },
  "abura_katameta": {
   "en": "Solidified oil",
   "zh": "凝固后的油",
   "vi": "Dầu đã làm đông",
   "ko": "굳힌 기름",
   "pt": "Óleo solidificado",
   "tl": "Pinatigas na mantika",
   "es": "Aceite solidificado",
   "id": "Minyak yang dipadatkan",
   "zhHant": "凝固後的油"
  },
  "abura_kami": {
   "en": "Oil soaked into newspaper",
   "zh": "用报纸吸掉的油",
   "vi": "Dầu thấm vào giấy báo",
   "ko": "신문지에 흡수시킨 기름",
   "pt": "Óleo absorvido em jornal",
   "tl": "Mantikang sinipsip ng diyaryo",
   "es": "Aceite absorbido en periódico",
   "id": "Minyak yang diserap koran",
   "zhHant": "用報紙吸乾的油"
  },
  "abura_pan": {
   "en": "A little oil left in the pan",
   "zh": "平底锅里剩下的少量油",
   "vi": "Chút dầu còn lại trong chảo",
   "ko": "프라이팬에 남은 소량의 기름",
   "pt": "Pouco óleo na frigideira",
   "tl": "Kaunting mantika sa kawali",
   "es": "Poco aceite en la sartén",
   "id": "Sedikit minyak di wajan",
   "zhHant": "平底鍋裡剩下的少量油"
  },
  "mobilebatt": {
   "en": "Power bank",
   "zh": "移动电源",
   "vi": "Pin sạc dự phòng",
   "ko": "보조배터리",
   "pt": "Power bank",
   "tl": "Power bank",
   "es": "Batería portátil",
   "id": "Power bank",
   "zhHant": "外置充電器"
  },
  "handyfan": {
   "en": "Rechargeable handheld fan",
   "zh": "充电式手持风扇",
   "vi": "Quạt cầm tay sạc điện",
   "ko": "충전식 휴대용 선풍기",
   "pt": "Ventilador portátil recarregável",
   "tl": "Rechargeable na handy fan",
   "es": "Ventilador de mano recargable",
   "id": "Kipas tangan isi ulang",
   "zhHant": "充電式手提風扇"
  },
  "heattobacco": {
   "en": "Heated tobacco device",
   "zh": "加热式电子烟",
   "vi": "Thiết bị thuốc lá nung nóng",
   "ko": "가열식 담배",
   "pt": "Dispositivo de tabaco aquecido",
   "tl": "Heated tobacco device",
   "es": "Dispositivo de tabaco calentado",
   "id": "Perangkat tembakau panas",
   "zhHant": "加熱煙"
  },
  "earphone": {
   "en": "Wireless earbuds",
   "zh": "无线耳机",
   "vi": "Tai nghe không dây",
   "ko": "무선 이어폰",
   "pt": "Fones de ouvido sem fio",
   "tl": "Wireless earphone",
   "es": "Auriculares inalámbricos",
   "id": "Earphone nirkabel",
   "zhHant": "無線耳機"
  },
  "smartphone": {
   "en": "Broken smartphone (small appliance)",
   "zh": "坏掉的智能手机（小型家电）",
   "vi": "Điện thoại hỏng (đồ điện gia dụng cỡ nhỏ)",
   "ko": "고장난 스마트폰(소형가전)",
   "pt": "Smartphone quebrado (eletrodoméstico de pequeno porte)",
   "tl": "Sirang smartphone",
   "es": "Teléfono inteligente roto",
   "id": "Ponsel pintar rusak",
   "zhHant": "壞掉的智能電話"
  }
 },
 "safety": {
  "libatt": {
   "en": "This contains a lithium-ion battery. If it is crushed it can catch fire violently. It is the most common cause of fires in garbage trucks and waste plants. Never put it in normal household waste.",
   "zh": "内含锂离子电池。一旦被压坏就会剧烈起火，是垃圾车和垃圾处理厂火灾最常见的原因。绝对不要丢进普通垃圾。",
   "vi": "Bên trong có pin lithium-ion. Nếu bị bóp méo, nó có thể bốc cháy dữ dội. Đây là nguyên nhân cháy phổ biến nhất ở xe rác và nhà máy xử lý rác. Tuyệt đối không bỏ vào rác thường.",
   "ko": "리튬이온 배터리가 들어 있습니다. 눌리면 격렬하게 발화하며, 쓰레기차와 처리장 화재의 가장 큰 원인입니다. 절대로 일반 쓰레기에 넣지 마세요.",
   "pt": "Contém uma bateria de íon-lítio. Se for amassada, pode pegar fogo violentamente. É a causa mais comum de incêndios em caminhões e usinas de lixo. Nunca coloque no lixo comum.",
   "tl": "May lithium-ion battery ito. Kapag nadurog, maaari itong mag-apoy nang malakas. Ito ang pinakakaraniwang sanhi ng sunog sa mga trak ng basura at pasilidad ng basura. Huwag na huwag itong ilagay sa karaniwang basura.",
   "es": "Contiene una batería de iones de litio. Si se aplasta, puede incendiarse con violencia. Es la causa más común de incendios en camiones y plantas de basura. Nunca la ponga en la basura común.",
   "id": "Ini berisi baterai lithium-ion. Jika penyok, baterai dapat terbakar hebat. Ini penyebab kebakaran paling umum pada truk sampah dan fasilitas pengolahan sampah. Jangan pernah membuangnya ke sampah biasa.",
   "zhHant": "內含鋰離子電池。一旦被壓毀就會劇烈起火，是垃圾車和垃圾處理廠火災最常見的原因。絕對不要丟進普通垃圾。"
  },
  "oil": {
   "en": "Never pour cooking oil down the sink: it clogs the pipes and burdens the sewage system. Let it cool, then solidify it or soak it into newspaper or old cloth, tie the bag shut, and put it in burnable waste.",
   "zh": "不要把食用油倒进水槽，会堵塞排水管，也会加重污水处理的负担。请先放凉，用凝固剂使其凝固，或用报纸、旧布吸干，把袋口扎紧后作为可燃垃圾丢弃。",
   "vi": "Không đổ dầu ăn xuống bồn rửa: dầu làm tắc đường ống và gây tải nặng cho hệ thống nước thải. Hãy để nguội, làm đông bằng chất làm đông hoặc thấm vào giấy báo, vải cũ, buộc kín miệng túi rồi bỏ vào rác cháy được.",
   "ko": "식용유를 싱크대에 버리지 마세요. 배관이 막히고 하수 처리에도 큰 부담이 됩니다. 식힌 뒤 응고제로 굳히거나 신문지·헌 천에 흡수시키고, 봉지 입구를 묶어서 타는 쓰레기로 버립니다.",
   "pt": "Nunca jogue óleo de cozinha na pia: entope os canos e sobrecarrega o sistema de esgoto. Deixe esfriar, solidifique com produto próprio ou absorva em jornal ou pano velho, feche bem o saco e descarte no lixo queimável.",
   "tl": "Huwag ibuhos ang mantika sa lababo: bumabara ang tubo at nabibigatan ang sistema ng dumi. Palamigin muna, patigasin gamit ang produkto o ipasipsip sa diyaryo o lumang tela, itali ang supot, at itapon sa nasusunog na basura.",
   "es": "No vierta el aceite en el fregadero: obstruye las tuberías y sobrecarga el alcantarillado. Déjelo enfriar, solidifíquelo o absórbalo con periódico o un paño viejo, cierre bien la bolsa y tírelo con la basura quemable.",
   "id": "Jangan buang minyak ke wastafel: pipa akan tersumbat dan membebani sistem air limbah. Dinginkan dulu, padatkan atau serap dengan koran atau kain bekas, ikat kantongnya, lalu buang ke sampah yang bisa dibakar.",
   "zhHant": "不要把食油倒進洗手盆，會堵塞排水管，也會加重污水處理的負擔。請先放涼，用凝固劑使其凝固，或用報紙、舊布吸乾，把袋口紮緊後當作可燃垃圾丟棄。"
  },
  "spray": {
   "en": "Use the can up completely before throwing it away. If contents are left inside, it can explode in the garbage truck and start a fire. Whether you should pierce a hole depends on your city, so follow the local instructions.",
   "zh": "丢弃前请把罐内的东西全部用完。如果还有残留，可能在垃圾车内爆炸引起火灾。是否需要扎孔各市规定不同，请按当地的说明处理。",
   "vi": "Hãy dùng hết bình trước khi bỏ. Nếu còn chất bên trong, bình có thể phát nổ trong xe rác và gây cháy. Việc có nên chọc lỗ hay không tùy theo từng thành phố, hãy làm theo hướng dẫn của địa phương.",
   "ko": "버리기 전에 내용물을 끝까지 다 사용하세요. 남아 있으면 쓰레기차 안에서 폭발해 화재가 날 수 있습니다. 구멍을 뚫어야 하는지는 시마다 다르므로 지역 안내에 따르세요.",
   "pt": "Use todo o conteúdo antes de descartar. Se sobrar produto dentro, a lata pode explodir no caminhão de lixo e causar incêndio. Se deve ou não furar a lata depende da cidade; siga as orientações locais.",
   "tl": "Ubusin muna ang laman bago itapon. Kung may natitirang laman, maaari itong sumabog sa loob ng trak ng basura at magdulot ng sunog. Ang pagbutas ay nag-iiba depende sa lungsod, kaya sundin ang lokal na patakaran.",
   "es": "Use todo el contenido antes de tirarla. Si queda producto dentro, puede explotar en el camión de basura y provocar un incendio. Si hay que perforarla depende de la ciudad; siga las indicaciones locales.",
   "id": "Habiskan isinya sebelum dibuang. Jika masih ada isinya, kaleng dapat meledak di dalam truk sampah dan menyebabkan kebakaran. Perlu dilubangi atau tidak berbeda tiap kota, ikuti petunjuk setempat.",
   "zhHant": "丟棄前請把罐內的東西全部用完。如果還有殘留，可能在垃圾車內爆炸引起火災。是否需要刺孔各市規定不同，請按當地的說明處理。"
  },
  "broken": {
   "en": "Wrap broken glass, mirrors, and blades in thick paper and write キケン (danger) on the outside. Otherwise the collection workers can be injured.",
   "zh": "碎玻璃、镜子和刀刃请用厚纸包好，并在外面写上「キケン」（危险）。否则收垃圾的工作人员会受伤。",
   "vi": "Hãy bọc thủy tinh vỡ, gương và lưỡi dao bằng giấy dày và ghi キケン (nguy hiểm) ở bên ngoài. Nếu không, người thu gom rác có thể bị thương.",
   "ko": "깨진 유리, 거울, 칼날은 두꺼운 종이에 싸고 겉에 キケン(위험)이라고 쓰세요. 그렇지 않으면 수거하는 분이 다칩니다.",
   "pt": "Embrulhe vidros quebrados, espelhos e lâminas em papel grosso e escreva キケン (perigo) do lado de fora. Caso contrário, os coletores podem se ferir.",
   "tl": "Balutin ang basag na salamin, salaming pansalamin, at talim sa makapal na papel at isulat sa labas ang キケン (mapanganib). Kung hindi, maaaring masugatan ang mga nangongolekta ng basura.",
   "es": "Envuelva los vidrios rotos, espejos y hojas afiladas en papel grueso y escriba キケン (peligro) por fuera. De lo contrario, los recolectores pueden lastimarse.",
   "id": "Bungkus kaca pecah, cermin, dan benda tajam dengan kertas tebal dan tulis キケン (berbahaya) di luarnya. Jika tidak, petugas pengumpul sampah bisa terluka.",
   "zhHant": "碎玻璃、鏡子和刀刃請用厚紙包好，並在外面寫上「キケン」（危險）。否則收垃圾的工作人員會受傷。"
  },
  "vary": {
   "en": "Sorting rules are different in every city and ward. Always check the rules where you live.",
   "zh": "垃圾分类的规定每个市区町村都不一样。请务必确认您居住地的规定。",
   "vi": "Quy định phân loại rác khác nhau ở từng thành phố, quận. Hãy luôn kiểm tra quy định nơi bạn đang sống.",
   "ko": "쓰레기 분리 규정은 시·구마다 다릅니다. 반드시 살고 있는 지역의 규정을 확인하세요.",
   "pt": "As regras de separação mudam em cada cidade e bairro. Confira sempre as regras do lugar onde você mora.",
   "tl": "Nag-iiba ang patakaran sa paghihiwalay ng basura sa bawat lungsod at distrito. Laging tingnan ang patakaran sa lugar na tinitirhan mo.",
   "es": "Las reglas de separación cambian en cada ciudad y distrito. Consulte siempre las reglas del lugar donde vive.",
   "id": "Aturan pemilahan sampah berbeda di tiap kota dan distrik. Selalu periksa aturan di tempat Anda tinggal.",
   "zhHant": "垃圾分類的規定每個市區町村都不一樣。請務必確認您居住地的規定。"
  },
  "night": {
   "en": "Do not put your garbage out the night before. Put it out on the morning of collection day, by the stated time.",
   "zh": "请不要在前一天晚上把垃圾拿出去。请在收集日当天早上，在规定时间之前拿出去。",
   "vi": "Đừng mang rác ra từ tối hôm trước. Hãy mang ra vào buổi sáng của ngày thu gom, trước giờ quy định.",
   "ko": "전날 밤에 쓰레기를 내놓지 마세요. 수거일 아침에 정해진 시간까지 내놓으세요.",
   "pt": "Não coloque o lixo na noite anterior. Coloque na manhã do dia da coleta, até o horário indicado.",
   "tl": "Huwag ilabas ang basura sa gabi bago ang araw ng koleksyon. Ilabas ito sa umaga ng araw ng koleksyon, bago ang nakatakdang oras.",
   "es": "No saque la basura la noche anterior. Sáquela la mañana del día de recolección, antes de la hora indicada.",
   "id": "Jangan keluarkan sampah pada malam sebelumnya. Keluarkan pada pagi hari di hari pengumpulan, sebelum waktu yang ditentukan.",
   "zhHant": "請不要在前一天晚上把垃圾拿出去。請在收集日當天早上，在規定時間之前拿出去。"
  }
 },
 "steps": {
  "冷ます": {
   "en": "Let it cool",
   "zh": "放凉",
   "vi": "Để nguội",
   "ko": "식히기",
   "pt": "Deixe esfriar",
   "tl": "Palamigin",
   "es": "Deje enfriar",
   "id": "Dinginkan",
   "zhHant": "放涼"
  },
  "新聞紙に吸わせる": {
   "en": "Soak it into newspaper",
   "zh": "用报纸吸掉",
   "vi": "Thấm vào giấy báo",
   "ko": "신문지에 흡수시키기",
   "pt": "Absorva em jornal",
   "tl": "Ipasipsip sa diyaryo",
   "es": "Absorba con periódico",
   "id": "Serap dengan koran",
   "zhHant": "用報紙吸乾"
  },
  "薬品で固める": {
   "en": "Solidify it with a product",
   "zh": "用凝固剂凝固",
   "vi": "Làm đông bằng chất làm đông",
   "ko": "응고제로 굳히기",
   "pt": "Solidifique com produto",
   "tl": "Patigasin gamit ang produkto",
   "es": "Solidifique con producto",
   "id": "Padatkan dengan bahan",
   "zhHant": "用凝固劑凝固"
  },
  "袋の口をしばる": {
   "en": "Tie the bag shut",
   "zh": "扎紧袋口",
   "vi": "Buộc kín miệng túi",
   "ko": "봉지 입구를 묶기",
   "pt": "Feche bem o saco",
   "tl": "Itali ang supot",
   "es": "Cierre la bolsa",
   "id": "Ikat kantongnya",
   "zhHant": "紮緊袋口"
  },
  "中を 水で洗う": {
   "en": "Rinse the inside with water",
   "zh": "用水冲洗内部",
   "vi": "Rửa bên trong bằng nước",
   "ko": "안을 물로 씻기",
   "pt": "Enxágue por dentro",
   "tl": "Hugasan ang loob ng tubig",
   "es": "Enjuague por dentro",
   "id": "Cuci bagian dalam",
   "zhHant": "用水沖洗內部"
  },
  "切って ひらく": {
   "en": "Cut it open and flatten it",
   "zh": "剪开压平",
   "vi": "Cắt ra và làm phẳng",
   "ko": "잘라서 펴기",
   "pt": "Corte e abra",
   "tl": "Gupitin at buksan",
   "es": "Corte y abra",
   "id": "Potong dan buka",
   "zhHant": "剪開攤平"
  },
  "かわかす": {
   "en": "Let it dry",
   "zh": "晾干",
   "vi": "Phơi khô",
   "ko": "말리기",
   "pt": "Deixe secar",
   "tl": "Patuyuin",
   "es": "Deje secar",
   "id": "Keringkan",
   "zhHant": "晾乾"
  },
  "最後まで使い切る": {
   "en": "Use it up completely",
   "zh": "全部用完",
   "vi": "Dùng hết hoàn toàn",
   "ko": "끝까지 다 쓰기",
   "pt": "Use até o fim",
   "tl": "Ubusin ang laman",
   "es": "Use todo el contenido",
   "id": "Habiskan isinya",
   "zhHant": "全部用完"
  },
  "紙に包んで「キケン」と書く": {
   "en": "Wrap in paper and write DANGER",
   "zh": "用纸包好写上「危险」",
   "vi": "Bọc giấy và ghi NGUY HIỂM",
   "ko": "종이에 싸고 위험이라고 쓰기",
   "pt": "Embrulhe e escreva PERIGO",
   "tl": "Balutin at isulat ang PELIGRO",
   "es": "Envuelva y escriba PELIGRO",
   "id": "Bungkus dan tulis BAHAYA",
   "zhHant": "用紙包好寫上「危險」"
  },
  "かるく洗って乾かす": {
   "en": "Rinse lightly and dry",
   "zh": "轻轻冲洗后晾干",
   "vi": "Rửa nhẹ rồi phơi khô",
   "ko": "살짝 씻어 말리기",
   "pt": "Enxágue e deixe secar",
   "tl": "Banlawan at patuyuin",
   "es": "Enjuague y seque",
   "id": "Bilas dan keringkan",
   "zhHant": "輕輕沖洗後晾乾"
  }
 },
 "signw": {
  "収集日": {
   "zh": "收集日",
   "vi": "ngày thu gom",
   "ko": "수거일",
   "pt": "dia da coleta",
   "tl": "Araw ng pagkolekta",
   "es": "Día de recolección",
   "id": "Hari pengumpulan",
   "zhHant": "收集日"
  },
  "指定袋": {
   "zh": "指定垃圾袋",
   "vi": "túi chỉ định",
   "ko": "지정봉투",
   "pt": "saco estabelecido",
   "tl": "Itinalagang supot",
   "es": "Bolsa designada",
   "id": "Kantong yang ditentukan",
   "zhHant": "指定垃圾袋"
  },
  "資源": {
   "zh": "资源类废弃物",
   "vi": "rác tái chế",
   "ko": "자원",
   "pt": "lixo reciclável",
   "tl": "Recyclable",
   "es": "Reciclable",
   "id": "Bahan daur ulang",
   "zhHant": "資源回收物"
  },
  "粗大ごみ": {
   "zh": "大件垃圾",
   "vi": "rác cỡ lớn",
   "ko": "대형 쓰레기",
   "pt": "lixo volumoso",
   "tl": "Malalaking basura",
   "es": "Basura voluminosa",
   "id": "Sampah besar",
   "zhHant": "大型垃圾"
  },
  "申し込み": {
   "zh": "预约申请",
   "vi": "Đăng ký trước",
   "ko": "사전 신청",
   "pt": "Solicitação prévia",
   "tl": "Paunang aplikasyon",
   "es": "Solicitud previa",
   "id": "Pendaftaran awal",
   "zhHant": "預約申請"
  },
  "手数料": {
   "zh": "手续费",
   "vi": "Phí xử lý",
   "ko": "수수료",
   "pt": "Taxa",
   "tl": "Bayad",
   "es": "Tarifa",
   "id": "Biaya",
   "zhHant": "手續費"
  },
  "回収できません": {
   "zh": "无法回收",
   "vi": "Không thể thu gom",
   "ko": "수거할 수 없습니다",
   "pt": "Não pode ser coletado",
   "tl": "Hindi makokolekta",
   "es": "No se puede recoger",
   "id": "Tidak dapat dikumpulkan",
   "zhHant": "無法回收"
  },
  "持ち帰り": {
   "zh": "带回自己家",
   "vi": "Mang về nhà",
   "ko": "가지고 돌아가기",
   "pt": "Leve de volta",
   "tl": "Iuwi",
   "es": "Llévelo de vuelta",
   "id": "Bawa pulang",
   "zhHant": "帶回家"
  },
  "厳守": {
   "zh": "必须遵守",
   "vi": "Tuân thủ nghiêm ngặt",
   "ko": "엄수",
   "pt": "Cumprir rigorosamente",
   "tl": "Mahigpit na sundin",
   "es": "Cumplir estrictamente",
   "id": "Patuhi dengan ketat",
   "zhHant": "必須遵守"
  },
  "ご協力ください": {
   "zh": "请配合",
   "vi": "Mong bạn hợp tác",
   "ko": "협조해 주세요",
   "pt": "Contamos com sua colaboração",
   "tl": "Salamat sa inyong pakikiisa",
   "es": "Gracias por su colaboración",
   "id": "Mohon kerja samanya",
   "zhHant": "請合作"
  }
 },
 "sources": [
  {
   "name": "西尾市 家庭用ごみ収集カレンダー（英・葡・中・越）",
   "url": "https://www.city.nishio.aichi.jp/"
  },
  {
   "name": "那須烏山市 ごみ分別 多言語表（英・中）",
   "url": "https://www.city.nasukarasuyama.lg.jp/"
  },
  {
   "name": "千葉市 ごみ分別 韓国語版",
   "url": "https://www.city.chiba.jp/"
  },
  {
   "name": "名古屋市 ごみの分け方・出し方（やさしい日本語）",
   "url": "https://www.city.nagoya.jp/"
  },
  {
   "name": "尾張旭市 ごみ出しカレンダー ごみの種類 各言語対応表（英・中・葡・西・越・タガログ）",
   "url": "https://www.city.owariasahi.lg.jp/"
  },
  {
   "name": "田原市 生活ガイド インドネシア語版",
   "url": "https://www.city.tahara.aichi.jp/"
  },
  {
   "name": "岸和田市 ごみの出し方（タガログ語版・韓国語版）",
   "url": "https://www.city.kishiwada.lg.jp/"
  },
  {
   "name": "繁體中文は香港での一般的な書き方に合わせ、簡体字からの変換ではなく語彙を置きかえた",
   "url": "（紙箱／塑膠／廚餘／光管／雪櫃 など）"
  }
 ]
};

const BAGJA={red:'赤い袋',green:'緑の袋',blue:'青い袋',yellow:'黄色い袋',orange:'オレンジの袋',
  clear:'とうめい・半とうめいの袋',kraft:'ひもで しばる'};
/* 掲示でよく見ることば */
const SIGN_WORDS=[
  {ja:'収集日',yomi:'しゅうしゅうび',ex:'ごみを あつめる 日',en:'collection day'},
  {ja:'指定袋',yomi:'していぶくろ',ex:'市が きめた 袋。ちがう袋では 出せない',en:'designated bag'},
  {ja:'資源',yomi:'しげん',ex:'また つかえる もの',en:'recyclable resource'},
  {ja:'粗大ごみ',yomi:'そだいごみ',ex:'大きい ごみ。先に 申し込みが 必要',en:'oversized waste'},
  {ja:'申し込み',yomi:'もうしこみ',ex:'先に 電話や インターネットで つたえる こと',en:'advance application'},
  {ja:'手数料',yomi:'てすうりょう',ex:'はらう お金',en:'handling fee'},
  {ja:'回収できません',yomi:'かいしゅうできません',ex:'ここでは あつめません',en:'cannot be collected'},
  {ja:'持ち帰り',yomi:'もちかえり',ex:'自分の 家に もどす こと',en:'take it back'},
  {ja:'厳守',yomi:'げんしゅ',ex:'かならず まもる こと',en:'strictly observe'},
  {ja:'ご協力ください',yomi:'ごきょうりょくください',ex:'てつだって ください（おねがいの ことば）',en:'your cooperation is appreciated'}
];
