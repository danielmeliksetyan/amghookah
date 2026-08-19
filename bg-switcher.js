/* ==========================================================================
   AMG HOOKAH CATERING - DYNAMIC BACKGROUND & UNIFIED SEAMLESS SUITE
   ========================================================================== */

(function() {
    /* ----------------------------------------------------------------------
       React co-existence helpers.

       index.html is a Design Component: support.js parses the <x-dc> block
       into a React template and owns every node inside it. Two rules follow,
       and breaking either one is what produced
       "removeChild: The node to be removed is not a child of this node":

       1. Never write before the runtime boots. It adopts the live DOM inside
          <x-dc>, so markup injected first gets baked into the template and
          React starts believing it owns it.
       2. Never remove or replace a node React rendered. Adding our own nodes
          is fine - React only ever deletes what it created - but wiping a
          container's innerHTML detaches nodes React still holds fibers for,
          and the next re-render dies trying to remove them.
       ---------------------------------------------------------------------- */

    // #dc-root is the div support.js swaps in for <x-dc> once React mounts.
    function amgWhenReady(fn) {
        if (document.getElementById('dc-root')) { fn(); return; }
        let tries = 0;
        (function poll() {
            if (document.getElementById('dc-root')) { fn(); return; }
            // Give up after ~10s and run anyway - a page where React never
            // booted still deserves its flavor hub.
            if (++tries > 600) { fn(); return; }
            requestAnimationFrame(poll);
        })();
    }

    // A child element we own outright, so our innerHTML writes never touch
    // React's children of `parent`.
    function amgJsHost(parent) {
        let host = parent.querySelector(':scope > [data-amg-js]');
        if (!host) {
            host = document.createElement('div');
            host.setAttribute('data-amg-js', '');
            parent.appendChild(host);
        }
        return host;
    }

    // `el.textContent = s` swaps out the existing text node. When React
    // rendered that node, mutate it in place instead.
    function amgSetText(el, str) {
        if (!el) return;
        const kids = el.childNodes;
        if (kids.length === 1 && kids[0].nodeType === 3) { kids[0].nodeValue = str; return; }
        if (kids.length === 0) { el.appendChild(document.createTextNode(str)); return; }
        let t = el.__amgText;
        if (!t || t.parentNode !== el) { t = el.__amgText = document.createTextNode(''); el.appendChild(t); }
        t.nodeValue = str;
    }

    // 1. Static Background Surface
    // One fixed backdrop for the whole page: the #0C0A09 base with a single
    // warm-amber glow anchored to the viewport. No canvas, no animation loop,
    // and nothing here reacts to which flavor is selected.
    const backdrop = document.createElement('div');
    backdrop.id = 'amg-bg-static';
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.style.cssText = [
        'position:fixed',
        'inset:0',
        'pointer-events:none',
        'z-index:0',
        'background:' +
            'radial-gradient(1200px 820px at 68% 12%, rgba(232,101,42,0.13), rgba(232,101,42,0) 62%),' +
            'radial-gradient(900px 700px at 12% 82%, rgba(160,50,18,0.10), rgba(160,50,18,0) 66%),' +
            '#0C0A09'
    ].join(';');
    document.body.prepend(backdrop);

    // 2. CSS Styles for Atmosphere, Clean Seamless Layout & Section Dividers
    //    (the carousel and lightbox blocks that used to live here went with the
    //     Portfolio & Gallery section - see the note in index.html's nav)
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        /* The :root token block that used to sit here is GONE - moved to the
           :root in index.html, which is where a designer looks for it.

           It redeclared --ink, --surface, --surface-hi, --line and --slab-inset
           with !important, which meant this file quietly owned the site's
           palette while index.html carried four dead values nobody could tell
           were dead. Same computed output either way; the difference is that
           the definition now lives where it can be found and edited.

           Do not reintroduce token overrides here. Style the DOM this file owns
           (the flavor hub and its panels) and let index.html own the palette. */
        html, body {
            background: #0C0A09 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        /* Dither for the backdrop above.
           Its glow ramps across roughly 20 levels of red over ~1500px, on a base
           of #0C0A09. At that shallowness each 8-bit level occupies 30-40 rows,
           so the ramp quantises into wide flat bands with a hard contour between
           them - a straight horizontal line across the full width. It reads as a
           section seam wherever one lands near a divider rule, which is what it
           was mistaken for, and looks perfectly clean where the backdrop happens
           to be flat.
           The cure for banding is noise, not geometry: ~1 level of dither moves
           each contour off a single row and scatters it.
           NORMAL blending, NOT mix-blend-mode:overlay. Overlay is the reflex
           here and it is wrong on a near-black surface: output scales with the
           backdrop, so
           at ~6% luminance the noise crushed to +/-0.3 of a level - and worse, it
           put the layer on a blended compositing path that switched OFF Chrome's
           own gradient dithering. Measured, it made the banding worse: neighbour-
           pixel variation fell from 0.54 to 0.13.
           assets/noise.png has a mean of exactly 128, so at 4% it lifts the whole
           backdrop a uniform ~5 levels - flat, therefore invisible, and it cannot
           reintroduce a contour - while its std of 30 supplies the +/-1.2 levels
           that actually break one up.
           STATIC on purpose. The old #amg-grain was animated and got disabled
           further down this file for flickering; this never moves, so that cannot
           come back. It is invisible as texture - verify by toggling it and
           watching the banding, not by looking for grain. */
        #amg-bg-static::after {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image: url("assets/noise.png");
            background-size: 128px 128px;
            opacity: 0.04;
        }

        /* Seamless Section Flow: Remove all harsh section backgrounds and abrupt cuts */
        section, footer, header, .amg-slab, .amg-footer, .amg-hero-split, div[aria-label="Credentials"] {
            background-color: transparent !important;
            background: transparent !important;
            margin-inline: 0 !important;
            position: relative;
            z-index: 1;
            border-top: none !important;
            border-bottom: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
        }

        /* Remove legacy top scroll progress bar line & heading eyebrow dash lines */
        #amg-progress {
            display: none !important;
            height: 0 !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }
        .amg-eyebrow::before,
        .amg-eyebrow::after,
        .amg-seam::before,
        .amg-seam::after {
            display: none !important;
            content: none !important;
            width: 0 !important;
        }

        /* Remove legacy gradient overlay bands that created dark horizontal stripes */
        .amg-slab::before,
        .amg-slab::after {
            display: none !important;
            content: none !important;
        }

        /* Unified Glass Cards & Panels with Subtle Ember Borders */
        .amg-card, .amg-figure, .amg-success, .amg-type, article.amg-card {
            background-color: rgba(24, 21, 18, 0.78) !important;
            border: 1px solid rgba(232, 101, 42, 0.22) !important;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border-radius: 20px !important;
        }
        .amg-card:hover, .amg-type:hover {
            border-color: rgba(255, 120, 60, 0.55) !important;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(232, 101, 42, 0.25) !important;
        }

        /* The "How It Works" step hairline USED to be forced here:
               .amg-step { border-top: 1px solid rgba(232,101,42,0.2) !important }
           It is gone, and it should not come back. Two problems with it:
             1. It was redundant. index.html already draws that border from
                var(--line), and this file redefines --line to
                rgba(232,101,42,0.18) a few rules up - so the two were within a
                hundredth of an alpha of each other and the !important bought
                nothing.
             2. !important made the step's border UNRESPONSIVE. That section is
                a connected rail now: a horizontal line above four columns on
                desktop, and a VERTICAL line down the left below 820px. The
                media query sets border-top:0 to make the turn, and this rule
                overrode it - so on a phone every step kept a stray horizontal
                rule hanging off its top, crossing the timeline at right angles.
           Style the step in index.html, where the breakpoint lives. */

        /* ==========================================
           NAV THEMES (DEFAULT + 4 UNIQUE LIVE CONCEPTS)
           ========================================== */
        body:not([data-nav-theme]) .amg-nav,
        body[data-nav-theme="default"] .amg-nav {
            padding: 16px 24px !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 60 !important;
            pointer-events: none !important;
            transition: padding 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        body:not([data-nav-theme]) .amg-nav.is-float,
        body[data-nav-theme="default"] .amg-nav.is-float {
            padding: 12px 24px !important;
        }
        body:not([data-nav-theme]) .amg-nav > nav,
        body[data-nav-theme="default"] .amg-nav > nav {
            pointer-events: auto !important;
            max-width: 1200px !important;
            margin: 0 auto !important;
            border-radius: 999px !important;
            background:
                radial-gradient(140% 190% at var(--glass-x, 18%) -85%, rgba(255,255,255,.32) 0%, rgba(255,255,255,.09) 35%, transparent 58%),
                linear-gradient(125deg, rgba(255,255,255,.09), rgba(255,255,255,.018) 46%, rgba(0,0,0,.18)),
                var(--liquid-glass) !important;
            backdrop-filter: blur(var(--liquid-glass-blur)) saturate(1.65) contrast(1.04) !important;
            -webkit-backdrop-filter: blur(var(--liquid-glass-blur)) saturate(1.65) contrast(1.04) !important;
            border: 1px solid var(--liquid-glass-edge) !important;
            box-shadow: 0 18px 46px -18px rgba(0,0,0,.86),
                        0 4px 12px -7px rgba(0,0,0,.70),
                        inset 0 1px 0 rgba(255,255,255,.42),
                        inset 0 -1px 0 rgba(255,255,255,.07),
                        0 0 28px rgba(0,0,0,.34) !important;
            padding: 10px 24px !important;
            position: relative !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 24px !important;
            isolation: isolate !important;
            transition: border-color .35s cubic-bezier(0.16,1,0.3,1), box-shadow .35s cubic-bezier(0.16,1,0.3,1) !important;
        }
        body:not([data-nav-theme]) .amg-nav > nav:hover,
        body[data-nav-theme="default"] .amg-nav > nav:hover {
            border-color: rgba(255,255,255,.28) !important;
            box-shadow: 0 22px 54px -18px rgba(0,0,0,.90),
                        0 4px 14px -7px rgba(0,0,0,.76),
                        inset 0 1px 0 rgba(255,255,255,.54),
                        inset 0 -1px 0 rgba(255,255,255,.09),
                        0 0 38px rgba(0,0,0,.44) !important;
        }
        body:not([data-nav-theme]) .amg-nav > nav::before,
        body:not([data-nav-theme]) .amg-nav > nav::after,
        body[data-nav-theme="default"] .amg-nav > nav::before,
        body[data-nav-theme="default"] .amg-nav > nav::after {
            content: '' !important;
            position: absolute !important;
            border-radius: inherit !important;
            pointer-events: none !important;
            display: block !important;
        }
        body:not([data-nav-theme]) .amg-nav > nav::before,
        body[data-nav-theme="default"] .amg-nav > nav::before {
            inset: 1px !important;
            z-index: 0 !important;
            box-shadow: inset 1px 1px 0 rgba(255,255,255,.16), inset -1px -1px 0 rgba(255,255,255,.035) !important;
        }
        body:not([data-nav-theme]) .amg-nav > nav::after,
        body[data-nav-theme="default"] .amg-nav > nav::after {
            inset: -55% -12% !important;
            z-index: 1 !important;
            background: linear-gradient(108deg, transparent 31%, rgba(255,255,255,.15) 43%, rgba(255,255,255,.025) 51%, transparent 63%) !important;
            transform: translateX(-18%) !important;
            opacity: .68 !important;
            transition: transform .7s cubic-bezier(0.16,1,0.3,1), opacity .3s ease !important;
        }
        body:not([data-nav-theme]) .amg-nav > nav:hover::after,
        body[data-nav-theme="default"] .amg-nav > nav:hover::after {
            transform: translateX(12%) !important;
            opacity: .92 !important;
        }
        body:not([data-nav-theme]) .amg-nav > nav > *,
        body[data-nav-theme="default"] .amg-nav > nav > * { position: relative !important; z-index: 2 !important; }

        /* CONCEPT 1: ARCHITECTURAL MINIMALIST DOCK */
        body[data-nav-theme="dock"] .amg-nav {
            padding: 16px 24px !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 60 !important;
            pointer-events: none !important;
            transition: padding 0.3s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        body[data-nav-theme="dock"] .amg-nav.is-float {
            padding: 10px 24px !important;
        }
        body[data-nav-theme="dock"] .amg-nav > nav {
            pointer-events: auto !important;
            max-width: 1200px !important;
            margin: 0 auto !important;
            border-radius: 12px !important;
            background: rgba(14, 12, 10, 0.92) !important;
            backdrop-filter: blur(24px) saturate(1.2) !important;
            -webkit-backdrop-filter: blur(24px) saturate(1.2) !important;
            border: 1px solid rgba(255, 255, 255, 0.09) !important;
            box-shadow: 0 18px 42px -12px rgba(0, 0, 0, 0.88), inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;
            padding: 10px 22px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            position: relative !important;
            overflow: visible !important;
            transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
        body[data-nav-theme="dock"] .amg-nav > nav::before,
        body[data-nav-theme="dock"] .amg-nav > nav::after {
            display: none !important;
        }
        body[data-nav-theme="dock"] .amg-nav > nav:hover {
            border-color: rgba(232, 101, 42, 0.4) !important;
            box-shadow: 0 22px 50px -12px rgba(0, 0, 0, 0.94), 0 0 28px rgba(232, 101, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.18) !important;
        }
        body[data-nav-theme="dock"] .amg-nav-center a {
            font-size: 11.5px !important;
            letter-spacing: 0.12em !important;
            text-transform: uppercase !important;
            font-weight: 500 !important;
            color: #B8AFA3 !important;
            display: inline-flex !important;
            align-items: center !important;
            transition: color 200ms ease !important;
        }
        body[data-nav-theme="dock"] .amg-nav-center a:hover {
            color: #F5F1EA !important;
        }
        body[data-nav-theme="dock"] .amg-nav-center a [data-underline] {
            display: none !important;
        }
        body[data-nav-theme="dock"] .amg-nav-center a::before,
        body[data-nav-theme="dock"] .amg-nav-center a::after {
            content: '';
            display: inline-block;
            opacity: 0;
            color: #E8652A;
            transition: opacity 180ms ease, transform 180ms ease;
            font-weight: 400;
        }
        body[data-nav-theme="dock"] .amg-nav-center a::before {
            content: '[';
            margin-right: 4px;
            transform: translateX(4px);
        }
        body[data-nav-theme="dock"] .amg-nav-center a::after {
            content: ']';
            margin-left: 4px;
            transform: translateX(-4px);
        }
        body[data-nav-theme="dock"] .amg-nav-center a:hover::before,
        body[data-nav-theme="dock"] .amg-nav-center a:hover::after {
            opacity: 1;
            transform: translateX(0);
        }
        body[data-nav-theme="dock"] .amg-nav-cta {
            border-radius: 8px !important;
            background: linear-gradient(135deg, #E8652A, #C84E18) !important;
            box-shadow: 0 4px 18px rgba(232, 101, 42, 0.4) !important;
            border: 1px solid rgba(255, 255, 255, 0.18) !important;
            font-weight: 600 !important;
            letter-spacing: 0.05em !important;
            text-transform: uppercase !important;
            font-size: 11.5px !important;
            padding: 8px 18px !important;
        }

        /* CONCEPT 2: SEGMENTED MODULAR PODS */
        body[data-nav-theme="pods"] .amg-nav {
            padding: 16px 24px !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 60 !important;
            pointer-events: none !important;
            transition: padding 0.3s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        body[data-nav-theme="pods"] .amg-nav.is-float {
            padding: 10px 24px !important;
        }
        body[data-nav-theme="pods"] .amg-nav > nav {
            pointer-events: auto !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            padding: 0 !important;
            max-width: 1220px !important;
            margin: 0 auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 16px !important;
            overflow: visible !important;
        }
        body[data-nav-theme="pods"] .amg-nav > nav::before,
        body[data-nav-theme="pods"] .amg-nav > nav::after {
            display: none !important;
        }
        body[data-nav-theme="pods"] .amg-nav-left,
        body[data-nav-theme="pods"] .amg-nav-center,
        body[data-nav-theme="pods"] .amg-nav-right {
            background: rgba(14, 12, 10, 0.92) !important;
            border: 1px solid rgba(255, 255, 255, 0.09) !important;
            border-radius: 12px !important;
            backdrop-filter: blur(24px) saturate(1.2) !important;
            -webkit-backdrop-filter: blur(24px) saturate(1.2) !important;
            box-shadow: 0 14px 34px -10px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.12) !important;
            transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        body[data-nav-theme="pods"] .amg-nav-left {
            padding: 6px 16px !important;
        }
        body[data-nav-theme="pods"] .amg-nav-center {
            padding: 10px 24px !important;
            gap: 28px !important;
        }
        body[data-nav-theme="pods"] .amg-nav-right {
            padding: 6px 8px 6px 14px !important;
        }
        body[data-nav-theme="pods"] .amg-nav-left:hover,
        body[data-nav-theme="pods"] .amg-nav-center:hover,
        body[data-nav-theme="pods"] .amg-nav-right:hover {
            border-color: rgba(232, 101, 42, 0.35) !important;
            box-shadow: 0 18px 42px -10px rgba(0,0,0,0.92), 0 0 20px rgba(232, 101, 42, 0.07), inset 0 1px 0 rgba(255,255,255,0.18) !important;
        }
        body[data-nav-theme="pods"] .amg-nav-cta {
            border-radius: 8px !important;
        }

        /* CONCEPT 3: DUAL-TIER CONCIERGE MASTHEAD */
        body[data-nav-theme="masthead"] .amg-nav {
            padding: 0 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 60 !important;
            pointer-events: none !important;
        }
        body[data-nav-theme="masthead"] .amg-concierge-bar {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            padding: 7px 36px;
            background: #080706;
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
            font-size: 10.5px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #8A8075;
            transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
            pointer-events: auto;
            max-height: 40px;
        }
        body[data-nav-theme="masthead"].is-float .amg-concierge-bar,
        body[data-nav-theme="masthead"] .amg-nav.is-float .amg-concierge-bar {
            max-height: 0;
            padding-top: 0;
            padding-bottom: 0;
            opacity: 0;
            overflow: hidden;
            border-bottom-color: transparent;
        }
        body[data-nav-theme="masthead"] .amg-nav > nav {
            pointer-events: auto !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 12px 36px !important;
            background: rgba(10, 9, 8, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border-bottom: 1px solid rgba(232, 101, 42, 0.22) !important;
            border-left: none !important;
            border-right: none !important;
            border-top: none !important;
            box-shadow: 0 16px 40px rgba(0,0,0,0.88) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
        }
        body[data-nav-theme="masthead"] .amg-nav > nav::before,
        body[data-nav-theme="masthead"] .amg-nav > nav::after {
            display: none !important;
        }
        body[data-nav-theme="masthead"] .amg-nav-center a {
            display: inline-flex !important;
            align-items: center !important;
            font-size: 12px !important;
            letter-spacing: 0.08em !important;
            text-transform: uppercase !important;
            color: #B8AFA3 !important;
        }
        body[data-nav-theme="masthead"] .amg-nav-center a:not(:last-child)::after {
            content: '◆';
            font-size: 5px;
            color: #E8652A;
            opacity: 0.6;
            margin-left: 28px;
            display: inline-block;
            pointer-events: none;
        }
        body[data-nav-theme="masthead"] .amg-nav-cta {
            border-radius: 4px !important;
            border: 1px solid #E8652A !important;
            background: rgba(232, 101, 42, 0.14) !important;
            color: #F5F1EA !important;
            box-shadow: 0 0 16px rgba(232, 101, 42, 0.2) !important;
            text-transform: uppercase !important;
            letter-spacing: 0.06em !important;
            font-size: 11.5px !important;
        }
        body[data-nav-theme="masthead"] .amg-nav-cta:hover {
            background: #E8652A !important;
            color: #fff !important;
            box-shadow: 0 0 24px rgba(232, 101, 42, 0.45) !important;
        }

        /* CONCEPT 4: ARCHITECTURAL RAZOR RIBBON */
        body[data-nav-theme="razor"] .amg-nav {
            padding: 0 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 60 !important;
            pointer-events: none !important;
        }
        body[data-nav-theme="razor"] .amg-nav > nav {
            pointer-events: auto !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 14px 36px !important;
            background: rgba(9, 8, 7, 0.96) !important;
            backdrop-filter: blur(16px) !important;
            -webkit-backdrop-filter: blur(16px) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
            border-top: none !important;
            border-left: none !important;
            border-right: none !important;
            box-shadow: 0 1px 0 0 rgba(232, 101, 42, 0.45), 0 16px 40px rgba(0,0,0,0.9) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
        }
        body[data-nav-theme="razor"] .amg-nav > nav::before,
        body[data-nav-theme="razor"] .amg-nav > nav::after {
            display: none !important;
        }
        body[data-nav-theme="razor"] .amg-nav-center a {
            font-size: 11.5px !important;
            letter-spacing: 0.12em !important;
            text-transform: uppercase !important;
            font-weight: 500 !important;
            color: #B8AFA3 !important;
        }
        body[data-nav-theme="razor"] .amg-nav-center a:hover {
            color: #F5F1EA !important;
        }
        body[data-nav-theme="razor"] .amg-nav-cta {
            border-radius: 0 !important;
            border: 1px solid #E8652A !important;
            background: #E8652A !important;
            color: #fff !important;
            text-transform: uppercase !important;
            font-size: 11px !important;
            letter-spacing: 0.08em !important;
            box-shadow: 0 4px 16px rgba(232, 101, 42, 0.35) !important;
        }

        @media (max-width: 1199px) {
            .amg-mobile-price-bar {
                border: 1px solid transparent !important;
                border-radius: 999px !important;
                background: transparent !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                box-shadow: none !important;
                position: fixed !important;
                overflow: visible !important;
                isolation: isolate !important;
            }
            .amg-mobile-price-bar::before,
            .amg-mobile-price-bar::after {
                content: '' !important;
                position: absolute !important;
                border-radius: inherit !important;
                pointer-events: none !important;
            }
            .amg-mobile-price-bar::before {
                inset: 0 !important;
                z-index: 0 !important;
                border: 1px solid transparent !important;
                background:
                    linear-gradient(112deg, rgba(21,19,17,.985), rgba(13,12,11,.975)) padding-box,
                    linear-gradient(102deg, rgba(245,241,234,.14), rgba(245,241,234,.07) 32%, rgba(232,101,42,.82) 68%, rgba(245,241,234,.10)) border-box !important;
                backdrop-filter: blur(14px) saturate(1.08) !important;
                -webkit-backdrop-filter: blur(14px) saturate(1.08) !important;
                box-shadow:
                    0 20px 48px -25px rgba(0,0,0,.96),
                    0 0 30px rgba(232,101,42,.08),
                    inset 0 1px 0 rgba(255,255,255,.055),
                    inset -1px -1px 0 rgba(0,0,0,.24) !important;
            }
            .amg-mobile-price-bar::after {
                inset: auto 14% -1px !important;
                height: 1px !important;
                z-index: 1 !important;
                background: linear-gradient(90deg, transparent, rgba(232,101,42,.92), transparent) !important;
                box-shadow: 0 0 10px rgba(232,101,42,.58) !important;
            }
            .amg-mobile-price-bar > * { position: relative !important; z-index: 2 !important; }
        }

        @media (max-width: 899px) {
            .amg-nav { padding: 10px !important; }
            .amg-nav.is-float { padding: 8px 10px !important; }
            .amg-nav > nav { padding: 8px 10px 8px 14px !important; border-radius: 28px !important; }
            .amg-navtoggle {
                background: rgba(255,255,255,.075) !important;
                border-color: rgba(255,255,255,.16) !important;
                box-shadow: inset 0 1px 0 rgba(255,255,255,.13) !important;
            }
        }

        @media (prefers-reduced-transparency: reduce) {
            .amg-nav > nav, .amg-mobile-price-bar {
                background: rgba(18,16,14,.94) !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }
        }

        /* ---- legibility on glass ----
           The lens trades opacity for refraction, so unlike the old 58% ink
           panel this rail has no guaranteed dark floor - what sits behind the
           links is whatever the page happens to be showing, and on this site
           that includes lantern-lit photography. The nav links were --smoke
           (#B8AFA3) at weight 400 with no shadow, which is a light grey over an
           unpredictable bright field: the worst combination available.

           Three changes, cheapest first, because the goal is to keep the glass:
             1. Colour to --bone and weight to 500. More mass and more contrast
                without changing the type's voice.
             2. A TEXT SHADOW, which is the part that actually does the work.
                Light text over a variable backdrop cannot be fixed by making it
                lighter - it needs its own dark edge to sit on. Two layers: a
                tight 2px for definition against detail, and a wide soft 12px
                that acts as a local scrim over blown-out highlights.
             3. Only then a wash on the glass itself - 22% ink, well under the
                58% this replaced. Enough to give the whole rail a floor, little
                enough that the displacement is still plainly visible.

           Hover moves to ember rather than bone, because bone is now the
           resting colour and the old hover had nothing left to say.

           :not(.amg-btn) IS NOT TIDINESS - WITHOUT IT THE RESERVE PILL HAS NO
           LABEL. Everything above is reasoning about text with no background of
           its own, floating over whatever photograph the page is showing. The
           header's Reserve pill is an <a> inside .amg-nav > nav too, and it is
           the exact opposite case: a solid ember fill that carries its own
           contrast and sets color:var(--ink) inline for it. These rules were
           reaching it anyway, and !important beats an inline style, so:
             - at rest the near-black label was repainted --bone over #E8652A,
               about 3:1, plus a black text-shadow ringing type on orange;
             - ON HOVER the label went to --ember-hi (#FF783C) at the same moment
               .amg-btn-primary:hover takes the BACKGROUND to --ember-hi. Same
               colour, foreground and background. 1:1. The word Reserve did not
               fade on hover, it ceased to exist - what is left in a screenshot
               is the text-shadow's dark halo around letters that are not there.
           A filled button is the one thing on this rail that must not be told
           what colour its text is, so it is excluded rather than special-cased
           back to ink further down: one rule, no second writer to drift. */
        .amg-nav-left {
            display: flex !important;
            align-items: center !important;
            gap: 16px !important;
            z-index: 3 !important;
            flex: 0 0 auto !important;
        }
        .amg-nav-center,
        div[data-navlinks="1"] {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            display: flex !important;
            gap: 28px !important;
            align-items: center !important;
            z-index: 2 !important;
        }
        .amg-nav-right {
            display: flex !important;
            align-items: center !important;
            gap: 14px !important;
            margin-left: auto !important;
            z-index: 3 !important;
            flex: 0 0 auto !important;
        }
        div[data-navlinks="1"] a {
            color: var(--bone) !important;
            font-family: var(--f-body) !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            letter-spacing: 0.04em !important;
            text-decoration: none !important;
            padding: 6px 0 !important;
            position: relative !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65), 0 0 12px rgba(0, 0, 0, 0.45) !important;
            transition: color 0.2s ease !important;
        }
        div[data-navlinks="1"] a:hover {
            color: var(--ember-hi) !important;
        }
        div[data-navlinks="1"] a:hover span[data-underline="1"] {
            transform: scaleX(1) !important;
        }
        /* The mark carries its own weight but sits on the left */
        .amg-nav .amg-lockup {
            display: inline-flex !important;
            align-items: center !important;
            position: relative !important;
            left: auto !important;
            transform: none !important;
            filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.6)) !important;
        }
        .amg-nav .amg-lockup img {
            width: 32px !important;
            height: 32px !important;
        }
        .amg-langbtn {
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
            background: rgba(255, 255, 255, 0.08) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border: 1px solid rgba(255, 255, 255, 0.16) !important;
            border-radius: 999px !important;
            padding: 7px 13px !important;
            color: var(--bone) !important;
            font-size: 12.5px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
            transition: all 0.2s ease !important;
        }
        .amg-langbtn:hover {
            background: rgba(232, 101, 42, 0.22) !important;
            border-color: var(--ember-hi) !important;
            color: #fff !important;
        }
        .amg-nav-cta,
        [data-navpill] {
            display: inline-flex !important;
            align-items: center !important;
            gap: 8px !important;
            background: var(--ember) !important;
            color: var(--ink) !important;
            font-family: var(--f-body) !important;
            font-size: 13.5px !important;
            font-weight: 600 !important;
            padding: 10px 22px !important;
            border-radius: 999px !important;
            border: 1px solid var(--ember) !important;
            box-shadow: 0 4px 22px rgba(232, 101, 42, 0.45) !important;
            text-shadow: none !important;
            text-decoration: none !important;
            opacity: 1 !important;
            pointer-events: auto !important;
            scale: 1 !important;
            cursor: pointer !important;
            will-change: scale, box-shadow !important;
            transition: background 240ms var(--ease), border-color 240ms var(--ease), color 240ms var(--ease), box-shadow 240ms var(--ease), scale 260ms cubic-bezier(.34,1.56,.64,1) !important;
        }
        .amg-nav-cta:hover,
        [data-navpill]:hover {
            background: var(--ember-hi) !important;
            border-color: var(--ember-hi) !important;
            color: var(--ink) !important;
            scale: 1.055 !important;
            filter: none !important;
            box-shadow: var(--glow-ember) !important;
        }
        .amg-nav-cta:active,
        [data-navpill]:active {
            scale: .97 !important;
        }
        .amg-nav-cta .amg-arrow,
        [data-navpill] .amg-arrow {
            transition: translate 300ms var(--ease-out) !important;
        }
        .amg-nav-cta:hover .amg-arrow,
        [data-navpill]:hover .amg-arrow {
            translate: 3px 0 !important;
        }

        /* Footer: Completely Seamless with Main Screen */
        .amg-footer, footer {
            background: transparent !important;
            border: none !important;
            border-top: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            margin-inline: 0 !important;
        }

        /* Remove legacy animated background blur blobs and flickering film grain layer */
        #amg-grain {
            display: none !important;
            animation: none !important;
        }
        div[aria-hidden="true"][style*="blur"],
        div[style*="driftA"],
        div[style*="driftB"],
        div[style*="driftC"] {
            display: none !important;
        }

        /* ==========================================
           BRANDED AMG LOGO SECTION DIVIDER LINES (PURE CSS - ZERO DOM MUTATIONS)
           ========================================== */
        section:not(#top), footer {
            position: relative !important;
            overflow: visible !important;
        }
        section:not(#top)::before, footer::before {
            content: '' !important;
            display: block !important;
            position: absolute !important;
            top: 50px !important;
            left: 50% !important;
            translate: none !important;
            transform: translate(-50%, -50%) !important;
            width: 88% !important;
            max-width: 1100px !important;
            height: 2px !important;
            background: linear-gradient(90deg,
                transparent 0%,
                rgba(232, 101, 42, 0.25) 15%,
                rgba(255, 120, 60, 0.85) calc(50% - 26px),
                rgba(255, 120, 60, 0) calc(50% - 17px),
                rgba(255, 120, 60, 0) calc(50% + 17px),
                rgba(255, 120, 60, 0.85) calc(50% + 26px),
                rgba(232, 101, 42, 0.25) 85%,
                transparent 100%) !important;
            filter: drop-shadow(0 0 8px rgba(232, 101, 42, 0.6)) !important;
            z-index: 10 !important;
        }
        section:not(#top)::after, footer::after {
            content: '' !important;
            display: flex !important;
            position: absolute !important;
            top: 50px !important;
            left: 50% !important;
            translate: none !important;
            transform: translate(-50%, -50%) !important;
            width: 32px !important;
            height: 32px !important;
            border-radius: 50% !important;
            background: transparent url("assets/logo-icon.png") center/18px 18px no-repeat !important;
            border: 1.5px solid rgba(255, 120, 60, 0.65) !important;
            box-shadow: 0 0 18px rgba(232, 101, 42, 0.6) !important;
            z-index: 11 !important;
        }

        /* ==========================================
           THE EMBER DIAL — flavor family selector
           ==========================================
           This block replaced .amg-flavor-tab (the ten nav pills) and the
           .amg-taste-* meters that went with the old card. Both were only ever
           used by switchFlavorTab below, which no longer emits either.

           Two colours drive everything: --amg-fc is the current family's own
           hue and --amg-fc-soft is the same colour at 50% for the washes.
           switchFlavorTab sets them on #flavors, so the arc, the needle, the
           coal, the meters and the blend bullets all change together and no
           rule here hardcodes an accent. */
        .amg-dial-stage {
            display: grid;
            grid-template-columns: minmax(300px, 1fr) minmax(290px, 1fr);
            gap: clamp(28px, 4vw, 60px);
            align-items: center;
            max-width: 1050px;
            margin: 0 auto 44px;
            text-align: left;
        }
        /* 1140, RAISED FROM 920. Two columns of a 1050px grid put the dial in
           ~496px at 1440 and the disc is 470, which works only because the
           family names are allowed to hang into the 58px gutter. Narrow the
           window and that column closes - 456px at 1000, 437px at 960 - while
           the names do not shrink with it (see --amg-D below), and the disc has
           nowhere left to go but through the left edge of the page. Stacked,
           the dial gets the full 1050 instead of half of it and holds its drawn
           size of 470 the whole way down, which is the opposite of the usual
           trade: the narrow layout here is the one that gives the component
           MORE room.

           1140 IS WHERE THE NAMES GET THE PAGE'S OWN PADDING BACK, measured
           rather than picked. Below 1098 the stage is flush against the 24px
           section padding; above it, the leftover splits either side. At 1140
           that leftover is 45px, the column is 502, and a 470 disc centred in
           it leaves the outermost name 23.6px clear of the window - the same
           24px of air every other section is padded by. At 1101 the same sum
           gives 4px, which is not clipped but reads as touching.

           This is 40px off the event rail's 1100 and they are not meant to
           match. Two components, two different constraints, each measured; a
           shared round number would be tidier to read and wrong for one of
           them. Nothing else in either stylesheet changes state in the gap. */
        @media (max-width: 1140px) {
            .amg-dial-stage { grid-template-columns: 1fr; gap: 38px; }

            /* The summary keeps its column's measure even though it no longer
               has a column. One row of a 1fr grid is as wide as the stage, so
               unstacked this panel went from the 496px it is drawn at to 902px
               at a 950 viewport: a 9.5px eyebrow and a one-line description
               stretched across the full page, hard against the left padding,
               under a header that is centred. 496 is not a new number, it is
               the width the right-hand column gives it at 1440, and centring it
               puts it under the dial rather than beside where the dial used to
               be. Below ~544px of viewport the cap is inert and the phones are
               untouched. */
            #amg-flavor-summary { max-width: 496px; margin-left: auto; margin-right: auto; }
        }

        /* THE DIAL IS SIZED BY THIS BOX, NOT BY THE WINDOW - that is what the
           container-type is for and it is the whole fix. See --amg-D below. */
        #amg-flavor-dial { container-type: inline-size; }

        #amg-flavor-dial [data-amg-js] {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .amg-dial {
            /* WAS min(470px, 86vw), AND THE UNIT WAS THE BUG. The dial does not
               live in the window, it lives in the left column of
               .amg-dial-stage - minmax(300px,1fr) of a 1050px grid. That column
               falls under 470px once the viewport is below about 1030px, but
               86vw does not bite until the viewport is below 546px. Everything
               between those two numbers drew a 470px disc into a column too
               narrow to hold it: measured at a 948px viewport, 470px of dial in
               a 426px column, and CREAM, TEA and BERRY sliced off at the edge.
               The stage stacking at 920px does not rescue it either - that only
               moves the same too-wide disc into a wider column further down.

               100cqw is the column, so the guard now measures the thing that
               was actually constraining it. The stage stacking at 1100 above is
               what does most of the work; this is the floor underneath it, and
               it is the only reason the phones are covered - they had a quieter
               version of the same fault, 86vw of a 375px screen being 322px of
               disc plus 75px of names against 375px of glass.

               26px, AND THE SMALL NUMBER IS THE POINT. The names sit ~37px
               beyond the rim on each side - placed by clearance measured off
               their own glyphs, so the overhang is a constant at every D
               (.amg-dial-txt is a flat 9.5px at every size) rather than a
               ratio. But the section already carries 24px of padding that the
               names are welcome to hang into; only the 13px past that is a
               problem, doubled for both sides. Subtracting the whole 75px
               instead was measurably wrong: it holds at every width, but it
               also reads the desktop gutter as unavailable and quietly took the
               1440px disc from 470 to 416. */
            --amg-D: min(470px, calc(100cqw - 26px));
            position: relative;
            width: var(--amg-D);
            height: var(--amg-D);
            flex: none;
            user-select: none;
            outline: none;
            -webkit-tap-highlight-color: transparent;
        }
        /* Machined rim: a conic sheen masked down to a 2%-wide annulus on the
           outer edge, so the bezel catches light like turned metal instead of
           reading as a 1px stroke. Without the mask it fills the whole disc and
           drowns the coal. */
        .amg-dial::before {
            content: '';
            position: absolute; inset: 0; border-radius: 50%;
            pointer-events: none; z-index: 1;
            background: conic-gradient(from 200deg,
                rgba(245,241,234,0.13), rgba(232,101,42,0.20) 20%, rgba(12,10,9,0) 37%,
                rgba(245,241,234,0.09) 54%, rgba(232,101,42,0.16) 73%, rgba(12,10,9,0) 91%,
                rgba(245,241,234,0.13));
            -webkit-mask: radial-gradient(circle, transparent 0 47.4%, #000 48.2% 49.6%, transparent 50.4%);
                    mask: radial-gradient(circle, transparent 0 47.4%, #000 48.2% 49.6%, transparent 50.4%);
        }
        .amg-dial::after {
            content: '';
            position: absolute; inset: 6%; border-radius: 50%;
            pointer-events: none; z-index: 0;
            box-shadow: 0 40px 90px rgba(0, 0, 0, 0.55);
        }
        /* The section behind this is --surface, not black, so the coal needs
           something of its own to bleed into. */
        .amg-dial-aura {
            position: absolute; inset: -16%; border-radius: 50%;
            pointer-events: none; z-index: 0; opacity: 0.5;
            background: radial-gradient(circle, var(--amg-fc-soft, rgba(232,101,42,0.4)), transparent 62%);
            filter: blur(44px);
            transition: background 0.7s linear;
        }
        /* the lit seat under 12 o'clock, where the chosen family comes to rest */
        .amg-dial-seat {
            position: absolute; left: 50%;
            top: calc(var(--amg-D) * 0.045);
            width: calc(var(--amg-D) * 0.34);
            height: calc(var(--amg-D) * 0.17);
            transform: translateX(-50%);
            z-index: 1; pointer-events: none; filter: blur(14px); opacity: 0.16;
            background: radial-gradient(50% 60% at 50% 28%, var(--amg-fc, #E8652A), transparent 72%);
            transition: background 0.6s linear;
        }

        .amg-dial-bezel { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; z-index: 1; }
        .amg-dial-edge { fill: none; stroke: #382F27; stroke-width: 0.22; transition: stroke 0.4s; }
        .amg-dial:focus-visible .amg-dial-edge { stroke: var(--amg-fc, #E8652A); }
        .amg-dial-inner { fill: none; stroke: rgba(56,47,39,0.55); stroke-width: 0.15; stroke-dasharray: 0.6 1.6; }
        .amg-dial-tick { stroke: rgba(138,128,117,0.30); stroke-width: 0.16; stroke-linecap: round; }
        .amg-dial-tick.maj { stroke: rgba(184,175,163,0.55); stroke-width: 0.3; }
        .amg-dial-arc {
            fill: none; stroke: var(--amg-fc, #E8652A); stroke-width: 0.5; stroke-linecap: round;
            filter: drop-shadow(0 0 2px var(--amg-fc, #E8652A));
            transition: stroke-dashoffset 420ms cubic-bezier(0.22,1,0.36,1), stroke 0.6s linear;
        }

        /* ############ 420ms, DOWN FROM 950. THIS IS THE RESPONSIVENESS.
           ############
           The ring is the thing you are actually turning, so its duration IS
           the dial's response as far as a hand is concerned - and at 950ms a
           single notch took just under a second to settle. No input change can
           be felt through that: the wheel handler was already stepping on the
           first event of a flick, and it still read as lag.
           420 with the same curve keeps the weighted, geared feel - it is a
           heavy ring, not a toggle - while landing inside the ~500ms where a
           motion still reads as a direct response to the hand rather than as an
           animation being played at you. The arc above matches it exactly: they
           are one movement seen twice, and any daylight between them shows.
           The site's own control transitions sit at 240-440ms; this is now in
           that family instead of three times it. */
        .amg-dial-ring {
            position: absolute; inset: 0; z-index: 2;
            transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        /* ---- ring geometry ----
           Every part of a family sits on its own RAY: the dot at one radius,
           the name at another, both at exactly j x 36deg. That is the only way
           either can line up with the engraving, whose long ticks are also at
           36deg steps.

           What was here before stacked the dot above the name inside one
           upright box, which adds a constant SCREEN-space offset to a point on
           a circle - and a circle plus a fixed downward offset is a circle
           shifted down, not a circle. Measured on the old build: the dots ran
           from 185px at the top to 164px at the bottom and sat up to 3deg off
           their own tick, the names up to 6deg. That was the lopsidedness. */
        .amg-dial-node {
            position: absolute; left: 50%; top: 50%;
            width: 0; height: 0; overflow: visible;
            background: none; border: 0; padding: 0;
            font-family: inherit; color: inherit; cursor: pointer;
            transition: transform 950ms cubic-bezier(0.22, 1, 0.36, 1);
            -webkit-tap-highlight-color: transparent;
        }
        /* There is no per-family dot any more, and its absence IS the fix.

           A dot on the ray needs clear space between itself and its name, and
           that space cannot be constant while the name stays horizontal: a word
           lies ACROSS its ray at 12 o'clock (about 6px of reach) and ALONG it at
           3 o'clock (about 30px), so the same 21px offset read as generous at
           the top and as nothing at the sides. Measured on the previous build,
           the clearance was 6.9px at citrus and 7.4px at tea but exactly 0.0px
           at orchard, spiced, dessert and berry - the dot sat inside the word.

           The dot was also saying what the engraving already says: a long tick
           points at every family, which is what they were aligned to. So the
           name is now the only thing on the ring, it carries its family's own
           colour, and it is placed by clearance rather than by radius. */
        /* Centred on the anchor, so the name straddles its ray. The padding is
           the click target and nothing else - .amg-dial-txt is what gets
           measured, so the clearance is computed off the glyphs rather than off
           an invisible hit area. */
        .amg-dial-lbl {
            position: absolute; left: 0; top: 0; transform: translate(-50%, -50%);
            padding: 10px 14px;
        }
        .amg-dial-txt {
            display: block; white-space: nowrap;
            font-size: 9.5px; font-weight: 600;
            letter-spacing: 0.17em; text-transform: uppercase;
            line-height: 1; color: var(--nc-dim, #7C7268);
            transition: color 0.45s linear, text-shadow 0.45s linear;
        }
        /* Every name carries its own family's hue: heavily greyed at rest so the
           ring stays calm, full strength under the cursor, and mixed toward
           --bone when it is the one in the coal. Nothing changes SIZE between
           these states - the placement below is computed from each name's
           measured box, and a name that grew on selection would silently
           invalidate its own clearance. */
        .amg-dial-node:hover .amg-dial-txt { color: var(--nc); }
        .amg-dial-node.active .amg-dial-txt {
            color: var(--nc-hi, #F5F1EA);
            text-shadow: 0 0 18px var(--nc);
        }

        /* The marker lives OUT in the tick band. Run it any further inward and
           it sits on top of whichever label has just arrived, which reads as a
           collision rather than an index. */
        .amg-dial-needle {
            position: absolute; left: 50%;
            top: calc(var(--amg-D) * 0.012);
            height: calc(var(--amg-D) * 0.046);
            width: 1px; margin-left: -0.5px; z-index: 4;
            background: linear-gradient(180deg, var(--amg-fc, #E8652A), rgba(232,101,42,0));
            box-shadow: 0 0 14px 1px var(--amg-fc, #E8652A);
            transition: background 0.6s linear, box-shadow 0.6s linear;
        }
        /* No tip bead. The marker used to end in a 4px dot, which landed a few
           pixels above the selected family's own dot and its halo - so 12
           o'clock was the one position on the dial showing two dots stacked on
           each other. The hairline alone indexes the seat. */

        /* the coal at the centre */
        .amg-dial-hub {
            position: absolute; inset: 26.5%; border-radius: 50%; z-index: 4;
            display: grid; place-items: center; text-align: center;
            background: radial-gradient(circle at 50% 38%, rgba(40,33,27,0.96), rgba(11,9,8,0.98) 72%);
            border: 1px solid rgba(56, 47, 39, 0.9);
            box-shadow: inset 0 2px 26px rgba(0,0,0,0.85), inset 0 -12px 40px rgba(0,0,0,0.6), 0 26px 60px rgba(0,0,0,0.5);
        }
        .amg-dial-glow {
            position: absolute; inset: -6%; border-radius: 50%; pointer-events: none;
            background: radial-gradient(circle at 50% 62%, var(--amg-fc, #E8652A), transparent 60%);
            filter: blur(20px);
            animation: amgCoalBreathe 5.2s ease-in-out infinite;
            transition: background 0.7s linear;
        }
        @keyframes amgCoalBreathe {
            0%, 100% { opacity: 0.30; transform: scale(0.96); }
            50%      { opacity: 0.60; transform: scale(1.05); }
        }
        /* rim light, top-left, keeps the sphere reading as a solid object */
        .amg-dial-rim {
            position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
            background: radial-gradient(circle at 32% 26%, rgba(245,241,234,0.10), transparent 42%);
        }
        .amg-dial-hubtxt { position: relative; z-index: 2; padding: 6px 12px; }
        /* The name burns in its own family's colour. NOT --amg-fc itself: the
           raw primaries are set for glows on near-black, and several of them
           (spiced, berry, floral) are too dark to read as 27px display type
           sitting on the coal. --amg-fc-hi is the same hue mixed halfway to
           --bone, which keeps every family legible at the same weight - the
           same trick --smoke-hi already uses in index.html. */
        .amg-dial-nm {
            font-family: var(--f-display, serif); font-weight: 400;
            font-size: clamp(19px, 2.4vw, 27px); line-height: 1.08;
            letter-spacing: -0.01em; margin: 0;
            color: var(--amg-fc-hi, #F5F1EA);
            text-shadow: 0 0 26px var(--amg-fc-soft, transparent);
            transition: color 0.6s linear, text-shadow 0.6s linear;
        }
        .amg-dial-rule {
            width: 26px; height: 1px; margin: 12px auto;
            background: var(--amg-fc, #E8652A); opacity: 0.75;
            transition: background 0.6s linear;
        }
        .amg-dial-sub {
            font-size: 9px; letter-spacing: 0.24em; text-transform: uppercase;
            color: #8A8075; margin: 0;
        }
        /* The name in the coal. 130 + 140 + 300 = 570ms end to end, down from
           260 + 200 + 1020. It has to finish with the ring, not after it -
           a hub still settling under a ring that has stopped is the single
           clearest "this is slow" signal the dial had. The pause between the
           two halves is the setTimeout in switchFlavorTab; change them together
           or the word swaps while it is still visible. */
        .amg-swap-out { animation: amgSwapOut 130ms cubic-bezier(0.22,1,0.36,1) forwards; }
        .amg-swap-in  { animation: amgSwapIn 300ms cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes amgSwapOut { to { opacity: 0; transform: translateY(-7px); } }
        @keyframes amgSwapIn { from { opacity: 0; transform: translateY(9px); } to { opacity: 1; transform: none; } }

        .amg-dial-hint {
            display: flex; align-items: center; gap: 14px; margin: 0;
            font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #6E655C;
        }
        .amg-dial-sep {
            width: 3px; height: 3px; border-radius: 50%;
            background: var(--amg-fc, #E8652A); opacity: 0.75;
            transition: background 0.6s linear;
        }

        /* ---- the summary panel beside the dial ---- */
        .amg-dial-eyebrow {
            font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
            color: #8A8075; margin: 0 0 14px;
        }
        /* Burns in the family's colour, same as the name in the coal. Uses
           --amg-fc-hi rather than --amg-fc for the reason given up at
           .amg-dial-nm: the raw primaries are mixed for glows and go muddy as
           display type. */
        .amg-dial-title {
            font-family: var(--f-display, serif); font-weight: 400;
            font-size: clamp(26px, 3.4vw, 38px); line-height: 1.08;
            letter-spacing: -0.02em; margin: 0 0 12px;
            color: var(--amg-fc-hi, #F5F1EA);
            transition: color 0.6s linear;
        }
        .amg-dial-tagline {
            font-size: 15.5px; line-height: 1.65; color: #B8AFA3;
            margin: 0 0 28px; max-width: 44ch;
        }
        .amg-dial-meters {
            display: grid; gap: 15px; margin: 0 0 28px;
            padding: 0 0 26px; border-bottom: 1px solid #382F27;
        }
        .amg-dial-meter { display: grid; grid-template-columns: 78px 1fr 34px; align-items: center; gap: 14px; }
        .amg-dial-meter-n { font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; color: #8A8075; }
        .amg-dial-meter-t { position: relative; height: 2px; background: rgba(56,47,39,0.9); border-radius: 2px; overflow: hidden; }
        .amg-dial-meter-f {
            position: absolute; inset: 0 auto 0 0; width: 0; border-radius: 2px;
            background: linear-gradient(90deg, rgba(232,101,42,0.35), var(--amg-fc, #E8652A));
            box-shadow: 0 0 12px var(--amg-fc, #E8652A);
            transition: width 1000ms cubic-bezier(0.22,1,0.36,1), background 0.6s linear;
        }
        .amg-dial-meter-v { font-size: 11px; text-align: right; color: #B8AFA3; font-variant-numeric: tabular-nums; }

        .amg-flavor-chip-card {
            background: rgba(18, 16, 14, 0.7);
            border: 1px solid rgba(232, 101, 42, 0.2);
            border-radius: 14px;
            padding: 16px 20px;
            position: relative;
            cursor: default;
        }

        /* ==========================================
           VIP MASTER EXPERIENCE STUDIO STYLES
           ========================================== */
        .amg-pillar-card:hover {
            border-color: rgba(255, 120, 60, 0.65) !important;
            transform: translateY(-4px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(232, 101, 42, 0.25) !important;
        }

        /* Mobile/tablet performance profile. Live backdrop sampling is costly
           while the document moves, so these widths keep the same dark glass
           appearance with opaque surfaces and static accents. */
        @media (max-width: 1199px), (hover: none) and (pointer: coarse) {
            #amg-bg-static::after { display: none !important; }
            .amg-card, .amg-figure, .amg-success, .amg-type, article.amg-card,
            #amg-flavor-content {
                background-color: rgba(24, 21, 18, 0.96) !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }
            .amg-badge {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }
            .amg-nav > nav, .amg-mobile-price-bar,
            body:not([data-nav-theme]) .amg-nav.amg-luminous-edge > nav::before {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }
            .amg-mobile-price-bar {
                background: transparent !important;
            }
            .amg-dial-aura, .amg-dial-seat, .amg-dial-glow {
                filter: none !important;
            }
            .amg-dial-glow { animation: none !important; }
            .amg-nav-cta, [data-navpill], .amg-panel-scrim {
                will-change: auto !important;
            }
        }

    `;
    document.head.appendChild(styleTag);




    // 4. Interactive Flavor Experience Logic & 10 Master Flavor Collections
    const FLAVOR_THEMES = {
        orchard: {
            primary: [255, 145, 55],    // Peach Amber Gold
            secondary: [225, 90, 32],   // Georgia Fruit Glow
            accent: [255, 210, 120],   // Honey Nectar Spark
            motif: 'fruit',
            label: 'FRUIT & ORCHARD ESSENCE',
            tags: ['White Peach', 'Black Fig', 'Bing Cherry', 'Pear Nectar', 'Quince', 'Blackberry']
        },
        floral: {
            primary: [220, 90, 245],    // Violet Blossom
            secondary: [255, 110, 150],  // Rose Petal Magenta
            accent: [255, 220, 140],   // Wild Honey Spark
            motif: 'floral',
            label: 'BOTANICAL BLOSSOM ESSENCE',
            tags: ['Jasmine', 'Damask Rose', 'Orange Blossom', 'Lavender', 'Elderflower', 'Violet']
        },
        citrus: {
            primary: [255, 130, 0],     // Vibrant Sicilian Orange
            secondary: [40, 205, 75],   // Key Lime Zest
            accent: [255, 225, 20],    // Yuzu Lemon Spark
            motif: 'citrus',
            label: 'ZESTY CITRUS ESSENCE',
            tags: ['Blood Orange', 'Bergamot Zest', 'Japanese Yuzu', 'Pink Grapefruit', 'Key Lime', 'Meyer Lemon']
        },
        mint: {
            primary: [0, 240, 210],     // Glacier Mint Cyan
            secondary: [0, 175, 220],   // Arctic Spearmint Teal
            accent: [210, 255, 255],   // Sub-Zero Frost
            motif: 'mint',
            label: 'SUB-ZERO MINT & FROST ESSENCE',
            tags: ['Garden Spearmint', 'Peppermint Frost', 'Mojito Lime', 'Eucalyptus', 'Apple Mint']
        },
        spiced: {
            primary: [235, 65, 30],     // Crimson Spice Heat
            secondary: [215, 145, 45],   // Cardamom Amber Gold
            accent: [170, 55, 25],     // Clove Resin
            motif: 'spiced',
            label: 'EXOTIC SPICE & RESIN ESSENCE',
            tags: ['Green Cardamom', 'Chai Masala', 'Warm Clove', 'Persian Saffron', 'Star Anise', 'Cinnamon']
        },
        dessert: {
            primary: [230, 165, 65],    // Caramel Honey Praline
            secondary: [185, 105, 45],   // Toasted Pistachio
            accent: [255, 235, 190],   // Vanilla Cream Spark
            motif: 'dessert',
            label: 'ARTISANAL CONFECTION ESSENCE',
            tags: ['Bronte Pistachio', 'Bourbon Vanilla', 'Turkish Delight', 'Arabica Coffee', 'Salted Caramel', 'Dark Cacao']
        },
        tropical: {
            primary: [255, 105, 45],    // Passion Fruit Coral
            secondary: [255, 185, 35],   // Golden Mango Sunburst
            accent: [0, 215, 185],     // Island Lagoon Teal
            motif: 'tropical',
            label: 'POLYNESIAN TROPICAL ESSENCE',
            tags: ['Hawaiian Passion Fruit', 'Alphonso Mango', 'Young Coconut', 'Pink Guava', 'Maui Pineapple', 'Dragon Fruit']
        },
        tea: {
            primary: [45, 185, 115],    // Ceremonial Uji Matcha
            secondary: [205, 145, 45],   // Ceylon Earl Grey Amber
            accent: [130, 225, 170],   // Herbal Dew Spark
            motif: 'tea',
            label: 'IMPERIAL TEA & BOTANICAL ESSENCE',
            tags: ['Earl Grey Black Tea', 'Matcha Silk', 'Hibiscus Rose', 'Chamomile Honey', 'Moroccan Mint', 'Oolong Amber']
        },
        cream: {
            primary: [245, 220, 170],   // Madagascar Vanilla Ivory
            secondary: [225, 155, 75],   // Caramel Cream Gold
            accent: [255, 248, 235],   // Velvet Whip
            motif: 'cream',
            label: 'VELVET CREAM & VANILLA ESSENCE',
            tags: ['Sweet Cream Whip', 'Bourbon Vanilla Pod', 'Dulce de Leche', 'Almond Milk', 'Coconut Gelato', 'White Chocolate']
        },
        berry: {
            primary: [205, 35, 115],    // Wild Raspberry Ruby
            secondary: [115, 45, 185],   // Oregon Blueberry Violet
            accent: [255, 110, 170],   // Forest Dew Spark
            motif: 'berry',
            label: 'FOREST WILD BERRY ESSENCE',
            tags: ['Wild Raspberry', 'Blueberry Reserve', 'Amazon Açai', 'Elderberry Spice', 'Cranberry Salt', 'Boysenberry']
        }
    };

    const FLAVOR_DATA = {
        orchard: {
            title: "Orchard Fruit Reserve",
            tagline: "Sun-ripened orchard fruits with lush nectar notes & velvet finish.",
            sweetness: 85,
            freshness: 60,
            aroma: 90,
            flavors: [
                { name: "White Peach", desc: "Velvety Georgia peach with honeyed nectar undertones." },
                { name: "Black Fig", desc: "Deep Mediterranean fig with subtle toasted oak notes." },
                { name: "Bing Cherry", desc: "Tart dark cherry balanced with smooth sweetness." },
                { name: "Pear Nectar", desc: "Crisp Anjou pear infused with organic vanilla." },
                { name: "Golden Quince", desc: "Aromatic quince preserve with delicate spice." },
                { name: "Wild Blackberry", desc: "Ripe mountain blackberry with sweet tartness." }
            ],
            pairing: {
                title: "Bel-Air Estate Blend",
                recipe: "White Peach + Garden Mint + Vanilla Oud",
                desc: "Our #1 requested blend for warm estate evenings. Refreshing yet deeply opulent."
            }
        },
        floral: {
            title: "Floral Garden Reserve",
            tagline: "Delicate blossom aromatics paired with natural wild honey.",
            sweetness: 65,
            freshness: 70,
            aroma: 95,
            flavors: [
                { name: "Jasmine", desc: "Pure night-blooming jasmine with silk smoothness." },
                { name: "Damask Rose", desc: "Damask rose essence with clean blossom notes." },
                { name: "Orange Blossom", desc: "Mediterranean neroli blossom with subtle citrus spark." },
                { name: "Lavender Honey", desc: "French lavender steeped in raw wildflower honey." },
                { name: "Elderflower", desc: "Crisp alpine elderflower with bright botanical dew." },
                { name: "Violet Leaf", desc: "Sweet candied violet petal with soft earthy finish." }
            ],
            pairing: {
                title: "Royal Botanical Pair",
                recipe: "Jasmine + Bergamot + Spearmint Ice",
                desc: "An enchanting, perfume-grade aroma that fills the lounge with sophisticated elegance."
            }
        },
        citrus: {
            title: "Citrus Zest Reserve",
            tagline: "Vibrant Mediterranean citrus with crisp, effervescent brightness.",
            sweetness: 55,
            freshness: 85,
            aroma: 88,
            flavors: [
                { name: "Blood Orange", desc: "Juicy Sicilian blood orange with subtle ruby tartness." },
                { name: "Bergamot", desc: "Calabrian bergamot zest with Earl Grey warmth." },
                { name: "Yuzu", desc: "Exotic Japanese yuzu with sharp golden citrus spark." },
                { name: "Grapefruit Salt", desc: "Pink grapefruit with a subtle sea-salt rim finish." },
                { name: "Key Lime Zest", desc: "Crisp key lime peel with bright zesty lift." },
                { name: "Meyer Lemon", desc: "Sweet Meyer lemon curd with subtle floral warmth." }
            ],
            pairing: {
                title: "Sunset Aperitif Blend",
                recipe: "Yuzu + Blood Orange + Garden Mint",
                desc: "Zesty and electric — ideal for cocktail hour and sunset reception lounge zones."
            }
        },
        mint: {
            title: "Glacier Mint Reserve",
            tagline: "Ultra-clean cooling leaves for an icy, invigorating draw.",
            sweetness: 40,
            freshness: 98,
            aroma: 75,
            flavors: [
                { name: "Garden Mint", desc: "Freshly slapped spearmint leaf straight from the garden." },
                { name: "Spearmint Ice", desc: "Sub-zero arctic frost with sweet peppermint lift." },
                { name: "Mojito Lime", desc: "Crushed lime zest, cane sugar & fresh mint leaves." },
                { name: "Eucalyptus Leaf", desc: "Australian eucalyptus leaf with soothing botanical chill." },
                { name: "Peppermint Frost", desc: "Pungent peppermint crystals with crisp finish." },
                { name: "Apple Mint", desc: "Sweet orchard apple notes folded into fresh mint." }
            ],
            pairing: {
                title: "Midnight Arctic Chill",
                recipe: "Spearmint Ice + Mojito Lime + Grapefruit Salt",
                desc: "The ultimate palate cleanser — crisp, sub-zero cooling that stays smooth for hours."
            }
        },
        spiced: {
            title: "Spiced & Exotic Reserve",
            tagline: "Warm Orient spices, roasted cardamoms & rare amber resins.",
            sweetness: 70,
            freshness: 45,
            aroma: 92,
            flavors: [
                { name: "Green Cardamom", desc: "Green cardamom pod with warm aromatic zest." },
                { name: "Chai Masala", desc: "Steeped black tea, cinnamon, clove & star anise." },
                { name: "Clove & Orange", desc: "Warm clove buds spiked with roasted orange peel." },
                { name: "Saffron Cream", desc: "Persian saffron threads folded into sweet cream." },
                { name: "Star Anise", desc: "Aromatic star anise with dark licorice notes." },
                { name: "Cinnamon Bark", desc: "Ceylon cinnamon bark with comforting woody heat." }
            ],
            pairing: {
                title: "Silk Road Nights",
                recipe: "Green Cardamom + Chai Masala + Vanilla Oud",
                desc: "Deeply captivating and mysterious — designed for late-night VIP lounge conversations."
            }
        },
        dessert: {
            title: "Artisanal Dessert Reserve",
            tagline: "Indulgent gourmet confections, toasted nuts & Madagascar vanilla.",
            sweetness: 95,
            freshness: 35,
            aroma: 85,
            flavors: [
                { name: "Bronte Pistachio", desc: "Toasted Bronte pistachio with buttery praline notes." },
                { name: "Bourbon Vanilla Oud", desc: "Bourbon vanilla bean laced with smoky agarwood resin." },
                { name: "Turkish Delight", desc: "Rosewater confection dusted with powdered sugar." },
                { name: "Arabica Espresso", desc: "Dark roasted Arabica espresso bean with cocoa nib." },
                { name: "Salted Caramel", desc: "Warm buttery caramel with Maldon sea salt." },
                { name: "Dark Cacao", desc: "70% Ecuadorian dark cacao with velvet richness." }
            ],
            pairing: {
                title: "Sommelier After-Hours",
                recipe: "Bronte Pistachio + Bourbon Vanilla Oud + Arabica Espresso",
                desc: "Rich, decadent dessert shisha — pairs luxuriously with cognac or espresso martinis."
            }
        },
        tropical: {
            title: "Island Tropical Reserve",
            tagline: "Exotic sun-drenched fruits from Caribbean & Polynesian groves.",
            sweetness: 88,
            freshness: 75,
            aroma: 92,
            flavors: [
                { name: "Passion Fruit", desc: "Tart Hawaiian passion fruit nectar with vibrant aroma." },
                { name: "Golden Mango", desc: "Sweet Alphonso mango pulp with honey undertones." },
                { name: "Coconut Nectar", desc: "Creamy young coconut water with velvety finish." },
                { name: "Guava Blossom", desc: "Pink guava preserve with delicate tropical essence." },
                { name: "Pineapple Reserve", desc: "Charred Maui pineapple with caramelized sweetness." },
                { name: "Dragon Fruit", desc: "Pitaya fruit with subtle floral and kiwi highlights." }
            ],
            pairing: {
                title: "Polynesian Sunset",
                recipe: "Passion Fruit + Golden Mango + Mojito Lime",
                desc: "Vibrant tropical ecstasy — ideal for outdoor poolside lounges and estate summer galas."
            }
        },
        tea: {
            title: "Imperial Tea & Botanical",
            tagline: "Rare single-estate teas & hand-steeped botanical infusions.",
            sweetness: 50,
            freshness: 70,
            aroma: 96,
            flavors: [
                { name: "Earl Grey Reserve", desc: "Bergamot oil infused with high-altitude Ceylon black tea." },
                { name: "Matcha Silk", desc: "Ceremonial grade Uji matcha with velvety green tea notes." },
                { name: "Hibiscus Rose", desc: "Tart Egyptian hibiscus flower with wild honeyed rose." },
                { name: "Chamomile Honey", desc: "Egyptian chamomile blossoms with soothing wild honey." },
                { name: "Moroccan Mint Tea", desc: "Gunpowder green tea steeped with fresh spearmint leaves." },
                { name: "Oolong Amber", desc: "Roasted Formosa oolong with subtle orchid aromatics." }
            ],
            pairing: {
                title: "Emperor's Lounge",
                recipe: "Earl Grey Reserve + Bergamot + Lavender Honey",
                desc: "Aristocratic, tea-forward elegance for quiet VIP salon conversations."
            }
        },
        cream: {
            title: "Velvet Cream & Madagascar Vanilla",
            tagline: "Silky cream, Madagascar bourbon vanilla & golden custards.",
            sweetness: 90,
            freshness: 30,
            aroma: 88,
            flavors: [
                { name: "Sweet Cream", desc: "Heavy sweet cream whip with cloud-like lightness." },
                { name: "Bourbon Vanilla", desc: "Pure Madagascar vanilla pod with dark woody notes." },
                { name: "Dulce de Leche", desc: "Slow-cooked caramelized milk with toasted sugar." },
                { name: "Almond Milk", desc: "Orgeat almond syrup with delicate marzipan cream." },
                { name: "Coconut Gelato", desc: "Rich toasted coconut cream with icy smooth texture." },
                { name: "White Chocolate", desc: "Swiss cocoa butter infused with Madagascar vanilla." }
            ],
            pairing: {
                title: "Velvet Dream Pairing",
                recipe: "Bourbon Vanilla + Sweet Cream + White Peach",
                desc: "Smooth as silk — transforms every draw into a rich, dessert-grade velvet cloud."
            }
        },
        berry: {
            title: "Wild Berry & Forest Reserve",
            tagline: "Hand-picked forest berries with rich antioxidant aromatics.",
            sweetness: 78,
            freshness: 68,
            aroma: 91,
            flavors: [
                { name: "Wild Raspberry", desc: "Fresh tart red raspberry with vivid ruby aroma." },
                { name: "Blueberry Reserve", desc: "Ripe Oregon blueberry with subtle woody leaf." },
                { name: "Açai Berry", desc: "Amazonian açai with deep cocoa and berry notes." },
                { name: "Elderberry Spice", desc: "Dark elderberry preserve steeped with clove." },
                { name: "Cranberry Salt", desc: "Tart tart cranberry with subtle sea-salt rim." },
                { name: "Boysenberry", desc: "Hybrid berry nectar with intense sweet-tart balance." }
            ],
            pairing: {
                title: "Forest Solstice Blend",
                recipe: "Wild Raspberry + Blueberry Reserve + Spearmint Ice",
                desc: "A rich berry explosion backed by a crisp, sub-zero spearmint frost."
            }
        }
    };

    /* The bridge between #flavors and the reservation form, and the ONE thing
       that opens the banner down there.

       It used to be called from switchFlavorTab, which initFlavorHub calls on
       load to render the default Orchard tab - so every visitor arrived at a
       form asserting "Orchard Fruit Reserve - Attached to Reservation ✓" and
       offering to Remove something they had never added. Browsing the tabs now
       changes nothing in the form; only the "Reserve this flavor menu" button
       inside the flavor card reaches down here.

       window.__amgSelectedFlavor is the other half of the fix. The banner is
       plain DOM that React does not own, so its text was invisible to the
       submit handler and the attached menu never left the browser. Publishing
       the selection on window gives index.html's payload() something to read -
       see the 'Flavor menu' key there. Kept as a plain global rather than a
       CustomEvent because the form reads it once, at submit, and there is
       nothing to subscribe to. */
    window.updateReservationFlavorBanner = function(familyKey) {
        const data = FLAVOR_DATA[familyKey];
        if (!data) return;

        window.__amgSelectedFlavor = {
            key: familyKey,
            title: data.title,
            flavors: data.flavors.map(f => f.name)
        };

        const titleEl = document.getElementById('amg-selected-flavor-title');
        const listEl = document.getElementById('amg-selected-flavor-list');
        const badgeEl = document.getElementById('amg-flavor-status-badge');
        const removeBtn = document.getElementById('amg-remove-flavor-btn');
        const bannerEl = document.getElementById('amg-selected-flavor-banner');

        // These three live in the React template, so their text nodes are
        // React's - update in place rather than replacing them.
        amgSetText(titleEl, data.title);
        if (listEl) amgSetText(listEl, data.flavors.map(f => f.name).join(', '));

        if (badgeEl) {
            amgSetText(badgeEl, "Attached to Estimate ✓");
            badgeEl.style.background = "#E8652A";
            badgeEl.style.color = "#000";
            badgeEl.style.boxShadow = "0 0 12px rgba(232,101,42,0.6)";
        }
        if (removeBtn) removeBtn.style.display = "inline-block";

        if (bannerEl) {
            // The template ships this as display:none - see the note on the
            // banner markup for why writing `display` here is safe against
            // React (it diffs on update, and the template value never changes).
            bannerEl.style.display = 'flex';
            bannerEl.style.transition = 'all 0.3s ease';
            bannerEl.style.borderColor = '#FF783C';
            bannerEl.style.background = 'rgba(232, 101, 42, 0.12)';
            bannerEl.style.boxShadow = '0 0 25px rgba(232, 101, 42, 0.7)';
            setTimeout(() => {
                bannerEl.style.borderColor = 'rgba(232, 101, 42, 0.4)';
                bannerEl.style.boxShadow = 'none';
            }, 800);
        }
    };

    /* Remove. This used to repaint the banner into a greyed-out "Standard
       Custom Mixology / Standard Service" state, which made sense only while
       the banner was permanently on screen: it was the not-attached half of a
       two-state control. Now that the banner appears ONLY when something has
       actually been attached, not-attached has a simpler representation - no
       banner - and a panel explaining that you have not chosen anything is
       just a row of furniture on a form that is already eight fields long. */
    window.clearSelectedFlavorMenu = function(e) {
        if (e) {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
        }
        window.__amgSelectedFlavor = null;

        const bannerEl = document.getElementById('amg-selected-flavor-banner');
        if (bannerEl) bannerEl.style.display = 'none';
        return false;
    };

    // Capture Phase Event Interceptors
    document.addEventListener('click', function(e) {
        const removeBtn = e.target.closest('#amg-remove-flavor-btn');
        if (removeBtn) {
            e.preventDefault();
            e.stopPropagation();
            window.clearSelectedFlavorMenu(e);
            return false;
        }

        // The .amg-flavor-tab branch lived here, delegating pill clicks to
        // switchFlavorTab. The pills are gone - the Ember Dial's nodes are
        // built by us in buildFlavorDial(), so they get real listeners at
        // construction and never needed the document-level interception. Left
        // deleted rather than dormant for the reason spelled out just below.

        // The .amg-studio-tab and .amg-env-tab branches lived here. #events is
        // four always-visible cards now, so there is nothing to switch - and
        // the handlers they called (switchStudioView / switchAtmosphereEnv)
        // were deleted with the data. Left as a note because this is a capture-
        // phase listener on the whole document: a branch here that calls a
        // function that no longer exists is a TypeError waiting for whoever
        // reuses one of those class names.
    }, true);

    /* ==========================================================
       THE EMBER DIAL
       ==========================================================
       Replaces the ten nav pills. The contract switchFlavorTab has always had
       is unchanged - call it with a family key and the hub repaints - so
       initFlavorHub and anything else that reaches for it still works. The
       second argument is now ignored; it only ever existed so a clicked pill
       could mark itself active, and the dial tracks that by index. */
    const FAMILY_ORDER = ['orchard', 'floral', 'citrus', 'mint', 'spiced',
                          'dessert', 'tropical', 'tea', 'cream', 'berry'];

    /* On the ring the three compound names are clipped to one word. At 9.5px
       with .17em tracking "Vanilla & Cream" runs ~148px against a 112px seat,
       so it overhangs the tick band and visibly breaks the circle. Nothing is
       lost - the full title is the panel headline right beside it. */
    const RING_LABEL = {
        orchard: 'Orchard', floral: 'Floral', citrus: 'Citrus', mint: 'Mint', spiced: 'Spiced',
        dessert: 'Dessert', tropical: 'Tropical', tea: 'Tea', cream: 'Cream', berry: 'Berry'
    };

    const DIAL_N = FAMILY_ORDER.length;
    const DIAL_STEP = 360 / DIAL_N;
    const DIAL_ARC = 2 * Math.PI * 45.5;   // r=45.5 inside the bezel's 0..100 viewBox
    const amgReduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    let dialIndex = -1;
    let dialRot = 0;   // continuous, deliberately not modulo: lets us always take the short way round

    function amgPad(n) { return n < 10 ? '0' + n : '' + n; }
    function amgRgb(key) { return (FLAVOR_THEMES[key] || FLAVOR_THEMES.orchard).primary.join(','); }

    /* The family's hue mixed halfway to --bone (245,241,234). Used for type
       that has to stay readable while still being unmistakably that family's
       colour - the primaries alone are tuned for glows, and spiced, berry and
       floral all go muddy at display size against the coal. */
    const AMG_BONE = [245, 241, 234];
    const AMG_RING_GREY = [124, 114, 104];
    function amgMix(key, target, t) {
        const p = (FLAVOR_THEMES[key] || FLAVOR_THEMES.orchard).primary;
        return p.map(function (c, k) { return Math.round(c + (target[k] - c) * t); }).join(',');
    }
    function amgTintHi(key) { return amgMix(key, AMG_BONE, 0.5); }

    /* The resting colour of a name on the ring: its own hue pulled most of the
       way back to the ring's grey. Enough that ten families read as ten
       colours when you look, not so much that the ring turns into a rainbow. */
    function amgTintDim(key) { return amgMix(key, AMG_RING_GREY, 0.58); }

    const RING_GAP = 20;        // the clear space every name keeps from the engraving
    const TICK_INNER = 0.434;   // where the long ticks stop, as a fraction of --amg-D

    /* Each name's half-width and half-height, measured once from the glyphs.
       Cached because it cannot change: nothing about a name resizes on hover or
       selection, only its colour. */
    function measureDialLabels() {
        const ring = document.getElementById('amg-dial-ring');
        if (!ring) return;
        for (let j = 0; j < ring.children.length; j++) {
            const t = ring.children[j].querySelector('.amg-dial-txt');
            if (t) {
                ring.children[j].__w = t.offsetWidth / 2;
                ring.children[j].__h = t.offsetHeight / 2;
            }
        }
    }

    /* Places every name on its own ray, at a CONSTANT distance from the ticks.

       The node is swung out to its angle, pushed out to its radius, then
       counter-rotated by the angle it currently occupies on screen - which is
       what keeps the name horizontal wherever the dial has turned to.

       The radius is not shared. A horizontal word reaches much further along a
       ray that runs sideways than along one that runs up and down, so holding
       the RADIUS constant is exactly what made orchard and spiced crowd the
       engraving while mint and tea looked airy. What has to be constant is the
       gap, so each name is set back by its own reach in its own direction:
       for a box, that is min(w/|sin|, h/|cos|). The names therefore do not sit
       on a perfect circle - the even spacing is the point, and it is what the
       eye actually reads. */
    function placeDialNodes() {
        const ring = document.getElementById('amg-dial-ring');
        const dial = document.getElementById('amg-dial');
        if (!ring || !dial) return;
        const edge = dial.offsetWidth * TICK_INNER;
        for (let j = 0; j < ring.children.length; j++) {
            const node = ring.children[j];
            const a = j * DIAL_STEP;        // the family's fixed place on the ring
            const screenA = a + dialRot;    // where that place currently points
            const rad = screenA * Math.PI / 180;
            const sn = Math.abs(Math.sin(rad)), cs = Math.abs(Math.cos(rad));
            const w = node.__w || 30, h = node.__h || 6;
            const reach = Math.min(sn > 1e-6 ? w / sn : Infinity, cs > 1e-6 ? h / cs : Infinity);
            const r = edge - RING_GAP - reach;
            node.style.transform =
                'rotate(' + a + 'deg) translateY(' + (-r).toFixed(2) + 'px) rotate(' + (-screenA) + 'deg)';
        }
    }

    function buildFlavorDial() {
        const mount = document.getElementById('amg-flavor-dial');
        if (!mount) return false;
        const host = amgJsHost(mount);
        if (host.querySelector('.amg-dial')) return true;   // already built

        /* 120 hairlines, every 12th long. The long ones land exactly on a
           family, so the engraving is the scale the ring indexes against
           rather than decoration. */
        let ticks = '';
        for (let i = 0; i < 120; i++) {
            const maj = i % 12 === 0;
            const a = (i * 3 - 90) * Math.PI / 180;
            const r1 = maj ? 43.4 : 44.6;
            ticks += '<line class="amg-dial-tick' + (maj ? ' maj' : '') + '"' +
                     ' x1="' + (50 + Math.cos(a) * r1).toFixed(2) + '" y1="' + (50 + Math.sin(a) * r1).toFixed(2) + '"' +
                     ' x2="' + (50 + Math.cos(a) * 47.4).toFixed(2) + '" y2="' + (50 + Math.sin(a) * 47.4).toFixed(2) + '"/>';
        }

        /* The 01..10 numerals that used to sit under each name are gone from the
           ring, for the same reason the dots are: a second element on the ray
           needs even spacing from the name, and even spacing is impossible when
           the name's reach changes with its angle. The number is not lost - the
           coal reads "Family 03 / 10" at all times.

           Three colours ride on each node. --nc is the family at full strength,
           --nc-dim is it greyed back for rest, --nc-hi is it mixed toward
           --bone for the selected name and the coal. */
        let nodes = '';
        FAMILY_ORDER.forEach(function (key) {
            const data = FLAVOR_DATA[key];
            nodes +=
                '<button type="button" role="option" class="amg-dial-node" data-family="' + key + '"' +
                ' aria-selected="false" aria-label="' + (data ? data.title : key) + '"' +
                ' style="--nc:rgb(' + amgRgb(key) + ');--nc-dim:rgb(' + amgTintDim(key) +
                ');--nc-hi:rgb(' + amgTintHi(key) + ')">' +
                '<span class="amg-dial-lbl"><span class="amg-dial-txt">' + RING_LABEL[key] + '</span></span>' +
                '</button>';
        });

        host.innerHTML =
            '<div class="amg-dial" id="amg-dial" tabindex="0" role="listbox" aria-label="Flavor family">' +
                '<span class="amg-dial-aura" aria-hidden="true"></span>' +
                '<svg class="amg-dial-bezel" viewBox="0 0 100 100" aria-hidden="true">' +
                    '<circle class="amg-dial-edge" cx="50" cy="50" r="49"></circle>' +
                    '<circle class="amg-dial-inner" cx="50" cy="50" r="30"></circle>' +
                    '<g>' + ticks + '</g>' +
                    '<circle class="amg-dial-arc" id="amg-dial-arc" cx="50" cy="50" r="45.5"' +
                    ' transform="rotate(-90 50 50)" stroke-dasharray="' + DIAL_ARC.toFixed(1) + '"' +
                    ' stroke-dashoffset="' + DIAL_ARC.toFixed(1) + '"></circle>' +
                '</svg>' +
                '<span class="amg-dial-seat" aria-hidden="true"></span>' +
                '<div class="amg-dial-ring" id="amg-dial-ring">' + nodes + '</div>' +
                '<span class="amg-dial-needle" aria-hidden="true"></span>' +
                '<div class="amg-dial-hub">' +
                    '<span class="amg-dial-glow" aria-hidden="true"></span>' +
                    '<span class="amg-dial-rim" aria-hidden="true"></span>' +
                    '<div class="amg-dial-hubtxt" id="amg-dial-hubtxt">' +
                        '<p class="amg-dial-nm" id="amg-dial-nm">Orchard</p>' +
                        '<div class="amg-dial-rule"></div>' +
                        '<p class="amg-dial-sub" id="amg-dial-sub">Family 01 / 10</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<p class="amg-dial-hint"><span>Choose a family</span></p>';

        const dial = document.getElementById('amg-dial');
        const ring = document.getElementById('amg-dial-ring');

        for (let j = 0; j < ring.children.length; j++) {
            (function (node) {
                node.addEventListener('click', function () {
                    window.switchFlavorTab(node.getAttribute('data-family'), node);
                });
            })(ring.children[j]);
        }

        /* Wheel. Over the dial, the wheel belongs to the dial - always.

           There were two guards here that handed the page back mid-gesture: the
           dial only took the wheel while it sat in the middle band of the
           viewport, and within one gesture it would swallow at most 1800px
           before releasing. Both existed so the dial could never trap the page.

           The release budget is what made the third or fourth turn scroll the
           page instead: consecutive flicks that run into each other read as ONE
           gesture, so their distances added up, crossed the budget, and the next
           notch went to the document. From the cursor's point of view nothing
           had changed - it was still sitting on the dial - so the page moving
           was unexplainable. Both guards are gone by choice: the dial is now
           inert as a scroller and the page cannot move while the pointer is on
           it. Moving the pointer off the dial is what scrolls the page.

           ONE GESTURE, ONE FAMILY. However hard the flick, the dial advances by
           exactly one and then stops listening until the wheel goes quiet.

           A gesture is delimited by SILENCE and by nothing else. Everything a
           flick emits - the ramp up, the peak, the whole momentum tail, all
           forty-odd events of a hard throw - arrives with gaps far shorter than
           QUIET, so it is one gesture and it is worth one step. The hand
           starting again is the only thing that produces a real pause.

           ############ THE THREE-RULE VERSION IS DELETED ON PURPOSE ############
           This used to recognise a scroll three ways, and the two extra rules
           existed to serve a case that is not worth what it cost:

             - "a push after coasting" tried to spot a second flick inside an
               unbroken stream by looking for an event bigger than the one
               before it. Trackpad momentum is not monotonic - it fluctuates a
               few percent as it decays - so a noisy tail trips this and the
               dial takes an extra step nobody asked for.
             - "a long flat stream" turned every STREAM_MIN (450ms) while the
               deltas were not decaying, so that a free-spinning mouse wheel,
               which never pauses, could still move. A hard trackpad throw runs
               well past a second and its ramp is not decaying either, so the
               same rule handed it two and three extra families.

           Both were heuristics guessing at intent from the shape of a delta
           stream, and a guess that is wrong on a hard flick is exactly the
           complaint this now fixes. What is given up is the free-spinning
           wheel: spin one continuously and the dial moves once, then waits for
           a pause. That is the stated behaviour, not an oversight - lift and
           scroll again, or use the arrow keys, which step one per press.
           ######################################################################

           A GESTURE ENDS THREE WAYS, AND TWO OF THEM ARE ABOUT RESPONSIVENESS.
           Silence alone is correct but slow: a trackpad's momentum keeps
           emitting for well over a second after the fingers have left the
           glass, and waiting that out before accepting the next flick is the
           dial feeling dead in the hand. So:

             1. SILENCE longer than QUIET. The hand stopped.
             2. A SPENT TAIL. Momentum that has decayed to DEAD or less is over
                whether or not events keep arriving - the next real event is a
                new gesture, with no wait. Events at or below DEAD are swallowed
                and never accumulate, which is what stops a dying tail from
                dribbling its way to another step on its own.
             3. A REVERSAL. An event of the opposite sign, above WAKE. Momentum
                cannot change direction; only a hand can. So a flick back the
                other way is taken immediately even while the previous tail is
                still running.

           ############ NO HEURISTIC MAY BE ADDED HERE. ############
           Every boundary above is something momentum PHYSICALLY CANNOT DO:
           stop and restart, decay and then surge, or reverse. That is the whole
           specification - one flavor per flick, no exceptions - and it is the
           reason the two previous attempts are not in this file:

             - "turn again every 450ms while the deltas are not decaying" was
               meant for a free-spinning mouse wheel and gave a hard trackpad
               throw two and three extra families.
             - "turn again after three consecutive rising events, once the
               stream has peaked" was meant to catch a second flick landing in a
               live tail. It reads a real stream better than a size comparison
               does, and it is still a GUESS: a hard throw's deltas are not
               monotonic, so a plateau or a stutter inside ONE flick can produce
               three rises and take a second step. That is the "sometimes it
               passes two positions" this replaces.

           What is deliberately given up: a second flick in the SAME direction
           that lands while the previous tail is still above DEAD is ignored
           until that tail falls below it. It cannot be distinguished from the
           first flick by anything that is always true, and a dial that
           occasionally skips a flavor is worse than one that occasionally asks
           for the flick again.
           ######################################################### */
        const ARM = 10,      // travel before a scroll counts as deliberate at all
              QUIET = 110,   // silence that ends a gesture
              DEAD = 20,     // a tail at or below this is spent
              WAKE = 45;     // ...and only an event this big restarts from one
        let wAcc = 0, wLastAt = 0, wDir = 0,
            wArmed = false,  // this gesture has not spent its one step yet
            wSpent = false,  // the tail is done; a real push starts a new gesture
            wBig = false;    // this stream has been fast, so small now means tail

        dial.addEventListener('wheel', function (e) {
            // Ctrl/Cmd + wheel is the browser's zoom, not a scroll. Swallowing
            // it would take page zoom away from anyone who needs it.
            if (e.ctrlKey || e.metaKey) return;

            // Swallowed whether or not it turns the dial: the pointer is on the
            // dial, so the page must not move under it - see the note above.
            e.preventDefault();

            const now = performance.now();
            const abs = Math.abs(e.deltaY);
            // Measured from the LAST event, so a live tail postpones the next
            // gesture rather than starting one inside itself.
            const gap = now - wLastAt;
            wLastAt = now;

            const sign = e.deltaY > 0 ? 1 : -1;

            /* wDir IS RESET WITH THE GESTURE, NOT CARRIED ACROSS ONE. It is the
               direction THIS stream is going, so a new gesture starts from its
               own first event. Left over from the previous gesture it means the
               opposite thing: flick down, pause, flick up, and the first big
               event of the second flick disagrees with a direction belonging to
               the first - rule 3 reads that as a reversal mid-tail and takes a
               second step. Measured at ~20% of randomised flicks, because the
               fuzz alternates direction. */
            if (gap > QUIET) {                       // 1. the hand paused
                wAcc = 0; wArmed = true; wSpent = false; wBig = false; wDir = sign;
            } else if (wBig && abs <= DEAD) {        // 2. the tail is spent.
                // Returns WITHOUT accumulating, which is what stops a dying
                // tail from dribbling its way to ARM and stealing a step.
                wSpent = true;
                return;
            } else if (wSpent && abs >= WAKE) {      //    a real push after one
                wAcc = 0; wArmed = true; wSpent = false; wBig = false; wDir = sign;
            } else if (!wArmed && sign !== wDir && abs >= WAKE) {   // 3. reversal
                wAcc = 0; wArmed = true; wSpent = false; wBig = false;
            }
            /* ############ wBig IS WHY RULE 2 IS SAFE. ############
               A flick RAMPS, so its opening events are small - a throw peaking
               at 100 starts around 7. Without this, those events look exactly
               like a spent tail, latch wSpent on the way UP, and then the same
               flick's own larger events trip the WAKE branch and take a second
               step. That was 8% of randomised flicks double-stepping.
               A tail is only a tail if this stream was ever actually fast. Set
               after the branches, so the event that wakes a new gesture starts
               that gesture clean rather than immediately arming the next one.
               ##################################################### */
            /* wDir TRACKS BIG EVENTS ONLY, and that is not tidiness. A reverse
               flick also ramps, so its first events are below WAKE. Updating
               the direction on those flipped wDir before the reversal was big
               enough to qualify, and by the time an event cleared WAKE it
               agreed with the new direction - so rule 3 never fired and a flick
               back the other way was swallowed by the previous tail. */
            if (abs >= WAKE) { wBig = true; wDir = sign; }

            // Already turned for this gesture. Everything else it emits is tail.
            if (!wArmed) return;

            wAcc += e.deltaY;
            if (Math.abs(wAcc) < ARM) return;

            wArmed = false;
            const dir = wAcc > 0 ? 1 : -1;
            wAcc = 0;
            amgStepDial(dir);
        }, { passive: false });

        dial.addEventListener('keydown', function (e) {
            const k = e.key;
            if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); amgStepDial(1); }
            else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); amgStepDial(-1); }
            else if (k === 'Home') { e.preventDefault(); window.switchFlavorTab(FAMILY_ORDER[0]); }
            else if (k === 'End') { e.preventDefault(); window.switchFlavorTab(FAMILY_ORDER[DIAL_N - 1]); }
        });

        window.addEventListener('resize', placeDialNodes);
        measureDialLabels();
        placeDialNodes();
        /* The webfont almost never lands before this runs, and every name
           changes width when it does - which moves all ten, because the whole
           placement is derived from their measured boxes. */
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function () { measureDialLabels(); placeDialNodes(); });
        }
        return true;
    }

    function amgStepDial(dir) {
        const next = ((dialIndex + dir) % DIAL_N + DIAL_N) % DIAL_N;
        window.switchFlavorTab(FAMILY_ORDER[next]);
    }

    /* Counts a meter's number up rather than snapping it, to match the bar.

       Both guards below are load-bearing, and both were found the hard way -
       turning the dial quickly printed numbers like -178736 into the meters.

       p is clamped at BOTH ends. It was only clamped at 1, so a frame whose
       timestamp landed before t0 gave a negative p, and the easing curve
       1-(1-p)^3 has no bound below zero: one such frame threw the value tens of
       thousands away from anything real.

       And each element remembers which count owns it. Turning the dial
       re-renders the panel, but a count scheduled by the previous family is
       still in flight and resolves its element by id - so two loops ended up
       writing the same span on alternating frames, each reading the other's
       output back as its own starting value. */
    /* The meter numbers snap; only the bars travel.

       They used to count up on requestAnimationFrame, and that flourish was
       not worth what it cost. Its first frame writes the PREVIOUS family's
       number - that is what "counting from" means - so any interruption after
       that frame and before the next leaves a wrong figure sitting on screen.
       Turning the dial quickly did exactly that: mint's bars (40/98/75) next to
       dessert's numbers (95/35/85). These are taste percentages, so a stale one
       is a lie about the product, and a number that merely appears instantly is
       no loss at all next to a bar that still sweeps. The bar's travel is a
       plain CSS transition, which cannot desynchronise from its own value. */

    /* The summary that sits beside the dial: label, title, tagline, the three
       taste meters, and the one button that attaches anything. */
    function renderDialSummary(familyKey, data, theme, i) {
        const mount = document.getElementById('amg-flavor-summary');
        if (!mount) return;
        const host = amgJsHost(mount);

        host.innerHTML =
            '<p class="amg-dial-eyebrow">' + theme.label + '</p>' +
            '<h3 class="amg-dial-title">' + data.title + '</h3>' +
            '<p class="amg-dial-tagline">' + data.tagline + '</p>' +
            '<div class="amg-dial-meters">' +
                '<div class="amg-dial-meter"><span class="amg-dial-meter-n">Sweetness</span>' +
                '<span class="amg-dial-meter-t"><span class="amg-dial-meter-f" id="amg-m-sw"></span></span>' +
                '<span class="amg-dial-meter-v" id="amg-v-sw">0</span></div>' +
                '<div class="amg-dial-meter"><span class="amg-dial-meter-n">Cooling</span>' +
                '<span class="amg-dial-meter-t"><span class="amg-dial-meter-f" id="amg-m-fr"></span></span>' +
                '<span class="amg-dial-meter-v" id="amg-v-fr">0</span></div>' +
                '<div class="amg-dial-meter"><span class="amg-dial-meter-n">Aroma</span>' +
                '<span class="amg-dial-meter-t"><span class="amg-dial-meter-f" id="amg-m-ar"></span></span>' +
                '<span class="amg-dial-meter-v" id="amg-v-ar">0</span></div>' +
            '</div>';

        /* Bars start at width 0 in the markup above. Reading offsetWidth
           flushes that starting value into layout, so assigning the real width
           on the very next line still runs the CSS transition - no rAF needed.
           This used to be wrapped in requestAnimationFrame, which meant a panel
           that never received a frame (a background tab) painted every meter
           empty. The width is data, not decoration; only the travel is. */
        [['amg-m-sw', 'amg-v-sw', data.sweetness],
         ['amg-m-fr', 'amg-v-fr', data.freshness],
         ['amg-m-ar', 'amg-v-ar', data.aroma]].forEach(function (b) {
            const bar = document.getElementById(b[0]);
            if (bar) {
                void bar.offsetWidth;
                bar.style.width = b[2] + '%';
            }
            amgSetText(document.getElementById(b[1]), String(b[2]));
        });
    }

    window.switchFlavorTab = function(familyKey, targetEl) {
        const data = FLAVOR_DATA[familyKey];
        const theme = FLAVOR_THEMES[familyKey] || FLAVOR_THEMES.orchard;
        if (!data) return;

        const i = FAMILY_ORDER.indexOf(familyKey);
        if (i === -1) return;
        // Asking for the family already showing is a no-op - unless the panel
        // is not actually on screen, which is the case on the very first call
        // and would be the case again if anything ever wiped our host.
        if (i === dialIndex && document.querySelector('#amg-flavor-summary [data-amg-js] .amg-dial-title')) return;

        const prev = dialIndex;
        dialIndex = i;
        const rgb = amgRgb(familyKey);

        /* Every accent in the section reads from these two, so the arc, the
           needle, the coal, the meters and the blend bullets all change
           together. Written on #flavors as inline custom properties: React
           renders that element's style attribute once on mount and only diffs
           it afterwards, and the template's value never changes, so what we set
           here is the last thing written to those properties. Same reasoning as
           the reservation banner's display flag in index.html. */
        const sec = document.getElementById('flavors');
        if (sec) {
            sec.style.setProperty('--amg-fc', 'rgb(' + rgb + ')');
            sec.style.setProperty('--amg-fc-soft', 'rgba(' + rgb + ',0.5)');
            sec.style.setProperty('--amg-fc-hi', 'rgb(' + amgTintHi(familyKey) + ')');
        }

        // --- turn the dial, taking whichever direction is fewer steps ---
        const ring = document.getElementById('amg-dial-ring');
        if (ring) {
            let delta = (-i * DIAL_STEP - dialRot) % 360;
            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;
            dialRot += delta;
            ring.style.transform = 'rotate(' + dialRot + 'deg)';
            placeDialNodes();

            for (let j = 0; j < ring.children.length; j++) {
                const on = j === i;
                ring.children[j].classList.toggle('active', on);
                ring.children[j].setAttribute('aria-selected', on ? 'true' : 'false');
            }
        }

        const arc = document.getElementById('amg-dial-arc');
        if (arc) arc.style.strokeDashoffset = (DIAL_ARC - DIAL_ARC * ((i + 1) / DIAL_N)).toFixed(2);

        // --- the name in the coal: out, then in ---
        const nm = document.getElementById('amg-dial-nm');
        const sub = document.getElementById('amg-dial-sub');
        const txt = document.getElementById('amg-dial-hubtxt');
        if (nm && sub) {
            const label = RING_LABEL[familyKey] === 'Cream' ? 'Vanilla & Cream'
                        : RING_LABEL[familyKey] === 'Tea' ? 'Tea & Herbal'
                        : RING_LABEL[familyKey];
            if (txt && prev !== -1 && !amgReduce) {
                txt.classList.remove('amg-swap-in');
                txt.classList.add('amg-swap-out');
                setTimeout(function () {
                    amgSetText(nm, label);
                    amgSetText(sub, 'Family ' + amgPad(i + 1) + ' / 10');
                    txt.classList.remove('amg-swap-out');
                    void txt.offsetWidth;
                    txt.classList.add('amg-swap-in');
                    // 140, paired with .amg-swap-out's 130ms - it has to land
                    // just after the word is invisible and not a frame later.
                    // See the note on those two rules in the stylesheet above.
                }, 140);
            } else {
                amgSetText(nm, label);
                amgSetText(sub, 'Family ' + amgPad(i + 1) + ' / 10');
            }
        }

        renderDialSummary(familyKey, data, theme, i);

        const container = document.getElementById('amg-flavor-content');
        if (!container) return;
        // React owns `container` itself; we only ever write inside our own host.
        const host = amgJsHost(container);

        // NO updateReservationFlavorBanner CALL HERE - this is the line that
        // used to be. initFlavorHub opens Orchard on load, so calling it from
        // here attached a flavor menu to every visitor's reservation before
        // they had touched anything. Turning the dial is not choosing; the
        // "Reserve this flavor menu" button in the summary panel is the only
        // thing that attaches, and it calls that function itself.

        host.innerHTML = `
            <!-- Ambient family watermark.

                 font-size is set by fitMotif() below, NOT here. It used to be a
                 hard 120px, and measured against the real panel - 245px on a
                 phone, not the panel's outer width - NINE of the ten words
                 overflowed it: TROPICAL wants 541px at that size, DESSERT 478.
                 Only TEA fitted. right:0 rather than -10px for the same reason:
                 a word already as wide as its container has nothing to spare
                 for a deliberate overhang.

                 THE WORD IS THE FAMILY, NOT theme.motif. It was theme.motif,
                 and nine of the ten themes happen to name their motif after
                 their own key - so it read correctly everywhere except orchard,
                 whose motif is the string 'fruit'. Choosing Orchard printed
                 FRUIT across a panel headed "Orchard Fruit Reserve".
                 RING_LABEL is the same source the dial's rim label reads, so
                 the watermark and the ring can no longer disagree.
                 theme.motif now has NO reader left anywhere in this file. Leave
                 it or delete it, but do not wire this back to it. -->
            <div data-motif-wrap style="position:absolute;top:-10px;right:0;left:0;pointer-events:none;opacity:0.12;z-index:0;text-align:right;overflow:hidden;">
                <span data-motif style="font-family:var(--f-display, serif);font-weight:900;color:rgb(${theme.primary.join(',')});line-height:0.8;user-select:none;text-transform:uppercase;white-space:nowrap;display:inline-block;">${RING_LABEL[familyKey] || familyKey}</span>
            </div>

            <div style="position:relative;z-index:1">
                <p style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#A09A92;margin:0 0 14px 0;">The six blends</p>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;">
                    ${data.flavors.map(f => `
                        <div class="amg-flavor-chip-card">
                            <h4 style="font-size:14px;font-weight:700;color:#F5F1EA;margin:0 0 4px 0;">${f.name}</h4>
                            <p style="font-size:12px;color:#A09A92;margin:0;line-height:1.35;">${f.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Bottom Banner: Sommelier Recommended Pairings -->
            <div style="position:relative;z-index:1;margin-top:28px;padding:22px 26px;background:rgba(18,16,14,0.85);border:1px solid rgba(${theme.primary.join(',')},0.35);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
                <span style="font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgb(${theme.primary.join(',')});display:flex;align-items:center;gap:6px;">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 0l2.1 4.5 4.9.7-3.6 3.4.9 4.9L7 11.2 2.7 13.5l.9-4.9L0 5.2l4.9-.7L7 0z" fill="rgb(${theme.primary.join(',')})"/></svg>
                    SOMMELIER SIGNATURE SELECTION
                </span>
                <!-- primary, not accent. accent is not a consistent role across
                     the ten families - on most it is a lighter sibling of
                     primary (mint frost, vanilla cream), but floral's is a
                     honey gold with nothing to do with its violet and spiced's
                     is DARKER than its primary. So this one line read as a
                     different colour on some families and a muddier one on
                     others. primary is the colour the eyebrow, star and border
                     of this same panel already use. -->
                <h4 style="font-size:16px;font-weight:700;color:#F5F1EA;margin:6px 0 2px 0;">${data.pairing.title}: <span style="color:rgb(${theme.primary.join(',')});">${data.pairing.recipe}</span></h4>
                <p style="font-size:13px;color:#A09A92;margin:0;">${data.pairing.desc}</p>
            </div>
        `;

        fitMotif(host);
    };

    /* Size the backdrop word to the panel it sits in.

       MEASURED, NOT CALCULATED. The obvious fix is a formula - divide the panel
       width by the letter count times some average advance - and it is wrong for
       this typeface twice over: DM Serif Display's caps are not uniform (an I
       against a W is nowhere near the ~0.62em average), and the motifs run from
       three letters to eight, so any single constant is badly off at one end or
       the other. Rendering the word once at a known size and scaling by the
       ratio it actually measured is exact for every word and needs no constant.

       Two passes at most: set the probe size, read the width, scale. The read
       forces one layout, which is why this runs once per family switch rather
       than on resize - and why the resize path below is debounced.

       120px stays the ceiling, so short motifs like TEA and MINT look exactly as
       they did; only the ones that were overflowing move. */
    const MOTIF_PROBE = 100;   // any size works; 100 keeps the arithmetic legible
    const MOTIF_MAX = 120;
    function fitMotif(scope) {
        const wrap = scope && scope.querySelector('[data-motif-wrap]');
        const el = scope && scope.querySelector('[data-motif]');
        if (!wrap || !el) return;
        const avail = wrap.clientWidth;
        if (!avail) return;               // panel not laid out yet - the resize hook retries
        el.style.fontSize = MOTIF_PROBE + 'px';
        const natural = el.scrollWidth;   // scrollWidth, not clientWidth: the span is nowrap
        if (!natural) return;
        el.style.fontSize = Math.max(28, Math.min(MOTIF_MAX, Math.floor(avail * MOTIF_PROBE / natural))) + 'px';
    }

    /* ############ THE TRANSLATOR HAS TO BE ABLE TO CALL THIS. ############
       fitMotif measures the word ONCE, on the frame renderDialSummary builds
       the panel - and at that moment the word is still English. i18n.js swaps
       it a frame later, so the font-size is left sized for a word that is no
       longer there.
       That is not a small error for this element. The size is derived from the
       measured width, so it is only correct for the string it measured, and
       Cyrillic makes it worse than a character count suggests: DM Serif Display
       carries no Cyrillic, so ЦИТРУС renders in the fallback serif at quite
       different metrics than CITRUS. Measured, not reasoned about - which is
       the whole point of this function, and the reason the fix is to re-run it
       rather than to add a per-language constant.
       Exposed rather than duplicated in i18n.js so MOTIF_MAX and the probe stay
       defined in exactly one place. */
    window.amgFitMotif = fitMotif;

    /* Rotating a phone changes the panel width and therefore the right size for
       the word. Debounced because clientWidth + scrollWidth is a forced layout
       and orientation changes fire a burst of resize events. */
    let motifTimer = 0;
    window.addEventListener('resize', function () {
        clearTimeout(motifTimer);
        motifTimer = setTimeout(function () {
            const c = document.getElementById('amg-flavor-content');
            if (c) fitMotif(c);
        }, 150);
    }, { passive: true });

    // Build the dial, then open Orchard on it.
    function initFlavorHub() {
        const ready = document.getElementById('amg-flavor-content') && buildFlavorDial();
        if (ready) {
            window.switchFlavorTab('orchard');
        } else {
            setTimeout(initFlavorHub, 150);
        }
    }
    amgWhenReady(initFlavorHub);

})();
