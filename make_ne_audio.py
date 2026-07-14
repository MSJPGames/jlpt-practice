# -*- coding: utf-8 -*-
# ネパール語 例文の音声（MP3）を作るスクリプト
# 使い方: このファイルを「日本語の部屋」フォルダに置き、make_ne_audio.bat をダブルクリック。
#   （または: pip install edge-tts  →  python make_ne_audio.py）
# 生成後、できた audio フォルダを GitHub にアップロードしてください。
import asyncio, os
try:
    import edge_tts
except ImportError:
    raise SystemExit("edge-tts が必要です。コマンドプロンプトで  pip install edge-tts  を実行してください。")

VOICE = "ne-NP-HemkalaNeural"   # 女性。男性にしたい場合は "ne-NP-SagarNeural" に変更
OUTDIR = "audio"

ITEMS = [
    ("ne_karta_1", "म विद्यार्थी हुँ।"),
    ("ne_karta_2", "ऊ हिँड्छ।"),
    ("ne_karta_3", "म भात खान्छु।"),
    ("ne_karta_4", "रामले किताब पढ्यो।"),
    ("ne_karta_5", "मैले भात खाएँ।"),
    ("ne_karta_6", "कुकुरले मान्छेलाई टोक्यो।"),
    ("ne_karta_7", "मैले"),
    ("ne_karta_8", "तिमीले। उसले। उनले"),
    ("ne_karta_9", "मैले तिमीलाई देखेँ।"),
    ("ne_karma_1", "मैले रामलाई बोलाएँ।"),
    ("ne_karma_2", "उसले कुकुरलाई हिर्कायो।"),
    ("ne_karma_3", "शिक्षकले विद्यार्थीलाई पढाउनुहुन्छ।"),
    ("ne_karma_4", "म पानी खान्छु।"),
    ("ne_karma_5", "उसले किताब किन्यो।"),
    ("ne_karma_6", "मैले त्यो किताबलाई खोजेँ।"),
    ("ne_karan_1", "मैले कलमले लेखेँ।"),
    ("ne_karan_2", "ऊ चक्कुले फल काट्छ।"),
    ("ne_karan_3", "हामी बसले जान्छौं।"),
    ("ne_karan_4", "मैले फोनले कुरा गरेँ।"),
    ("ne_karan_5", "रोगले धेरै मानिस मरे।"),
    ("ne_karan_6", "पानीले बाटो भिज्यो।"),
    ("ne_karan_7", "यो काम सरकारद्वारा भयो।"),
    ("ne_sampradan_1", "मैले उसलाई पैसा दिएँ।"),
    ("ne_sampradan_2", "आमाले बच्चालाई खुवाउनुभयो।"),
    ("ne_sampradan_3", "यो उपहार तिम्रो लागि हो।"),
    ("ne_sampradan_4", "उनी परिवारका निम्ति काम गर्छन्।"),
    ("ne_sampradan_5", "मलाई नेपाली मन पर्छ।"),
    ("ne_sampradan_6", "मलाई भोक लाग्यो।"),
    ("ne_sampradan_7", "उसलाई जाडो भयो।"),
    ("ne_apadan_1", "म घरबाट आएँ।"),
    ("ne_apadan_2", "ऊ जापानबाट आयो।"),
    ("ne_apadan_3", "कक्षा नौ बजेदेखि सुरु हुन्छ।"),
    ("ne_apadan_4", "म सोमबारदेखि व्यस्त छु।"),
    ("ne_apadan_5", "बिहानदेखि बेलुकीसम्म काम गरेँ।"),
    ("ne_apadan_6", "दूधबाट दही बन्छ।"),
    ("ne_sambandha_1", "रामको घर"),
    ("ne_sambandha_2", "रामकी बहिनी"),
    ("ne_sambandha_3", "रामका छोराहरू"),
    ("ne_sambandha_4", "मेरो। हाम्रो। तिम्रो"),
    ("ne_sambandha_5", "उसको। उनको। यसको"),
    ("ne_sambandha_6", "यो मेरो साथीको किताब हो।"),
    ("ne_sambandha_7", "नेपालको राजधानी काठमाडौं हो।"),
    ("ne_sambandha_8", "कोठाको ढोका"),
    ("ne_adhikaran_1", "म कोठामा छु।"),
    ("ne_adhikaran_2", "किताब टेबलमा छ।"),
    ("ne_adhikaran_3", "म स्कूलमा पढ्छु।"),
    ("ne_adhikaran_4", "हामी नेपालमा बस्छौं।"),
    ("ne_adhikaran_5", "म बिहानमा उठ्छु।"),
    ("ne_adhikaran_6", "ऊ दस बजेमा आउँछ।"),
    ("ne_adhikaran_7", "म काठमाडौंमा जान्छु।"),
]

async def main():
    os.makedirs(OUTDIR, exist_ok=True)
    log=[]
    ok=0
    for i,(name,text) in enumerate(ITEMS,1):
        out=os.path.join(OUTDIR, name+".mp3")
        try:
            await edge_tts.Communicate(text, VOICE).save(out)
            ok+=1; print("[%d/%d] OK %s"%(i,len(ITEMS),name)); log.append("OK "+name)
        except Exception as e:
            print("[%d/%d] NG %s : %s"%(i,len(ITEMS),name,e)); log.append("NG "+name+" : "+str(e))
    open("_ne_audio_log.txt","w",encoding="utf-8").write("\n".join(log))
    print("完了：%d / %d 個を audio フォルダに作成しました。"%(ok,len(ITEMS)))
    print("audio フォルダを GitHub にアップロードしてください。")

if __name__=="__main__":
    asyncio.run(main())
