にほんごのへや JLPT ― 聴解14問の直しと、音声の作り直し

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 やることは4つです。上から順にしてください。
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【1】HTML 5つを GitHub にアップロードする
     ZIPの一番上にある、この5つです。
       n1_quiz.html
       n2_quiz.html
       n3_quiz.html
       n4_quiz.html
       n5_quiz.html
     （置き場所は、いつもと同じ jlpt-practice の一番上です）

【2】manifest 5つを、パソコンの「JLPT PRACTICE」フォルダに上書きコピーする
     ZIPの manifest フォルダの中にある、この5つです。
       n1_listening_manifest.json
       n2_listening_manifest.json
       n3_listening_manifest.json
       n4_listening_manifest.json
       n5_listening_manifest.json
     コピー先は
       C:\Users\tenma\OneDrive\JLPT PRACTICE
     です。make_n1_listening_audio.py と同じところに置いてください。
     ※この5つは GitHub にアップロードしなくてかまいません。

【3】bat を 5つ ぜんぶ ダブルクリックする（1つずつ、順番に）
     「JLPT PRACTICE」フォルダの中の、この5つです。

       (1) make_n1_listening_audio.bat
       (2) make_n2_listening_audio.bat
       (3) make_n3_listening_audio.bat
       (4) make_n4_listening_audio.bat
       (5) make_n5_listening_audio.bat

     1つ動かして、黒い画面に「完了」または「done」と出て閉じられる状態に
     なってから、次のをダブルクリックしてください。

     ※bat は、python のスクリプト（make_n1_listening_audio.py など）を
     　よび出すだけの小さなファイルです。読み上げの仕事は py がしています。
     　bat をダブルクリックすれば py も動きます。py を直接ひらく必要は
     　ありません。

     中身が変わったものだけ作り直すしくみなので、作り直されるのは
     次の14本だけです。5つ合わせて、5分ほどで終わります。

       N1 ... n1_q3_17.mp3  n1_q4_04.mp3  n1_q4_09.mp3  n1_q4_32.mp3  n1_q4_35.mp3
       N2 ... n2_q4_08.mp3  n2_q4_16.mp3  n2_q4_39.mp3  n2_q4_41.mp3
       N3 ... n3_q4_03.mp3  n3_q5_05.mp3
       N4 ... n4_q4_09.mp3  n4_q4_16.mp3
       N5 ... n5_q4_16.mp3

     黒い画面に「作り直し」または「updated」と出た本数を見てください。
     5つ合わせて 14本 になれば成功です。
     もし 0本 のまま終わったときは、上の14本の mp3 を
     「JLPT PRACTICE\audio」フォルダから消して、その bat をもう一度
     ダブルクリックしてください。

【4】作り直した mp3 14本を GitHub の audio フォルダにアップロードする
     HTML と 音声は、かならず一緒にアップロードしてください。
     （HTMLだけ先に上げると、直る前の音声のまま出てしまいます）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【何を直したか】
正解が二つに読めてしまう聴解14問の、まぎらわしい肢を入れかえました。
聴解の選択肢は音声で読み上げているので、その14本の mp3 も作り直しが要ります。
N2の1問（n2_q4_39.mp3）は、台本が「来年の当番」なのに正解が「今年はちょっと
難しそうです」で食いちがっていました。台本を「今年の当番」に直しました。

【たしかめたこと】
  ・5レベルぶん全部の描画と採点 ... OK（合計17371問）
  ・基準チェック ... 5レベルとも ×0
  ・並べかえの検算 516/516、活用の形のまちがい 0、同じ問の重複 0
  ・manifest の差分 ... ちょうど14本（ほかの781本は変わっていません）
