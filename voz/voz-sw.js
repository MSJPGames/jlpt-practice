/* Voz y Letra — オフライン用のキャッシュ係
   このファイルは voz/ の中だけを担当します。サイトの他の部分には触れません。 */

var CACHE = "voz-2026-08-25k";
var ASSETS = ["./voz.html", "./voz-manifest.json", "./voz-icon-192.png", "./voz-icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .catch(function () { /* 1つ失敗しても止めない */ })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }

  /* 別ドメイン（中継サーバー・Googleフォント）は素通し */
  if (url.origin !== self.location.origin) return;

  /* voz/ の外は素通し。サイトの他のページには一切関与しない */
  var scope = new URL("./", self.location).pathname;
  if (url.pathname.indexOf(scope) !== 0) return;

  /* ネットがあれば新しいものを取り、控えを更新する。
     圏外なら控えを出す。 */
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.status === 200 && res.type === "basic") {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) {
        if (hit) return hit;
        if (req.mode === "navigate") return caches.match("./voz.html");
        return new Response("", { status: 504, statusText: "offline" });
      });
    })
  );
});
