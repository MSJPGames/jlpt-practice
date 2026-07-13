/* =====================================================================
   quiz_record.js  —  日本語の部屋 共通「練習の記録」モジュール
   ---------------------------------------------------------------------
   どのクイズ/ドリルからでも使える記録機能。
   ・各問の正誤を記録
   ・結果画面に「名前」「疑問点」欄と、【Wordで保存】【先生に送る】ボタンを表示
   ・Word(.doc)は学生自身が結果を見直せるよう、各問の○×・正解つき
   ・送信は record_config.js に Googleフォームの事前入力リンクがあれば有効

   使い方（各ツール側）:
     NNHRecord.init({tool:"BJT 第3部 読解", level:"—"});   // セッション開始時
     NNHRecord.add({sec:"語彙・文法", q:"...", chosen:"...", correct:"...", ok:true});  // 各問
     NNHRecord.mount(resultContainerEl, {score:8, total:10});  // 結果画面で
   ===================================================================== */
(function(){
  "use strict";
  var CFG = (window.RECORD_CONFIG||{});
  var NAME_KEY = "nnh_student_name";

  var state = { tool:"", level:"", items:[], score:0, total:0 };

  function pad(n){ return (n<10?"0":"")+n; }
  function nowStr(){
    var d=new Date();
    return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())+" "+pad(d.getHours())+":"+pad(d.getMinutes());
  }
  function nowFile(){
    var d=new Date();
    return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+"_"+pad(d.getHours())+pad(d.getMinutes());
  }
  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  /* ---- 公開API ---- */
  var API = {
    init:function(meta){
      state={ tool:(meta&&meta.tool)||"日本語 練習", level:(meta&&meta.level)||"", items:[], score:0, total:0 };
    },
    add:function(o){
      if(!o) return;
      state.items.push({ sec:o.sec||"", q:o.q||"", chosen:o.chosen||"", correct:o.correct||"", ok:!!o.ok });
    },
    mount:function(container, res){
      if(!container) return;
      state.score=(res&&res.score)||0; state.total=(res&&res.total)||state.items.length;
      injectStyle();
      renderPanel(container);
    }
  };
  window.NNHRecord = API;

  /* ---- スタイル ---- */
  function injectStyle(){
    if(document.getElementById("nnh-rec-style")) return;
    var st=document.createElement("style"); st.id="nnh-rec-style";
    st.textContent=
      ".nnh-rec{background:#FFFFFF;border:1px solid #E2DDD6;border-radius:14px;padding:15px 16px;margin-bottom:14px;text-align:left}"
     +".nnh-rec h4{font-size:14px;font-weight:700;margin:0 0 4px;color:#3C5A78;display:flex;align-items:center;gap:7px}"
     +".nnh-rec .nnh-sub{font-size:11.5px;color:#8a847c;margin-bottom:11px;line-height:1.6}"
     +".nnh-rec label{display:block;font-size:12px;font-weight:700;color:#6B6560;margin:9px 0 4px}"
     +".nnh-rec input,.nnh-rec textarea{width:100%;font-family:inherit;font-size:14px;border:1px solid #E2DDD6;border-radius:9px;padding:9px 11px;background:#FCFBF9;color:#1C1C1C}"
     +".nnh-rec textarea{min-height:64px;resize:vertical;line-height:1.6}"
     +".nnh-rec .nnh-btns{display:flex;flex-direction:column;gap:9px;margin-top:13px}"
     +".nnh-rec button{font-family:inherit;font-size:14.5px;font-weight:700;border:0;border-radius:10px;padding:12px 14px;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .1s}"
     +".nnh-rec button:active{transform:scale(.99)}"
     +".nnh-rec .nnh-word{background:#3C5A78;color:#fff}"
     +".nnh-rec .nnh-send{background:#E4EAF1;color:#3C5A78;border:1px solid #cdd8e6}"
     +".nnh-rec .nnh-done{font-size:12px;color:#3B6D11;font-weight:700;margin-top:9px;text-align:center;display:none}"
     +".nnh-rec .nnh-done.show{display:block}"
     +".nnh-rec .nnh-hint{font-size:11px;color:#b7b0a6;margin-top:9px;line-height:1.6}";
    document.head.appendChild(st);
  }

  /* ---- 結果パネル描画 ---- */
  function renderPanel(container){
    var savedName="";
    try{ savedName=localStorage.getItem(NAME_KEY)||""; }catch(e){}
    var formOn = !!(CFG.formPrefillLink && String(CFG.formPrefillLink).indexOf("entry.")>=0);

    var wrap=document.createElement("div"); wrap.className="nnh-rec";
    var html="";
    html+='<h4>📝 練習の記録</h4>';
    html+='<div class="nnh-sub">結果をWordで保存できます（各問の○×・正解つきで見直せます）。'+(formOn?'先生に送ることもできます。':'')+'</div>';
    html+='<label>名前（にんずう）</label><input id="nnhName" type="text" placeholder="なまえ" value="'+esc(savedName)+'">';
    html+='<label>疑問点・先生への質問（あれば）</label><textarea id="nnhQ" placeholder="わからなかったところや、質問があれば書いてください。"></textarea>';
    html+='<div class="nnh-btns">';
    html+='<button class="nnh-word" id="nnhWord">📄 結果を Word で保存</button>';
    if(formOn) html+='<button class="nnh-send" id="nnhSend">✉️ 先生に送る（フォーム）</button>';
    html+='</div>';
    html+='<div class="nnh-done" id="nnhDone"></div>';
    if(!formOn) html+='<div class="nnh-hint">※先生へ提出する場合は、保存したWordを送ってください。（先生用：record_config.js を設定すると送信フォームも使えます）</div>';
    wrap.innerHTML=html;
    container.appendChild(wrap);

    document.getElementById("nnhWord").addEventListener("click", saveWord);
    var sb=document.getElementById("nnhSend"); if(sb) sb.addEventListener("click", sendForm);
  }

  function curName(){
    var el=document.getElementById("nnhName"); var v=el?el.value.trim():"";
    try{ if(v) localStorage.setItem(NAME_KEY, v); }catch(e){}
    return v;
  }
  function curQuestion(){ var el=document.getElementById("nnhQ"); return el?el.value.trim():""; }

  function pct(){ return state.total? Math.round(state.score/state.total*100):0; }

  /* ---- Word (.doc) 生成 ---- */
  function detailText(){
    // フォーム用の1行テキスト
    return state.items.map(function(it,i){
      var mark=it.ok?"○":"×";
      var extra=it.ok?"":("（答:"+it.chosen+"／正:"+it.correct+"）");
      return (i+1)+". "+(it.sec?"["+it.sec+"] ":"")+mark+extra;
    }).join("  ");
  }

  function saveWord(){
    var name=curName(), q=curQuestion();
    var rows="";
    state.items.forEach(function(it,i){
      var mark=it.ok?'○':'×';
      var color=it.ok?'#2f7a12':'#b33';
      rows+='<tr>'
        +'<td style="text-align:center">'+(i+1)+'</td>'
        +'<td>'+esc(it.sec)+'</td>'
        +'<td>'+esc(it.q)+'</td>'
        +'<td>'+esc(it.chosen)+'</td>'
        +'<td>'+esc(it.correct)+'</td>'
        +'<td style="text-align:center;color:'+color+';font-weight:bold">'+mark+'</td>'
        +'</tr>';
    });
    var doc=""
      +'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8">'
      +'<style>body{font-family:"Yu Gothic","Meiryo",sans-serif;font-size:11pt;color:#1c1c1c}'
      +'h1{font-size:16pt}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:5px 7px;font-size:10pt}'
      +'th{background:#e8eef4}.meta{font-size:10.5pt;line-height:1.8}</style></head><body>'
      +'<h1>日本語 練習の記録</h1>'
      +'<p class="meta"><b>テスト：</b>'+esc(state.tool)+(state.level?'（'+esc(state.level)+'）':'')
      +'<br><b>名前：</b>'+esc(name||'（未記入）')
      +'<br><b>日時：</b>'+esc(nowStr())
      +'<br><b>点数：</b>'+state.score+' / '+state.total+'（正答率 '+pct()+'％）</p>'
      +'<table><tr><th>#</th><th>パート</th><th>問題</th><th>あなたの答え</th><th>正解</th><th>判定</th></tr>'
      +rows+'</table>'
      +'<h3>疑問点・先生への質問</h3><p>'+ (q? esc(q).replace(/\n/g,'<br>') : '（なし）') +'</p>'
      +'</body></html>';
    var blob=new Blob(['﻿', doc], {type:'application/msword'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    var fn='記録_'+state.tool.replace(/[\\\/:*?"<>|　\s]+/g,'')+'_'+nowFile()+'.doc';
    a.href=url; a.download=fn; document.body.appendChild(a); a.click();
    setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); },1200);
    showDone('Wordを保存しました。');
  }

  /* ---- Googleフォーム送信（事前入力リンク方式） ---- */
  function parseForm(link){
    // 事前入力リンク中の entry.XXXX を、プレースホルダ値(1..6)で項目に対応づける
    try{
      var qi=link.indexOf("?");
      var base=link.substring(0,qi).replace(/\/viewform.*$/,"/viewform");
      var params=link.substring(qi+1).split("&");
      var mapByPlaceholder={}; // "1".."6" -> entry.id
      params.forEach(function(p){
        var eq=p.indexOf("=");
        if(eq<0) return;
        var k=p.substring(0,eq), v=decodeURIComponent(p.substring(eq+1).replace(/\+/g," "));
        if(k.indexOf("entry.")===0 && /^[1-6]$/.test(v.trim())){ mapByPlaceholder[v.trim()]=k; }
      });
      return {base:base, map:mapByPlaceholder};
    }catch(e){ return null; }
  }
  function sendForm(){
    var pf=parseForm(String(CFG.formPrefillLink||""));
    if(!pf || Object.keys(pf.map).length===0){ showDone('送信フォームが未設定です（先生用設定）。', true); return; }
    var name=curName(), q=curQuestion();
    var vals={
      "1":name||"（未記入）",
      "2":state.tool+(state.level?"（"+state.level+"）":""),
      "3":state.score+" / "+state.total+"（"+pct()+"％）",
      "4":nowStr(),
      "5":q||"（なし）",
      "6":detailText()
    };
    var parts=[];
    Object.keys(pf.map).forEach(function(ph){
      parts.push(pf.map[ph]+"="+encodeURIComponent(vals[ph]!=null?vals[ph]:""));
    });
    var url=pf.base+"?usp=pp_url&"+parts.join("&");
    window.open(url, "_blank");
    showDone('フォームを開きました。内容を確認して「送信」を押してください。');
  }

  function showDone(msg, warn){
    var d=document.getElementById("nnhDone"); if(!d) return;
    d.textContent=msg; d.style.color=warn?"#9A3D1C":"#3B6D11"; d.classList.add("show");
  }
})();
