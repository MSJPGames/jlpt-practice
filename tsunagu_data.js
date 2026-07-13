/* つなぐ日本語 初級1・2 「できること」データ（会話練習用）
   出典：『つなぐ にほんご 初級1・2』できることチェックリスト
   ※各「できること」の記述は教科書の到達目標。会話練習の焦点として使用。
   構造: window.TSUNAGU.lessons[] = { n:課, book:1|2, title, parts:[{p:パート, items:[{ja,en}]}] } */
window.TSUNAGU = {
  name: "つなぐ日本語",
  books: { "1": "初級1（第1〜15課）", "2": "初級2（第16〜30課）" },
  lessons: [
    { n:1, book:1, title:"はじめまして・あいさつ", parts:[
      { p:1, items:[
        { ja:"初めて会った人にあいさつをしたり、名前を言ったりすることができる。", en:"You can introduce yourself to people you meet for the first time." },
        { ja:"初めて会った人に国や仕事を聞いたり、言ったりすることができる。", en:"You can ask and tell people you meet for the first time about work and where you're from." }
      ]},
      { p:2, items:[
        { ja:"近所の人に会ったとき、あいさつができる。", en:"You can give greetings to neighbors." },
        { ja:"近所の人と「いい天気ですね」「暑いですね」などの簡単な会話ができる。", en:"You can hold simple conversations like talking about the weather." }
      ]},
      { p:3, items:[
        { ja:"近所の人やこれからお世話になる人にあいさつができる。", en:"You can properly greet those that you will come to rely on in the neighborhood." },
        { ja:"いつどこから来たか聞いたり、答えたりすることができる。", en:"You can ask and respond to questions about moving." }
      ]}
    ]},
    { n:2, book:1, title:"買い物", parts:[
      { p:1, items:[
        { ja:"買いたいものを店員に言うことができる。", en:"You can tell the clerk what you want to buy." },
        { ja:"いくつ買いたいか店員に言うことができる。", en:"You can tell the clerk how many you want." },
        { ja:"店員に値段を聞くことができる。", en:"You can ask the clerk how much something is." }
      ]},
      { p:2, items:[
        { ja:"売り場はどこか店員に聞くことができる。", en:"You can ask the clerk where a department is." },
        { ja:"商品がどこにあるか店員に聞くことができる。", en:"You can ask the clerk where certain items are." }
      ]},
      { p:3, items:[
        { ja:"他に商品があるかどうか聞くことができる。", en:"You can ask if there are any other items." },
        { ja:"買わないで店を出ることができる。", en:"You can leave the shop without buying anything." }
      ]}
    ]},
    { n:3, book:1, title:"行き方・交通", parts:[
      { p:1, items:[
        { ja:"目的地までの行き方を言ったり、聞いたりすることができる。", en:"You can ask and give directions to destinations." },
        { ja:"自分がしたいことを言うことができる。", en:"You can explain what you want to do." }
      ]},
      { p:2, items:[
        { ja:"バス停や駅などがどこにあるか聞くことができる。", en:"You can ask where the bus stop or train station are." },
        { ja:"バスの時間を聞くことができる。", en:"You can ask about the bus times." },
        { ja:"バスの行き先を確かめることができる。", en:"You can confirm where the bus is going." }
      ]},
      { p:3, items:[
        { ja:"目的地までの電車の値段、かかる時間、乗り場などを聞くことができる。", en:"You can ask about the price, travel time and platform." },
        { ja:"自分がどこにいるか、言うことができる。", en:"You can say where you are." }
      ]}
    ]},
    { n:4, book:1, title:"日常生活", parts:[
      { p:1, items:[
        { ja:"日常生活でしていることを言うことができる。", en:"You can talk about your daily life." },
        { ja:"何時にするか、何時から何時までするかを言うことができる。", en:"You can talk about what time and for how long you do things." }
      ]},
      { p:2, items:[
        { ja:"日常生活でしたことを言うことができる。", en:"You can talk about how you spent your day." },
        { ja:"だれがしたか、だれのものか、聞いたり、言ったりすることができる。", en:"You can ask or tell who did it, or who owns it." }
      ]},
      { p:3, items:[
        { ja:"他の人といっしょに作業をするとき、自分が何をするか伝えることができる。", en:"When doing something with other people, you can say what you will do." },
        { ja:"道具がどこにあるか聞いたり、言ったりすることができる。", en:"You can ask and answer questions about where a tool is." }
      ]}
    ]},
    { n:5, book:1, title:"飲食店", parts:[
      { p:1, items:[
        { ja:"他の人を誘って飲食店に行くことができる。", en:"You can invite someone out to eat or drink." },
        { ja:"飲食店に入って、人数と席の希望を店員に言うことができる。", en:"You can tell the restaurant how many people you are bringing and what seat you want." }
      ]},
      { p:2, items:[
        { ja:"メニューを見て何を注文するか話すことができる。", en:"You can talk about what you want on the menu." },
        { ja:"メニューを見てわからないものがあったとき、何か聞くことができる。", en:"You can ask if you don't understand something on the menu." }
      ]},
      { p:3, items:[
        { ja:"食べ物の味がどうかを言うことができる。", en:"You can talk about how the food tastes." },
        { ja:"ほしいものを言うことができる。", en:"You can express what you want." }
      ]}
    ]},
    { n:6, book:1, title:"旅行・休みの予定", parts:[
      { p:1, items:[
        { ja:"休みの予定を聞いたり、言ったりすることができる。", en:"You can ask and answer questions about holiday plans." },
        { ja:"簡単に理由を言うことができる。", en:"You can express simple reasons." }
      ]},
      { p:2, items:[
        { ja:"旅行先がどんなところか聞いたり、言ったりすることができる。", en:"You can ask and answer questions about travel spots." },
        { ja:"旅行先の名産品を簡単に紹介することができる。", en:"You can talk about what's famous about travel spots." }
      ]},
      { p:3, items:[
        { ja:"旅行先で何をしたか聞いたり、言ったりすることができる。", en:"You can ask and answer questions about how a trip was." },
        { ja:"旅行の感想を聞いたり、言ったりすることができる。", en:"You can say what you thought of a place." }
      ]}
    ]},
    { n:7, book:1, title:"週末・予定", parts:[
      { p:1, items:[
        { ja:"週末の予定を先生に聞いたり、言ったりすることができる。", en:"You can talk about weekend plans with your teacher." },
        { ja:"週末の予定を友達に聞いたり、言ったりすることができる。", en:"You can talk about weekend plans with your friends." }
      ]},
      { p:2, items:[
        { ja:"週末のイベントに参加するかどうか、先生と話すことができる。", en:"You can tell your teacher whether you will participate in a weekend event or not." },
        { ja:"週末のイベントに参加するかどうか、友達と話すことができる。", en:"You know how to tell your friend whether you will participate in a weekend event or not." }
      ]},
      { p:3, items:[
        { ja:"何かわからないものがあったとき、先生や友達に聞くことができる。", en:"You can ask a friend or a teacher about something you don't know." },
        { ja:"自分が感じたことを言うことができる。", en:"You can talk about how you feel." }
      ]}
    ]},
    { n:8, book:1, title:"週末にしたこと", parts:[
      { p:1, items:[
        { ja:"週末に何をしたか友達に聞いたり、言ったりすることができる。", en:"You can ask and talk to your friends about what they did at the weekend." }
      ]},
      { p:2, items:[
        { ja:"休みの日に何をしたか、どうだったか、友達と話すことができる。", en:"You can talk to your friends about what you did on your day off." }
      ]}
    ]},
    { n:9, book:1, title:"ルール・注意", parts:[
      { p:1, items:[
        { ja:"ごみの捨て方などの注意がわかり、謝ることができる。", en:"You can understand instructions regarding disposal of trash and apologize if you make a mistake." },
        { ja:"大家さんにごみの捨て方などのきまりを聞くことができる。", en:"You can ask your landlord about how to dispose of trash." }
      ]},
      { p:2, items:[
        { ja:"試験のときの注意を聞いてわかる。", en:"You can listen to and understand the test instructions." },
        { ja:"先生や係の人などにルールやしてもいいことについて簡単に聞くことができる。", en:"You can ask your teacher or the person in charge for simple advice regarding rules or things to do." }
      ]},
      { p:3, items:[
        { ja:"先生の注意を聞いてわかる。", en:"You can listen to and understand the teacher's instructions." },
        { ja:"他の人が何をしているか伝えることができる。", en:"You can explain what other people are doing." }
      ]}
    ]},
    { n:10, book:1, title:"人を紹介する", parts:[
      { p:1, items:[
        { ja:"服装や動作を伝えて、その人がだれかを聞いたり、言ったりすることができる。", en:"You can ask about and say what a person is wearing or doing." },
        { ja:"人を紹介することができる。", en:"You can introduce someone." }
      ]},
      { p:2, items:[
        { ja:"家族や友達などを紹介することができる。", en:"You can introduce your family and friends." },
        { ja:"住んでいるところ、職業、結婚しているかどうかを聞いたり、言ったりすることができる。", en:"You can ask about and describe where someone lives, their occupation and if they are married or not." }
      ]},
      { p:3, items:[
        { ja:"自分の町を簡単に紹介できる。", en:"You can simply introduce your town." },
        { ja:"自分が感じていることを言うことができる。", en:"You can describe how you feel." }
      ]}
    ]},
    { n:11, book:1, title:"お祝い・お礼", parts:[
      { p:1, items:[
        { ja:"お祝いに何をあげるか相談できる。", en:"You can ask about what to give as a gift." },
        { ja:"お祝いをもらって、お礼を言うことができる。", en:"You can express your gratitude for a gift." }
      ]},
      { p:2, items:[
        { ja:"持っているものや着ているものなどをほめられてお礼を言うことができる。", en:"You can express your thanks for a compliment about your possessions or clothing." },
        { ja:"もらったものや作ってもらったものなどについて、だれにいつもらったか簡単に説明することができる。", en:"You can simply explain about something you have received." }
      ]},
      { p:3, items:[
        { ja:"困っている人に手助けを申し出ることができる。", en:"You can offer to help someone." },
        { ja:"してもらったことに対して、お礼を言うことができる。", en:"You can express your gratitude to someone for helping you." }
      ]}
    ]},
    { n:12, book:1, title:"お願い・依頼", parts:[
      { p:1, items:[
        { ja:"理由を言って、簡単なお願いをすることができる。", en:"You can give a reason and make a simple request." },
        { ja:"簡単な手順を聞いて、理解することができる。", en:"You can ask about and understand a simple procedure." }
      ]},
      { p:2, items:[
        { ja:"理由を言って、ていねいにお願いをすることができる。", en:"You can give a reason and make a polite request." },
        { ja:"困っていることを言って、手助けを求めることができる。", en:"You can explain a problem and ask for help." }
      ]},
      { p:3, items:[
        { ja:"友達に簡単なお願いをすることができる。", en:"You can make a simple request to your friend." },
        { ja:"友達に頼みにくいことを頼むことができる。", en:"You can ask your friend for a favor that may be difficult for the friend to do." }
      ]},
      { p:4, items:[
        { ja:"体調が悪いことを伝えて早退したり、休んだりすることができる。", en:"You can explain that you feel unwell and go home early or take a rest." },
        { ja:"理由を言って、許可をもらうことができる。", en:"You can give a reason and receive permission (to leave early)." }
      ]}
    ]},
    { n:13, book:1, title:"誘う・断る", parts:[
      { p:1, items:[
        { ja:"同僚を食事などに誘うことができる。", en:"You can invite a coworker out to a meal." },
        { ja:"誘いを受けて、どの店がいいか相談ができる。", en:"You can accept an invitation and discuss where to go." }
      ]},
      { p:2, items:[
        { ja:"同僚を遊びに誘うことができる。", en:"You can invite a coworker to hang out." },
        { ja:"同僚に誘われて、いつにするか、日程を相談することができる。", en:"You can discuss the date and time when your coworker asked you to go out together." }
      ]},
      { p:3, items:[
        { ja:"友達をイベントに誘うことができる。", en:"You can invite a friend to an event." },
        { ja:"友達にイベントに誘われて、断ることができる。", en:"You can turn down a friend's invitation to an event." }
      ]}
    ]},
    { n:14, book:1, title:"アドバイス", parts:[
      { p:1, items:[
        { ja:"体調が悪そうな人に声をかけることができる。", en:"You can ask an unwell person how they are doing." },
        { ja:"簡単なアドバイスができる。", en:"You can give simple advice." }
      ]},
      { p:2, items:[
        { ja:"問題解決のための情報を伝えることができる。", en:"You can give advice to someone who is looking for a solution of problems." },
        { ja:"自分ができること、できないことを言うことができる。", en:"You can talk about what you can and can't do." }
      ]},
      { p:3, items:[
        { ja:"旅行先などについて、行ったことがあるかどうか聞くことができる。", en:"You can ask if someone has or hasn't been somewhere." },
        { ja:"旅行先などについて簡単に説明したり、アドバイスしたり、提案したりできる。", en:"You can explain, give advice and make suggestions regarding a travel destination." }
      ]}
    ]},
    { n:15, book:1, title:"謝る・事情説明", parts:[
      { p:1, items:[
        { ja:"よくないことをしたときに、ていねいに謝ることができる。", en:"You can apologize politely for something you did." },
        { ja:"簡単に事情を説明することができる。", en:"You can give a simple explanation of what happened." }
      ]},
      { p:2, items:[
        { ja:"友達に謝ることができる。", en:"You can apologize to a friend." },
        { ja:"友達に簡単に事情を説明することができる。", en:"You can explain what happened to a friend." }
      ]}
    ]},
    { n:16, book:2, title:"敬語・職場のあいさつ", parts:[
      { p:1, items:[ { ja:"敬語を使って目上の人と簡単な話ができる。", en:"You can use formal language to have a simple conversation with someone of a higher status." } ]},
      { p:2, items:[ { ja:"上司の予定を聞いたり、伝えたりすることができる。", en:"You can ask about your superior's plans and communicate them to others." } ]},
      { p:3, items:[ { ja:"会社などで初めて会った人にあいさつをすることができる。", en:"You can greet people when meeting them for the first time in professional or formal situations." } ]},
      { p:4, items:[ { ja:"上司を迎えに行って、あいさつや案内をすることができる。", en:"You can welcome a superior, greet them and guide them." } ]}
    ]},
    { n:17, book:2, title:"比較する", parts:[
      { p:1, items:[
        { ja:"どちらが上手か比べて話すことができる。", en:"You can compare and talk about who is better." },
        { ja:"誰が一番か、何が一番かを言うことができる。", en:"You can say who or what is the best." }
      ]},
      { p:2, items:[ { ja:"不動産やアルバイトなどの情報を比べて話すことができる。", en:"You can compare information about property and part-time jobs and speak about it." } ]},
      { p:3, items:[ { ja:"自分の国と他の国を比べながら、物価などについて話すことができる。", en:"You can speak about prices while comparing your country with others." } ]}
    ]},
    { n:18, book:2, title:"使い方・作り方の説明", parts:[
      { p:1, items:[ { ja:"機械や道具の使い方を聞いたり、簡単に説明したりすることができる。", en:"You can ask how to use machines and tools, and give simple explanations." } ]},
      { p:2, items:[ { ja:"店などの場所を聞かれて、説明ができる。", en:"You can explain the location of a store or place when asked." } ]},
      { p:3, items:[ { ja:"料理の作り方を聞いたり、簡単に説明したりすることができる。", en:"You can give a simple explanation of how to make a dish when asked." } ]}
    ]},
    { n:19, book:2, title:"アルバイトの面接", parts:[
      { p:1, items:[ { ja:"アルバイトの募集を見て電話をかけ、面接の日時を決めることができる。", en:"You can make a phone call in response to a part-time job ad and determine an interview date and time." } ]},
      { p:2, items:[ { ja:"アルバイトの面接で、何ができるか、いつ働けるか話すことができる。", en:"You can talk about what you can do and when you can work at part-time job interviews." } ]},
      { p:3, items:[ { ja:"面接でどんなことを質問されたか話すことができる。", en:"You can talk about what you were asked at the interview." } ]}
    ]},
    { n:20, book:2, title:"状況を伝える", parts:[
      { p:1, items:[ { ja:"周囲の景色や様子を伝え合うことができる。", en:"You can talk about your surroundings and the scenery." } ]},
      { p:2, items:[ { ja:"物が落ちたり、倒れたりするのに気付いて、それを伝えることができる。", en:"You can tell someone when something is falling." } ]},
      { p:3, items:[
        { ja:"落とし物を拾って、どうしたらいいかを話し合うことができる。", en:"You can talk about what to do when finding a lost item." },
        { ja:"落とし物を拾って、交番などに届けて、拾ったときの状況を伝えることができる。", en:"You can describe where a lost item was found when bringing it to the police station." }
      ]}
    ]},
    { n:21, book:2, title:"病院・薬局", parts:[
      { p:1, items:[ { ja:"病院の受付で簡単に症状を伝え、受診の手続きができる。", en:"You can give a simple description of symptoms at the hospital and arrange to see a doctor." } ]},
      { p:2, items:[
        { ja:"医師に症状を伝え、診察を受けることができる。", en:"You can explain your symptoms to the doctor and take a medical examination." },
        { ja:"医師の指示を聞いたり、医師に質問をしたりすることができる。", en:"You can listen to the doctor's instructions and ask the doctor questions." }
      ]},
      { p:3, items:[ { ja:"薬局で薬の飲み方を確認しながら聞くことができる。", en:"You can listen to and confirm instructions for taking medicine at a pharmacy." } ]}
    ]},
    { n:22, book:2, title:"様子・状況の描写", parts:[
      { p:1, items:[
        { ja:"見た様子や印象を言うことができる。", en:"You can describe the situation and give your impression." },
        { ja:"写真を見せながら、何をしているか状況を説明することができる。", en:"You can say what is happening in a situation while looking at pictures." }
      ]},
      { p:2, items:[
        { ja:"状況を見て考えたことを言うことができる。", en:"You can say what you are thinking after looking at a particular situation." },
        { ja:"作業の進み具合を簡単に伝えることができる。", en:"You can describe work progress in a simple way." }
      ]}
    ]},
    { n:23, book:2, title:"トラブル・被害", parts:[
      { p:1, items:[
        { ja:"どろぼうなどに気付いて、声を上げることができる。", en:"You can cry out against a thief that you notice." },
        { ja:"被害を届け出て、どんな状況だったか伝えることができる。", en:"You can file a damage report and explain what happened." }
      ]},
      { p:2, items:[ { ja:"困ったことが起きたときに、担当者に状況を説明して対応を頼むことができる。", en:"When trouble happens, you can explain the situation to the person in charge and request for support." } ]},
      { p:3, items:[ { ja:"遅刻の状況を説明して、このあとどうするか伝えることができる。", en:"You can explain that you are late and talk about what you'll do thereafter." } ]}
    ]},
    { n:24, book:2, title:"感謝を伝える", parts:[
      { p:1, items:[ { ja:"目上の人や同僚にお土産やプレゼントをもらって、お礼を言うことができる。", en:"You can say thanks after receiving a souvenir or present from a superior or coworker." } ]},
      { p:2, items:[ { ja:"お世話になった人に感謝の気持ちを伝えることができる。", en:"You can express your gratitude to someone who trained (helped) you at work." } ]},
      { p:3, items:[ { ja:"職場を去るときなどに、みんなの前であいさつをし、感謝の気持ちを伝えることができる。", en:"You can greet and express your thanks in front of everyone when you leave a workplace." } ]}
    ]},
    { n:25, book:2, title:"旅行の計画", parts:[
      { p:1, items:[ { ja:"旅行の前にしておくことや分担を決めることができる。", en:"You can decide on the things to prepare before a trip and who should be in charge of them." } ]},
      { p:2, items:[ { ja:"旅行の滞在先などを調べて、相談することができる。", en:"You can research travel accommodations and discuss them with someone." } ]},
      { p:3, items:[ { ja:"旅行の準備の進み具合を聞いたり、言ったりすることができる。", en:"You can ask and talk about how the travel preparations are progressing." } ]}
    ]},
    { n:26, book:2, title:"伝言・伝聞", parts:[
      { p:1, items:[ { ja:"伝言を受けて、それを伝えることができる。", en:"You can take a message and relay it to others." } ]},
      { p:2, items:[ { ja:"人から聞いた情報を他の人に伝えて、それをもとに話すことができる。", en:"You can talk about things to people based on information that you heard from others." } ]},
      { p:3, items:[ { ja:"不確かな情報について他の人と話すことができる。", en:"You can speak with other people about inaccurate information." } ]}
    ]},
    { n:27, book:2, title:"情報・社会の話題", parts:[
      { p:1, items:[
        { ja:"ニュースや天気予報で知ったことを他の人に伝えることができる。", en:"You can communicate the news or weather forecasts that you found out about." },
        { ja:"社会的な問題について、ごく簡単に他の人と話すことができる。", en:"You can speak with others about social problems while using simple words and phrases." }
      ]},
      { p:2, items:[ { ja:"互いの国の文化や習慣について質問したり、説明を聞いたりすることができる。", en:"You can ask questions and listen to explanations when talking about the cultures and customs of each other's country." } ]},
      { p:3, items:[ { ja:"子どもの教育について簡単に話すことができる。", en:"You can talk about children's education in an uncomplicated manner." } ]},
      { p:4, items:[ { ja:"子どもの教育について、自分の国の状況を伝えたり、意見を言ったりすることができる。", en:"You can talk about the situation of children's education in your own country and say your opinion on it." } ]}
    ]},
    { n:28, book:2, title:"家庭訪問", parts:[
      { p:1, items:[ { ja:"日本人の家を訪問して、あいさつができる。", en:"You can visit a Japanese person's home and greet them." } ]},
      { p:2, items:[ { ja:"近況を聞いたり、話したりすることができる。", en:"You can ask and speak about the recent situation at work." } ]},
      { p:3, items:[
        { ja:"相手の近況を聞いて、それに対して感想を言うことができる。", en:"You can listen to another person's recent work situation and give your thoughts on it." },
        { ja:"訪問先から帰るときのあいさつができる。", en:"You can say goodbye at the end of a visit." }
      ]}
    ]},
    { n:29, book:2, title:"不満・助言", parts:[
      { p:1, items:[ { ja:"不満や不愉快に思ったことを他の人に伝えることができる。", en:"You can talk about things you think are unsatisfying or unpleasant to others." } ]},
      { p:2, items:[
        { ja:"注意されたり、命令されたりして、腹立たしく思っていることを他の人に伝えることができる。", en:"You can communicate to others about things that made you upset, such as getting warned or ordered by someone." },
        { ja:"困っている事情を聞いて、どうしたらいいか言うことができる。", en:"You can give advice on what to do after hearing someone's troubled situation." }
      ]},
      { p:3, items:[
        { ja:"簡単に言い訳をすることができる。", en:"You can give reasons (excuses) in an uncomplicated manner." },
        { ja:"相手の失敗や不満を聞いて、思ったことを伝えることができる。", en:"You can say your thoughts after hearing someone's failures or worries." }
      ]}
    ]},
    { n:30, book:2, title:"意見交換", parts:[
      { p:1, items:[ { ja:"最近話題になっていることについて、簡単に説明したり、意見を言ったりすることができる。", en:"You can explain and give your opinion about recent popular topics in an uncomplicated manner." } ]},
      { p:2, items:[ { ja:"社会的な話題について、意見を交換することができる。", en:"You can share your opinion about social topics." } ]}
    ]}
  ]
};
