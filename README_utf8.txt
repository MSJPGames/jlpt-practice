N2 聴解の音声を作る

【要るもの】
  Python 3 と edge-tts（.bat が自動で入れます）
  同じフォルダに次の3つ：
    make_n2_listening_audio.py
    n2_listening_manifest.json
    file_to_daimon.json

【やりかた】
  1) make_n2_listening_audio.bat をダブルクリック
  2) 待つ（69本で10分ほど）
  3) できた audio フォルダの n2_q*.mp3 を、HTMLと同じ場所に置いてGitHubへ

  途中で止めても大丈夫です。もう一度実行すれば、できていないぶんだけ作ります。
  ぜんぶ作り直したいとき:  python make_n2_listening_audio.py --force
  声を試したいとき:        python make_n2_listening_audio.py --test

【N3との違い】
  ・発話表現はありません（N2には無い大問です）
  ・かわりに統合理解があります（長めの話を聞いて比べる）
  ・即時応答は「相手の一言」だけで、場面説明も設問の読み上げもありません
  ・間の長さは公式CD（N2Q1～Q5.mp3）を実測して決めています

【声】
  N3とまったく同じ設定です（ナレーターは低くゆっくり、会話の女声は少し高め）。
  N3の音声とそろいます。

【確かめること】
  ・ログの最後が failed 0 になっていること
  ・n2_q3_01.mp3（概要理解）を鳴らして、選択肢と選択肢の間に3～4秒の間があること
  ・audio フォルダの n2_q*.mp3 が、どれも144バイトの倍数であること
    （壊れたmp3は倍数になりません。作るときにも機械で確かめています）
