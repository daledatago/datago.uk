const operatingLensSvg = `<svg id="operating-lens-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="Animated Bridgly Operating Lens">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#1f2529" flood-opacity="0.10"/>
    </filter>
    <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <radialGradient id="coreGlow" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="65%" stop-color="#f7f9f8" stop-opacity="1"/>
      <stop offset="100%" stop-color="#66d993" stop-opacity="0.22"/>
    </radialGradient>
    <style><![CDATA[
      :root{--green:#138a36;--green-glow:#66d993;--charcoal:#1f2529;--card:#ffffff;}
      #operating-lens-svg{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;}
      .title{fill:var(--charcoal);font-weight:700}
      .subtitle{fill:#68727b;font-weight:400}
      .zone-title{fill:var(--green);font-size:26px;font-weight:700;text-anchor:middle}
      .card-title{fill:var(--charcoal);font-size:20px;font-weight:500}
      .pill-text{fill:var(--charcoal);font-size:18px;font-weight:500}
      .panel{fill:none;stroke:#cfd6db;stroke-width:2}
      .card{fill:var(--card);stroke:#d8dee3;stroke-width:2;filter:url(#shadow)}
      .port{fill:white;stroke:#b4bcc3;stroke-width:2.2}
      .port.active{stroke:var(--green);fill:#f2fff6}
      .solid-line{fill:none;stroke:#aeb8c0;stroke-width:2.8;stroke-linecap:round;stroke-linejoin:round}
      .dotted-line{fill:none;stroke:var(--green);stroke-width:3.2;stroke-linecap:round;stroke-dasharray:2 10;animation:flow 18s linear infinite}
      .core-shell{fill:url(#coreGlow);stroke:#d4dade;stroke-width:2.5;filter:url(#shadow)}
      .inner-ring{fill:none;stroke:#bfd4c4;stroke-width:2}
      .dash-ring{fill:none;stroke:var(--green);stroke-opacity:.8;stroke-width:2.5;stroke-dasharray:2 9;animation:pulseRing 7s ease-in-out infinite}
      .core-breath{animation:breathe 7s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
      #bridgly-core-logo{animation:spin 24s linear infinite;transform-box:fill-box;transform-origin:center}
      .bright-card{animation:glowCard 6s ease-in-out infinite}
      .bright-card.delay-1{animation-delay:-2s}
      .bright-card.delay-2{animation-delay:-4s}
      .control-pill{fill:white;stroke:#d8dee3;stroke-width:2;filter:url(#shadow)}
      .divider{stroke:#d7dde2;stroke-width:2}
      .icon-stroke{fill:none;stroke:var(--charcoal);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
      .icon-green{fill:none;stroke:var(--green);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
      .fill-green{fill:var(--green)}
      .fill-charcoal{fill:var(--charcoal)}
      @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes breathe{0%,100%{transform:scale(.995)}50%{transform:scale(1.015)}}
      @keyframes pulseRing{0%,100%{stroke-opacity:.35;transform:scale(.97)}50%{stroke-opacity:.9;transform:scale(1.02)}}
      @keyframes flow{from{stroke-dashoffset:0}to{stroke-dashoffset:-120}}
      @keyframes glowCard{0%,100%{filter:none}40%{filter:drop-shadow(0 0 10px rgba(102,217,147,.35))}}
      @media (prefers-reduced-motion:reduce){*{animation:none!important}}
    ]]></style>
  </defs>

  <g id="header" transform="translate(0,10)">
    <g transform="translate(800,34)">
      <line x1="0" y1="-30" x2="0" y2="-64" class="icon-green" stroke-width="7"/>
      <line x1="-14" y1="-4" x2="-48" y2="-16" class="icon-stroke" stroke-width="6"/>
      <line x1="14" y1="-4" x2="48" y2="-16" class="icon-stroke" stroke-width="6"/>
      <line x1="-10" y1="12" x2="-34" y2="44" class="icon-stroke" stroke-width="6"/>
      <line x1="10" y1="12" x2="34" y2="44" class="icon-stroke" stroke-width="6"/>
      <circle cx="0" cy="0" r="12" class="fill-charcoal"/>
      <circle cx="0" cy="-64" r="5" class="fill-green"/>
      <circle cx="-48" cy="-16" r="5" class="fill-charcoal"/>
      <circle cx="48" cy="-16" r="5" class="fill-charcoal"/>
      <circle cx="-34" cy="44" r="5" class="fill-charcoal"/>
      <circle cx="34" cy="44" r="5" class="fill-charcoal"/>
    </g>
    <text x="800" y="98" class="title" font-size="58" text-anchor="middle">Bridgly</text>
    <text x="800" y="145" class="subtitle" font-size="34" text-anchor="middle">The Operating Lens</text>
  </g>

  <g id="organisation-zone">
    <text class="zone-title" x="245" y="115">Organisation</text>
    <g transform="translate(100,135)">
      <rect class="panel" x="0" y="0" width="290" height="300" rx="22"/>
      <rect class="card" x="22" y="20" width="236" height="82" rx="16"/>
      <rect class="card" x="22" y="122" width="236" height="82" rx="16"/>
      <rect class="card" x="22" y="224" width="236" height="82" rx="16"/>
      <g transform="translate(38,39)"><circle cx="22" cy="18" r="11" class="icon-stroke"/><path d="M 8 50 Q 22 35 36 50" class="icon-green"/><text x="72" y="33" class="card-title">People</text></g>
      <g transform="translate(38,141)"><circle cx="15" cy="22" r="9" class="icon-stroke"/><circle cx="32" cy="18" r="10" class="icon-stroke"/><circle cx="51" cy="22" r="9" class="icon-stroke"/><path d="M 4 48 Q 14 38 24 48" class="icon-green"/><path d="M 22 48 Q 32 35 42 48" class="icon-green"/><path d="M 40 48 Q 50 38 60 48" class="icon-green"/><text x="72" y="34" class="card-title">Teams</text></g>
      <g transform="translate(38,243)"><path d="M8 46 V14 H28 V46" class="icon-stroke"/><path d="M28 46 V6 H48 V46" class="icon-stroke"/><path d="M48 46 V20 H64 V46" class="icon-stroke"/><circle cx="4" cy="37" r="4" class="fill-green"/><path d="M4 45 V28" class="icon-green"/><text x="72" y="34" class="card-title">Business units</text></g>
      <circle class="port" cx="292" cy="55" r="6"/><circle class="port" cx="292" cy="156" r="6"/><circle class="port" cx="292" cy="257" r="6"/>
    </g>
  </g>

  <g id="work-zone">
    <text class="zone-title" x="245" y="500">Work systems</text>
    <g transform="translate(100,520)">
      <rect class="panel" x="0" y="0" width="290" height="300" rx="22"/>
      <rect class="card" x="22" y="20" width="236" height="82" rx="16"/>
      <rect class="card" x="22" y="122" width="236" height="82" rx="16"/>
      <rect class="card" x="22" y="224" width="236" height="82" rx="16"/>
      <g transform="translate(38,40)"><rect x="0" y="0" width="16" height="16" class="icon-stroke"/><rect x="24" y="0" width="16" height="16" class="icon-stroke"/><rect x="0" y="24" width="16" height="16" class="icon-stroke"/><rect x="24" y="24" width="16" height="16" class="icon-green"/><text x="72" y="33" class="card-title">Tools</text></g>
      <g transform="translate(38,142)"><path d="M0 46 V12 H26 L34 20 H62 V46 Z" class="icon-stroke"/><path d="M40 38 H58" class="icon-green"/><text x="72" y="34" class="card-title">Projects</text></g>
      <g transform="translate(38,244)"><rect x="8" y="8" width="42" height="34" rx="8" class="icon-stroke"/><path d="M29 8 V0" class="icon-stroke"/><circle cx="20" cy="25" r="3" class="fill-green"/><circle cx="38" cy="25" r="3" class="fill-green"/><path d="M19 35 Q 29 39 39 35" class="icon-green"/><path d="M0 20 V30" class="icon-stroke"/><path d="M58 20 V30" class="icon-stroke"/><text x="72" y="34" class="card-title">AI agents</text></g>
      <circle class="port" cx="292" cy="55" r="6"/><circle class="port" cx="292" cy="156" r="6"/><circle class="port" cx="292" cy="257" r="6"/>
    </g>
  </g>

  <g id="value-zone">
    <text class="zone-title" x="1355" y="115">Value</text>
    <g transform="translate(1210,135)">
      <rect class="panel" x="0" y="0" width="290" height="300" rx="22"/>
      <rect class="card" x="32" y="20" width="226" height="82" rx="16"/>
      <rect class="card bright-card delay-1" x="32" y="122" width="226" height="82" rx="16"/>
      <rect class="card" x="32" y="224" width="226" height="82" rx="16"/>
      <g transform="translate(54,40)"><path d="M0 12 L18 0 L36 12 L36 34 L18 46 L0 34 Z" class="icon-stroke"/><path d="M18 0 V46 M0 12 L18 22 L36 12 M18 22 L18 46" class="icon-green"/><text x="66" y="33" class="card-title">Capabilities</text></g>
      <g transform="translate(54,142)"><circle cx="18" cy="24" r="18" class="icon-stroke"/><path d="M18 10 L22 20 L32 20 L24 26 L27 36 L18 30 L9 36 L12 26 L4 20 L14 20 Z" class="icon-green"/><path d="M30 36 L44 50" class="icon-stroke"/><text x="66" y="34" class="card-title">Opportunities</text></g>
      <g transform="translate(54,244)"><circle cx="22" cy="24" r="20" class="icon-stroke"/><circle cx="22" cy="24" r="10" class="icon-green"/><circle cx="22" cy="24" r="3" class="fill-green"/><path d="M34 14 L47 1" class="icon-green"/><path d="M39 1 H47 V9" class="icon-green"/><text x="66" y="34" class="card-title">Outcomes</text></g>
      <circle class="port" cx="0" cy="55" r="6"/><circle class="port active" cx="0" cy="156" r="6"/><circle class="port" cx="0" cy="257" r="6"/>
    </g>
  </g>

  <g id="governance-zone">
    <text class="zone-title" x="1355" y="500">Governance</text>
    <g transform="translate(1210,520)">
      <rect class="panel" x="0" y="0" width="290" height="300" rx="22"/>
      <rect class="card bright-card" x="32" y="20" width="226" height="82" rx="16"/>
      <rect class="card" x="32" y="122" width="226" height="82" rx="16"/>
      <rect class="card" x="32" y="224" width="226" height="82" rx="16"/>
      <g transform="translate(54,40)"><path d="M0 46 V0 H24 L36 12 V46 Z" class="icon-stroke"/><path d="M24 0 V12 H36" class="icon-stroke"/><path d="M8 18 H20 M8 26 H28 M8 34 H18" class="icon-stroke"/><circle cx="43" cy="31" r="10" class="icon-green"/><path d="M38 31 L42 35 L49 26" class="icon-green"/><text x="72" y="33" class="card-title">Evidence</text></g>
      <g transform="translate(54,142)"><path d="M6 40 L22 16 L34 28 L18 52 Z" class="icon-stroke"/><path d="M28 10 L40 22 L34 28 L22 16 Z" class="icon-stroke"/><path d="M36 20 L48 8" class="icon-green"/><text x="72" y="34" class="card-title">Decisions</text></g>
      <g transform="translate(54,244)"><path d="M18 0 L36 8 V24 C36 35 28 44 18 48 C8 44 0 35 0 24 V8 Z" class="icon-stroke"/><path d="M18 12 V26 M18 34 V35" class="icon-green"/><text x="72" y="34" class="card-title">Risk</text></g>
      <circle class="port active" cx="0" cy="55" r="6"/><circle class="port" cx="0" cy="156" r="6"/><circle class="port" cx="0" cy="257" r="6"/>
    </g>
  </g>

  <g id="bridgly-core">
    <path class="solid-line" d="M392 190 C430 190 430 190 450 190 C475 190 500 230 600 230"/>
    <path class="solid-line" d="M392 291 L570 291 L600 291"/>
    <path class="solid-line" d="M392 392 C430 392 452 392 485 392 C530 392 560 370 585 345"/>
    <path class="solid-line" d="M392 575 C430 575 450 575 485 575 C530 575 560 605 585 630"/>
    <path class="solid-line" d="M392 676 L480 676 C535 676 572 660 600 630"/>
    <path class="solid-line" d="M392 777 C440 777 450 777 482 777 C540 777 560 725 585 686"/>
    <path class="solid-line" d="M1000 230 C1100 230 1125 190 1210 190"/>
    <path class="solid-line" d="M1015 345 C1040 370 1070 392 1115 392 C1148 392 1170 392 1210 392"/>
    <path class="solid-line" d="M1015 630 C1040 605 1070 575 1115 575 C1148 575 1170 575 1210 575"/>
    <path class="solid-line" d="M1015 686 C1040 725 1060 777 1118 777 C1164 777 1174 777 1210 777"/>
    <path class="dotted-line" d="M442 231 C 505 231 540 233 594 233 C 617 233 638 260 638 286"/>
    <path class="dotted-line" d="M442 652 C 515 652 555 654 595 654 C 625 654 638 614 638 586"/>
    <path class="dotted-line" d="M962 286 C 962 260 983 233 1006 233 C 1060 233 1095 231 1176 231"/>
    <path class="dotted-line" d="M962 586 C 962 614 975 654 1005 654 C 1060 654 1095 652 1176 652"/>
    <circle class="port active" cx="638" cy="286" r="9"/>
    <circle class="port" cx="584" cy="345" r="9"/>
    <circle class="port active" cx="638" cy="586" r="9"/>
    <circle class="port" cx="584" cy="630" r="9"/>
    <circle class="port active" cx="962" cy="286" r="9"/>
    <circle class="port" cx="1015" cy="345" r="9"/>
    <circle class="port active" cx="962" cy="586" r="9"/>
    <circle class="port" cx="1015" cy="630" r="9"/>
    <g class="core-breath">
      <circle class="core-shell" cx="800" cy="455" r="193"/>
      <circle class="inner-ring" cx="800" cy="455" r="158"/>
      <circle class="dash-ring" cx="800" cy="455" r="142"/>
      <circle class="inner-ring" cx="800" cy="455" r="104" opacity=".4"/>
    </g>
    <path d="M 725 424 C 730 398 742 382 757 372" class="icon-green"/>
    <path d="M757 372 L748 372 L754 380" class="icon-green"/>
    <path d="M 873 486 C 868 512 856 528 841 538" class="icon-green"/>
    <path d="M841 538 L850 538 L844 530" class="icon-green"/>
    <g id="bridgly-core-logo" transform="translate(800,455)">
      <line x1="0" y1="-16" x2="0" y2="-72" class="icon-green" stroke-width="10"/>
      <line x1="-18" y1="-2" x2="-68" y2="-20" class="icon-stroke" stroke-width="9"/>
      <line x1="18" y1="-2" x2="68" y2="-20" class="icon-stroke" stroke-width="9"/>
      <line x1="-12" y1="18" x2="-46" y2="64" class="icon-stroke" stroke-width="9"/>
      <line x1="12" y1="18" x2="46" y2="64" class="icon-stroke" stroke-width="9"/>
      <circle cx="0" cy="0" r="18" class="fill-charcoal"/>
      <circle cx="0" cy="-72" r="6" class="fill-green"/>
      <circle cx="-68" cy="-20" r="6" class="fill-charcoal"/>
      <circle cx="68" cy="-20" r="6" class="fill-charcoal"/>
      <circle cx="-46" cy="64" r="6" class="fill-charcoal"/>
      <circle cx="46" cy="64" r="6" class="fill-charcoal"/>
    </g>
  </g>

  <g id="controls">
    <rect class="control-pill" x="190" y="835" rx="40" width="1220" height="86"/>
    <g transform="translate(250,878)"><path d="M18 -22 L36 -14 V2 C36 14 28 24 18 29 C8 24 0 14 0 2 V-14 Z" class="icon-stroke"/><path d="M12 2 L17 7 L27 -6" class="icon-green"/><text class="pill-text" x="58" y="8">Governed</text></g>
    <line class="divider" x1="504" y1="851" x2="504" y2="905"/>
    <g transform="translate(548,878)"><path d="M8 -2 V-10 A10 10 0 0 1 28 -10 V-2" class="icon-stroke"/><rect x="4" y="-2" width="28" height="28" rx="4" class="icon-stroke"/><path d="M14 12 L18 16 L24 8" class="icon-green"/><text class="pill-text" x="58" y="8">Trusted</text></g>
    <line class="divider" x1="718" y1="851" x2="718" y2="905"/>
    <g transform="translate(760,878)"><circle cx="6" cy="0" r="4" class="fill-green"/><circle cx="28" cy="-18" r="4" class="fill-green"/><circle cx="36" cy="14" r="4" class="fill-green"/><circle cx="58" cy="0" r="4" class="fill-green"/><path d="M10 -1 L24 -14 M10 1 L32 12 M32 -16 L54 -2 M40 13 L54 2" class="icon-stroke"/><text class="pill-text" x="88" y="8">Connected</text></g>
    <line class="divider" x1="930" y1="851" x2="930" y2="905"/>
    <g transform="translate(977,878)"><path d="M18 -18 C6 -18 -2 -8 -2 4 C-2 15 6 25 18 25 C30 25 38 15 38 4 C38 -8 30 -18 18 -18 Z" class="icon-stroke"/><path d="M10 -4 H26 M10 4 H22 M10 12 H26" class="icon-green"/><path d="M18 -26 V-18 M18 25 V33 M-10 4 H-2 M38 4 H46" class="icon-stroke"/><text class="pill-text" x="58" y="8">Intelligent</text></g>
    <line class="divider" x1="1160" y1="851" x2="1160" y2="905"/>
    <g transform="translate(1200,878)"><path d="M12 -18 C 24 -28 42 -28 54 -18 M54 -18 V-30 M54 -18 H42" class="icon-green"/><path d="M60 12 C 50 24 30 26 16 18 M16 18 V30 M16 18 H28" class="icon-green"/><path d="M4 10 C -2 -4 0 -18 10 -28 M10 -28 H0 M10 -28 V-16" class="icon-green"/><path d="M62 -2 C 68 10 67 26 58 34 M58 34 H70 M58 34 V22" class="icon-green"/><text class="pill-text" x="82" y="8">Adaptive</text></g>
  </g>
</svg>`;

export function BridglyOperatingLens() {
  return (
    <div className="bridgly-operating-lens">
      <div
        aria-label="Bridgly operating lens visual"
        className="bridgly-operating-lens__frame"
        dangerouslySetInnerHTML={{ __html: operatingLensSvg }}
      />
    </div>
  );
}
