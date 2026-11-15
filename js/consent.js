/* Svalin Industries — cookie consent. Loads Google Analytics only after explicit consent. */
(function () {
  'use strict';
  var GA_ID = 'G-604FVZKPVW';
  var KEY = 'sv_consent';
  var VERSION = 1;
  var MAX_AGE = 365 * 24 * 60 * 60 * 1000; // re-ask after 12 months

  var T = {
    es: {
      eyebrow: '// Cookies',
      text: 'Usamos almacenamiento técnico para recordar tu idioma y tema. Con tu permiso, usaremos también cookies analíticas de Google Analytics para medir el uso de la web. Hasta que decidas, no se activan.',
      policy: 'Política de Cookies',
      accept: 'Aceptar',
      reject: 'Rechazar',
      configure: 'Configurar',
      region: 'Aviso de cookies',
      dlgEyebrow: '// Preferencias',
      dlgTitle: 'Configuración de cookies',
      dlgIntro: 'Elige qué categorías permites. Puedes cambiar tu decisión en cualquier momento desde la Política de Cookies.',
      close: 'Cerrar',
      techTitle: 'Técnicas',
      techDesc: 'Necesarias para que la web funcione y recuerde las opciones que eliges: idioma, tema y esta decisión.',
      techMeta: 'sv_lang · sv_theme · sv_consent',
      always: 'Siempre activas',
      anTitle: 'Analíticas',
      anDesc: 'Google Analytics mide de forma estadística las visitas y el uso de la web para ayudarnos a mejorarla.',
      anMeta: '_ga · _ga_604FVZKPVW · Google',
      on: 'Activadas',
      off: 'Desactivadas',
      rejectAll: 'Rechazar todo',
      acceptAll: 'Aceptar todo',
      save: 'Guardar selección'
    },
    en: {
      eyebrow: '// Cookies',
      text: 'We use technical storage to remember your language and theme. With your permission, we will also use Google Analytics cookies to measure how the site is used. Nothing is enabled until you decide.',
      policy: 'Cookie Policy',
      accept: 'Accept',
      reject: 'Reject',
      configure: 'Configure',
      region: 'Cookie notice',
      dlgEyebrow: '// Preferences',
      dlgTitle: 'Cookie settings',
      dlgIntro: 'Choose which categories you allow. You can change your decision at any time from the Cookie Policy.',
      close: 'Close',
      techTitle: 'Technical',
      techDesc: 'Required for the site to work and to remember the options you choose: language, theme and this decision.',
      techMeta: 'sv_lang · sv_theme · sv_consent',
      always: 'Always active',
      anTitle: 'Analytics',
      anDesc: 'Google Analytics measures visits and site usage statistically to help us improve it.',
      anMeta: '_ga · _ga_604FVZKPVW · Google',
      on: 'Enabled',
      off: 'Disabled',
      rejectAll: 'Reject all',
      acceptAll: 'Accept all',
      save: 'Save selection'
    }
  };

  var PALETTE = {
    light: { bg: '#f4f2ee', bg2: '#ffffff', text: '#15181b', text2: '#3d4247', muted: '#63696e', faint: '#9a9ea2', line: 'rgba(0,0,0,.10)', line2: 'rgba(0,0,0,.18)', accent: '#c67e12', shadow: 'rgba(0,0,0,.16)' },
    dark: { bg: '#0a0b0c', bg2: '#0d0f10', text: '#eceded', text2: '#b7bbbe', muted: '#868b8f', faint: '#5f6468', line: 'rgba(255,255,255,.08)', line2: 'rgba(255,255,255,.18)', accent: '#e9a23b', shadow: 'rgba(0,0,0,.5)' }
  };

  /* ---------- state ---------- */
  function lang() {
    try { var l = localStorage.getItem('sv_lang'); if (l === 'es' || l === 'en') return l; } catch (e) {}
    return 'en';
  }
  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (c && c.v === VERSION && typeof c.analytics === 'boolean' && typeof c.ts === 'number' && Date.now() - c.ts < MAX_AGE) return c;
    } catch (e) {}
    return null;
  }
  function save(analytics) {
    var c = { v: VERSION, analytics: !!analytics, ts: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    apply(c);
    hideBanner();
    closeDialog();
    try { window.dispatchEvent(new CustomEvent('svconsentchange', { detail: c })); } catch (e) {}
  }

  /* ---------- Google Analytics (only after consent) ---------- */
  var gaLoaded = false;
  function loadGA() {
    window['ga-disable-' + GA_ID] = false;
    if (gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }
  function clearGACookies() {
    var names = document.cookie.split(';').map(function (c) { return c.split('=')[0].trim(); })
      .filter(function (n) { return n === '_ga' || n.indexOf('_ga_') === 0 || n === '_gid' || n.indexOf('_gat') === 0; });
    if (!names.length) return;
    var parts = location.hostname.split('.');
    var domains = [''];
    for (var i = 0; i < parts.length - 1; i++) domains.push('.' + parts.slice(i).join('.'));
    domains.push(location.hostname);
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }
  function apply(c) {
    if (c && c.analytics) { loadGA(); }
    else { window['ga-disable-' + GA_ID] = true; clearGACookies(); }
  }
  apply(read());

  /* ---------- UI ---------- */
  var root, banner, back, dlg, sw, lastFocus, draftAnalytics = false;

  function css() {
    return '' +
      '#sv-cc,#sv-cc *{box-sizing:border-box}' +
      '#sv-cc{font-family:"Poppins",system-ui,sans-serif;color:var(--cc-text);-webkit-font-smoothing:antialiased}' +
      '#sv-cc .cc-banner{position:fixed;z-index:1000;left:clamp(12px,2.5vw,28px);bottom:clamp(12px,2.5vw,28px);width:min(470px,calc(100vw - 24px));background:var(--cc-bg2);border:1px solid var(--cc-line2);padding:26px clamp(20px,3vw,28px) 20px;box-shadow:0 22px 50px var(--cc-shadow);transition:opacity .35s ease,transform .35s ease}' +
      '#sv-cc .cc-banner[hidden]{display:none}' +
      '#sv-cc .cc-bar{position:absolute;top:-1px;left:-1px;right:-1px;height:2px;background:var(--cc-accent)}' +
      '#sv-cc .cc-c{position:absolute;width:10px;height:10px;border-color:var(--cc-accent);border-style:solid;border-width:0}' +
      '#sv-cc .cc-c.bl{bottom:-1px;left:-1px;border-bottom-width:1.5px;border-left-width:1.5px}' +
      '#sv-cc .cc-c.br{bottom:-1px;right:-1px;border-bottom-width:1.5px;border-right-width:1.5px}' +
      '#sv-cc .cc-c.tl{top:-1px;left:-1px;border-top-width:1.5px;border-left-width:1.5px}' +
      '#sv-cc .cc-c.tr{top:-1px;right:-1px;border-top-width:1.5px;border-right-width:1.5px}' +
      '#sv-cc .cc-eyebrow{display:block;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--cc-accent)}' +
      '#sv-cc .cc-text{margin:12px 0 0;font-size:14px;line-height:1.6;color:var(--cc-text2);text-wrap:pretty}' +
      '#sv-cc a{color:var(--cc-accent);text-decoration:underline;text-underline-offset:3px}' +
      '#sv-cc a:hover{opacity:.75}' +
      '#sv-cc .cc-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:20px}' +
      '#sv-cc .cc-btn{min-height:44px;padding:11px 16px;background:none;border:1.5px solid var(--cc-line2);color:var(--cc-text);font-family:"Poppins",system-ui,sans-serif;font-weight:700;font-size:13px;letter-spacing:0;text-transform:uppercase;cursor:pointer;transition:background .2s,color .2s,border-color .2s}' +
      '#sv-cc .cc-btn:hover{border-color:var(--cc-accent);color:var(--cc-accent)}' +
      '#sv-cc .cc-btn.pri{border-color:var(--cc-accent);color:var(--cc-accent)}' +
      '#sv-cc .cc-btn.pri:hover{background:var(--cc-accent);color:#fff}' +
      '#sv-cc .cc-btn:active{transform:translateY(1px)}' +
      '#sv-cc .cc-cfg{grid-column:1/-1;justify-self:start;min-height:40px;padding:8px 2px;background:none;border:none;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--cc-muted);cursor:pointer}' +
      '#sv-cc .cc-cfg:hover{color:var(--cc-accent)}' +
      '#sv-cc button:focus-visible,#sv-cc a:focus-visible{outline:2px solid var(--cc-accent);outline-offset:2px}' +
      '#sv-cc .cc-back{position:fixed;inset:0;z-index:1001;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(10,11,12,.58);backdrop-filter:blur(4px)}' +
      '#sv-cc .cc-back[hidden]{display:none}' +
      '#sv-cc .cc-dlg{position:relative;display:flex;flex-direction:column;width:min(620px,100%);max-height:calc(100vh - 32px);background:var(--cc-bg);border:1px solid var(--cc-line2);box-shadow:0 30px 70px var(--cc-shadow)}' +
      '#sv-cc .cc-in{min-height:0;overflow-y:auto;overflow-x:hidden;padding:clamp(22px,4vw,38px)}' +
      '#sv-cc .cc-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px}' +
      '#sv-cc .cc-title{margin:12px 0 0;font-weight:600;font-size:clamp(22px,3vw,30px);line-height:1.08;letter-spacing:-.015em;color:var(--cc-text)}' +
      '#sv-cc .cc-x{flex:none;width:44px;height:44px;display:inline-flex;align-items:center;justify-content:center;background:none;border:1px solid var(--cc-line2);color:var(--cc-text);font-size:16px;cursor:pointer}' +
      '#sv-cc .cc-x:hover{border-color:var(--cc-accent);color:var(--cc-accent)}' +
      '#sv-cc .cc-intro{margin:16px 0 22px;font-size:14px;line-height:1.6;color:var(--cc-text2)}' +
      '#sv-cc .cc-cat{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 20px;align-items:start;padding:18px 0;border-top:1px solid var(--cc-line)}' +
      '#sv-cc .cc-cat:last-of-type{border-bottom:1px solid var(--cc-line)}' +
      '#sv-cc .cc-cat h3{margin:0;font-size:15px;font-weight:600;color:var(--cc-text)}' +
      '#sv-cc .cc-cat p{grid-column:1/2;margin:0;font-size:13px;line-height:1.6;color:var(--cc-text2)}' +
      '#sv-cc .cc-meta{grid-column:1/2;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.06em;color:var(--cc-muted)}' +
      '#sv-cc .cc-ctl{grid-column:2/3;grid-row:1/4;display:flex;flex-direction:column;align-items:flex-end;gap:8px}' +
      '#sv-cc .cc-state{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--cc-muted)}' +
      '#sv-cc .cc-state.on{color:var(--cc-accent)}' +
      '#sv-cc .cc-sw{position:relative;width:50px;height:28px;padding:0;background:none;border:1.5px solid var(--cc-line2);cursor:pointer;transition:border-color .2s}' +
      '#sv-cc .cc-sw span{position:absolute;top:4px;left:4px;width:17px;height:17px;background:var(--cc-faint);transition:transform .2s,background .2s}' +
      '#sv-cc .cc-sw[aria-checked="true"]{border-color:var(--cc-accent)}' +
      '#sv-cc .cc-sw[aria-checked="true"] span{transform:translateX(22px);background:var(--cc-accent)}' +
      '#sv-cc .cc-sw[disabled]{cursor:not-allowed;opacity:.6}' +
      '#sv-cc .cc-dact{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}' +
      '#sv-cc .cc-dact .cc-btn{flex:1 1 160px}' +
      '#sv-cc .cc-foot{margin:18px 0 0;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.08em}' +
      '@media (max-width:560px){#sv-cc .cc-banner{left:0;right:0;bottom:0;width:100%;border-left:none;border-right:none;border-bottom:none}#sv-cc .cc-c{display:none}#sv-cc .cc-dact{flex-direction:column}#sv-cc .cc-dact .cc-btn{flex:none;width:100%}}' +
      '@media (prefers-reduced-motion:reduce){#sv-cc *{transition:none!important}}';
  }

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function corners() { return '<span class="cc-c tl"></span><span class="cc-c tr"></span><span class="cc-c bl"></span><span class="cc-c br"></span>'; }

  function applyPalette() {
    if (!root) return;
    var bg = (document.body && getComputedStyle(document.body).backgroundColor) || '';
    var m = bg.match(/\d+/g);
    var dark = m ? (+m[0] + +m[1] + +m[2]) < 200 : false;
    var p = PALETTE[dark ? 'dark' : 'light'];
    for (var k in p) root.style.setProperty('--cc-' + k, p[k]);
  }

  function build() {
    if (root) return;
    var st = el('style', { id: 'sv-cc-style' }); st.textContent = css(); document.head.appendChild(st);
    root = el('div', { id: 'sv-cc' });
    banner = el('section', { class: 'cc-banner', role: 'region', 'aria-labelledby': 'sv-cc-eyebrow', hidden: '' });
    back = el('div', { class: 'cc-back', hidden: '' });
    dlg = el('div', { class: 'cc-dlg', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'sv-cc-title' });
    back.appendChild(dlg);
    root.appendChild(banner); root.appendChild(back);
    document.body.appendChild(root);

    back.addEventListener('mousedown', function (e) { if (e.target === back) closeDialog(true); });
    document.addEventListener('keydown', function (e) {
      if (back.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); closeDialog(true); }
      if (e.key === 'Tab') {
        var f = dlg.querySelectorAll('button:not([disabled]),a[href]');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    applyPalette();
    new MutationObserver(applyPalette).observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
    render();
  }

  function render() {
    if (!root) return;
    var t = T[lang()];
    banner.setAttribute('aria-label', t.region);
    banner.innerHTML = '<span class="cc-bar"></span>' + corners() +
      '<span class="cc-eyebrow" id="sv-cc-eyebrow">' + t.eyebrow + '</span>' +
      '<p class="cc-text">' + t.text + ' <a href="cookies.html">' + t.policy + '</a>.</p>' +
      '<div class="cc-actions">' +
      '<button type="button" class="cc-btn" data-a="reject">' + t.reject + '</button>' +
      '<button type="button" class="cc-btn pri" data-a="accept">' + t.accept + '</button>' +
      '<button type="button" class="cc-cfg" data-a="config" aria-haspopup="dialog">' + t.configure + ' →</button>' +
      '</div>';
    banner.querySelector('[data-a="reject"]').onclick = function () { save(false); };
    banner.querySelector('[data-a="accept"]').onclick = function () { save(true); };
    banner.querySelector('[data-a="config"]').onclick = function () { openDialog(); };

    dlg.innerHTML = '<span class="cc-bar"></span>' + corners() + '<div class="cc-in">' +
      '<div class="cc-head"><div><span class="cc-eyebrow">' + t.dlgEyebrow + '</span><h2 class="cc-title" id="sv-cc-title">' + t.dlgTitle + '</h2></div>' +
      '<button type="button" class="cc-x" data-a="close" aria-label="' + t.close + '">✕</button></div>' +
      '<p class="cc-intro">' + t.dlgIntro + '</p>' +
      '<div class="cc-cat"><h3 id="sv-cc-tech">' + t.techTitle + '</h3><p>' + t.techDesc + '</p><span class="cc-meta">' + t.techMeta + '</span>' +
      '<div class="cc-ctl"><button type="button" class="cc-sw" role="switch" aria-checked="true" aria-labelledby="sv-cc-tech" disabled><span></span></button><span class="cc-state on">' + t.always + '</span></div></div>' +
      '<div class="cc-cat"><h3 id="sv-cc-an">' + t.anTitle + '</h3><p>' + t.anDesc + '</p><span class="cc-meta">' + t.anMeta + '</span>' +
      '<div class="cc-ctl"><button type="button" class="cc-sw" role="switch" aria-labelledby="sv-cc-an" data-a="toggle"><span></span></button><span class="cc-state" data-s="an"></span></div></div>' +
      '<div class="cc-dact">' +
      '<button type="button" class="cc-btn" data-a="rejectAll">' + t.rejectAll + '</button>' +
      '<button type="button" class="cc-btn" data-a="acceptAll">' + t.acceptAll + '</button>' +
      '<button type="button" class="cc-btn pri" data-a="save">' + t.save + '</button>' +
      '</div>' +
      '<p class="cc-foot"><a href="cookies.html">' + t.policy + '</a> · <a href="privacy.html">' + (lang() === 'es' ? 'Política de Privacidad' : 'Privacy Policy') + '</a></p></div>';
    sw = dlg.querySelector('[data-a="toggle"]');
    sw.onclick = function () { draftAnalytics = !draftAnalytics; syncSwitch(); };
    dlg.querySelector('[data-a="close"]').onclick = function () { closeDialog(true); };
    dlg.querySelector('[data-a="rejectAll"]').onclick = function () { save(false); };
    dlg.querySelector('[data-a="acceptAll"]').onclick = function () { save(true); };
    dlg.querySelector('[data-a="save"]').onclick = function () { save(draftAnalytics); };
    syncSwitch();
  }

  function syncSwitch() {
    if (!sw) return;
    var t = T[lang()];
    sw.setAttribute('aria-checked', draftAnalytics ? 'true' : 'false');
    var s = dlg.querySelector('[data-s="an"]');
    s.textContent = draftAnalytics ? t.on : t.off;
    s.className = 'cc-state' + (draftAnalytics ? ' on' : '');
  }

  function showBanner() { build(); banner.hidden = false; }
  function hideBanner() { if (banner) banner.hidden = true; }

  function openDialog() {
    build();
    var c = read();
    draftAnalytics = c ? c.analytics : false;
    syncSwitch();
    lastFocus = document.activeElement;
    back.hidden = false;
    banner.hidden = true;
    setTimeout(function () { var x = dlg.querySelector('[data-a="close"]'); if (x) x.focus(); }, 0);
  }
  function closeDialog(dismiss) {
    if (!back || back.hidden) return;
    back.hidden = true;
    if (dismiss && !read()) banner.hidden = false; // no decision yet: keep asking
    if (lastFocus && lastFocus.focus && document.contains(lastFocus)) lastFocus.focus();
  }

  function init() {
    build();
    if (!read()) showBanner();
    window.addEventListener('storage', function (e) {
      if (e.key === 'sv_lang') render();
      if (e.key === KEY) { var c = read(); apply(c); if (c) hideBanner(); }
    });
  }

  window.SvConsent = {
    open: openDialog,
    refresh: function () { render(); applyPalette(); },
    get: read
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
