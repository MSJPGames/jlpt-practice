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
  broken:'割れたガラス・われた食器・刃物は、あつい紙につつんで、ふくろに「キケン」と書いてから出します。そうしないと、ごみを集める人が手をけがします。（出す区分は街によってちがいます）',
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
  },
  {
   "id": "ne",
   "label": "नेपाली"
  }
 ],
 "bins": {
  "可燃": {
   "en": "Household waste",
   "zh": "可燃垃圾",
   "vi": "Rác cháy được",
   "ko": "타는 쓰레기",
   "pt": "Lixo combustível",
   "tl": "Nasusunog na basura",
   "es": "Basura quemable",
   "id": "Sampah yang bisa dibakar",
   "zhHant": "可燃垃圾",
   "ne": "जल्ने फोहोर"
  },
  "燃える": {
   "en": "Household waste",
   "zh": "可燃垃圾",
   "vi": "Rác cháy được",
   "ko": "타는 쓰레기",
   "pt": "Lixo combustível",
   "tl": "Nasusunog na basura",
   "es": "Basura quemable",
   "id": "Sampah yang bisa dibakar",
   "zhHant": "可燃垃圾",
   "ne": "जल्ने फोहोर"
  },
  "燃やせる": {
   "en": "Household waste",
   "zh": "可燃垃圾",
   "vi": "Rác cháy được",
   "ko": "타는 쓰레기",
   "pt": "Lixo combustível",
   "tl": "Nasusunog na basura",
   "es": "Basura quemable",
   "id": "Sampah yang bisa dibakar",
   "zhHant": "可燃垃圾",
   "ne": "जल्ने फोहोर"
  },
  "普通ごみ": {
   "en": "Household waste",
   "zh": "一般垃圾",
   "vi": "Rác thông thường",
   "ko": "일반 쓰레기",
   "pt": "Lixo comum",
   "tl": "Karaniwang basura",
   "es": "Basura común",
   "id": "Sampah biasa",
   "zhHant": "一般垃圾",
   "ne": "सामान्य फोहोर"
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
   "zhHant": "不可燃垃圾",
   "ne": "नजल्ने फोहोर"
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
   "zhHant": "不可燃垃圾",
   "ne": "नजल्ने फोहोर"
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
   "zhHant": "不可燃垃圾",
   "ne": "नजल्ने फोहोर"
  },
  "プラ資源": {
   "en": "Plastic recyclables",
   "zh": "塑料资源",
   "vi": "Rác tài nguyên nhựa",
   "ko": "플라스틱 자원",
   "pt": "Plástico reciclável",
   "tl": "Mga recyclable na plastik",
   "es": "Plástico reciclable",
   "id": "Plastik daur ulang",
   "zhHant": "塑膠回收物",
   "ne": "प्लास्टिक स्रोत फोहोर"
  },
  "容器包装プラ": {
   "en": "Plastic containers and packaging",
   "zh": "容器包装塑料",
   "vi": "Bao bì/đồ đựng bằng nhựa",
   "ko": "용기 포장 플라스틱",
   "pt": "Recipientes e embalagens de plástico",
   "tl": "Mga plastik na lalagyan at packaging",
   "es": "Envases de plástico",
   "id": "Wadah dan kemasan plastik",
   "zhHant": "塑膠容器與包裝",
   "ne": "कन्टेनर र प्याकेजिङ प्लास्टिक"
  },
  "その他プラ": {
   "en": "Other plastics",
   "zh": "其它塑料",
   "vi": "Nhựa khác",
   "ko": "기타 플라스틱",
   "pt": "Outros plásticos",
   "tl": "Ibang mga plastik",
   "es": "Otros plásticos",
   "id": "Plastik lainnya",
   "zhHant": "其他塑膠製品",
   "ne": "अन्य प्लास्टिक"
  },
  "ペットボトル": {
   "en": "PET bottles",
   "zh": "PET塑料瓶",
   "vi": "Chai nhựa PET",
   "ko": "페트병",
   "pt": "Garrafas PET",
   "tl": "Mga PET bottle",
   "es": "Botellas PET",
   "id": "Botol PET",
   "zhHant": "塑膠瓶",
   "ne": "प्लास्टिक बोतल"
  },
  "びん・ペット": {
   "en": "Used bottles and PET bottles",
   "zh": "空瓶和PET塑料瓶",
   "vi": "Chai rỗng và chai nhựa PET",
   "ko": "빈 병·페트병",
   "pt": "Garrafas de vidro e PET",
   "tl": "Bote at PET bottle",
   "es": "Botellas de vidrio y PET",
   "id": "Botol kaca dan botol PET",
   "zhHant": "玻璃瓶與塑膠瓶",
   "ne": "बोतल र प्लास्टिकको बोतल"
  },
  "びん・缶類": {
   "en": "Used cans and bottles",
   "zh": "空罐和空瓶",
   "vi": "Lon rỗng và chai rỗng",
   "ko": "빈 캔·빈 병",
   "pt": "Garrafas de vidro e latas",
   "tl": "Bote at lata",
   "es": "Botellas y latas",
   "id": "Botol dan kaleng",
   "zhHant": "玻璃瓶與鐵鋁罐",
   "ne": "बोतल र क्यान"
  },
  "びん缶ペット": {
   "en": "Used cans, bottles and PET bottles",
   "zh": "空罐、空瓶和PET塑料瓶",
   "vi": "Lon rỗng, chai rỗng và chai nhựa PET",
   "ko": "빈 캔·빈 병·페트병",
   "pt": "Vidro, latas e PET",
   "tl": "Bote, lata at PET bottle",
   "es": "Botellas, latas y PET",
   "id": "Botol, kaleng dan botol PET",
   "zhHant": "玻璃瓶、鐵鋁罐與塑膠瓶",
   "ne": "बोतल, क्यान र प्लास्टिकको बोतल"
  },
  "缶びんペット": {
   "en": "Used cans, bottles and PET bottles",
   "zh": "空罐、空瓶和PET塑料瓶",
   "vi": "Lon rỗng, chai rỗng và chai nhựa PET",
   "ko": "빈 캔·빈 병·페트병",
   "pt": "Latas, vidro e PET",
   "tl": "Lata, bote at PET bottle",
   "es": "Latas, botellas y PET",
   "id": "Kaleng, botol dan botol PET",
   "zhHant": "鐵鋁罐、玻璃瓶與塑膠瓶",
   "ne": "क्यान, बोतल र प्लास्टिकको बोतल"
  },
  "資源ごみ": {
   "en": "Recyclable waste",
   "zh": "资源垃圾",
   "vi": "Rác tài nguyên",
   "ko": "자원 쓰레기",
   "pt": "Lixo reciclável",
   "tl": "Mga recyclable na basura",
   "es": "Basura reciclable",
   "id": "Sampah daur ulang",
   "zhHant": "資源回收物",
   "ne": "पुनः प्रयोग योग्य फोहोर"
  },
  "古紙": {
   "en": "Used paper",
   "zh": "废纸",
   "vi": "Giấy đã qua sử dụng",
   "ko": "폐지",
   "pt": "Papéis",
   "tl": "Gamit na papel",
   "es": "Papel usado",
   "id": "Kertas bekas",
   "zhHant": "廢紙",
   "ne": "पुराना कागज"
  },
  "古紙・衣類": {
   "en": "Used paper and clothing",
   "zh": "废纸及衣服类",
   "vi": "Giấy và quần áo đã qua sử dụng",
   "ko": "폐지·의류",
   "pt": "Papéis usados e roupas",
   "tl": "Gamit na papel at lumang damit",
   "es": "Papel usado y ropa",
   "id": "Kertas bekas dan pakaian",
   "zhHant": "廢紙與舊衣物",
   "ne": "पुराना कागज तथा लुगा"
  },
  "紙・布": {
   "en": "Paper and textiles",
   "zh": "纸类和布类",
   "vi": "Giấy và các loại vải",
   "ko": "종이·천",
   "pt": "Papéis e tecidos",
   "tl": "Papel at tela",
   "es": "Papel y tela",
   "id": "Kertas dan kain",
   "zhHant": "紙類與布類",
   "ne": "कागज र कपडा"
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
   "zhHant": "易燃危險垃圾",
   "ne": "आगो लाग्न सक्ने खतरनाक फोहोर"
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
   "zhHant": "難處理垃圾",
   "ne": "प्रशोधन गर्न कठिन फोहोर"
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
   "zhHant": "先行處理",
   "ne": "पहिले तयार पार्नुहोस्"
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
   "zhHant": "送充電電池回收點",
   "ne": "रिचार्जेबल ब्याट्री सङ्कलनमा"
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
   "zhHant": "投入回收箱",
   "ne": "सङ्कलन बाकसमा"
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
   "zhHant": "聯絡市政府",
   "ne": "वार्ड कार्यालयमा सम्पर्क गर्नुहोस्"
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
   "zhHant": "聯絡購買的商店",
   "ne": "पसलमा सम्पर्क गर्नुहोस्"
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
   "zhHant": "聯絡製造商",
   "ne": "निर्माता कम्पनीमा सम्पर्क गर्नुहोस्"
  }
 },
 "items": {
  "nama": {
   "en": "Kitchen garbage and food scraps",
   "zh": "厨房垃圾和厨余垃圾",
   "vi": "Rác nhà bếp và rác tươi sống",
   "ko": "부엌 쓰레기·음식물 쓰레기",
   "pt": "Restos de comida (legumes)",
   "tl": "Mga tira ng pagkain",
   "es": "Restos de comida",
   "id": "Sisa makanan",
   "zhHant": "廚餘（蔬菜碎屑）",
   "ne": "भान्साको फोहोर / जैविक फोहोर"
  },
  "pet": {
   "en": "PET bottles",
   "zh": "PET塑料瓶",
   "vi": "Chai nhựa PET",
   "ko": "페트병",
   "pt": "Garrafas PET",
   "tl": "PET bottle",
   "es": "Botella PET",
   "id": "Botol PET",
   "zhHant": "塑膠瓶",
   "ne": "प्लास्टिक बोतल"
  },
  "can": {
   "en": "Used cans",
   "zh": "空罐",
   "vi": "Lon rỗng",
   "ko": "빈 캔",
   "pt": "Latas de alumínio",
   "tl": "Latang aluminyo",
   "es": "Lata de aluminio",
   "id": "Kaleng aluminium",
   "zhHant": "鋁罐",
   "ne": "खाली क्यान"
  },
  "bine": {
   "en": "Used bottles",
   "zh": "空瓶",
   "vi": "Chai rỗng",
   "ko": "빈 병",
   "pt": "Garrafas de vidro",
   "tl": "Boteng salamin",
   "es": "Botella de vidrio",
   "id": "Botol kaca",
   "zhHant": "玻璃瓶",
   "ne": "खाली सिसाको बोतल"
  },
  "bento": {
   "en": "Plastic lunch box container",
   "zh": "塑料便当盒",
   "vi": "Hộp đựng cơm bằng nhựa",
   "ko": "플라스틱 도시락 용기",
   "pt": "Marmita de plástico",
   "tl": "Plastik na lalagyan ng pagkain",
   "es": "Envase de plástico para comida",
   "id": "Wadah bento plastik",
   "zhHant": "塑膠便當盒",
   "ne": "प्लास्टिकको खानाको कन्टेनर"
  },
  "cap": {
   "en": "PET bottle cap",
   "zh": "PET塑料瓶的瓶盖",
   "vi": "Nắp chai nhựa PET",
   "ko": "페트병 뚜껑",
   "pt": "Tampa de garrafa",
   "tl": "Takip ng bote",
   "es": "Tapa de botella",
   "id": "Tutup botol",
   "zhHant": "瓶蓋",
   "ne": "प्लास्टिक बोतलको ढकनी"
  },
  "news": {
   "en": "Newspaper and ad inserts",
   "zh": "报纸、夹入广告",
   "vi": "Báo và tờ rơi gấp kèm",
   "ko": "신문·전단지",
   "pt": "Jornais",
   "tl": "Diyaryo",
   "es": "Periódico",
   "id": "Koran",
   "zhHant": "報紙",
   "ne": "समाचारपत्र"
  },
  "cardb": {
   "en": "Cardboard",
   "zh": "硬纸箱",
   "vi": "Thùng carton",
   "ko": "종이 박스",
   "pt": "Papelão",
   "tl": "Karton",
   "es": "Cartón",
   "id": "Kardus",
   "zhHant": "紙箱",
   "ne": "कार्टुन"
  },
  "zasshi": {
   "en": "Magazines",
   "zh": "杂志",
   "vi": "Tạp chí",
   "ko": "잡지",
   "pt": "Revistas e papéis diversos",
   "tl": "Magasin",
   "es": "Revista",
   "id": "Majalah",
   "zhHant": "雜誌",
   "ne": "पत्रिका"
  },
  "milk": {
   "en": "Paper cartons",
   "zh": "纸包装盒",
   "vi": "Hộp bằng giấy",
   "ko": "종이 팩",
   "pt": "Cartonados",
   "tl": "Karton ng gatas",
   "es": "Cartón de leche",
   "id": "Karton susu",
   "zhHant": "紙盒包裝",
   "ne": "कागजको प्याकेट"
  },
  "tray": {
   "en": "Styrofoam trays",
   "zh": "泡沫塑料托盘",
   "vi": "Các loại khay bằng xốp",
   "ko": "발포 스티로폼 트레이",
   "pt": "Bandeja de isopor",
   "tl": "Tray na styrofoam",
   "es": "Bandeja de espuma",
   "id": "Nampan busa",
   "zhHant": "發泡膠食品托盤",
   "ne": "फोम स्टाइरोफोमको ट्रे"
  },
  "cupmen": {
   "en": "Instant noodle container",
   "zh": "杯面容器",
   "vi": "Cốc mì ly",
   "ko": "컵라면 용기",
   "pt": "Copo de macarrão instantâneo",
   "tl": "Lalagyan ng cup noodles",
   "es": "Vaso de fideos instantáneos",
   "id": "Wadah mi instan",
   "zhHant": "杯麵容器",
   "ne": "कप नूडलको कन्टेनर"
  },
  "okashi": {
   "en": "Snack bags",
   "zh": "点心的塑料袋",
   "vi": "Túi đựng bánh kẹo",
   "ko": "과자 봉투",
   "pt": "Embalagem de salgadinho",
   "tl": "Supot ng meryenda",
   "es": "Bolsa de snacks",
   "id": "Bungkus makanan ringan",
   "zhHant": "零食包裝袋",
   "ne": "मिठाईको झोला"
  },
  "omutsu": {
   "en": "Disposable diapers",
   "zh": "纸尿布",
   "vi": "Tã giấy",
   "ko": "일회용 기저귀",
   "pt": "Fralda usada",
   "tl": "Gamit na lampin",
   "es": "Pañal usado",
   "id": "Popok bekas",
   "zhHant": "用過的紙尿褲",
   "ne": "कागजको डाइपर"
  },
  "tissue": {
   "en": "Used tissue paper",
   "zh": "用过的面巾纸",
   "vi": "Khăn giấy đã dùng",
   "ko": "사용한 티슈",
   "pt": "Lenço de papel usado",
   "tl": "Gamit na tissue",
   "es": "Pañuelo de papel usado",
   "id": "Tisu bekas",
   "zhHant": "用過的紙巾",
   "ne": "प्रयोग गरिएको टिस्यु"
  },
  "glassbroken": {
   "en": "Broken glass cup",
   "zh": "玻璃碎片",
   "vi": "Mảnh vỡ thủy tinh",
   "ko": "깨진 유리컵",
   "pt": "Copo de vidro quebrado",
   "tl": "Basag na baso",
   "es": "Vaso de vidrio roto",
   "id": "Gelas kaca pecah",
   "zhHant": "破掉的玻璃杯",
   "ne": "फुटेको गिलास"
  },
  "chawan": {
   "en": "Broken ceramic bowl",
   "zh": "破碎的陶瓷器",
   "vi": "Đồ gốm sứ bị vỡ",
   "ko": "깨진 도자기",
   "pt": "Tigela de cerâmica quebrada",
   "tl": "Basag na mangkok na seramika",
   "es": "Tazón de cerámica roto",
   "id": "Mangkuk keramik pecah",
   "zhHant": "破掉的陶瓷碗",
   "ne": "माटोका भाँडा"
  },
  "spray": {
   "en": "Spray cans",
   "zh": "喷雾罐",
   "vi": "Bình xịt",
   "ko": "스프레이 캔",
   "pt": "Latas de spray (vazias)",
   "tl": "Spray can (walang laman)",
   "es": "Lata de aerosol (vacía)",
   "id": "Kaleng semprot (kosong)",
   "zhHant": "噴霧罐（已用完）",
   "ne": "स्प्रे क्यान"
  },
  "spray_full": {
   "en": "Spray can with contents remaining",
   "zh": "内装物未用完的喷雾罐",
   "vi": "Bình xịt còn chất bên trong",
   "ko": "내용물이 남은 스프레이 캔",
   "pt": "Lata de spray com conteúdo",
   "tl": "Spray can na may laman pa",
   "es": "Lata de aerosol con contenido",
   "id": "Kaleng semprot yang masih berisi",
   "zhHant": "仍有殘留的噴霧罐",
   "ne": "भित्र ग्यास बाँकी रहेको स्प्रे क्यान"
  },
  "cloth": {
   "en": "Clothing",
   "zh": "衣服类",
   "vi": "Quần áo",
   "ko": "의류",
   "pt": "Tecidos",
   "tl": "Lumang damit",
   "es": "Ropa usada",
   "id": "Pakaian bekas",
   "zhHant": "舊衣物",
   "ne": "कपडा"
  },
  "frypan": {
   "en": "Frying pan",
   "zh": "平底锅",
   "vi": "Chảo",
   "ko": "프라이팬",
   "pt": "Frigideira velha",
   "tl": "Lumang kawali",
   "es": "Sartén viejo",
   "id": "Wajan lama",
   "zhHant": "用舊的平底鍋",
   "ne": "फ्राइप्यान"
  },
  "bucket": {
   "en": "Plastic bucket",
   "zh": "塑料水桶",
   "vi": "Xô bằng nhựa",
   "ko": "플라스틱 양동이",
   "pt": "Balde de plástico",
   "tl": "Plastik na balde",
   "es": "Cubo de plástico",
   "id": "Ember plastik",
   "zhHant": "塑膠水桶",
   "ne": "प्लास्टिकको भाँडो"
  },
  "toy": {
   "en": "Broken toy",
   "zh": "坏掉的玩具",
   "vi": "Đồ chơi bị hỏng",
   "ko": "고장난 장난감",
   "pt": "Carrinho de brinquedo quebrado",
   "tl": "Sirang laruang kotse",
   "es": "Coche de juguete roto",
   "id": "Mobil mainan rusak",
   "zhHant": "壞掉的玩具車",
   "ne": "बिग्रेको खेलौना कार"
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
   "zhHant": "牙刷",
   "ne": "टुथब्रश"
  },
  "cd": {
   "en": "Videotapes, CDs and DVDs",
   "zh": "录像带・CD・DVD",
   "vi": "Băng video・CD・DVD",
   "ko": "비디오테이프·CD·DVD",
   "pt": "CD ou DVD sem uso",
   "tl": "CD o DVD",
   "es": "CD o DVD",
   "id": "CD atau DVD",
   "zhHant": "不要的CD・DVD",
   "ne": "भिडियो टेप・सीडी・डीभीडी"
  },
  "mirror": {
   "en": "Broken mirror",
   "zh": "破碎的镜子",
   "vi": "Gương bị vỡ",
   "ko": "깨진 거울",
   "pt": "Espelho quebrado",
   "tl": "Basag na salamin",
   "es": "Espejo roto",
   "id": "Cermin pecah",
   "zhHant": "破掉的鏡子",
   "ne": "फुटेको ऐना"
  },
  "waribashi": {
   "en": "Used wooden chopsticks",
   "zh": "用过的一次性筷子",
   "vi": "Đũa dùng một lần đã dùng",
   "ko": "사용한 나무젓가락",
   "pt": "Hashi descartável usado",
   "tl": "Gamit na disposable chopsticks",
   "es": "Palillos desechables usados",
   "id": "Sumpit sekali pakai bekas",
   "zhHant": "用過的免洗筷",
   "ne": "प्रयोग गरिएको काठको चपस्टिक"
  },
  "pizzabox": {
   "en": "Pizza box stained with oil",
   "zh": "沾油的披萨盒",
   "vi": "Hộp pizza dính dầu mỡ",
   "ko": "기름이 묻은 피자 상자",
   "pt": "Caixa de pizza engordurada",
   "tl": "Kahon ng pizza na may mantika",
   "es": "Caja de pizza con grasa",
   "id": "Kotak pizza berminyak",
   "zhHant": "沾油的薄餅盒",
   "ne": "तेल लागेको पिज्जाको बाकस"
  },
  "receipt": {
   "en": "Receipts",
   "zh": "收银票",
   "vi": "Hóa đơn (giấy nhiệt)",
   "ko": "영수증",
   "pt": "Recibo (papel térmico)",
   "tl": "Resibo",
   "es": "Recibo",
   "id": "Struk belanja",
   "zhHant": "收據（熱感應紙）",
   "ne": "रसिद"
  },
  "shoes": {
   "en": "Old shoes",
   "zh": "旧鞋",
   "vi": "Giày cũ",
   "ko": "낡은 신발",
   "pt": "Sapatos velhos",
   "tl": "Lumang sapatos",
   "es": "Zapatos viejos",
   "id": "Sepatu lama",
   "zhHant": "穿舊的鞋",
   "ne": "पुराना जुत्ता"
  },
  "nuigurumi": {
   "en": "Old stuffed toy",
   "zh": "坏掉的毛绒玩具",
   "vi": "Thú nhồi bông hỏng",
   "ko": "낡은 봉제 인형",
   "pt": "Bicho de pelúcia estragado",
   "tl": "Sirang stuffed toy",
   "es": "Peluche roto",
   "id": "Boneka rusak",
   "zhHant": "破損的毛公仔",
   "ne": "बिग्रेको भरिएको खेलौना"
  },
  "tv": {
   "en": "TVs",
   "zh": "电视机",
   "vi": "Ti vi",
   "ko": "텔레비전",
   "pt": "TV quebrada",
   "tl": "Sirang telebisyon",
   "es": "Televisor roto",
   "id": "Televisi rusak",
   "zhHant": "壞掉的電視",
   "ne": "बिग्रेको टिभी"
  },
  "fridge": {
   "en": "Refrigerators",
   "zh": "冰箱",
   "vi": "Tủ lạnh",
   "ko": "냉장고",
   "pt": "Geladeira velha",
   "tl": "Lumang refrigerator",
   "es": "Refrigerador viejo",
   "id": "Kulkas lama",
   "zhHant": "舊雪櫃",
   "ne": "पुरानो फ्रिज"
  },
  "washer": {
   "en": "Washing machines",
   "zh": "洗衣机",
   "vi": "Máy giặt",
   "ko": "세탁기",
   "pt": "Máquina de lavar quebrada",
   "tl": "Sirang washing machine",
   "es": "Lavadora rota",
   "id": "Mesin cuci rusak",
   "zhHant": "壞掉的洗衣機",
   "ne": "बिग्रेको वाशिंग मेसिन"
  },
  "aircon": {
   "en": "Air conditioners",
   "zh": "空调",
   "vi": "Máy điều hòa",
   "ko": "에어컨",
   "pt": "Ar-condicionado velho",
   "tl": "Lumang aircon",
   "es": "Aire acondicionado viejo",
   "id": "AC lama",
   "zhHant": "舊冷氣機",
   "ne": "पुरानो एयर कन्डिसनर"
  },
  "futon": {
   "en": "Old bedding",
   "zh": "旧被褥",
   "vi": "Chăn đệm cũ",
   "ko": "낡은 이불",
   "pt": "Futon velho",
   "tl": "Lumang futon",
   "es": "Futón viejo",
   "id": "Futon lama",
   "zhHant": "舊棉被",
   "ne": "पुरानो डसना"
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
   "zhHant": "壞掉的單車",
   "ne": "बिग्रेको साइकल"
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
   "zhHant": "壞掉的椅子",
   "ne": "भाँचिएको कुर्सी"
  },
  "suitcase": {
   "en": "Broken suitcase",
   "zh": "坏掉的行李箱",
   "vi": "Vali hỏng",
   "ko": "고장난 여행 가방",
   "pt": "Mala quebrada",
   "tl": "Sirang maleta",
   "es": "Maleta rota",
   "id": "Koper rusak",
   "zhHant": "壞掉的行李箱",
   "ne": "बिग्रेको सुटकेस"
  },
  "battery": {
   "en": "Dry cell batteries",
   "zh": "干电池",
   "vi": "Pin khô",
   "ko": "건전지",
   "pt": "Pilha usada",
   "tl": "Gamit na baterya",
   "es": "Pila usada",
   "id": "Baterai bekas",
   "zhHant": "用完的乾電池",
   "ne": "सुक्खा ब्याट्री"
  },
  "lighter": {
   "en": "Lighters",
   "zh": "打火机",
   "vi": "Bật lửa",
   "ko": "라이터",
   "pt": "Isqueiro descartável",
   "tl": "Disposable na lighter",
   "es": "Encendedor desechable",
   "id": "Korek api sekali pakai",
   "zhHant": "即棄打火機",
   "ne": "लाइटर"
  },
  "fluor": {
   "en": "Fluorescent lamps",
   "zh": "荧光灯",
   "vi": "Đèn huỳnh quang",
   "ko": "형광등",
   "pt": "Lâmpada fluorescente queimada",
   "tl": "Sirang fluorescent lamp",
   "es": "Tubo fluorescente fundido",
   "id": "Lampu neon mati",
   "zhHant": "壞掉的光管",
   "ne": "फ्लोरेसेन्ट लाइट"
  },
  "pc": {
   "en": "Used laptop computer",
   "zh": "废弃的笔记本电脑",
   "vi": "Máy tính cá nhân đã qua sử dụng",
   "ko": "다 쓴 노트북 컴퓨터",
   "pt": "Notebook quebrado",
   "tl": "Sirang laptop",
   "es": "Portátil roto",
   "id": "Laptop rusak",
   "zhHant": "壞掉的手提電腦",
   "ne": "प्रयोग भएको ल्यापटप कम्प्युटर"
  },
  "desktop": {
   "en": "Desktop computer",
   "zh": "台式电脑",
   "vi": "Máy tính để bàn",
   "ko": "데스크톱 컴퓨터",
   "pt": "Computador de mesa",
   "tl": "Desktop computer",
   "es": "Computadora de escritorio",
   "id": "Komputer desktop",
   "zhHant": "桌上電腦",
   "ne": "डेस्कटप कम्प्युटर"
  },
  "printer": {
   "en": "Broken printer",
   "zh": "坏掉的打印机",
   "vi": "Máy in bị hỏng",
   "ko": "고장난 프린터",
   "pt": "Impressora quebrada",
   "tl": "Sirang printer",
   "es": "Impresora rota",
   "id": "Printer rusak",
   "zhHant": "壞掉的打印機",
   "ne": "बिग्रेको प्रिन्टर"
  },
  "fan": {
   "en": "Small electric fan",
   "zh": "迷你风扇",
   "vi": "Quạt mini",
   "ko": "미니 선풍기",
   "pt": "Ventilador quebrado",
   "tl": "Sirang electric fan",
   "es": "Ventilador roto",
   "id": "Kipas angin rusak",
   "zhHant": "壞掉的風扇",
   "ne": "बिग्रेको पंखा"
  },
  "gamem": {
   "en": "Gaming machine",
   "zh": "游戏机",
   "vi": "Máy chơi game",
   "ko": "게임기",
   "pt": "Videogame quebrado",
   "tl": "Sirang game console",
   "es": "Consola de videojuegos rota",
   "id": "Konsol game rusak",
   "zhHant": "壞掉的遊戲機",
   "ne": "बिग्रेको गेम मेसिन"
  },
  "abura_raw": {
   "en": "Used cooking oil",
   "zh": "食用油",
   "vi": "Dầu ăn đã qua sử dụng",
   "ko": "다 쓴 식용유",
   "pt": "Óleo de fritura usado",
   "tl": "Gamit na mantika sa pagluluto",
   "es": "Aceite de cocina usado",
   "id": "Minyak goreng bekas",
   "zhHant": "用過的食油",
   "ne": "खाने तेल"
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
   "zhHant": "凝固後的油",
   "ne": "जमाएको तेल"
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
   "zhHant": "用報紙吸乾的油",
   "ne": "पत्रिकाले सोसेको तेल"
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
   "zhHant": "平底鍋裡剩下的少量油",
   "ne": "फ्राइ प्यानमा बाँकी थोरै तेल"
  },
  "mobilebatt": {
   "en": "Mobile batteries",
   "zh": "移动电源",
   "vi": "Pin sạc dự phòng",
   "ko": "보조 배터리",
   "pt": "Power bank",
   "tl": "Power bank",
   "es": "Batería portátil",
   "id": "Power bank",
   "zhHant": "外置充電器",
   "ne": "मोबाइल ब्याट्री"
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
   "zhHant": "充電式手提風扇",
   "ne": "रिचार्जेबल हातको पंखा"
  },
  "heattobacco": {
   "en": "Heat-not-burn cigarette device",
   "zh": "加热式电子烟",
   "vi": "Thuốc lá điện tử có hệ thống làm nóng",
   "ko": "가열식 담배",
   "pt": "Dispositivo de tabaco aquecido",
   "tl": "Heated tobacco device",
   "es": "Dispositivo de tabaco calentado",
   "id": "Perangkat tembakau panas",
   "zhHant": "加熱煙",
   "ne": "तताउने चुरोट उपकरण"
  },
  "earphone": {
   "en": "Wireless earphones",
   "zh": "无线耳机",
   "vi": "Tai nghe không dây",
   "ko": "무선 이어폰",
   "pt": "Fones de ouvido sem fio",
   "tl": "Wireless earphone",
   "es": "Auriculares inalámbricos",
   "id": "Earphone nirkabel",
   "zhHant": "無線耳機",
   "ne": "वायरलेस इयरफोन"
  },
  "smartphone": {
   "en": "Cell phone (including smartphones)",
   "zh": "手机（包括智能手机）",
   "vi": "Điện thoại thông minh",
   "ko": "휴대전화 단말(스마트폰 포함)",
   "pt": "Smartphone quebrado (eletrodoméstico de pequeno porte)",
   "tl": "Sirang smartphone",
   "es": "Teléfono inteligente roto",
   "id": "Ponsel pintar rusak",
   "zhHant": "壞掉的智能電話",
   "ne": "मोबाइल फोन (स्मार्टफोन समावेश)"
  }
 },
 "safety": {
  "libatt": {
   "en": "Small rechargeable batteries such as lithium-ion batteries, electronic devices (those with built-in lithium-ion batteries, mobile batteries, etc.), lighters, and cassette cylinders have been found in household waste, and fires have occurred in waste collection vehicles and waste disposal facilities. Please do not dispose of lithium-ion batteries in household waste collection.",
   "zh": "家庭垃圾中若混入锂离子电池等小型充电电池、电子设备（如内置锂离子电池等的设备、移动电源）、打火机、卡式气瓶等物体，可能会导致垃圾回收车或垃圾处理站发生火灾。锂离子电池等不应作为一般垃圾丢弃。",
   "vi": "Việc lẫn các vật như pin sạc nhỏ như pin lithium-ion, thiết bị điện tử (có pin lithium-ion bên trong, pin sạc dự phòng, v.v.), bật lửa và bình ga mini trong rác sinh hoạt sẽ gây ra các vụ cháy tại xe thu gom rác và cơ sở xử lý rác. Pin lithium-ion không vứt như rác thải thông thường.",
   "ko": "가정에서 배출하는 쓰레기 중에 리튬이온 전지 등의 소형 충전식 전지와 전자기기(리튬이온 전지 등이 내장된 것, 보조 배터리 등), 라이터, 부탄가스 등이 혼입되는 경우가 있어 쓰레기 수거 차량과 쓰레기 처리 시설에서 화재가 발생합니다. 리튬이온 전지 등은 일반 쓰레기로 배출하지 마십시오.",
   "pt": "Contém uma bateria de íon-lítio. Se for amassada, pode pegar fogo violentamente. É a causa mais comum de incêndios em caminhões e usinas de lixo. Nunca coloque no lixo comum.",
   "tl": "May lithium-ion battery ito. Kapag nadurog, maaari itong mag-apoy nang malakas. Ito ang pinakakaraniwang sanhi ng sunog sa mga trak ng basura at pasilidad ng basura. Huwag na huwag itong ilagay sa karaniwang basura.",
   "es": "Contiene una batería de iones de litio. Si se aplasta, puede incendiarse con violencia. Es la causa más común de incendios en camiones y plantas de basura. Nunca la ponga en la basura común.",
   "id": "Ini berisi baterai lithium-ion. Jika penyok, baterai dapat terbakar hebat. Ini penyebab kebakaran paling umum pada truk sampah dan fasilitas pengolahan sampah. Jangan pernah membuangnya ke sampah biasa.",
   "zhHant": "內含鋰離子電池。一旦被壓毀就會劇烈起火，是垃圾車和垃圾處理廠火災最常見的原因。絕對不要丟進普通垃圾。",
   "ne": "घरायसी फोहोरमा लिथियम आयन ब्याट्री जस्ता साना चार्ज गर्न मिल्ने ब्याट्रीहरू, इलेक्ट्रोनिक उपकरणहरू, मोबाइल ब्याट्रीहरू आदि मिसिन सक्छन्, जसले फोहोर संकलन गाडी र फोहोर प्रशोधन स्थलहरूमा आगो लाग्न सक्छ। लिथियम आयन ब्याट्रीलाई साधारण फोहोरमा नहाल्नुहोस्।"
  },
  "oil": {
   "en": "Cooking oil or the like must be soaked up into paper or cloth, or coagulated, before being put into a waste bag. Do not pour it down the sink — it clogs the pipes and burdens sewage treatment.",
   "zh": "食用油等请采取用纸或布吸收，或凝固后排放。请勿倒入水槽——会堵塞管道，也会加重污水处理的负担。",
   "vi": "Đối với dầu ăn, vui lòng cho thấm vào giấy, vải hoặc làm cho đông lại rồi mới vứt. Không đổ xuống bồn rửa — sẽ làm tắc ống và gây gánh nặng cho việc xử lý nước thải.",
   "ko": "식용유 등은 종이나 천으로 흡수시키거나, 굳혀서 배출하십시오. 싱크대에 버리지 마십시오 — 배관이 막히고 하수 처리에도 부담이 됩니다.",
   "pt": "Nunca jogue óleo de cozinha na pia: entope os canos e sobrecarrega o sistema de esgoto. Deixe esfriar, solidifique com produto próprio ou absorva em jornal ou pano velho, feche bem o saco e descarte no lixo queimável.",
   "tl": "Huwag ibuhos ang mantika sa lababo: bumabara ang tubo at nabibigatan ang sistema ng dumi. Palamigin muna, patigasin gamit ang produkto o ipasipsip sa diyaryo o lumang tela, itali ang supot, at itapon sa nasusunog na basura.",
   "es": "No vierta el aceite en el fregadero: obstruye las tuberías y sobrecarga el alcantarillado. Déjelo enfriar, solidifíquelo o absórbalo con periódico o un paño viejo, cierre bien la bolsa y tírelo con la basura quemable.",
   "id": "Jangan buang minyak ke wastafel: pipa akan tersumbat dan membebani sistem air limbah. Dinginkan dulu, padatkan atau serap dengan koran atau kain bekas, ikat kantongnya, lalu buang ke sampah yang bisa dibakar.",
   "zhHant": "不要把食油倒進洗手盆，會堵塞排水管，也會加重污水處理的負擔。請先放涼，用凝固劑使其凝固，或用報紙、舊布吸乾，把袋口紮緊後當作可燃垃圾丟棄。",
   "ne": "खाने तेल जस्ता तरल पदार्थहरूलाई कागज वा कपडामा सोसाएर वा जमाएर फाल्नुहोस्। सिंकमा नफाल्नुहोस् — पाइप बन्द हुन्छ र ढल प्रशोधनमा पनि भार पर्छ।"
  },
  "spray": {
   "en": "Make sure to fully use up the contents of spray cans and gas canisters before disposal. If contents remain, a fire may occur inside the collection vehicle. Whether or not to puncture them differs by city (in Osaka, be careful NOT to puncture the items). Please follow your local instructions.",
   "zh": "喷雾罐、卡式气瓶必须将内装物用完后再丢弃。若瓶内残留气体，可能在垃圾回收车内起火。是否需要钻孔因城市而异（大阪市为不需钻孔），请遵照当地的指示。",
   "vi": "Bình xịt và bình ga mini phải sử dụng hết chất bên trong trước khi vứt. Nếu còn ga bên trong có thể gây cháy nổ trong xe thu gom rác. Việc có cần đục lỗ hay không khác nhau tùy thành phố (tại Osaka thì không cần đục lỗ), vui lòng làm theo hướng dẫn của địa phương.",
   "ko": "스프레이 캔과 부탄가스는 반드시 내용물을 완전히 사용한 후에 배출하십시오. 내용물이 남아 있으면 수거 차량 안에서 화재가 발생할 수 있습니다. 구멍을 뚫는지 여부는 지자체마다 다릅니다(오사카시는 구멍을 뚫지 않습니다). 거주 지역의 안내를 따라 주십시오.",
   "pt": "Use todo o conteúdo antes de descartar. Se sobrar produto dentro, a lata pode explodir no caminhão de lixo e causar incêndio. Se deve ou não furar a lata depende da cidade; siga as orientações locais.",
   "tl": "Ubusin muna ang laman bago itapon. Kung may natitirang laman, maaari itong sumabog sa loob ng trak ng basura at magdulot ng sunog. Ang pagbutas ay nag-iiba depende sa lungsod, kaya sundin ang lokal na patakaran.",
   "es": "Use todo el contenido antes de tirarla. Si queda producto dentro, puede explotar en el camión de basura y provocar un incendio. Si hay que perforarla depende de la ciudad; siga las indicaciones locales.",
   "id": "Habiskan isinya sebelum dibuang. Jika masih ada isinya, kaleng dapat meledak di dalam truk sampah dan menyebabkan kebakaran. Perlu dilubangi atau tidak berbeda tiap kota, ikuti petunjuk setempat.",
   "zhHant": "丟棄前請把罐內的東西全部用完。如果還有殘留，可能在垃圾車內爆炸引起火災。是否需要刺孔各市規定不同，請按當地的說明處理。",
   "ne": "स्प्रे क्यान, क्यासेट सिलिन्डर आदि भित्रको सामग्री पूरै प्रयोग समाप्त गरी सकेपछि मात्र फाल्नुहोस्। भित्र ग्यास बाँकी रहेमा फोहोर संकलन गाडीभित्र आगो लाग्न सक्छ। प्वाल पार्नुपर्ने वा नपर्ने सहर अनुसार फरक हुन्छ (ओसाकामा प्वाल नपारी फाल्नुहोस्), स्थानीय निर्देशन पालना गर्नुहोस्।"
  },
  "broken": {
   "en": "Wrap dangerous items, such as bamboo skewers, glass fragments, and razor blades in thick paper or the like, and attach a label saying “キケン (Danger)” to the waste bag containing such items, before taking the bag to the waste collection spot. Otherwise the collection workers may be injured.",
   "zh": "竹签、玻璃碎片、剃须刀片等物品请使用厚纸包裹，并在垃圾袋上标示“キケン（危险）”后排放。否则回收人员可能受伤。",
   "vi": "Đối với các vật như xiên tre, mảnh vỡ thủy tinh, lưỡi dao cạo, vui lòng bọc lại bằng giấy dày và dán nhãn “キケン” (nguy hiểm) lên túi trước khi vứt. Nếu không, nhân viên thu gom có thể bị thương.",
   "ko": "꼬치, 유리 파편, 면도날 등은 두꺼운 종이 등에 싸서 봉투에 “キケン”(위험)이라고 표시하여 배출하십시오. 그렇지 않으면 쓰레기를 수거하는 분이 다칠 수 있습니다.",
   "pt": "Embrulhe vidros quebrados, espelhos e lâminas em papel grosso e escreva キケン (perigo) do lado de fora. Caso contrário, os coletores podem se ferir.",
   "tl": "Balutin ang basag na salamin, salaming pansalamin, at talim sa makapal na papel at isulat sa labas ang キケン (mapanganib). Kung hindi, maaaring masugatan ang mga nangongolekta ng basura.",
   "es": "Envuelva los vidrios rotos, espejos y hojas afiladas en papel grueso y escriba キケン (peligro) por fuera. De lo contrario, los recolectores pueden lastimarse.",
   "id": "Bungkus kaca pecah, cermin, dan benda tajam dengan kertas tebal dan tulis キケン (berbahaya) di luarnya. Jika tidak, petugas pengumpul sampah bisa terluka.",
   "zhHant": "碎玻璃、鏡子和刀刃請用厚紙包好，並在外面寫上「キケン」（危險）。否則收垃圾的工作人員會受傷。",
   "ne": "बाँसको काँटी, सिसाका टुक्रा, रेजर ब्लेड जस्ता धारिलो वस्तुहरूलाई बाक्लो कागजले बेरेर, झोलामा “खतरा” भनेर लेखी फाल्नुहोस्। नत्र फोहोर संकलन गर्ने कर्मचारी घाइते हुन सक्छन्।"
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
   "zhHant": "垃圾分類的規定每個市區町村都不一樣。請務必確認您居住地的規定。",
   "ne": "फोहोर छुट्याउने नियम प्रत्येक सहर र वार्डमा फरक हुन्छ। तपाईं बस्ने ठाउँको नियम अवश्य जाँच्नुहोस्।"
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
   "zhHant": "請不要在前一天晚上把垃圾拿出去。請在收集日當天早上，在規定時間之前拿出去。",
   "ne": "अघिल्लो दिन बेलुका फोहोर बाहिर नराख्नुहोस्। संकलन गर्ने दिन बिहान, तोकिएको समयभित्र राख्नुहोस्।"
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
   "zhHant": "放涼",
   "ne": "चिसो बनाउनुहोस्"
  },
  "新聞紙に吸わせる": {
   "en": "Soak it up into paper",
   "zh": "用纸吸收",
   "vi": "Cho thấm vào giấy",
   "ko": "종이에 흡수시키기",
   "pt": "Absorva em jornal",
   "tl": "Ipasipsip sa diyaryo",
   "es": "Absorba con periódico",
   "id": "Serap dengan koran",
   "zhHant": "用報紙吸乾",
   "ne": "पत्रिकामा सोसाउनुहोस्"
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
   "zhHant": "用凝固劑凝固",
   "ne": "जमाउने पाउडरले जमाउनुहोस्"
  },
  "袋の口をしばる": {
   "en": "Close the bag securely",
   "zh": "系紧垃圾袋口",
   "vi": "Buộc chặt miệng túi",
   "ko": "봉투 입구를 묶기",
   "pt": "Feche bem o saco",
   "tl": "Itali ang supot",
   "es": "Cierre la bolsa",
   "id": "Ikat kantongnya",
   "zhHant": "紮緊袋口",
   "ne": "झोलाको मुख बाँध्नुहोस्"
  },
  "中を 水で洗う": {
   "en": "Rinse the inside with water",
   "zh": "用水冲洗内部",
   "vi": "Rửa sạch bên trong bằng nước",
   "ko": "안을 물로 헹구기",
   "pt": "Enxágue por dentro",
   "tl": "Hugasan ang loob ng tubig",
   "es": "Enjuague por dentro",
   "id": "Cuci bagian dalam",
   "zhHant": "用水沖洗內部",
   "ne": "भित्र पानीले धुनुहोस्"
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
   "zhHant": "剪開攤平",
   "ne": "काटेर खोल्नुहोस्"
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
   "zhHant": "晾乾",
   "ne": "सुकाउनुहोस्"
  },
  "最後まで使い切る": {
   "en": "Fully use up the contents",
   "zh": "将内装物完全用完",
   "vi": "Sử dụng hết chất bên trong",
   "ko": "내용물을 완전히 사용하기",
   "pt": "Use até o fim",
   "tl": "Ubusin ang laman",
   "es": "Use todo el contenido",
   "id": "Habiskan isinya",
   "zhHant": "全部用完",
   "ne": "पूरै प्रयोग गरी सक्नुहोस्"
  },
  "紙に包んで「キケン」と書く": {
   "en": "Wrap in thick paper and attach a label saying “キケン (Danger)”",
   "zh": "使用厚纸包裹并标示“キケン（危险）”",
   "vi": "Bọc bằng giấy dày và dán nhãn “キケン” (nguy hiểm)",
   "ko": "두꺼운 종이에 싸서 “キケン”(위험)이라고 표시",
   "pt": "Embrulhe e escreva PERIGO",
   "tl": "Balutin at isulat ang PELIGRO",
   "es": "Envuelva y escriba PELIGRO",
   "id": "Bungkus dan tulis BAHAYA",
   "zhHant": "用紙包好寫上「危險」",
   "ne": "कागजमा बेरेर खतरनाक लेख्नुहोस्"
  },
  "かるく洗って乾かす": {
   "en": "Rinse lightly and dry",
   "zh": "稍微冲洗后晾干",
   "vi": "Rửa sơ với nước rồi để ráo",
   "ko": "살짝 헹궈 말리기",
   "pt": "Enxágue e deixe secar",
   "tl": "Banlawan at patuyuin",
   "es": "Enjuague y seque",
   "id": "Bilas dan keringkan",
   "zhHant": "輕輕沖洗後晾乾",
   "ne": "हल्का धोएर सुकाउनुहोस्"
  }
 },
 "signw": {
  "収集日": {
   "zh": "回收日",
   "vi": "Ngày thu gom",
   "ko": "수거일",
   "pt": "dia da coleta",
   "tl": "Araw ng pagkolekta",
   "es": "Día de recolección",
   "id": "Hari pengumpulan",
   "zhHant": "收集日",
   "ne": "संकलन गर्ने दिन",
   "en": "Collection date"
  },
  "指定袋": {
   "zh": "指定垃圾袋",
   "vi": "Túi rác chỉ định",
   "ko": "지정 봉투",
   "pt": "saco estabelecido",
   "tl": "Itinalagang supot",
   "es": "Bolsa designada",
   "id": "Kantong yang ditentukan",
   "zhHant": "指定垃圾袋",
   "ne": "तोकिएको झोला",
   "en": "Designated waste bag"
  },
  "資源": {
   "zh": "资源垃圾",
   "vi": "Rác tài nguyên",
   "ko": "자원 쓰레기",
   "pt": "lixo reciclável",
   "tl": "Recyclable",
   "es": "Reciclable",
   "id": "Bahan daur ulang",
   "zhHant": "資源回收物",
   "ne": "पुन:प्रयोग योग्य",
   "en": "Recyclable waste"
  },
  "粗大ごみ": {
   "zh": "大件垃圾",
   "vi": "Rác cồng kềnh",
   "ko": "대형 쓰레기",
   "pt": "lixo volumoso",
   "tl": "Malalaking basura",
   "es": "Basura voluminosa",
   "id": "Sampah besar",
   "zhHant": "大型垃圾",
   "ne": "ठूलो फोहोर",
   "en": "Bulky waste"
  },
  "申し込み": {
   "zh": "申请",
   "vi": "Đăng ký",
   "ko": "접수·신청",
   "pt": "Solicitação prévia",
   "tl": "Paunang aplikasyon",
   "es": "Solicitud previa",
   "id": "Pendaftaran awal",
   "zhHant": "預約申請",
   "ne": "बुकिङ",
   "en": "Application"
  },
  "手数料": {
   "zh": "手续费",
   "vi": "Lệ phí",
   "ko": "수수료",
   "pt": "Taxa",
   "tl": "Bayad",
   "es": "Tarifa",
   "id": "Biaya",
   "zhHant": "手續費",
   "ne": "शुल्क",
   "en": "Disposal charge"
  },
  "回収できません": {
   "zh": "不予回收",
   "vi": "Không được thu gom",
   "ko": "수거할 수 없습니다",
   "pt": "Não pode ser coletado",
   "tl": "Hindi makokolekta",
   "es": "No se puede recoger",
   "id": "Tidak dapat dikumpulkan",
   "zhHant": "無法回收",
   "ne": "सङ्कलन गरिँदैन",
   "en": "Cannot be collected"
  },
  "持ち帰り": {
   "zh": "请带回",
   "vi": "Mang về nhà",
   "ko": "가지고 돌아가기",
   "pt": "Leve de volta",
   "tl": "Iuwi",
   "es": "Llévelo de vuelta",
   "id": "Bawa pulang",
   "zhHant": "帶回家",
   "ne": "फिर्ता लैजानुहोस्",
   "en": "Take it back home"
  },
  "厳守": {
   "zh": "必须遵守",
   "vi": "Tuân thủ nghiêm ngặt",
   "ko": "반드시 지켜 주십시오",
   "pt": "Cumprir rigorosamente",
   "tl": "Mahigpit na sundin",
   "es": "Cumplir estrictamente",
   "id": "Patuhi dengan ketat",
   "zhHant": "必須遵守",
   "ne": "अवश्य पालना गर्नुहोस्",
   "en": "Must be observed"
  },
  "ご協力ください": {
   "zh": "请配合",
   "vi": "Mong bạn hợp tác",
   "ko": "협력해 주십시오",
   "pt": "Contamos com sua colaboração",
   "tl": "Salamat sa inyong pakikiisa",
   "es": "Gracias por su colaboración",
   "id": "Mohon kerja samanya",
   "zhHant": "請合作",
   "ne": "सहयोगको लागि धन्यवाद",
   "en": "Your cooperation is appreciated"
  }
 },
 "sources": [
  {
   "name": "大阪市「ごみのマナーABC」英語版・ネパール語版・ベトナム語版・韓国朝鮮語版（2025年4月 改訂版）／CC BY 4.0",
   "url": "https://www.city.osaka.lg.jp/kankyo/page/0000524768.html"
  },
  {
   "name": "大阪市ホームページ 著作権・免責（公共データ利用規約に準拠。翻訳・翻案・商用可）",
   "url": "https://www.city.osaka.lg.jp/main/site_policy/0000000124.html"
  },
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
  },
  {
   "name": "広島市 環境局「家庭ごみの正しい出し方」ネパール語版（区分名・品目名の表記の基準）",
   "url": "https://www.city.hiroshima.lg.jp/"
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
