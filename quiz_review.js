/* quiz_review.js — 「間違えた問題を復習」機能（全レベル共通・外部スクリプト版）
   既存のクイズエンジン（selectAnswer / renderPuzzle / renderQuestion / retrySection /
   updateStatsBar / showResult / goHome / startQuiz などのグローバル関数と、
   pool / current / section / subtype / correct / answered / stats などのグローバル変数）に
   後付けでフックして、間違えた問題を端末内(localStorage)に保存し、あとでまとめて解き直せるようにする。
   n3_quiz.html は内蔵版を使うため、このスクリプトは読み込まない。 */
(function () {
  'use strict';
  if (window.__nnhReviewLoaded) return;
  window.__nnhReviewLoaded = true;

  // ── レベル判定 → localStorageキー ──
  var lv = (document.title.match(/N\s*([1-5])/i) || [])[1];
  if (!lv) { var m = document.documentElement.innerHTML.match(/jlpt_n([1-5])_stats/); lv = m ? m[1] : null; }
  var WKEY = lv ? ('jlpt_n' + lv + '_wrong') : 'jlpt_quiz_wrong';

  var reviewing = false;

  // ── ストレージ ──
  function loadWrong() { try { return JSON.parse(localStorage.getItem(WKEY) || '{}'); } catch (e) { return {}; } }
  function saveWrong(m) { try { localStorage.setItem(WKEY, JSON.stringify(m)); } catch (e) {} }
  function wrongSig(sec, sub, q) { return (sec || '') + '|' + (sub || '') + '|' + String(q.question || '').replace(/\s+/g, '').slice(0, 200); }
  function addWrong(sec, sub, q) {
    var mm = loadWrong();
    mm[wrongSig(sec, sub, q)] = { sec: sec, sub: sub, q: { question: q.question, choices: q.choices, answer: q.answer, explanation: q.explanation, visual: q.visual } };
    saveWrong(mm);
  }
  function removeWrong(sec, sub, q) { var mm = loadWrong(); var k = wrongSig(sec, sub, q); if (mm[k]) { delete mm[k]; saveWrong(mm); } }
  function wrongCount() { return Object.keys(loadWrong()).length; }
  function recordAnswer(sec, sub, q, ok) { if (ok) removeWrong(sec, sub, q); else addWrong(sec, sub, q); }
  function effSec(q) { try { return q._sec || section; } catch (e) { return q._sec || ''; } }
  function effSub(q) { try { return q._sub || subtype; } catch (e) { return q._sub || null; } }

  // ── UI 更新 ──
  function updateReviewCard() {
    var n = wrongCount();
    var card = document.getElementById('review-card');
    var cnt = document.getElementById('review-count');
    if (cnt) cnt.textContent = n;
    if (card) card.classList.toggle('hidden', n === 0);
  }
  function clearWrong() {
    if (!confirm('復習リストにある間違えた問題をすべて消しますか？この操作は元に戻せません。')) return;
    localStorage.removeItem(WKEY); updateReviewCard();
  }
  window.startReview = function () {
    var items = Object.values(loadWrong());
    if (items.length === 0) { alert('間違えた問題はまだありません。まずは各カテゴリの問題に挑戦しましょう！'); return; }
    reviewing = true;
    section = '復習'; subtype = null;
    var built = items.map(function (it) { var c = {}; for (var k in it.q) c[k] = it.q[k]; c._sec = it.sec; c._sub = it.sub; return c; });
    var TT = (typeof TOTAL_Q !== 'undefined') ? TOTAL_Q : 10;
    pool = shuffle(built).slice(0, TT);
    actualTotal = pool.length;
    current = 0; correct = 0; answered = false;
    if (window.NNHRecord) { try { window.__nnhSec = '復習（間違えた問題）'; NNHRecord.init({ tool: '日本語クイズ ' + (lv ? 'N' + lv : ''), level: '復習（間違えた問題）' }); } catch (e) {} }
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    var sp = document.getElementById('section-pill'); if (sp) sp.textContent = '復習';
    var sl = document.getElementById('subtype-label'); if (sl) sl.textContent = '間違えた問題（残り ' + items.length + '問）';
    startReviewTimer();
    renderQuestion();
  };
  window.clearWrong = clearWrong;

  function startReviewTimer() {
    try {
      if (typeof startTimer === 'function') { if (typeof elapsedSeconds !== 'undefined') elapsedSeconds = 0; startTimer(); }
      else if (typeof updateTimer === 'function') { startTime = Date.now(); timerInterval = setInterval(updateTimer, 1000); }
    } catch (e) {}
  }

  // ── DOM 注入 ──
  function injectUI() {
    var home = document.getElementById('home-screen');
    if (home && !document.getElementById('review-card')) {
      var card = document.createElement('div');
      card.id = 'review-card';
      card.className = 'hidden';
      card.style.cssText = 'margin:0 0 16px';
      card.innerHTML =
        '<div onclick="startReview()" role="button" style="cursor:pointer;background:#FFF6EA;border:1px solid #F0D8B0;border-left:5px solid #E8912D;border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:12px">'
        + '<div style="font-size:26px;flex-shrink:0">🔁</div>'
        + '<div style="flex:1;min-width:0">'
        + '<div style="font-weight:700;font-size:15px;color:#B96A12">間違えた問題を復習</div>'
        + '<div style="font-size:12px;color:var(--text-muted);margin-top:2px">まちがえた問題だけをまとめて、あとで練習できます。正解すると自動でリストから消えます。</div>'
        + '</div>'
        + '<div style="text-align:right;flex-shrink:0"><div style="font-size:20px;font-weight:700;color:#E8912D"><span id="review-count">0</span>問</div></div>'
        + '</div>'
        + '<div style="text-align:right;margin-top:5px"><span onclick="clearWrong()" style="font-size:11px;color:var(--text-hint);text-decoration:underline;cursor:pointer">復習リストを空にする</span></div>';
      var sl = home.querySelector('.section-label');
      if (sl && sl.parentNode) sl.parentNode.insertBefore(card, sl);
      else home.insertBefore(card, home.firstChild);
    }
    var acts = document.querySelector('.result-actions');
    if (acts && !document.getElementById('r-review-btn')) {
      var prim = acts.querySelector('.btn-primary') || acts.firstElementChild;
      var btn = document.createElement('button');
      btn.id = 'r-review-btn';
      btn.className = 'btn-secondary hidden';
      btn.setAttribute('onclick', 'startReview()');
      btn.style.cssText = 'border-color:#E8912D;color:#B96A12';
      btn.innerHTML = '🔁 間違えた問題を復習（<span id="r-review-count">0</span>問）';
      if (prim && prim.nextSibling) acts.insertBefore(btn, prim.nextSibling);
      else acts.appendChild(btn);
    }
  }

  // ── 既存関数へのフック ──
  function wrap(name, make) { if (typeof window[name] === 'function') { var orig = window[name]; window[name] = make(orig); } }

  wrap('selectAnswer', function (orig) {
    return function (chosen, q, btn, choicesEl) {
      var was = answered;
      var r = orig.apply(this, arguments);
      try { if (!was && q) recordAnswer(effSec(q), effSub(q), q, chosen === q.answer); } catch (e) {}
      return r;
    };
  });

  wrap('renderPuzzle', function (orig) {
    return function (q) {
      var r = orig.apply(this, arguments);
      try {
        var cb = document.querySelector('.puzzle-check-btn');
        if (cb) {
          cb.addEventListener('click', function () {
            setTimeout(function () {
              var star = document.querySelector('.puzzle-slot.star-slot');
              if (star && (star.classList.contains('correct-slot') || star.classList.contains('wrong-slot'))) {
                recordAnswer(effSec(q), effSub(q), q, star.classList.contains('correct-slot'));
              }
            }, 0);
          });
        }
      } catch (e) {}
      return r;
    };
  });

  wrap('renderQuestion', function (orig) {
    return function () {
      try {
        if (reviewing && typeof pool !== 'undefined' && pool[current] && pool[current]._sec) {
          var s = section, t = subtype;
          section = pool[current]._sec; subtype = pool[current]._sub;
          try { return orig.apply(this, arguments); } finally { section = s; subtype = t; }
        }
      } catch (e) {}
      return orig.apply(this, arguments);
    };
  });

  wrap('retrySection', function (orig) {
    return function () { if (reviewing || (typeof section !== 'undefined' && section === '復習')) { window.startReview(); return; } return orig.apply(this, arguments); };
  });

  wrap('startQuiz', function (orig) { return function () { reviewing = false; return orig.apply(this, arguments); }; });
  wrap('goHome', function (orig) { return function () { reviewing = false; var r = orig.apply(this, arguments); try { updateReviewCard(); } catch (e) {} return r; }; });
  wrap('updateStatsBar', function (orig) { return function () { var r = orig.apply(this, arguments); try { updateReviewCard(); } catch (e) {} return r; }; });
  wrap('showResult', function (orig) {
    return function () {
      var r = orig.apply(this, arguments);
      try {
        var b = document.getElementById('r-review-btn'); var n = wrongCount();
        if (b) { b.classList.toggle('hidden', n === 0); var c = document.getElementById('r-review-count'); if (c) c.textContent = n; }
        updateReviewCard();
      } catch (e) {}
      return r;
    };
  });

  // ── 初期化 ──
  function init() { injectUI(); updateReviewCard(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
