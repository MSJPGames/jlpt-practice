(function(){
"use strict";

var page = document.body.dataset.page || "check";
function el(id){ return document.getElementById(id); }
var saved = {};
try { saved = JSON.parse(sessionStorage.getItem("isou-session") || "{}"); } catch(e) {}
if(!saved || typeof saved !== "object") saved = {};
var D = window.ISOU_DATA || {};
var T = D.ui || {};
var STYLES = D.styles || [];
var L = D.lex || [];
var FNS = D.fns || [];
var ORDER = STYLES.map(function(s){ return s.id; });

function S(id){ for(var i=0;i<STYLES.length;i++) if(STYLES[i].id===id) return STYLES[i]; return STYLES[0]; }
function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m];}); }
function rich(s){ return esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>"); }
function txt(id, s){ var el = document.getElementById(id); if(el) el.innerHTML = rich(s); }
function cvars(s){ return "--c:" + s.c + ";--cb:" + s.cb; }

/* ===================== 照合 ===================== */
var INDEX = [];
L.forEach(function(e, ei){
  if(e.ax === "keep"){
    (e.m[0]||[]).forEach(function(w){ INDEX.push({w:w, e:ei, slot:0}); });
    return;
  }
  for(var s=0;s<3;s++){
    (e.m[s]||[]).forEach(function(w){ if(w) INDEX.push({w:w, e:ei, slot:s}); });
  }
});
INDEX.sort(function(a,b){ return b.w.length - a.w.length; });

function scan(text){
  var used = new Array(text.length), hits = [], j, k, ok;
  for(k=0;k<INDEX.length;k++){
    var w = INDEX[k].w, from = 0, at;
    while((at = text.indexOf(w, from)) !== -1){
      ok = true;
      for(j=at;j<at+w.length;j++) if(used[j]){ ok = false; break; }
      if(ok){
        for(j=at;j<at+w.length;j++) used[j] = true;
        hits.push({at:at, len:w.length, w:w, e:INDEX[k].e, slot:INDEX[k].slot});
      }
      from = at + 1;
    }
  }
  hits.sort(function(a,b){ return a.at - b.at; });
  return hits;
}
function pick(v, idx){
  var i;
  for(i=idx;i<3;i++) if(v[i]) return v[i];
  for(i=idx;i>=0;i--) if(v[i]) return v[i];
  return "";
}
function judge(hit, sc){
  var e = L[hit.e];
  if(e.ax === "keep") return {k:"keep", to:"", why:e.why, e:e};
  if(e.w && !sc.w) return {k:"bad", to:pick(e.v, 0), why:e.why, e:e};
  var tier = (e.ax === "t") ? sc.t : sc.h;
  var r = (e.r || [0,0,0])[tier-1];
  var x = (e.x || [2,2,2])[tier-1];
  if(hit.slot < r) return {k:"bad", to:pick(e.v, r), why:e.why, e:e};
  if(hit.slot > x) return {k:"bad", to:pick(e.v, x), why:e.why, e:e};
  return {k:"ok", to:"", why:e.why, e:e};
}
function styleOfSentences(text){
  var parts = text.split(/[。．.!！?？\n]/).map(function(s){ return s.trim(); }).filter(Boolean);
  var polite = 0, plain = 0;
  parts.forEach(function(s){
    var tail = s.replace(/[よねなかわさぞぜっ〜ー～]+$/, "");
    if(/(です|ます|ません|でした|ました|ましょう|ください|ませ|ございます|でしょう)$/.test(tail)) polite++;
    else if(/(だ|だろ|じゃん|かな|る|た|ない|う|い|の)$/.test(tail)) plain++;
  });
  return {n:parts.length, polite:polite, plain:plain};
}

/* ===================== 描画 ===================== */
var cur = STYLES.length ? STYLES[0].id : "", mode = page === "compare" ? 6 : 1, dictFilter = "all";
(function(){ for(var i=0;i<STYLES.length;i++) if(STYLES[i].id === "kokyaku") cur = "kokyaku"; })();

if(STYLES.some(function(s){return s.id===saved.scene;})) cur=saved.scene;
function persist(){
  saved.scene=cur;
  if(el("inp")) saved.text=el("inp").value;
  try { sessionStorage.setItem("isou-session",JSON.stringify(saved)); } catch(e) {}
}
function boot(){

  if(page === "check") txt("uiSub", T.sub);
  txt("sec3", "1　二本の軸を知る");
  txt("sec1", page === "check" ? "2　場面をえらぶ" : "場面をえらぶ");
  txt("sec2", "3　文を入れて調べる");
  txt("sec4", "同じ用件を、六つの場面で");
  txt("sec5", "言いかえを探す");
  txt("note2", T.note2); txt("note3", T.note3); txt("note5", T.note5);
  txt("disc", T.disclaimer);
  txt("axY", T.axY); txt("axYn", T.axYn); txt("axX", T.axX); txt("axXn", T.axXn);
  txt("plotYhi", T.plotYhi); txt("plotYlo", T.plotYlo);
  txt("plotXlo", T.plotXlo); txt("plotXhi", T.plotXhi);
  txt("kyoinTitle", T.kyoinTitle); txt("kyoinBody", T.kyoinBody);
  txt("foot1", T.foot1); txt("foot2", T.foot2);
  if(el("run")) el("run").textContent = T.btnRun || "調べる";
  if(el("clr")) el("clr").textContent = T.btnClear || "消す";
  if(el("m1")) el("m1").textContent = T.mode1 || "";
  if(el("m6")) el("m6").textContent = T.mode6 || "";
  var inp = document.getElementById("inp");
  if(inp){ inp.placeholder = T.inpPlaceholder || "";
  inp.value = typeof saved.text === "string" ? saved.text : (T.inpDefault || ""); }
  if(el("q")) el("q").placeholder = T.qPlaceholder || "";
  var fl = {all:T.fAll, filler:T.fFiller, kango:T.fKango, written:T.fWritten};
  Array.prototype.forEach.call(document.querySelectorAll(".fbtn"), function(b){
    b.textContent = fl[b.dataset.f] || b.dataset.f;
  });
  var box = document.getElementById("samples");
  if(!box) return;
  box.innerHTML = '<b>' + esc(T.samplesLabel||"例文") + '</b>';
  (T.samples||[]).forEach(function(s){
    var b = document.createElement("button");
    b.textContent = s.length > 16 ? s.slice(0,16) + "…" : s;
    b.title = s;
    b.addEventListener("click", function(){ inp.value = s; analyze(); });
    box.appendChild(b);
  });
}

function buildScene(){
  var c = document.getElementById("chips"), plot = document.getElementById("plot");
  if(c) c.innerHTML = "";
  STYLES.forEach(function(s){
    var b = document.createElement("button");
    b.className = "chip"; b.style.cssText = cvars(s); b.dataset.id = s.id;
    b.setAttribute("aria-pressed", s.id===cur?"true":"false");
    b.innerHTML = '<i></i>' + esc(s.label);
    b.addEventListener("click", function(){ select(s.id); });
    if(c) c.appendChild(b);

    var d = document.createElement("button");
    d.className = "dot"; d.style.cssText = cvars(s) + ";left:" + s.x + "%;top:" + (100 - s.y) + "%";
    d.dataset.id = s.id;
    d.setAttribute("aria-pressed", s.id===cur?"true":"false");
    d.innerHTML = '<i></i><span>' + esc(s.short || s.label) + '</span>';
    d.addEventListener("click", function(){ select(s.id); });
    if(plot) plot.appendChild(d);
  });
}
function renderSceneMemo(){
  if(!el("sceneMemo")) return;
  var s = S(cur);
  document.getElementById("sceneMemo").innerHTML = '<b>' + esc(s.who) + '</b><br>' + rich(s.memo);
}
function bar(n){ var o=""; for(var i=1;i<=3;i++) o += '<s class="' + (i<=n?"on":"") + '"></s>'; return o; }

function analyze(){
  if(!el("inp") || !STYLES.length || !L.length) return;
  persist();
  var text = document.getElementById("inp").value;
  var res = document.getElementById("res");
  if(!text.trim()){ res.innerHTML = '<div class="empty">' + esc(T.emptyInput||"") + '</div>'; return; }
  var sc = S(cur), hits = scan(text), out = [], html = "", last = 0;

  hits.forEach(function(h){
    var j = judge(h, sc);
    out.push({h:h, j:j});
    html += esc(text.slice(last, h.at));
    html += '<mark class="' + j.k + '">' + esc(h.w) + '</mark>';
    last = h.at + h.len;
  });
  html += esc(text.slice(last));
  html = html.replace(/\n/g, "<br>");

  var cw = [], fw = [];
  out.forEach(function(o){
    if(o.j.e.ax === "h") cw.push(o.h.slot);
    else if(o.j.e.ax === "t") fw.push(o.h.slot);
  });
  function avg(a){ if(!a.length) return null; var s=0; a.forEach(function(v){s+=v;}); return s/a.length; }
  function lvl(a){ return a === null ? null : (a >= 1.5 ? 3 : (a >= 0.7 ? 2 : 1)); }
  function word(n){ return n === null ? "—" : (n === 3 ? "硬" : (n === 2 ? "中" : "柔")); }
  var cl = lvl(avg(cw)), fl = lvl(avg(fw));
  var st = styleOfSentences(text);
  var fend = st.polite && st.plain ? "混在" : (st.polite ? "丁寧体" : (st.plain ? "普通体" : "—"));

  var g = '<div class="gauges">' +
    '<div class="gauge"><b>' + esc(T.gContent||"") + '</b><div class="val">' + word(cl) + '</div><div class="bar">' + bar(cl||0) + '</div>' +
      '<small>' + esc(T.gContentNote||"") + '</small></div>' +
    '<div class="gauge"><b>' + esc(T.gFunc||"") + '</b><div class="val">' + word(fl) + '</div><div class="bar">' + bar(fl||0) + '</div>' +
      '<small>' + esc(T.gFuncNote||"") + '</small></div>' +
    '<div class="gauge"><b>' + esc(T.gEnd||"") + '</b><div class="val">' + esc(fend) + '</div>' +
      '<small>' + (st.n ? esc(st.n + "文　丁寧" + st.polite + "／普通" + st.plain) : "") + '</small></div>' +
  '</div>';

  var v = "";
  if(cl === 3 && fl === 1) v = '<div class="verdict ng">' + rich(T.vChiguhagu||"") + '</div>';
  else if(fend === "混在") v = '<div class="verdict ng">' + rich(T.vMixed||"") + '</div>';
  else if(cl !== null && fl !== null && cl === fl) v = '<div class="verdict good">' + rich(T.vOk||"") + '</div>';

  var rank = {bad:0, keep:1, ok:2}, seen = {}, list = [];
  out.forEach(function(o){
    var key = o.h.e + "|" + o.h.w + "|" + o.j.k;
    if(seen[key]){ seen[key].n++; return; }
    o.n = 1; seen[key] = o; list.push(o);
  });
  list.sort(function(a,b){ return rank[a.j.k] - rank[b.j.k]; });

  var hitHtml = "";
  if(!list.length){
    hitHtml = '<div class="empty">' + esc(T.emptyHit||"") + '</div>';
  } else {
    list.forEach(function(o){
      var j = o.j, tag = j.k === "bad" ? "bad" : "ok",
        lab = j.k === "keep" ? (T.labKeep||"") : (j.k === "bad" ? (T.labFix||"") : (T.labAsIs||""));
      hitHtml += '<div class="hit"><div class="head">' +
        '<span class="tag ' + tag + '">' + esc(lab) + '</span>' +
        '<span class="lay">' + esc(j.e.lay) + '</span>' +
        (o.n > 1 ? '<span class="n">' + o.n + '回</span>' : '') + '</div>' +
        '<div class="swap">' + esc(o.h.w) +
        (j.to ? '<span class="ar">→</span><span class="to">' + esc(j.to) + '</span>' : '') + '</div>' +
        '<div class="rn">' + rich(j.why) + '</div></div>';
    });
  }

  res.innerHTML = '<div class="marked">' + html + '</div>' + g + v + hitHtml +
    '<div class="legend">' +
      '<span><i class="bad"></i>' + esc(T.legendBad||"") + '</span>' +
      '<span><i class="ok"></i>' + esc(T.legendOk||"") + '</span>' +
      '<span>「' + esc(S(cur).label) + '」として見ています</span>' +
    '</div>';
}

function cellHTML(v){
  if(!v) return '<div class="line na">—</div>';
  if(v.na) return '<div class="line na">' + esc(T.naText||"") + '</div>' + (v.n?'<div class="rn">'+rich(v.n)+'</div>':'');
  return '<div class="line">' + esc(v.t) + '</div>' + (v.n?'<div class="rn">'+rich(v.n)+'</div>':'');
}
function renderFns(){
  if(!el("fnList")) return;
  var html = "";
  FNS.forEach(function(f){
    html += '<div class="card"><div class="fn-h"><div class="t">' + esc(f.fn) + '</div><div class="s">' + esc(f.sit) + '</div></div>';
    if(mode===1){
      html += '<div class="row">' + cellHTML(f.v[cur]) + '</div>';
    } else {
      ORDER.forEach(function(id){
        var st = S(id);
        html += '<div class="crow' + (id===cur?" cur":"") + '" style="' + cvars(st) + '">' +
          '<div class="who">' + esc(st.label) + '</div>' + cellHTML(f.v[id]) + '</div>';
      });
    }
    html += '<div class="pivot"><b>' + esc(T.pivotLabel||"") + '　</b>' + rich(f.pivot) + '</div></div>';
  });
  document.getElementById("fnList").innerHTML = html;
}

function dictRows(){
  return L.map(function(e){
    var a, b, kind = e.g === "敬語" ? "filler" : e.g;
    if(e.ax === "keep"){ a = e.v[0]; b = T.keepLabel || ""; }
    else if(e.g === "written" || (e.ax === "h" && e.m[2] && e.m[2].length && !e.ok && e.v[0] !== e.v[2])){ a = e.v[2]; b = e.v[0]; }
    else if(e.ax === "h" && e.r && e.r[2] === 2){ a = e.v[0]; b = e.v[2]; }
    else { a = e.v[0]; b = e.v[2] || e.v[1]; }
    return {a:a, b:b, kind:kind, lay:e.lay, why:e.why};
  }).filter(function(r){ return r.a; });
}
var DICT = [];
function renderDict(){
  if(!el("q") || !el("dict")) return;
  var q = document.getElementById("q").value.trim().toLowerCase();
  var rows = DICT.filter(function(r){
    if(dictFilter !== "all" && r.kind !== dictFilter) return false;
    if(!q) return true;
    return (r.a + r.b + r.why + r.lay).toLowerCase().indexOf(q) !== -1;
  });
  document.getElementById("dict").innerHTML = rows.length ? rows.map(function(r){
    return '<div class="row"><div class="dlay">' + esc(r.lay) + '</div>' +
      '<div class="dw"><span class="from">' + esc(r.a) + '</span><span class="ar">→</span><span class="to">' + esc(r.b) + '</span></div>' +
      '<div class="rn">' + rich(r.why) + '</div></div>';
  }).join("") : '<div class="empty" style="border-top:none">' + esc(T.dictEmpty||"") + '</div>';
}

function select(id){
  cur = id;
  persist();
  var n = document.querySelectorAll(".chip"), i;
  for(i=0;i<n.length;i++) n[i].setAttribute("aria-pressed", n[i].dataset.id===id?"true":"false");
  n = document.querySelectorAll(".dot");
  for(i=0;i<n.length;i++) n[i].setAttribute("aria-pressed", n[i].dataset.id===id?"true":"false");
  renderSceneMemo();
  renderFns();
  if(el("res") && el("res").innerHTML.trim()) analyze();
}

if(!STYLES.length || !L.length){
  var error=el("dataError");error.hidden=false;error.className="data-error";
  error.textContent="データを読み込めませんでした。ページを再読み込みしてください。保存版では、同じフォルダに isou_data.js が必要です。";
  ["run","m1","m6"].forEach(function(id){if(el(id)) el(id).disabled=true;});
} else {
  boot();buildScene();renderSceneMemo();renderFns();DICT=dictRows();renderDict();
  if(el("m1")){ el("m1").setAttribute("aria-pressed",mode===1?"true":"false");el("m6").setAttribute("aria-pressed",mode===6?"true":"false"); }
  analyze();
}
function on(id,event,fn){if(el(id))el(id).addEventListener(event,fn);}
on("run","click",analyze);
on("inp","input",persist);
on("inp","keydown",function(ev){if((ev.ctrlKey||ev.metaKey)&&ev.key==="Enter")analyze();});
on("clr","click",function(){el("inp").value="";persist();el("res").innerHTML='<div class="empty">'+esc(T.emptyInput||"")+'</div>';el("inp").focus();});
on("m1","click",function(){mode=1;this.setAttribute("aria-pressed","true");el("m6").setAttribute("aria-pressed","false");renderFns();});
on("m6","click",function(){mode=6;this.setAttribute("aria-pressed","true");el("m1").setAttribute("aria-pressed","false");renderFns();});
on("q","input",renderDict);
Array.prototype.forEach.call(document.querySelectorAll(".fbtn"),function(b){
 b.addEventListener("click",function(){dictFilter=b.dataset.f;Array.prototype.forEach.call(document.querySelectorAll(".fbtn"),function(o){o.setAttribute("aria-pressed",o===b?"true":"false");});renderDict();});
});
window.addEventListener("pageshow",function(ev){if(ev.persisted){try{var latest=JSON.parse(sessionStorage.getItem("isou-session")||"{}");if(STYLES.some(function(s){return s.id===latest.scene;})){saved=latest;cur=latest.scene;if(el("inp")&&typeof latest.text==="string")el("inp").value=latest.text;select(cur);}}catch(e){}}});
})();
