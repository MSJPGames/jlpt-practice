/* 声調データ: code -> { system, note, tones:[{name, mark, contour(5段階の音高), ex:[表記,読み,意味]}] }
   contour は 1(低)〜5(高) の音高を時間順に並べたもの（図と音のグライドに使用）。 */
window.TONES = {
  zh: { system:'4声＋軽声', note:'高さの動き（ピッチ）で意味が変わります。数字は5段階の音の高さ。', tones:[
    {name:'第1声（陰平）', mark:'ˉ', contour:[5,5],  ex:['妈','mā','母 mother']},
    {name:'第2声（陽平）', mark:'ˊ', contour:[3,5],  ex:['麻','má','麻 hemp']},
    {name:'第3声（上声）', mark:'ˇ', contour:[2,1,4],ex:['马','mǎ','馬 horse']},
    {name:'第4声（去声）', mark:'ˋ', contour:[5,1],  ex:['骂','mà','しかる scold']},
    {name:'軽声', mark:'·', contour:[2], ex:['吗','ma','（疑問）?']}
  ]},
  yue: { system:'6声', note:'広東語は声調が6つ。数字は粵拼（ジュッピン）の声調番号。', tones:[
    {name:'1声', mark:'˥',  contour:[5,5], ex:['詩','si1','詩 poem']},
    {name:'2声', mark:'˧˥', contour:[3,5], ex:['史','si2','歴史 history']},
    {name:'3声', mark:'˧',  contour:[3,3], ex:['試','si3','試す try']},
    {name:'4声', mark:'˨˩', contour:[2,1], ex:['時','si4','時 time']},
    {name:'5声', mark:'˩˧', contour:[1,3], ex:['市','si5','市 market']},
    {name:'6声', mark:'˨',  contour:[2,2], ex:['是','si6','〜だ is']}
  ]},
  th: { system:'5声', note:'タイ語は声調が5つ。', tones:[
    {name:'平声 mid', mark:'˧',   contour:[3,3],  ex:['คา','khaa','はさまる']},
    {name:'低声 low', mark:'˨˩',  contour:[2,1],  ex:['ข่า','khàa','ガランガル']},
    {name:'下声 falling', mark:'˥˩', contour:[4,1], ex:['ข้า','khâa','私（古語）']},
    {name:'高声 high', mark:'˦˥', contour:[4,5],  ex:['ค้า','kháa','商う']},
    {name:'上声 rising', mark:'˩˦', contour:[2,1,4], ex:['ขา','khǎa','脚']}
  ]},
  vi: { system:'6声（北部）', note:'ベトナム語（北部）の声調は6つ。高さの動きだけでなく「長さ」と「声のきしみ（声門化）」も手がかりになる。線の長さ＝音の相対的な長さ、×印＝声門化（のどをつめる／きしむ所）を表す。', tones:[
    {name:'ngang 平', mark:'˧',   contour:[3,3],  dur:1.0, len:'長', ex:['ma','ma','幽霊 ghost']},
    {name:'huyền 下降', mark:'˨˩', contour:[2,1],  dur:1.0, len:'長', voice:'息もれ', ex:['mà','mà','しかし but']},
    {name:'sắc 上昇', mark:'˧˥',  contour:[3,5],  dur:0.8, len:'中', ex:['má','má','ほお/母']},
    {name:'hỏi 下降上昇', mark:'˧˩˧', contour:[3,2,4], dur:1.0, len:'長', ex:['mả','mả','墓 tomb']},
    {name:'ngã きしみ上昇', mark:'˧˥ˀ', contour:[3,5], dur:0.75, len:'中', glottal:'mid', ex:['mã','mã','馬/コード']},
    {name:'nặng 低短', mark:'˨˩ˀ', contour:[2,1], dur:0.5, len:'短', glottal:'end', ex:['mạ','mạ','稲の苗']}
  ]},
  zhtw: { system:'4声＋軽声', note:'台湾華語（國語）の声調は普通話と同じ4声＋軽声。数字は5段階の高さ。', tones:[
    {name:'第1声（陰平）', mark:'ˉ', contour:[5,5], ex:['媽','ㄇㄚ mā','母']},
    {name:'第2声（陽平）', mark:'ˊ', contour:[3,5], ex:['麻','ㄇㄚˊ má','麻']},
    {name:'第3声（上声）', mark:'ˇ', contour:[2,1,4], ex:['馬','ㄇㄚˇ mǎ','馬']},
    {name:'第4声（去声）', mark:'ˋ', contour:[5,1], ex:['罵','ㄇㄚˋ mà','しかる']},
    {name:'軽声', mark:'·', contour:[2], ex:['嗎','ㄇㄚ˙ ma','（疑問）']}
  ]},
  nan: { system:'7声（伝統8声）＋連続変調', note:'台語（閩南語）は伝統的に8声、実際は7つを区別。線の長さ＝音の相対的な長さで、入声（陰入・陽入）は -p/-t/-k/-h で止まる短い声調（図では縦棒｜で詰まりを示す）。文中では連続変調で本調から変わる。数字は5段階の高さの目安。', tones:[
    {name:'第1声 陰平', mark:'˥', contour:[5,5], ex:['東','tong','東']},
    {name:'第2声 陰上', mark:'˥˧', contour:[5,3], ex:['黨','tóng','党']},
    {name:'第3声 陰去', mark:'˧˩', contour:[3,1], ex:['棟','tòng','棟']},
    {name:'第4声 陰入', mark:'˧ˀ', contour:[3,3], dur:0.4, len:'短', stop:'end', ex:['督','tok','監督']},
    {name:'第5声 陽平', mark:'˨˦', contour:[2,4], ex:['同','tông','同じ']},
    {name:'第7声 陽去', mark:'˧', contour:[3,3], ex:['動','tōng','動く']},
    {name:'第8声 陽入', mark:'˥ˀ', contour:[5,5], dur:0.4, len:'短', stop:'end', ex:['毒','to̍k','毒']}
  ]}
};
