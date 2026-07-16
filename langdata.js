/* =========================================================================
   日本語の部屋 — 多言語データ（共有）
   1言語＝1オブジェクト。ここに1件足すだけで、一覧(gaikokugo.html)と
   個別ページ(lang.html)の両方に自動で反映されます。
   phrases / numbers / selfintro は [表記, カナ読み] または [日本語, 表記, カナ読み]。
   カナ読みはおおよその発音の目安です。
   ========================================================================= */
window.LANGS = [
  {
    code:'zh', extras:[{href:'zh_tones.html',title:'🎵 声調（四声）',desc:'音の高さで意味が変わる。四声＋軽声・変調'}], jp:'中国語（普通話）', autonym:'中文 / 普通話', en:'Chinese (Mandarin)', chip:'中', group:'漢語',
    region:'中国・台湾・シンガポール ほか', script:'漢字（簡体字／繁体字）', family:'シナ・チベット語族', order:'SVO',
    tts:'zh-CN', resRank:'1位', learnRank:'1位', core:true, resident:true, learner:true, sov:false,
    accent:'#9A3D1C', bg:'#FAECE7', grammar:'grammar.html?code=zh', grammarTitle:'📖 HSKレベル別の文法を見る', grammarDesc:'新HSK1〜9級の文法を、例文つきでレベル別に',
    note:'漢字の知識は有利。ただし声調（4声）と簡体字、日中で意味の異なる漢語に注意。',
    phrases:[
      ['こんにちは','你好','ニーハオ'],['ありがとう','谢谢','シエシエ'],
      ['はい','对','ドゥイ'],['いいえ','不是','ブーシー'],
      ['すみません','对不起','ドゥイブチー'],['さようなら','再见','ザイジエン']
    ],
    numbers:[['一','イー'],['二','アール'],['三','サン'],['四','スー'],['五','ウー'],['六','リウ'],['七','チー'],['八','バー'],['九','ジウ'],['十','シー']],
    selfintro:[['はじめまして','初次见面','チューツー ジエンミエン'],['私は〇〇です','我叫〇〇','ウォー ジャオ 〇〇']],
    tips:['漢字の知識は大きな武器。ただし簡体字と日本の字体の違いに注意。','声調（4声）と、日中で意味がずれる漢語（例：手紙＝トイレットペーパー）に注意。']
  },
  {
    code:'ko', grammar:'grammar.html?code=ko', grammarTitle:'📖 TOPIKレベル別の文法を見る', grammarDesc:'TOPIK1〜6級の文法を、例文つきでレベル別に', extras:[{href:'korean_consonants.html',title:'🔊 平音・激音・濃音',desc:'3つの子音系列を聞き分け・出し分け'},{href:'korean_keigo.html',title:'🙇 待遇表現（丁寧さ・敬語）',desc:'반말/해요体/합니다体と尊敬・謙譲'}], jp:'韓国語', autonym:'한국어', en:'Korean', chip:'한',
    region:'韓国・北朝鮮', script:'ハングル', family:'朝鮮語族（系統は諸説）', order:'SOV（日本語型）',
    tts:'ko-KR', resRank:'3位', learnRank:'3位', core:true, resident:true, learner:true, sov:true,
    accent:'#185FA5', bg:'#E6F1FB',
    note:'語順・助詞・敬語が日本語と対応しやすく、相互に学びやすい言語。',
    phrases:[
      ['こんにちは','안녕하세요','アンニョンハセヨ'],['ありがとう','감사합니다','カムサハムニダ'],
      ['はい','네','ネ'],['いいえ','아니요','アニヨ'],
      ['すみません','죄송합니다','チェソンハムニダ'],['さようなら','안녕히 가세요','アンニョンヒ ガセヨ']
    ],
    numbers:[['일','イル'],['이','イ'],['삼','サム'],['사','サ'],['오','オ'],['육','ユク'],['칠','チル'],['팔','パル'],['구','ク'],['십','シプ']],
    selfintro:[['はじめまして','처음 뵙겠습니다','チョウム ペッケッスムニダ'],['私は〇〇です','저는 〇〇입니다','チョヌン 〇〇 イムニダ']],
    tips:['語順・助詞・敬語が日本語とよく対応し、相互に学びやすい。','漢字語の多くが日本語と共通。発音（パッチム）に慣れるのが鍵。']
  },
  {
    code:'vi', extras:[{href:'vi_tones.html',title:'🎵 声調（6声）',desc:'6つの声調と声調記号の見分け方'}], grammar:'grammar.html?code=vi', grammarTitle:'📖 レベル別の文法を見る', grammarDesc:'ベトナム語能力6段階（Khung NLTV・CEFR対応）の文法を例文つきで', jp:'ベトナム語', autonym:'Tiếng Việt', en:'Vietnamese', chip:'Vi',
    region:'ベトナム', script:'ラテン文字（声調符号つき）', family:'オーストロアジア語族', order:'SVO',
    tts:'vi-VN', resRank:'2位', learnRank:'6位', core:true, resident:true, learner:true, sov:false,
    accent:'#3B6D11', bg:'#EAF3DE',
    note:'6声調が最大の難関。孤立語で語形変化は少ない。国内の子弟支援で需要が大きい。',
    phrases:[
      ['こんにちは','Xin chào','シンチャオ'],['ありがとう','Cảm ơn','カムオン'],
      ['はい','Vâng','ヴァン'],['いいえ','Không','ホン'],
      ['すみません','Xin lỗi','シンロイ'],['さようなら','Tạm biệt','タムビエット']
    ],
    numbers:[['một','モッ'],['hai','ハイ'],['ba','バー'],['bốn','ボン'],['năm','ナム'],['sáu','サウ'],['bảy','バイ'],['tám','タム'],['chín','チン'],['mười','ムオイ']],
    selfintro:[['はじめまして','Rất vui được gặp bạn','ザッ ヴイ ドゥオック ガップ バン'],['私は〇〇です','Tôi tên là 〇〇','トイ テン ラー 〇〇']],
    tips:['6声調が最大の難関。まず音を正確に。','孤立語で語形変化が少なく、文法はシンプル。漢越語は日本語と対応することも。']
  },
  {
    code:'id', extras:[{href:'id_grammar.html',title:'🧩 語形成（接辞と畳語）',desc:'me-/ber-…語根から語を作るしくみ'}], grammar:'grammar.html?code=id', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2（BIPA/UKBI対応）の文法を例文つきで', jp:'インドネシア語', autonym:'Bahasa Indonesia', en:'Indonesian', chip:'Id',
    region:'インドネシア（共通語）', script:'ラテン文字', family:'オーストロネシア語族', order:'SVO',
    tts:'id-ID', resRank:'6位', learnRank:'2位', core:true, resident:true, learner:true, sov:false,
    accent:'#1F6F6B', bg:'#DFF0EE',
    note:'つづりが表音的で読みやすく、文法は比較的平易。声調はなし。',
    phrases:[
      ['こんにちは','Halo','ハロー'],['ありがとう','Terima kasih','トゥリマ カシ'],
      ['はい','Ya','ヤ'],['いいえ','Tidak','ティダッ'],
      ['すみません','Maaf','マアフ'],['さようなら','Sampai jumpa','サンパイ ジュンパ']
    ],
    numbers:[['satu','サトゥ'],['dua','ドゥア'],['tiga','ティガ'],['empat','ウンパッ'],['lima','リマ'],['enam','ウナム'],['tujuh','トゥジュ'],['delapan','ドゥラパン'],['sembilan','スンビラン'],['sepuluh','スプルー']],
    selfintro:[['はじめまして','Senang bertemu dengan Anda','スナン ブルトゥム ドゥンガン アンダ'],['私は〇〇です','Nama saya 〇〇','ナマ サヤ 〇〇']],
    tips:['つづりがほぼローマ字読みで入りやすい。','声調や語形変化が少なく、初学者に学びやすい言語。']
  },
  {
    code:'my', grammar:'grammar.html?code=my', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2の目安で、ビルマ語の文法を例文つきで', jp:'ビルマ語', autonym:'မြန်မာဘာသာ', en:'Burmese', chip:'မ',
    region:'ミャンマー', script:'ビルマ文字', family:'シナ・チベット語族', order:'SOV（日本語型）',
    tts:'my-MM', resRank:'8位', learnRank:'9位', core:true, resident:true, learner:true, sov:true,
    accent:'#854F0B', bg:'#FAEEDA',
    note:'語順が日本語型でとっつきやすい一方、独特の文字と声調が難関。両調査で急伸中。',
    phrases:[
      ['こんにちは','မင်္ဂလာပါ','ミンガラーバー'],['ありがとう','ကျေးဇူးတင်ပါတယ်','チェーズー ティンバーデー'],
      ['はい','ဟုတ်ကဲ့','ホウッケッ'],['いいえ','မဟုတ်ပါဘူး','マホウッパーブー'],
      ['すみません','ခွင့်လွှတ်ပါ','クイン ルッ パー']
    ],
    numbers:[['တစ်','ティッ'],['နှစ်','フニッ'],['သုံး','トゥーン'],['လေး','レー'],['ငါး','ンガー'],['ခြောက်','チャウッ'],['ခုနစ်','クニッ'],['ရှစ်','シッ'],['ကိုး','コー'],['ဆယ်','セー']],
    selfintro:[['はじめまして','တွေ့ရတာ ဝမ်းသာပါတယ်','トゥエヤーダー ワンターバーデー'],['私は〇〇です','ကျွန်တော့်နာမည် 〇〇 ပါ','チュノー ナメー 〇〇 バー']],
    tips:['語順が日本語型（SOV）で文の組み立ては親しみやすい。','独特の文字と声調が難所。まずは文字と音から。']
  },
  {
    code:'en', extras:[{href:'en_pronunciation.html',title:'🔊 発音のポイント',desc:'L/R・th・母音・強勢リズム'}], grammar:'grammar.html?code=en', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2（英検・TOEIC）の文法を、例文つきでレベル別に', jp:'英語', autonym:'English', en:'English', chip:'En',
    region:'豪・米・比 ほか世界各地', script:'ラテン文字', family:'インド・ヨーロッパ語族', order:'SVO',
    tts:'en-US', resRank:null, learnRank:'豪4・米7位', core:false, resident:false, learner:true, sov:false,
    accent:'#3C3489', bg:'#EEEDFE',
    note:'共通語・媒介語として有用。冠詞・時制・複数が日本語話者のつまずきどころ。',
    phrases:[
      ['こんにちは','Hello','ハロー'],['ありがとう','Thank you','サンキュー'],
      ['はい','Yes','イエス'],['いいえ','No','ノー'],
      ['すみません','Excuse me','イクスキューズ ミー'],['さようなら','Goodbye','グッバイ']
    ],
    numbers:[['one','ワン'],['two','トゥー'],['three','スリー'],['four','フォー'],['five','ファイブ'],['six','シックス'],['seven','セブン'],['eight','エイト'],['nine','ナイン'],['ten','テン']],
    selfintro:[['はじめまして','Nice to meet you','ナイス トゥ ミート ユー'],['私は〇〇です','My name is 〇〇','マイ ネイム イズ 〇〇']],
    tips:['共通語・媒介語として、多国籍の家庭との最初の橋渡しに有用。','冠詞・時制・単複が日本語話者のつまずきどころ。']
  },
  {
    code:'th', extras:[{href:'th_tones.html',title:'🎵 声調（5声）',desc:'タイ文字のつづりで決まる5つの声調'}], grammar:'grammar.html?code=th', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2の目安で、タイ語の文法を例文つきで', jp:'タイ語', autonym:'ภาษาไทย', en:'Thai', chip:'ไ',
    region:'タイ', script:'タイ文字', family:'タイ・カダイ語族', order:'SVO',
    tts:'th-TH', resRank:null, learnRank:'5位', core:false, resident:false, learner:true, sov:false,
    accent:'#97406A', bg:'#F7E8F0',
    note:'5声調と独特の文字が特徴。語順はSVO。',
    phrases:[
      ['こんにちは','สวัสดี','サワッディー'],['ありがとう','ขอบคุณ','コープクン'],
      ['はい','ใช่','チャイ'],['いいえ','ไม่ใช่','マイチャイ'],
      ['すみません','ขอโทษ','コートート'],['さようなら','ลาก่อน','ラーゴーン']
    ],
    numbers:[['หนึ่ง','ヌン'],['สอง','ソーン'],['สาม','サーム'],['สี่','シー'],['ห้า','ハー'],['หก','ホック'],['เจ็ด','ジェット'],['แปด','ペート'],['เก้า','カオ'],['สิบ','シップ']],
    selfintro:[['はじめまして','ยินดีที่ได้รู้จัก','インディー ティー ダイ ルーチャック'],['私は〇〇です','ผม/ดิฉันชื่อ 〇〇','ポム／ディチャン チュー 〇〇']],
    tips:['5声調と独自の文字が特徴。声調で意味が変わる。','語順はSVO。分かち書きをしない点に注意。']
  },
  {
    code:'hi', extras:[{href:'hi_writing.html',title:'🔤 文字と音',desc:'デーヴァナーガリー・有気音・そり舌音'}], grammar:'grammar.html?code=hi', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2の目安で、ヒンディー語の文法を例文つきで', jp:'ヒンディー語', autonym:'हिन्दी', en:'Hindi', chip:'हि',
    region:'インド北部', script:'デーヴァナーガリー文字', family:'インド・ヨーロッパ語族', order:'SOV（日本語型）',
    tts:'hi-IN', resRank:null, learnRank:'10位（インド）', core:false, resident:false, learner:true, sov:true,
    accent:'#6E5B10', bg:'#F2EFD9',
    note:'語順がSOVで日本語に近い。名詞の後ろに置く後置詞は助詞に似た働き。',
    phrases:[
      ['こんにちは','नमस्ते','ナマステー'],['ありがとう','धन्यवाद','ダニヤワード'],
      ['はい','हाँ','ハーン'],['いいえ','नहीं','ナヒーン'],
      ['すみません','माफ़ कीजिए','マーフ キージエ'],['さようなら','अलविदा','アルヴィダー']
    ],
    numbers:[['एक','エーク'],['दो','ドー'],['तीन','ティーン'],['चार','チャール'],['पाँच','パーンチ'],['छह','チェ'],['सात','サート'],['आठ','アート'],['नौ','ナウ'],['दस','ダス']],
    selfintro:[['はじめまして','आपसे मिलकर खुशी हुई','アープセ ミルカル クシー フイー'],['私は〇〇です','मेरा नाम 〇〇 है','メーラー ナーム 〇〇 ハェ']],
    tips:['語順がSOVで日本語に近い。後置詞は助詞に似た働き。','デーヴァナーガリー文字。母音記号の仕組みを押さえると読みやすい。']
  },
  {
    code:'tl', grammar:'grammar.html?code=tl', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2の目安で、フィリピノ語の文法を例文つきで', jp:'フィリピノ語（タガログ語）', autonym:'Tagalog / Filipino', en:'Filipino (Tagalog)', chip:'Tl',
    region:'フィリピン', script:'ラテン文字', family:'オーストロネシア語族', order:'述語先頭（VSO型）',
    tts:'fil-PH', resRank:'4位', learnRank:null, core:false, resident:true, learner:false, sov:false,
    accent:'#8A4A24', bg:'#F4E9E1',
    note:'動詞中心のフォーカス（態）体系が独特。英語からの借用語も多い。',
    phrases:[
      ['こんにちは','Kumusta','クムスタ'],['ありがとう','Salamat','サラマット'],
      ['はい','Oo','オオ'],['いいえ','Hindi','ヒンディ'],
      ['すみません','Paumanhin','パウマンヒン'],['さようなら','Paalam','パアラム']
    ],
    numbers:[['isa','イサ'],['dalawa','ダラワ'],['tatlo','タトロ'],['apat','アパット'],['lima','リマ'],['anim','アニム'],['pito','ピト'],['walo','ワロ'],['siyam','シヤム'],['sampu','サンプー']],
    selfintro:[['はじめまして','Ikinagagalak kong makilala ka','イキナガガラック コン マキラーラ カ'],['私は〇〇です','Ako si 〇〇','アコ シ 〇〇']],
    tips:['英語からの借用語が多く、英語が通じやすい。','動詞のフォーカス（態）体系が独特。まずは定型表現から。']
  },
  {
    code:'ne', jp:'ネパール語', autonym:'नेपाली', en:'Nepali', chip:'ने',
    region:'ネパール', script:'デーヴァナーガリー文字', family:'インド・ヨーロッパ語族', order:'SOV（日本語型）',
    tts:'ne-NP', resRank:'5位', learnRank:null, core:false, resident:true, learner:false, sov:true,
    accent:'#7A5A12', bg:'#F3EEDB',
    note:'SOV・後置詞で日本語に近い構造。コピュラは हो（〜だ）と छ（ある・状態）の2種類。敬語が3段階あり、動詞は主語に一致。近年、学齢期の子どもが急増。',
    grammar:'ne_grammar.html',
    phrases:[
      ['こんにちは','नमस्ते','ナマステ'],['ありがとう','धन्यवाद','ダンニャバード'],
      ['はい','हो','ホ'],['いいえ','होइन','ホイナ'],
      ['すみません','माफ गर्नुहोस्','マーフ ガルヌホス'],['さようなら','फेरि भेटौँला','フェリ ベタウンラ']
    ],
    numbers:[['एक','エク'],['दुई','ドゥイ'],['तीन','ティーン'],['चार','チャール'],['पाँच','パーンチ'],['छ','チャ'],['सात','サート'],['आठ','アート'],['नौ','ナウ'],['दश','ダス']],
    selfintro:[['はじめまして','भेटेर खुसी लाग्यो','ベテル クシ ラーギョ'],['私は〇〇です','मेरो नाम 〇〇 हो','メロ ナーム 〇〇 ホ']],
    tips:['SOV・後置詞（〜मा＝〜に、〜लाई＝〜を）で、日本語と語順がとても近い。','コピュラが2つ：हो（ho）＝「〜だ」（同定・性質）、छ（cha）＝「ある／いる・状態」（存在・状態・位置）。スペイン語の ser／estar に近い使い分け。','動詞は主語の人称・数・性・敬語レベルで変化する（主語と一致）。','敬語は3段階：तपाईं（尊敬）／तिमी（対等）／तँ（目下）。相手によって代名詞と動詞が変わる。','過去の他動詞では主語に 〜ले（le）が付く（能格的）。文字はヒンディー語と同じデーヴァナーガリーだが、語彙・発音は異なる。']
  },
  {
    code:'pt', extras:[{href:'pt_pronunciation.html',title:'👃 鼻母音と発音',desc:'ão・sim…鼻に抜ける母音のコツ'}], grammar:'grammar.html?code=pt', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2（Celpe-Bras）の文法を、例文つきでレベル別に', jp:'ポルトガル語', autonym:'Português', en:'Portuguese', chip:'Pt',
    region:'ブラジル・ポルトガル ほか', script:'ラテン文字', family:'インド・ヨーロッパ語族', order:'SVO',
    tts:'pt-BR', resRank:'7位（ブラジル）', learnRank:null, core:false, resident:true, learner:false, sov:false,
    accent:'#185FA5', bg:'#E6F1FB',
    note:'日系ブラジル人子弟の継承語支援で需要大（静岡・愛知・群馬など）。動詞活用と名詞の性が特徴。',
    phrases:[
      ['こんにちは','Olá','オラ'],['ありがとう','Obrigado / Obrigada','オブリガード／オブリガーダ'],
      ['はい','Sim','シン'],['いいえ','Não','ナォン'],
      ['すみません','Desculpe','デスクウピ'],['さようなら','Tchau','チャウ']
    ],
    numbers:[['um','ウン'],['dois','ドイス'],['três','トレス'],['quatro','クアトロ'],['cinco','シンコ'],['seis','セイス'],['sete','セッチ'],['oito','オイト'],['nove','ノーヴィ'],['dez','デス']],
    selfintro:[['はじめまして','Prazer em conhecê-lo','プラゼール エン コニェセーロ'],['私は〇〇です','Meu nome é 〇〇','メウ ノミ エ 〇〇']],
    tips:['在日ブラジル人子弟の継承語支援で特に需要が大きい。','動詞活用が豊富で名詞に性がある。ローマ字に近い読みで入りやすい面も。']
  },
  {
    code:'si', grammar:'grammar.html?code=si', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2の目安で、シンハラ語の文法を例文つきで', jp:'シンハラ語', autonym:'සිංහල', en:'Sinhala', chip:'සි',
    region:'スリランカ', script:'シンハラ文字', family:'インド・ヨーロッパ語族', order:'SOV（日本語型）',
    tts:'si-LK', resRank:'9位（スリランカ）', learnRank:null, core:false, resident:true, learner:false, sov:true,
    accent:'#3C3489', bg:'#EEEDFE',
    note:'SOVで語順は日本語に近い。話し言葉と書き言葉の差が大きい点に注意。',
    phrases:[
      ['こんにちは','ආයුබෝවන්','アーユボーワン'],['ありがとう','ස්තූතියි','ストゥーティイ'],
      ['はい','ඔව්','オウ'],['いいえ','නැහැ','ナェハェ'],
      ['すみません','සමාවෙන්න','サマーウェンナ'],['さようなら','ගිහින් එන්නම්','ギヒン エンナン']
    ],
    numbers:[['එක','エカ'],['දෙක','デカ'],['තුන','トゥナ'],['හතර','ハタラ'],['පහ','パハ'],['හය','ハヤ'],['හත','ハタ'],['අට','アタ'],['නවය','ナワヤ'],['දහය','ダハヤ']],
    selfintro:[['はじめまして','හමුවීම ගැන සතුටුයි','ハムウィーマ ゲナ サトゥトゥイ'],['私は〇〇です','මගේ නම 〇〇','マゲー ナマ 〇〇']],
    tips:['SOVで語順は日本語に近い。','話し言葉と書き言葉の差が大きい。まずは話し言葉から。']
  },
  {
    code:'ta', grammar:'grammar.html?code=ta', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2の目安で、タミル語の文法を例文つきで', jp:'タミル語', autonym:'தமிழ்', en:'Tamil', chip:'த',
    region:'スリランカ・インド南部', script:'タミル文字', family:'ドラヴィダ語族', order:'SOV（日本語型）',
    tts:'ta-IN', resRank:'9位（スリランカ）', learnRank:null, core:false, resident:true, learner:false, sov:true,
    accent:'#97406A', bg:'#F7E8F0',
    note:'膠着語でSOV。語順・膠着性が日本語と似る。スリランカのタミル系などが話す。',
    phrases:[
      ['こんにちは','வணக்கம்','ワナッカム'],['ありがとう','நன்றி','ナンドリ'],
      ['はい','ஆம்','アーム'],['いいえ','இல்லை','イッライ'],
      ['すみません','மன்னிக்கவும்','マンニックヴム'],['さようなら','மீண்டும் சந்திப்போம்','ミーンドゥム サンディッポーム']
    ],
    numbers:[['ஒன்று','オンドゥル'],['இரண்டு','イランドゥ'],['மூன்று','ムーンドゥル'],['நான்கு','ナーング'],['ஐந்து','アインドゥ'],['ஆறு','アール'],['ஏழு','エール'],['எட்டு','エットゥ'],['ஒன்பது','オンバドゥ'],['பத்து','パットゥ']],
    selfintro:[['はじめまして','உங்களை சந்தித்ததில் மகிழ்ச்சி','ウンガライ サンディッタディル マギルッチ'],['私は〇〇です','என் பெயர் 〇〇','エン ペヤル 〇〇']],
    tips:['膠着語でSOV。語順・助詞的な仕組みが日本語と似る。','長母音・そり舌音など音の区別が豊富。文字は音節文字。']
  },
  {
    code:'bn', grammar:'grammar.html?code=bn', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2の目安で、ベンガル語の文法を例文つきで', jp:'ベンガル語', autonym:'বাংলা', en:'Bengali', chip:'ব',
    region:'バングラデシュ・インド西ベンガル州', script:'ベンガル文字（アブギダ）', family:'インド・ヨーロッパ語族（インド・アーリア）', order:'SOV（日本語型）',
    tts:'bn-BD', resRank:null, learnRank:null, core:false, resident:false, learner:false, sov:true,
    accent:'#2E6B57', bg:'#DEEDE7',
    note:'SOV・後置詞で日本語と語順が近い。声調がなく、名詞に文法性もない点が学びやすい。',
    phrases:[
      ['こんにちは','নমস্কার','ノモシュカル'],['ありがとう','ধন্যবাদ','ドンノバード'],
      ['はい','হ্যাঁ','ハン'],['いいえ','না','ナ'],
      ['すみません','মাফ করবেন','マフ コルベン'],['さようなら','বিদায়','ビダエ']
    ],
    numbers:[['এক','エク'],['দুই','ドゥイ'],['তিন','ティン'],['চার','チャル'],['পাঁচ','パーンチ'],['ছয়','チョエ'],['সাত','シャト'],['আট','アト'],['নয়','ノエ'],['দশ','ドシュ']],
    selfintro:[['はじめまして','আপনার সাথে দেখা হয়ে ভালো লাগলো','アプナル シャテ デカ ホエ バロ ラグロ'],['私は〇〇です','আমার নাম 〇〇','アマル ナム 〇〇']],
    tips:['SOV・後置詞で日本語と語順が近い。','声調がなく名詞に性もない。文字は頭線（মাত্রা）でつなぐアブギダ。']
  },
  {
    code:'ur', grammar:'grammar.html?code=ur', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2の目安で、ウルドゥー語の文法を例文つきで', jp:'ウルドゥー語', autonym:'اردو', en:'Urdu', chip:'اُ',
    region:'パキスタン・インド', script:'ウルドゥー文字（アラビア文字系・右→左）', family:'インド・ヨーロッパ語族（インド・アーリア）', order:'SOV（日本語型）',
    tts:'ur-PK', resRank:null, learnRank:null, core:false, resident:false, learner:false, sov:true,
    accent:'#2E7D46', bg:'#E0F0E5',
    note:'SOV・後置詞で日本語と語順が近い。ヒンディー語とほぼ同じ文法で、語彙にペルシア・アラビア語由来が多い。右→左に書く。',
    phrases:[
      ['こんにちは','السلام علیکم','アッサラーム アライクム'],['ありがとう','شکریہ','シュクリヤ'],
      ['はい','جی ہاں','ジー ハーン'],['いいえ','نہیں','ナヒーン'],
      ['すみません','معاف کیجیے','マアフ キージエ'],['さようなら','خدا حافظ','クダー ハーフィズ']
    ],
    numbers:[['ایک','エク'],['دو','ドー'],['تین','ティーン'],['چار','チャール'],['پانچ','パーンチ'],['چھ','チェ'],['سات','サート'],['آٹھ','アート'],['نو','ナウ'],['دس','ダス']],
    selfintro:[['はじめまして','آپ سے مل کر خوشی ہوئی','アープ セ ミル カル クシー フイー'],['私は〇〇です','میرا نام 〇〇 ہے','メーラー ナーム 〇〇 ハェ']],
    tips:['SOV・後置詞で日本語と語順が近い（ヒンディー語とほぼ同じ文法）。','文字はアラビア文字系で右から左へ。短母音は記号で表す。']
  },
  {
    code:'yue', extras:[{href:'yue_tones.html',title:'🎵 声調（6声）',desc:'6つの声調。Jyutpingの数字で表す'}], grammar:'grammar.html?code=yue', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2の目安で、広東語の文法を例文つきで', jp:'広東語', autonym:'廣東話 / 粵語', en:'Cantonese', chip:'粵',
    region:'香港・マカオ・広東省', script:'漢字（繁体字）', family:'シナ・チベット語族', order:'SVO',
    tts:'zh-HK', resRank:null, learnRank:null, core:false, resident:false, learner:false, sov:false, group:'漢語',
    accent:'#B03A2E', bg:'#F7E4E0',
    note:'粵語。声調が6つあり、普通話（4声）とは発音・語彙・文法が大きく異なる。香港・マカオ・広東省で話される。',
    phrases:[
      ['こんにちは','你好','ネイホウ'],['ありがとう','多謝','ドージェ'],
      ['はい','係','ハイ'],['いいえ','唔係','ムハイ'],
      ['すみません','唔好意思','ムホウイーシー'],['さようなら','再見','ジョイギン']
    ],
    numbers:[['一','ヤッ jat1'],['二','イー ji6'],['三','サーム saam1'],['四','セイ sei3'],['五','ン ng5'],['六','ロッ luk6'],['七','ツァッ cat1'],['八','バーッ baat3'],['九','ガウ gau2'],['十','サッ sap6']],
    selfintro:[['はじめまして','好高興認識你','ホウ ゴウヒン イェンシッ ネイ'],['私は〇〇です','我叫〇〇','ンゴー ギウ 〇〇']],
    tips:['声調が6つ（普通話は4つ）。漢字は繁体字。','語彙・文法も普通話と異なる。-p/-t/-k で終わる入声がある。読みは粵拼（ジュッピン）。']
  },
  {
    code:'es', extras:[{href:'es_pronunciation.html',title:'🔊 発音とアクセント',desc:'母音・rr・j・ñ・強勢の規則'}], grammar:'grammar.html?code=es', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2（DELE/SIELE）の文法を、例文つきでレベル別に', jp:'スペイン語', autonym:'Español', en:'Spanish', chip:'Es',
    region:'スペイン・中南米', script:'ラテン文字', family:'インド・ヨーロッパ語族（ロマンス）', order:'SVO',
    tts:'es-ES', resRank:null, learnRank:null, core:false, resident:false, learner:false, sov:false,
    accent:'#C25E00', bg:'#FBEBDD',
    note:'世界で広く話される言語。動詞は主語で活用し、名詞に性がある。つづりは表音的で読みやすい。',
    phrases:[
      ['こんにちは','Hola','オラ'],['ありがとう','Gracias','グラシアス'],
      ['はい','Sí','シー'],['いいえ','No','ノー'],
      ['すみません','Perdón','ペルドン'],['さようなら','Adiós','アディオス']
    ],
    numbers:[['uno','ウノ'],['dos','ドス'],['tres','トレス'],['cuatro','クアトロ'],['cinco','シンコ'],['seis','セイス'],['siete','シエテ'],['ocho','オチョ'],['nueve','ヌエベ'],['diez','ディエス']],
    selfintro:[['はじめまして','Mucho gusto','ムチョ グスト'],['私は〇〇です','Me llamo 〇〇','メ ジャモ 〇〇']],
    tips:['SVO。動詞は主語で活用し、名詞・形容詞に性・数がある。','つづりはほぼ表音的で読みやすい。疑問文・感嘆文は ¿ ? ・ ¡ ! で囲む。']
  },
  {
    code:'fr', extras:[{href:'fr_nasal.html',title:'👃 鼻母音とリエゾン',desc:'an/on/in の鼻母音と、単語がつながる連音'}], grammar:'grammar.html?code=fr', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2（DELF/DALF）の文法を、例文つきでレベル別に', jp:'フランス語', autonym:'Français', en:'French', chip:'Fr',
    region:'フランス・カナダ・アフリカ他', script:'ラテン文字', family:'インド・ヨーロッパ語族（ロマンス）', order:'SVO',
    tts:'fr-FR', resRank:null, learnRank:null, core:false, resident:false, learner:false, sov:false,
    accent:'#2E5AAC', bg:'#E5ECF7',
    note:'名詞に性があり、動詞は主語で活用。つづりと発音のずれが大きく、リエゾンで単語がつながる。',
    phrases:[
      ['こんにちは','Bonjour','ボンジュール'],['ありがとう','Merci','メルシー'],
      ['はい','Oui','ウィ'],['いいえ','Non','ノン'],
      ['すみません','Pardon','パルドン'],['さようなら','Au revoir','オ ルヴォワール']
    ],
    numbers:[['un','アン'],['deux','ドゥ'],['trois','トロワ'],['quatre','キャトル'],['cinq','サンク'],['six','シス'],['sept','セット'],['huit','ユイット'],['neuf','ヌフ'],['dix','ディス']],
    selfintro:[['はじめまして','Enchanté(e)','アンシャンテ'],['私は〇〇です','Je m’appelle 〇〇','ジュ マペル 〇〇']],
    tips:['SVO。名詞に性、動詞は主語で活用。','つづりと発音のずれが大きい。母音の前でリエゾン（連音）する。']
  },
  {
    code:'it', grammar:'grammar.html?code=it', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2（CILS/CELI）の文法を、例文つきでレベル別に', jp:'イタリア語', autonym:'Italiano', en:'Italian', chip:'It',
    region:'イタリア・スイス他', script:'ラテン文字', family:'インド・ヨーロッパ語族（ロマンス）', order:'SVO',
    tts:'it-IT', resRank:null, learnRank:null, core:false, resident:false, learner:false, sov:false,
    accent:'#2E8B57', bg:'#E3F1E9',
    note:'名詞に性があり、動詞は主語で活用。つづりと発音がほぼ規則的で読みやすい。',
    phrases:[
      ['こんにちは','Ciao','チャオ'],['ありがとう','Grazie','グラツィエ'],
      ['はい','Sì','スィ'],['いいえ','No','ノ'],
      ['すみません','Scusi','スクーズィ'],['さようなら','Arrivederci','アッリヴェデルチ']
    ],
    numbers:[['uno','ウーノ'],['due','ドゥーエ'],['tre','トレ'],['quattro','クアットロ'],['cinque','チンクエ'],['sei','セイ'],['sette','セッテ'],['otto','オット'],['nove','ノーヴェ'],['dieci','ディエチ']],
    selfintro:[['はじめまして','Piacere','ピアチェーレ'],['私は〇〇です','Mi chiamo 〇〇','ミ キアーモ 〇〇']],
    tips:['SVO。名詞に性、動詞は主語で活用。','つづりと発音がほぼ規則的で読みやすい。']
  },
  {
    code:'zhtw', grammar:'grammar.html?code=zhtw', grammarTitle:'📖 TOCFLレベル別の文法を見る', grammarDesc:'TOCFL1〜6級（華語文能力測驗・繁体字）の文法を例文つきで', jp:'台湾華語', autonym:'臺灣華語 / 國語', en:'Taiwanese Mandarin', chip:'華', group:'漢語',
    region:'台湾', script:'漢字（繁体字）・注音符号', family:'シナ・チベット語族', order:'SVO',
    tts:'zh-TW', resRank:null, learnRank:null, core:false, resident:false, learner:false, sov:false,
    accent:'#B23B3B', bg:'#F8E6E3',
    note:'台湾で話される標準中国語。文法は普通話とほぼ同じだが、繁体字を使い、発音記号は注音符号（ㄅㄆㄇ）。一部の語彙・発音・声調が大陸と異なる。',
    phrases:[
      ['こんにちは','你好','ニーハオ'],['ありがとう','謝謝','シエシエ'],
      ['はい','對','ドゥイ'],['いいえ','不是','ブーシー'],
      ['すみません','對不起','ドゥイブチー'],['さようなら','再見','ザイジエン']
    ],
    numbers:[['一','イー'],['二','アール'],['三','サン'],['四','スー'],['五','ウー'],['六','リウ'],['七','チー'],['八','バー'],['九','ジウ'],['十','シー']],
    selfintro:[['はじめまして','初次見面','チューツー ジエンミエン'],['私は〇〇です','我叫〇〇','ウォー ジャオ 〇〇']],
    tips:['文法・語彙は普通話とほぼ共通だが、繁体字で書く。','発音表記は注音符号（ㄅㄆㄇㄈ）。一部の声調・語彙・発音が大陸と異なる。','検定試験は TOCFL（華語文能力測驗）。']
  },
  {
    code:'nan', grammar:'grammar.html?code=nan', grammarTitle:'📖 台語の文法をレベル別に見る', grammarDesc:'基礎〜上級の台語文法を、漢字＋台羅の例文つきで', jp:'台湾語（台語）', autonym:'臺語 / 臺灣話', en:'Taiwanese (Hokkien)', chip:'台', group:'漢語',
    region:'台湾', script:'漢字・台羅（ローマ字）', family:'シナ・チベット語族（閩南語）', order:'SVO',
    tts:'nan', resRank:null, learnRank:null, core:false, resident:false, learner:false, sov:false,
    accent:'#8A6D1B', bg:'#F5EFD8',
    note:'台湾で広く話される閩南語系の言語（ホーロー語）。漢字と台羅（台湾閩南語羅馬字）で表記。7〜8の声調と連続変調が特徴で、北京語（華語）とは通じない。',
    phrases:[
      ['こんにちは','你好 (Lí-hó)','リー ホー'],['ありがとう','多謝 (To-siā)','ト シア'],
      ['はい','是 (Sī)','シー'],['いいえ','毋是 (M̄-sī)','ムー シー'],
      ['すみません','歹勢 (Pháinn-sè)','パイ セ'],['さようなら','再會 (Tsài-huē)','サイ フエ']
    ],
    numbers:[['一 (chi̍t)','チッ'],['二 (nn̄g)','ヌン'],['三 (sann)','サアン'],['四 (sì)','シー'],['五 (gōo)','ゴオ'],['六 (la̍k)','ラッ'],['七 (tshit)','チッ'],['八 (peh)','ペエ'],['九 (káu)','カウ'],['十 (tsa̍p)','ツァッ']],
    selfintro:[['はじめまして','真歡喜熟似你 (Tsin huann-hí sik-sāi lí)','チン ホアンヒー シッサイ リー'],['私は〇〇です','我叫做〇〇 (Guá kiò-tsò 〇〇)','グア キョーツォ 〇〇']],
    tips:['閩南語（ホーロー語）系で、北京語（華語）とは相互に通じない別の言語。','漢字と台羅（教育部・台湾閩南語羅馬字）で書く。','7〜8つの声調と連続変調（tone sandhi）があり、実際の発音は語順で変わる。','数字の1・2は文語音 it・jī と口語音 chi̍t・nn̄g があり用途で使い分ける。']
  },
  {
    code:'ar', grammar:'grammar.html?code=ar', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2の目安で、アラビア語（フスハー）の文法を例文つきで', extras:[{href:'ar_script.html',title:'🔤 文字と右書き',desc:'アラビア文字の形・続け書き・右→左'}], jp:'アラビア語', autonym:'العربية', en:'Arabic', chip:'ع',
    region:'中東・北アフリカ（アラブ諸国）', script:'アラビア文字（右→左）', family:'アフロ・アジア語族（セム語派）', order:'VSO／SVO',
    tts:'ar-SA', resRank:null, learnRank:null, core:false, resident:false, learner:false, sov:false,
    accent:'#2E7D64', bg:'#E1F0EB',
    note:'右から左へ書くアラビア文字が特徴。語根（多くは子音3つ）から多くの語を作る。書き言葉の正則アラビア語（フスハー）と、各地の口語方言がある。',
    phrases:[
      ['こんにちは','السلام عليكم','アッサラーム アライクム'],['ありがとう','شكرا','シュクラン'],
      ['はい','نعم','ナアム'],['いいえ','لا','ラー'],
      ['すみません','عفوا','アフワン'],['さようなら','مع السلامة','マア ッサラーマ']
    ],
    numbers:[['واحد','ワーヒド'],['اثنان','イスナーン'],['ثلاثة','サラーサ'],['أربعة','アルバア'],['خمسة','ハムサ'],['ستة','シッタ'],['سبعة','サブア'],['ثمانية','サマーニヤ'],['تسعة','ティスア'],['عشرة','アシャラ']],
    selfintro:[['はじめまして','تشرفنا','タシャッラフナー'],['私は〇〇です','أنا 〇〇','アナ 〇〇']],
    tips:['右から左へ書き、文字は単語中の位置で形が変わり、続けて書く。','短母音は通常書かず、子音を中心に読む。','語根（多くは子音3つ）から派生して語彙が広がる。','書き言葉のフスハーと、地域ごとの口語方言に差がある。']
  },
  {
    code:'ru', grammar:'grammar.html?code=ru', grammarTitle:'📖 CEFRレベル別の文法を見る', grammarDesc:'A1〜C2の目安で、ロシア語の文法を例文つきで', extras:[{href:'ru_cyrillic.html',title:'🔤 キリル文字と硬音・軟音',desc:'ロシア文字の読み方と、硬い/柔らかい子音'}], jp:'ロシア語', autonym:'Русский', en:'Russian', chip:'Ру',
    region:'ロシア・旧ソ連圏', script:'キリル文字', family:'インド・ヨーロッパ語族（スラブ語派）', order:'SVO（語順は比較的自由）',
    tts:'ru-RU', resRank:null, learnRank:null, core:false, resident:false, learner:false, sov:false,
    accent:'#B0303A', bg:'#F7E4E5',
    note:'キリル文字を使い、名詞・形容詞が6つの格に変化する。子音に「硬い/柔らかい」の区別があり、アクセントで母音の音も変わる。',
    phrases:[
      ['こんにちは','Здравствуйте','ズドラーストヴイチェ'],['ありがとう','Спасибо','スパシーバ'],
      ['はい','Да','ダ'],['いいえ','Нет','ニェット'],
      ['すみません','Извините','イズヴィニーチェ'],['さようなら','До свидания','ダスヴィダーニヤ']
    ],
    numbers:[['один','アジーン'],['два','ドヴァ'],['три','トリー'],['четыре','チティーリェ'],['пять','ピャーチ'],['шесть','シェスチ'],['семь','シェーミ'],['восемь','ヴォーシェミ'],['девять','ヂェーヴィチ'],['десять','ヂェーシチ']],
    selfintro:[['はじめまして','Очень приятно','オーチニ プリヤートナ'],['私は〇〇です','Я 〇〇','ヤー 〇〇']],
    tips:['キリル文字は33字。ラテン文字と形が似て読みが違う字に注意（В=v, Н=n, Р=r, С=s）。','名詞・形容詞・代名詞が6つの格に変化する。','子音の硬い/柔らかいの区別があり、アクセントの位置で母音の音（о→ア等）が変わる。']
  }
];
