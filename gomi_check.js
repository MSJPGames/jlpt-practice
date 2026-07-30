/* ゴミ分別データの全数検査（signw を含む） */
global.window={};
eval(require('fs').readFileSync('gomi_data.js','utf8').replace(/^const /gm,'globalThis.'));
const {TR,ITEMS,CITIES,SPECIAL_BINS,SPECIAL_MATS,PREP,PREP_SEQ,SIGN_WORDS}=globalThis;
const L=TR.langs.map(l=>l.id);
let bad=[];
function chk(group,keys,label){
  keys.forEach(k=>{
    if(!TR[group][k]){bad.push(label+' 未登録: '+k);return;}
    L.forEach(l=>{ if(!TR[group][k][l]) bad.push(label+' '+k+' → '+l+' が空'); });
  });
}
chk('items', Object.keys(ITEMS), '品目');
const labs=new Set(); CITIES.forEach(c=>c.bins.forEach(b=>labs.add(b.label))); SPECIAL_BINS.forEach(b=>labs.add(b.label));
chk('bins', [...labs], '区分');
chk('safety', Object.keys(TR.safety), '安全');
chk('steps', Object.keys(TR.steps), '手順');
chk('signw', SIGN_WORDS.map(w=>w.ja), '掲示のことば一覧');
/* ★ 貼り紙そのものに出る文字（曜日・袋の名前・注意文）。
   「ことば一覧」とは別画面なので、別に確かめる必要がある。 */
if(TR.days)  chk('days',  Object.keys(TR.days),  '貼り紙の曜日');
if(TR.bags)  chk('bags',  Object.keys(TR.bags),  '貼り紙の袋の名前');
else bad.push('貼り紙の袋の名前 TR.bags が無い');
if(TR.signnote){
  Object.keys(TR.signnote).forEach(k=>L.forEach(l=>{
    if(!TR.signnote[k][l]) bad.push('貼り紙の注意文 '+k+' → '+l+' が空');
  }));
} else bad.push('貼り紙の注意文 TR.signnote が無い');
/* BAGJA の値がすべて TR.bags にあるか（画面に出るのは BAGJA の値） */
if(globalThis.BAGJA && TR.bags){
  Object.values(globalThis.BAGJA).forEach(v=>{
    if(!TR.bags[v]) bad.push('袋の名前が未登録: '+v);
  });
}
/* 行き先が解決するか（SPECIAL_MATS は配列。特別区分は全都市共通） */
const SP=new Set(SPECIAL_MATS);
Object.keys(ITEMS).forEach(id=>{
  const m=ITEMS[id].mat;
  if(SP.has(m)){
    if(!SPECIAL_BINS.some(b=>b.id===m)) bad.push('特別区分が無い: '+id+' → '+m);
    return;
  }
  CITIES.forEach(c=>{ if(!c.matMap[m]) bad.push('行き先なし: '+id+'('+m+') / '+c.name); });
});
/* PREP / PREP_SEQ の整合 */
Object.keys(PREP).forEach(id=>{ if(!ITEMS[id]) bad.push('PREP の品目が無い: '+id); });
Object.keys(PREP_SEQ).forEach(id=>{ if(!ITEMS[id]) bad.push('PREP_SEQ の品目が無い: '+id); });
/* danger の品目に、なぜ危ないかの説明があるか
   （DANGER_WARN は全品目共通の1文なので、個別の説明が別に要る） */
const IW=globalThis.ITEM_WHY||{}, MW=globalThis.MAT_WHY||{};
Object.keys(ITEMS).forEach(id=>{
  if(!ITEMS[id].danger) return;
  if(!IW[id] && !MW[ITEMS[id].mat]) bad.push('危険なのに説明が無い: '+id+'（'+ITEMS[id].name+'）');
});
/* 多言語の安全パネルが全言語そろっているか */
Object.keys(TR.safety).forEach(k=>L.forEach(l=>{
  if(!TR.safety[k][l]) bad.push('安全パネル '+k+' → '+l+' が空');
}));
/* 別の日本語区分なのに訳が同じになっていないか。
   ただし同義語（可燃/燃える/燃やせる など）は同じ訳が正しいので除外する。 */
const SYN=[['可燃','燃える','燃やせる','普通ごみ'],
           ['不燃','燃えない','燃やせない'],
           ['びん缶ペット','缶びんペット']];
const sameGroup=(a,b)=>SYN.some(g=>g.includes(a)&&g.includes(b));
const blabs=[...labs];
L.forEach(l=>{
  const seen={};
  blabs.forEach(lab=>{
    const t=TR.bins[lab] && TR.bins[lab][l];
    if(!t) return;
    if(seen[t] && seen[t]!==lab){
      if(!sameGroup(seen[t],lab))
        bad.push('別区分が同じ訳: '+l+' 「'+seen[t]+'」と「'+lab+'」→ '+t);
    } else seen[t]=lab;
  });
});
console.log('言語:',L.length,'／ 品目:',Object.keys(ITEMS).length,'／ 掲示:',SIGN_WORDS.length);
console.log(bad.length? ('★ 問題 '+bad.length+'件\n  '+bad.slice(0,15).join('\n  ')) : '✔ 問題なし');
