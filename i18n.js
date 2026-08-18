/* ==========================================================================
   AMG HOOKAH CATERING - LANGUAGE SWITCH (EN / RU / ES)
   ==========================================================================

   WHY THIS IS A DOM TRANSLATOR AND NOT data-i18n KEYS ON THE MARKUP.

   The visible copy on this page comes from three places that have nothing in
   common with each other:

     1. ~250 literal strings in the index.html template,
     2. FAQS / EVENT_LABELS / the reservation rail, built inside the <x-dc>
        script and re-rendered by React on every keystroke in the form,
     3. FLAVOR_DATA and the Ember Dial in bg-switcher.js, written with
        innerHTML into hosts React does not own.

   Keying all three by hand would mean threading a language prop through a
   React component, a template, and a standalone IIFE - three plumbing jobs to
   change one word. Translating the DOM instead needs no cooperation from any
   of them: whatever any of the three paints in English, this sees and swaps,
   and the MutationObserver means it keeps working for content that does not
   exist yet when the page boots (an opened FAQ row, a turned dial, a summary
   line rebuilt mid-typing).

   THE TWO RULES FROM bg-switcher.js STILL APPLY AND ARE OBEYED HERE:
     1. Never write before the runtime boots - see amgWhenReady below, which is
        the same #dc-root poll that file uses.
     2. Never remove or replace a node React rendered. Nothing here creates or
        deletes an element: it writes nodeValue on existing text nodes and
        setAttribute on existing elements, which is exactly what amgSetText in
        bg-switcher.js was written to do for the same reason.

   ENGLISH IS NOT A DICTIONARY. It is the absence of one - the markup is
   already English, so 'en' restores originals and applies nothing. That is
   also why a missing translation is harmless: the English source stays on
   screen rather than a key or a blank.
   ========================================================================== */

(function () {
  'use strict';

  /* Order here is the order in the menu. `tag` goes on <html lang>, which is
     what a screen reader reads to pick a voice and what a browser's translate
     prompt keys off - getting it wrong makes Russian be read with an English
     phoneme set. `code` is the two letters shown next to the globe. */
  var LANGS = [
    { id: 'en', code: 'EN', tag: 'en', label: 'English' },
    { id: 'ru', code: 'RU', tag: 'ru', label: 'Русский' },
    { id: 'es', code: 'ES', tag: 'es', label: 'Español' }
  ];
  var STORE = 'amg-lang';

  /* ---------------------------------------------------------------- state */

  function supported(id) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].id === id) return id;
    return null;
  }

  /* Stored choice wins, then the browser's own preference, then English.
     The navigator sniff only ever promotes a visitor whose browser is already
     asking for ru/es - it is a first-visit default, and the moment anyone
     touches the globe the stored value takes over for good. */
  function initialLang() {
    var saved;
    try { saved = localStorage.getItem(STORE); } catch (e) { saved = null; }
    if (supported(saved)) return saved;
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return supported(String(nav).slice(0, 2).toLowerCase()) || 'en';
  }

  var current = 'en';          // what is on screen right now
  var writing = false;         // guards the observer against our own writes

  function dict() {
    var all = window.AMG_LANGS;
    return (all && all[current]) || null;
  }

  /* ----------------------------------------------------------- the lookup

     Three passes, cheapest first:

       1. exact, on whitespace-collapsed text. Covers everything static.
       2. ALL CAPS. The dial's eyebrow and the "SELECTED INGREDIENT ELEMENT"
          line are uppercased in JS from mixed-case data, so the uppercase form
          is not in any dictionary - fold it down, translate, push it back up.
       3. patterns, for the handful of strings assembled at runtime from a
          number, a name or a date. Each rule owns its own grammar; see RULES.

     A miss returns null and the caller leaves the English alone. */

  var indexCache = { lang: null, map: null, upper: null };

  function index() {
    if (indexCache.lang === current && indexCache.map) return indexCache;
    var d = dict();
    var map = Object.create(null);
    var upper = Object.create(null);
    if (d && d.strings) {
      for (var k in d.strings) {
        var key = collapse(k);
        map[key] = d.strings[k];
        upper[key.toUpperCase()] = d.strings[k];
      }
    }
    indexCache = { lang: current, map: map, upper: upper };
    return indexCache;
  }

  function collapse(s) { return String(s).replace(/\s+/g, ' ').trim(); }

  function lookup(text) {
    if (current === 'en') return null;
    var core = collapse(text);
    if (!core) return null;
    var ix = index();
    var hit = ix.map[core];
    if (hit != null) return hit;
    /* Uppercased at runtime. Only worth trying when the string really has no
       lowercase in it, so "AMG Hookah" does not take this branch. */
    if (core === core.toUpperCase() && /[A-ZА-ЯÁÉÍÓÚÑ]/.test(core)) {
      hit = ix.upper[core];
      if (hit != null) return String(hit).toUpperCase();
    }
    var d = dict();
    for (var i = 0; i < RULES.length; i++) {
      var m = core.match(RULES[i].re);
      if (m) {
        var out = RULES[i].fn(m, d, core);
        if (out != null) return out;
      }
    }
    return null;
  }

  /* --------------------------------------------------------------- plurals

     Russian needs three forms and Spanish two, and both of them show up in the
     reservation rail the moment someone types a guest count. `n` is read off
     the string, so "1 guest" and "21 guest" get the singular that English
     never had to think about. */

  function ruPlural(n, one, few, many) {
    var n10 = n % 10, n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return few;
    return many;
  }

  /* Runtime-assembled strings. Every one of these was found by reading the
     source that builds it - the file and line is named so the pairing can be
     checked rather than trusted:

       "N guests" / "N hours"        index.html, the `rail` object
       "Step N of 3 - X"             index.html, wizLabel
       "Thank you, NAME. ..."        index.html, successLine
       "30% of $X. Balance ..."      index.html, rNote
       "from $X"                     index.html, rDeposit
       "Sat, December 5"             index.html, toLocaleDateString('en-US')
       "Family 03 / 10"              bg-switcher.js, the dial hub
       "A, B, C" (flavor list)       bg-switcher.js, the attached-menu banner
  */
  var MONTHS = ['January','February','March','April','May','June','July',
                'August','September','October','November','December'];
  var DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  var RULES = [
    { re: /^([\d,]+) guests?$/,
      fn: function (m, d) {
        var n = parseInt(m[1].replace(/,/g, ''), 10);
        if (!d.units) return null;
        if (current === 'ru') return m[1] + ' ' + ruPlural(n, 'гость', 'гостя', 'гостей');
        return m[1] + ' ' + (n === 1 ? d.units.guestOne : d.units.guestMany);
      } },

    { re: /^([\d,]+)\+? hours?$/,
      fn: function (m, d, core) {
        var n = parseInt(m[1].replace(/,/g, ''), 10);
        var plus = core.indexOf('+') > -1 ? '+' : '';
        if (!d.units) return null;
        if (current === 'ru') return m[1] + plus + ' ' + ruPlural(n, 'час', 'часа', 'часов');
        return m[1] + plus + ' ' + (n === 1 ? d.units.hourOne : d.units.hourMany);
      } },

    { re: /^Step (\d+) of (\d+) — (.+)$/,
      fn: function (m, d) {
        if (!d.units || !d.units.step) return null;
        var tail = lookup(m[3]);
        return d.units.step.replace('{n}', m[1]).replace('{total}', m[2])
                           .replace('{label}', tail || m[3]);
      } },

    { re: /^Thank you, (.+?)\. We will confirm (.+?) within four hours and send a deposit link\.$/,
      fn: function (m, d) {
        if (!d.units || !d.units.thanks) return null;
        var when = lookup(m[2]) || m[2];
        return d.units.thanks.replace('{name}', m[1]).replace('{date}', when);
      } },

    { re: /^30% of (\$[\d,]+)( starting rate)?\. Balance due on the day of service\.$/,
      fn: function (m, d) {
        if (!d.units || !d.units.depositNote) return null;
        var key = m[2] ? 'depositNoteFrom' : 'depositNote';
        return d.units[key].replace('{price}', m[1]);
      } },

    { re: /^from (\$[\d,]+)$/,
      fn: function (m, d) {
        return (d.units && d.units.from) ? d.units.from.replace('{price}', m[1]) : null;
      } },

    /* The rail's date. toLocaleDateString('en-US') is left alone rather than
       re-formatted per locale on purpose: the value it prints is the one the
       form will submit, and two different renderings of the same date in the
       same session is how someone books the wrong day. Only the words change. */
    { re: /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat), ([A-Z][a-z]+) (\d+)$/,
      fn: function (m, d) {
        if (!d.months || !d.days) return null;
        var mi = MONTHS.indexOf(m[2]), di = DAYS.indexOf(m[1]);
        if (mi < 0 || di < 0) return null;
        return d.days[di] + ', ' + m[3] + ' ' + d.months[mi];
      } },

    { re: /^Family (\d+) \/ (\d+)$/,
      fn: function (m, d) {
        return (d.units && d.units.family)
          ? d.units.family.replace('{n}', m[1]).replace('{total}', m[2]) : null;
      } },

    { re: /^SELECTED INGREDIENT ELEMENT: (.+)$/,
      fn: function (m, d) {
        if (!d.units || !d.units.selectedIngredient) return null;
        var name = lookup(m[1]) || m[1];
        return d.units.selectedIngredient.replace('{name}', name).toUpperCase();
      } },

    /* "Bel-Air Estate Blend: " - the sommelier panel prints the pairing title
       and its colon as one text node and the recipe as a span beside it, so the
       title never reaches the dictionary in the form the dictionary holds it.
       Strip the colon, translate, put it back; ten pairing titles handled by
       one rule instead of ten more keys that differ from their neighbours by a
       single character. */
    { re: /^(.+):$/,
      fn: function (m) {
        var t = lookup(m[1]);
        return t == null ? null : t + ':';
      } },

    /* Calculator summary lines */
    { re: /^(\d+)\+? hookahs? \((Base|\+\$[\d,]+)\)$/,
      fn: function (m, d) {
        var n = parseInt(m[1], 10);
        var cost = m[2] === 'Base' ? (current === 'ru' ? 'База' : (current === 'es' ? 'Base' : 'Base')) : m[2];
        if (current === 'ru') return n + ' ' + ruPlural(n, 'кальян', 'кальяна', 'кальянов') + ' (' + cost + ')';
        if (current === 'es') return n + ' ' + (n === 1 ? 'cachimba' : 'cachimbas') + ' (' + cost + ')';
        return null;
      } },

    { re: /^(\d+)\+? hours? \((Base|\+\$[\d,]+)\)$/,
      fn: function (m, d) {
        var n = parseInt(m[1], 10);
        var cost = m[2] === 'Base' ? (current === 'ru' ? 'База' : (current === 'es' ? 'Base' : 'Base')) : m[2];
        if (current === 'ru') return n + ' ' + ruPlural(n, 'час', 'часа', 'часов') + ' (' + cost + ')';
        if (current === 'es') return n + ' ' + (n === 1 ? 'hora' : 'horas') + ' (' + cost + ')';
        return null;
      } },

    { re: /^(\d+) pieces? \(\+\$([\d,]+)\)$/,
      fn: function (m, d) {
        var n = parseInt(m[1], 10);
        var cost = '+$' + m[2];
        if (current === 'ru') return n + ' ' + ruPlural(n, 'шт.', 'шт.', 'шт.') + ' (' + cost + ')';
        if (current === 'es') return n + ' ' + (n === 1 ? 'ud.' : 'uds.') + ' (' + cost + ')';
        return null;
      } },

    /* The attached-menu banner joins six blend names with ", ". Translating the
       list only when EVERY part is known keeps a half-Russian, half-English
       line off the reservation form. */
    { re: /^[^,]+(?:, [^,]+){2,}$/,
      fn: function (m, d, core) {
        var parts = core.split(', ');
        var out = [];
        for (var i = 0; i < parts.length; i++) {
          var t = index().map[parts[i]];
          if (t == null) return null;
          out.push(t);
        }
        return out.join(', ');
      } }
  ];

  /* ------------------------------------------------------------ the writer

     ORIG holds the English a node started with; MARK holds what we last wrote
     to it. Together they answer the only question that matters on a re-render:
     is the text sitting in this node OUR translation, or fresh English React
     just painted over it?

       nodeValue === MARK  ->  ours, so the English is in ORIG
       anything else       ->  new English, and it becomes the new ORIG

     That is what makes this survive React. A form keystroke re-renders the
     reservation panel and puts English back in nodes we had already swapped;
     the observer sees characterData, the value no longer matches MARK, so it
     is treated as source and translated again. No diffing, no re-scan. */

  var ORIG = new WeakMap();
  var MARK = new WeakMap();

  /* The flavour panel's backdrop word is the one element on the page whose SIZE
     depends on its text. bg-switcher.js sizes it by measuring, once, on the
     frame it builds the panel - so every swap we make afterwards leaves it
     sized for the previous language. Raised here, cleared by refitMotif once
     the write has landed. */
  var motifDirty = false;

  function refitMotif() {
    if (!motifDirty) return;
    motifDirty = false;
    var host = document.getElementById('amg-flavor-content');
    // Absent if bg-switcher failed to load. The word simply keeps the size it
    // had; nothing here depends on the refit succeeding.
    if (host && typeof window.amgFitMotif === 'function') window.amgFitMotif(host);
  }

  function sourceText(node) {
    return MARK.get(node) === node.nodeValue ? ORIG.get(node) : node.nodeValue;
  }

  function applyText(node) {
    /* ############ THE GLOBE'S TWO LETTERS SELF-HEAL HERE. ############
       This node is React's - "EN" is written into the template - and React
       re-asserts template values on a render pass. paintSwitch used to be its
       only writer, and paintSwitch only runs on a language change, so anything
       that repainted the header after that left the badge reading EN over a
       Russian page, permanently. Every other node on the page survives the same
       event because the observer re-translates whatever React puts back; the
       badge did not, because it carried data-no-i18n and the walker skipped it.
       That attribute is gone and this branch replaces it. The two letters are
       not copy and have no dictionary entry - their correct value is a fact
       about the current language - so they are computed rather than looked up,
       and any write to this node now heals on the next frame. */
    var host = node.parentNode;
    if (host && host.nodeType === 1 && host.hasAttribute && host.hasAttribute('data-lang-code')) {
      var meta = LANGS.filter(function (l) { return l.id === current; })[0] || LANGS[0];
      if (node.nodeValue !== meta.code) node.nodeValue = meta.code;
      return;
    }

    var src = sourceText(node);
    if (src == null || !/\S/.test(src)) return;
    var out = src;
    if (current !== 'en') {
      /* Whitespace is preserved exactly. The dictionary is keyed on collapsed
         text, but "Common for " with its trailing space sits beside an inline
         <a> and losing that space closes the gap between two words. */
      var m = src.match(/^(\s*)([\s\S]*?)(\s*)$/);
      var hit = lookup(m[2]);
      if (hit == null) { ORIG.set(node, src); return; }
      out = m[1] + hit + m[3];
    }
    ORIG.set(node, src);
    if (node.nodeValue !== out) {
      node.nodeValue = out;
      // Its font-size was measured from the old string - see refitMotif.
      if (host && host.nodeType === 1 && host.hasAttribute && host.hasAttribute('data-motif')) motifDirty = true;
    }
    MARK.set(node, out);
  }

  /* Attributes carry real copy here: placeholders, the alt text on four event
     photographs, and the aria-labels that are the ONLY name several controls
     have (the logo link and the hamburger have no visible text at all). */
  var ATTRS = ['placeholder', 'aria-label', 'alt', 'title', 'data-screen-label'];
  var ATTR_STORE = new WeakMap();   // el -> { attr: {src, out} }

  function applyAttrs(el, only) {
    if (!el.getAttribute) return;
    var list = only ? [only] : ATTRS;
    var store = ATTR_STORE.get(el);
    if (!store) { store = Object.create(null); ATTR_STORE.set(el, store); }
    for (var i = 0; i < list.length; i++) {
      var a = list[i];
      if (!el.hasAttribute(a)) continue;
      var raw = el.getAttribute(a);
      var rec = store[a];
      var src = (rec && rec.out === raw) ? rec.src : raw;
      var out = src;
      if (current !== 'en') {
        var hit = lookup(src);
        if (hit == null) { store[a] = { src: src, out: src }; continue; }
        out = hit;
      }
      if (raw !== out) el.setAttribute(a, out);
      store[a] = { src: src, out: out };
    }
  }

  /* SCRIPT/STYLE never, TEXTAREA never (its text node is a user-editable
     value, not copy), and [data-no-i18n] is the escape hatch for anything that
     must stay as authored. */
  function skip(node) {
    var p = node.parentNode;
    while (p && p.nodeType === 1) {
      var tag = p.nodeName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' ||
          tag === 'NOSCRIPT' || p.hasAttribute('data-no-i18n')) return true;
      p = p.parentNode;
    }
    return false;
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (!skip(root)) applyText(root); return; }
    if (root.nodeType !== 1) return;
    if (root.closest && root.closest('[data-no-i18n]')) return;

    applyAttrs(root);
    var els = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for (var i = 0; i < els.length; i++) applyAttrs(els[i]);

    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n, batch = [];
    while ((n = tw.nextNode())) batch.push(n);
    for (var j = 0; j < batch.length; j++) if (!skip(batch[j])) applyText(batch[j]);
  }

  /* Every write goes through here so the observer can tell our mutations from
     everyone else's. takeRecords() is belt and braces: the flag alone loses the
     race if a record is delivered after the synchronous block ends. */
  function guarded(fn) {
    writing = true;
    try { fn(); } finally {
      if (observer) observer.takeRecords();
      writing = false;
    }
  }

  /* ------------------------------------------------------------- observer */

  var observer = null;
  var pending = null;

  function flush() {
    var jobs = pending;
    pending = null;
    if (!jobs) return;
    guarded(function () {
      for (var i = 0; i < jobs.length; i++) {
        var j = jobs[i];
        if (j.kind === 'attr') applyAttrs(j.node, j.attr);
        else if (j.node.nodeType === 3) { if (!skip(j.node)) applyText(j.node); }
        else walk(j.node);
      }
    });
    /* After the writes, not inside them: it reads clientWidth/scrollWidth and
       that would force a layout in the middle of the batch. Also covers the
       case this exists for - bg-switcher rebuilding the panel on a dial turn,
       which arrives here as a childList record rather than a language change. */
    refitMotif();
  }

  function queue(job) {
    if (!pending) { pending = []; requestAnimationFrame(flush); }
    pending.push(job);
  }

  function startObserver() {
    if (typeof MutationObserver === 'undefined' || !document.body) return;
    observer = new MutationObserver(function (records) {
      if (writing) return;
      for (var i = 0; i < records.length; i++) {
        var r = records[i];
        if (r.type === 'characterData') queue({ node: r.target });
        else if (r.type === 'attributes') queue({ kind: 'attr', node: r.target, attr: r.attributeName });
        else for (var j = 0; j < r.addedNodes.length; j++) queue({ node: r.addedNodes[j] });
      }
    });
    observer.observe(document.body, {
      subtree: true, childList: true, characterData: true,
      attributes: true, attributeFilter: ATTRS
    });
  }

  /* ------------------------------------------------------- the cross-fade

     A language swap used to be one frame: every string on screen changed at
     once, with nothing to say it had happened. What follows is the transition
     that acknowledges it - the visible text drops out, the swap lands while it
     is invisible, and it comes back up staggered from the top of the screen.

     WHY THIS IS WEB ANIMATIONS AND NOT A CLASS OR AN INLINE STYLE. Both of the
     obvious tools are props React re-asserts from the template on any render -
     the same hazard the language menu's markup block spells out - so a
     mid-transition re-render would strip the class and snap 60 elements back to
     full opacity halfway through the fade. el.animate() lives on the element's
     animation timeline, which is not part of the DOM React reconciles: it
     cannot see it, cannot serialise it and cannot clobber it. It is also the
     only one of the three that needs no cleanup if the page navigates mid-fade.

     WHY NOT FADE THE PAGE. opacity on <body> is the two-line version of this
     and it is wrong: any value below 1 makes body a containing block for
     position:fixed descendants, so the fixed header would stop being fixed for
     the length of the transition and visibly slide away with the scroll. The
     same is true of a filter or a transform on a wrapper. Fading the individual
     text elements has no such effect, and it also leaves the photographs alone
     - a language change should not make the imagery blink.

     OPACITY AND TRANSFORM ONLY. Both are compositor properties, so 60-odd
     elements animate off the main thread. `filter: blur()` was in the first
     draft and is not here: it is not composited, and on a phone it turned a
     free transition into a paint storm across every animating box.

     EVERYTHING VISIBLE FADES, not only what changes. A patchy transition where
     the prices and "AMG Hookah" hold still while the sentences around them move
     reads as a rendering fault; the whole block of text turning over reads as
     the page changing language, which is what happened. */

  var REDUCE = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var running = [];      // animations we own, so a second switch can cancel them

  function stopAnims() {
    for (var i = 0; i < running.length; i++) { try { running[i].cancel(); } catch (e) {} }
    running = [];
  }

  /* The elements that will move. Text nodes give the leaf that actually holds
     copy - a container would fade its children twice - and everything off
     screen is dropped, which is what keeps this at tens of animations rather
     than the ~500 nodes the dictionary can reach. */
  function visibleTextEls() {
    var out = [], seen = (typeof Set === 'function') ? new Set() : null;
    var vh = window.innerHeight || 800;
    var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = tw.nextNode())) {
      if (!/\S/.test(n.nodeValue) || skip(n)) continue;
      var el = n.parentElement;
      if (!el) continue;
      if (seen ? seen.has(el) : out.indexOf(el) > -1) continue;
      // The panel you just clicked stays still while the page turns over.
      if (el.closest && el.closest('[data-lang-menu]')) continue;
      var r = el.getBoundingClientRect();
      if (!r.width || !r.height || r.bottom < -40 || r.top > vh + 40) continue;
      if (seen) seen.add(el);
      out.push(el);
      if (out.length >= 400) break;   // backstop, never reached on this page
    }
    return out;
  }

  /* Top of the screen first. The delay is the element's own position in the
     viewport, so the return reads as one wave down the page rather than 60
     things arriving together - and it is capped at 140ms, because a stagger
     that outlasts the fade itself stops being a wave and becomes a wait. */
  function fadeIn(els) {
    var vh = window.innerHeight || 800;
    for (var i = 0; i < els.length; i++) {
      var top = els[i].getBoundingClientRect().top;
      var delay = Math.min(140, Math.max(0, top) / vh * 140);
      running.push(els[i].animate(
        [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }],
        { duration: 300, delay: delay, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }
      ));
    }
  }

  function animatedSwap(apply) {
    var els = visibleTextEls();
    if (!els.length) { apply(); return; }

    stopAnims();
    var outs = [];
    for (var i = 0; i < els.length; i++) {
      try {
        var a = els[i].animate(
          [{ opacity: 1 }, { opacity: 0, transform: 'translateY(-3px)' }],
          { duration: 140, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' }
        );
        running.push(a);
        if (a && a.finished && typeof a.finished.catch === 'function') {
          outs.push(a.finished.catch(function () {}));
        }
      } catch (e) {}
    }

    /* THE RACE IS NOT BELT AND BRACES. WAAPI animations are frozen in a
       background tab exactly as rAF is, so `finished` may not settle for
       minutes - and the swap is inside that callback. setTimeout keeps running
       when the tab is hidden, so it is what guarantees the language actually
       changes for someone who switched and then changed tabs. */
    var settled = false;
    var swap = function () {
      if (settled) return;
      settled = true;
      apply();
      // Drop the forwards-filled out-animations and start the return in the
      // same task: no frame is painted between the two, so nothing flashes.
      stopAnims();
      if (!REDUCE.matches) fadeIn(visibleTextEls());
    };
    if (outs.length > 0 && typeof Promise !== 'undefined' && Promise.all) {
      Promise.all(outs).then(swap).catch(swap);
    }
    setTimeout(swap, 220);
  }

  /* ------------------------------------------------------------ switching */

  /* ---------------------------------------------- lazy dictionary loading

     i18n-ru.js and i18n-es.js are ~107 KB of translation data between them
     (32 KB brotli), and they used to be two blocking <script> tags in
     index.html - downloaded by every visitor, including the large majority who
     never open the language menu. They are fetched on first use instead.

     Keyed and queued deliberately: two quick clicks on the same language must
     start ONE download, and both callers still have to be answered or the
     second click does nothing.

     onload and onerror share a handler because the failure path is already
     built. applyLang() below falls back to English when a dictionary is absent,
     so a blocked, 404'd or half-loaded file lands exactly where a missing file
     always landed. Nothing here needs its own error UI.

     The menu is built from LANGS, not from AMG_LANGS, so every language stays
     listed and clickable before its dictionary exists. */
  var DICT_SRC = { ru: 'i18n-ru.js?v=22', es: 'i18n-es.js?v=22' };
  var dictWaiters = {};

  function ensureDict(id, done) {
    var loaded = id === 'en' || !!(window.AMG_LANGS && window.AMG_LANGS[id]);
    if (loaded || !DICT_SRC[id]) { done(); return; }
    if (dictWaiters[id]) { dictWaiters[id].push(done); return; }
    dictWaiters[id] = [done];
    var s = document.createElement('script');
    var isFile = typeof window !== 'undefined' && window.location && window.location.protocol === 'file:';
    s.src = isFile ? (DICT_SRC[id] ? DICT_SRC[id].replace(/\?.*$/, '') : (id === 'ru' ? 'i18n-ru.js' : 'i18n-es.js')) : DICT_SRC[id];
    s.onload = s.onerror = function () {
      var queue = dictWaiters[id];
      dictWaiters[id] = null;
      if (queue) {
        for (var i = 0; i < queue.length; i++) queue[i]();
      }
    };
    document.head.appendChild(s);
  }

  function setLang(id, persist, animate) {
    ensureDict(id, function () { swapLang(id, persist, animate); });
  }

  function swapLang(id, persist, animate) {
    /* The transition is for a deliberate switch only. Boot has nothing to fade
       from - the page has not been painted in the old language, it has only
       just arrived - and a reduced-motion visitor gets the swap on its own. */
    if (animate && !REDUCE.matches && supported(id) && id !== current) {
      animatedSwap(function () { applyLang(id, persist); });
      return;
    }
    applyLang(id, persist);
  }

  function applyLang(id, persist) {
    if (!supported(id)) id = 'en';
    if (id !== 'en' && !(window.AMG_LANGS && window.AMG_LANGS[id])) {
      // Dictionary file missing or failed to load. Staying on English is the
      // only honest outcome; a half-translated page is worse than none.
      id = 'en';
    }
    current = id;
    if (persist) { try { localStorage.setItem(STORE, id); } catch (e) {} }

    var meta = LANGS.filter(function (l) { return l.id === id; })[0] || LANGS[0];
    document.documentElement.setAttribute('lang', meta.tag);

    guarded(function () {
      walk(document.body);
      /* Head copy is not in body, so the walk above never reaches it. Both are
         restored from the English original the page shipped with. */
      var d = dict();
      if (!HEAD_ORIG.title) {
        HEAD_ORIG.title = document.title;
        var md = document.querySelector('meta[name="description"]');
        HEAD_ORIG.desc = md ? md.getAttribute('content') : '';
      }
      document.title = (d && d.head && d.head.title) || HEAD_ORIG.title;
      var mdesc = document.querySelector('meta[name="description"]');
      if (mdesc) mdesc.setAttribute('content', (d && d.head && d.head.description) || HEAD_ORIG.desc);
    });

    refitMotif();
    paintSwitch();
  }

  var HEAD_ORIG = { title: '', desc: '' };

  /* --------------------------------------------------------------- the UI

     The markup lives in index.html so React owns it and nothing here has to
     create an element - see rule 2 at the top of this file. What is written
     from JS is exactly three things, all of them attributes React sets once at
     mount and never touches again: data-open on the panel, aria-expanded on
     the button, and aria-selected on the rows. That is the same channel
     setDrawer uses for the hamburger, and for the same reason. */

  function paintSwitch() {
    var codes = document.querySelectorAll('[data-lang-code]');
    var meta = LANGS.filter(function (l) { return l.id === current; })[0] || LANGS[0];
    for (var i = 0; i < codes.length; i++) {
      // Mutated in place rather than via textContent: on the desktop button
      // this node is React's, and replacing it is what rule 2 forbids.
      var kid = codes[i].firstChild;
      if (kid && kid.nodeType === 3) kid.nodeValue = meta.code;
      else codes[i].appendChild(document.createTextNode(meta.code));
      /* NO data-no-i18n HERE. It looks right - the two letters are a language
         tag, not prose - and it was the bug: it took this node out of the
         walker, which is the thing that repairs everything React overwrites.
         applyText owns the badge instead; see its branch. */
    }
    var picks = document.querySelectorAll('[data-lang-pick]');
    for (var j = 0; j < picks.length; j++) {
      picks[j].setAttribute('aria-selected',
        picks[j].getAttribute('data-lang-pick') === current ? 'true' : 'false');
    }
  }

  var menuOpen = false;

  function setMenu(open) {
    menuOpen = open;
    var panel = document.querySelector('[data-lang-menu]');
    var btn = document.querySelector('[data-lang-toggle]');
    if (panel) {
      if (open) {
        panel.setAttribute('data-open', '1');
        /* A popover paints in the browser's top layer, outside the rounded
           backdrop-filter surface that can clip this menu in Safari. Position
           it from the trigger because top-layer elements no longer use the
           language wrapper as their containing block. Browsers without the
           Popover API keep using the existing absolute-positioned fallback. */
        if (btn && typeof panel.showPopover === 'function') {
          var r = btn.getBoundingClientRect();
          panel.style.left = Math.round(r.left) + 'px';
          panel.style.top = Math.round(r.bottom + 10) + 'px';
          try { panel.showPopover(); } catch (e) {}
        }
      } else {
        panel.removeAttribute('data-open');
        if (typeof panel.hidePopover === 'function') {
          try { panel.hidePopover(); } catch (e) {}
        }
      }
    }
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function wire() {
    var panel = document.querySelector('[data-lang-menu]');
    if (panel && typeof panel.addEventListener === 'function') {
      /* Native light-dismiss (outside click or Escape) closes an auto popover.
         Mirror that state back to the trigger so the caret and aria-expanded
         never claim the menu is still open. */
      panel.addEventListener('toggle', function (ev) {
        if (ev.newState === 'closed' && menuOpen) {
          menuOpen = false;
          panel.removeAttribute('data-open');
          var btn = document.querySelector('[data-lang-toggle]');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    document.addEventListener('click', function (ev) {
      if (!ev.target.closest) return;

      var pick = ev.target.closest('[data-lang-pick]');
      if (pick) {
        ev.preventDefault();
        // Third argument is the cross-fade. This is the one call site that gets
        // it: a person chose, so there is something to transition between.
        setLang(pick.getAttribute('data-lang-pick'), true, true);
        setMenu(false);
        return;
      }
      var toggle = ev.target.closest('[data-lang-toggle]');
      if (toggle) { ev.preventDefault(); setMenu(!menuOpen); return; }
      if (menuOpen && !ev.target.closest('[data-lang-wrap]')) setMenu(false);
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && menuOpen) {
        setMenu(false);
        var btn = document.querySelector('[data-lang-toggle]');
        if (btn) btn.focus();
      }
    });
  }

  /* ------------------------------------------------------------ boot

     Identical poll to bg-switcher.js: support.js swaps <x-dc> for #dc-root when
     React mounts, and translating before that would put Russian into the live
     DOM the runtime is about to adopt as its template - React would then
     believe Russian is the source text and English could never come back. */
  function whenReady(fn) {
    if (document.getElementById('dc-root')) { fn(); return; }
    var tries = 0;
    (function poll() {
      if (document.getElementById('dc-root')) { fn(); return; }
      if (++tries > 600) { fn(); return; }
      requestAnimationFrame(poll);
    })();
  }

  function boot() {
    HEAD_ORIG.title = document.title;
    var md = document.querySelector('meta[name="description"]');
    HEAD_ORIG.desc = md ? md.getAttribute('content') : '';

    startObserver();
    setMenu(false);
    setLang(initialLang(), false);
  }

  /* Wire click listeners immediately so language buttons work without waiting on React poll */
  wire();

  /* Start the dictionary fetch NOW rather than letting boot() do it.

     boot() waits for #dc-root - React's mount point - which is tens of
     milliseconds away, and there is no reason a returning ru/es visitor's
     download should queue behind that. Kicking it off here puts the request in
     flight alongside React, so by the time boot() calls setLang() the file is
     usually already parsed and the swap is synchronous - no flash of English on
     a page the visitor has already told us to show in Russian.

     A no-op for the English majority: ensureDict() returns immediately when the
     language needs no file. Nothing depends on the callback - this is a warm-up,
     and boot() still calls setLang() properly whether or not it has finished. */
  ensureDict(initialLang(), function () {});

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { whenReady(boot); });
  } else {
    whenReady(boot);
  }

  /* Console handle, so a language can be checked without clicking through the
     menu: AMG_I18N.set('ru'). Deliberately not a way to add strings at runtime. */
  window.AMG_I18N = {
    // Animates, same as clicking the menu - this is the console's stand-in for
    // it. Pass false as the second argument to swap without the transition.
    set: function (id, animate) { setLang(id, true, animate !== false); },
    get: function () { return current; },
    langs: LANGS,
    /* Lists every string on screen that has no translation in the current
       language. This is the tool for finding what a copy edit has orphaned:
       add a sentence to index.html, run AMG_I18N.missing(), paste the result
       into the two dictionaries. */
    missing: function () {
      if (current === 'en') return [];
      var out = [], seen = Object.create(null);
      var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      var n;
      while ((n = tw.nextNode())) {
        if (skip(n)) continue;
        var src = collapse(sourceText(n) || '');
        if (!src || seen[src]) continue;
        seen[src] = 1;
        if (lookup(src) == null && /[A-Za-z]{2}/.test(src)) out.push(src);
      }
      return out;
    }
  };
})();
