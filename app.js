/* =========================================================
   Eco-Sorter STEM — application logic
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = (n) => Number(n).toLocaleString("id-ID");
const ico = (id, size = 18, cls = "") => `<svg width="${size}" height="${size}" class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;

/* ---------------- Palette & illustrations ---------------- */
const CAT_META = {
  organik: { a: "#7FD08A", b: "#4FAE68", lid: "#3E9E58", stroke: "#2C7A44" },
  daur:    { a: "#8FC4F0", b: "#5A97D6", lid: "#4A88C8", stroke: "#2F6196" },
  b3:      { a: "#F09583", b: "#D95C48", lid: "#C94E3B", stroke: "#9E342C" },
  residu:  { a: "#B9BCC6", b: "#8A8E9A", lid: "#7A7E8A", stroke: "#5E626C" }
};
let artUid = 0;

function recycleIcon(color) {
  const arrow = `<path d="M0 -9.5 L4.2 -2.2 L0.9 -2.2 L0.9 2.6 L-2.4 2.6 L-2.4 -2.2 L-4.2 -2.2 Z" fill="${color}"/>`;
  return `<g transform="translate(65 90)">
    <g>${arrow}</g>
    <g transform="rotate(120)">${arrow}</g>
    <g transform="rotate(240)">${arrow}</g>
    <circle r="2.8" fill="#fff"/>
  </g>`;
}

function binSvg(type, opts = {}) {
  const c = CAT_META[type];
  const { x = 0, y = 0, s = 1 } = opts;
  const id = "bg" + (++artUid);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c.a}"/><stop offset="1" stop-color="${c.b}"/>
      </linearGradient>
    </defs>
    <ellipse cx="65" cy="127" rx="45" ry="7" fill="#1b3f2d" opacity=".12"/>
    <rect x="49" y="10" width="32" height="8" rx="4" fill="${c.lid}" stroke="${c.stroke}" stroke-width="2.4"/>
    <rect x="26" y="17" width="78" height="13" rx="6" fill="${c.lid}" stroke="${c.stroke}" stroke-width="2.4"/>
    <path d="M32 30h66l-6 82a7 7 0 0 1-7 6H45a7 7 0 0 1-7-6z" fill="url(#${id})" stroke="${c.stroke}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="55" cy="60" r="2.7" fill="#1c3b2b"/><circle cx="75" cy="60" r="2.7" fill="#1c3b2b"/>
    <path d="M58 67q7 6 14 0" stroke="#1c3b2b" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <circle cx="48" cy="65" r="3.4" fill="#F58C8C" opacity=".5"/><circle cx="82" cy="65" r="3.4" fill="#F58C8C" opacity=".5"/>
    <circle cx="65" cy="90" r="16" fill="#fff"/>
    ${recycleIcon(c.b)}
  </g>`;
}

function categoryArt(type) {
  const extra = {
    organik: `
      <path d="M10 108c10-12 22-18 34-17-3 12-14 21-30 22z" fill="#8DD47D" stroke="#3E8B4A" stroke-width="2.4"/>
      <path d="M4 118c8-8 17-12 26-11-2 9-11 15-22 15z" fill="#B4DD7C" stroke="#3E8B4A" stroke-width="2.4"/>
      <path d="M30 120c6-16 16-26 30-30 2 14-8 26-24 32z" fill="#FFD75C" stroke="#C99A16" stroke-width="2.4"/>`,
    daur: `
      <rect x="2" y="62" width="20" height="50" rx="6" fill="#CDEFFB" stroke="#3F8AA8" stroke-width="2.4"/>
      <rect x="7" y="54" width="10" height="10" rx="2" fill="#2F9EC4"/>
      <path d="M2 82h20" stroke="#6FC7E4" stroke-width="4"/>
      <rect x="112" y="74" width="24" height="38" rx="4" fill="#E0B078" stroke="#A16F35" stroke-width="2.4"/>
      <path d="M112 86h24" stroke="#A16F35" stroke-width="2.4"/>
      <rect x="18" y="96" width="18" height="20" rx="3" fill="#F3C25C" stroke="#A97616" stroke-width="2.4"/>`,
    b3: `
      <rect x="8" y="70" width="18" height="40" rx="5" fill="#A8BCC6" stroke="#445C67" stroke-width="2.4"/>
      <rect x="8" y="70" width="18" height="13" rx="4" fill="#F5A623"/>
      <path d="M17 92l-4 7h4l-2 7 6-9h-4z" fill="#FFE066"/>
      <path d="M108 82a10 10 0 1 1 20 0c0 6-4 8-5 13h-10c-1-5-5-7-5-13z" fill="#FFF3B0" stroke="#B58A14" stroke-width="2.4"/>
      <rect x="111" y="97" width="14" height="10" rx="3" fill="#9FB3BD" stroke="#445C67" stroke-width="2"/>`,
    residu: `
      <path d="M6 92q10-7 22 0l-4 30H10z" fill="#F7F4FA" stroke="#8F94A3" stroke-width="2.4"/>
      <path d="M10 100q8 5 16 0" stroke="#C3C7D1" stroke-width="2.4" fill="none"/>
      <rect x="106" y="92" width="22" height="28" rx="5" fill="#F6F1FA" stroke="#8F94A3" stroke-width="2.4"/>
      <path d="M111 102h12" stroke="#C3B7D1" stroke-width="3"/>`
  }[type];
  return `<svg viewBox="0 0 140 136" aria-hidden="true">${binSvg(type, { x: 6, y: 2, s: .92 })}${extra}</svg>`;
}
const CATEGORY_ART = {
  organik: categoryArt("organik"),
  daur: categoryArt("daur"),
  b3: categoryArt("b3"),
  residu: categoryArt("residu")
};
const binArt = (type) => `<svg viewBox="0 0 130 136" aria-hidden="true">${binSvg(type)}</svg>`;

/* ---------------- Scenery illustrations ---------------- */
function heroArt() {
  return `<svg viewBox="0 0 340 200" aria-hidden="true">
    <circle cx="252" cy="96" r="82" fill="#EAF8CE"/>
    <ellipse cx="176" cy="177" rx="152" ry="15" fill="#7FB86B" opacity=".35"/>
    <ellipse cx="176" cy="169" rx="138" ry="13" fill="#8FCB77"/>
    ${binSvg("organik", { x: 172, y: 34, s: .95 })}
    <g transform="translate(96 82)">
      <rect x="8" y="0" width="12" height="9" rx="2" fill="#2F8FC4"/>
      <path d="M5 9h18l4 12v42a6 6 0 0 1-6 6H7a6 6 0 0 1-6-6V21z" fill="#BDEBFA" stroke="#2F7FA8" stroke-width="2.6"/>
      <rect x="1" y="30" width="26" height="14" fill="#6FC7E4"/>
    </g>
    <g transform="translate(62 106)">
      <rect x="4" y="4" width="28" height="48" rx="6" fill="#E2594F" stroke="#7A2A22" stroke-width="2.6"/>
      <ellipse cx="18" cy="5" rx="14" ry="4" fill="#DDE6E8"/>
      <rect x="4" y="20" width="28" height="15" fill="#fff"/>
    </g>
    <path d="M36 128c8-10 18-15 28-14-3 10-12 17-25 18z" fill="#8DD47D" stroke="#3E8B4A" stroke-width="2.2"/>
    <path d="M48 148c5-12 13-20 24-23 1 11-7 20-19 25z" fill="#B4DD7C" stroke="#3E8B4A" stroke-width="2.2"/>
    <g fill="#fff" opacity=".9">
      <path d="M292 58l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/>
      <path d="M78 48l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>
    </g>
  </svg>`;
}

function trophyArt() {
  return `<svg viewBox="0 0 300 190" aria-hidden="true">
    <circle cx="150" cy="96" r="84" fill="#F1F9DC" opacity=".85"/>
    <ellipse cx="150" cy="168" rx="108" ry="13" fill="#9BC97C" opacity=".5"/>
    <g transform="translate(58 30)">
      ${binSvg("organik", { x: 0, y: 0, s: 1.02 })}
      <g transform="translate(42 6)">
        <path d="M0 0c-9 4-13 11-13 18 0 8 6 13 13 13s13-5 13-13c0-7-4-14-13-18z" fill="#6BBE7A"/>
        <path d="M0 6v20M0 16l-6-5M0 20l6-5" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".9" fill="none"/>
      </g>
    </g>
    <g transform="translate(196 84)">
      <rect x="0" y="28" width="15" height="28" rx="4" fill="#A8D98E"/>
      <rect x="20" y="14" width="15" height="42" rx="4" fill="#7FC56E"/>
      <rect x="40" y="0" width="15" height="56" rx="4" fill="#4E9E58"/>
      <path d="M4 22c14-4 28-16 44-24" fill="none" stroke="#2E7D4F" stroke-width="4" stroke-linecap="round"/>
      <path d="M48 -2l-10 1 5-9z" fill="#2E7D4F"/>
    </g>
    <g fill="#fff" opacity=".95">
      <path d="M232 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/>
      <path d="M92 48l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>
    </g>
  </svg>`;
}

/* ---------------- Badge art ---------------- */
function sealPoints(cx, cy, r1, r2, n = 12) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? r2 : r1;
    const a = (Math.PI / n) * i - Math.PI / 2;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  return pts.join(" ");
}
function sealBadge(c1, c2) {
  return `<svg viewBox="0 0 64 64" aria-hidden="true">
    <polygon points="${sealPoints(32, 32, 29, 24.5)}" fill="${c1}"/>
    <circle cx="32" cy="32" r="21" fill="${c2}"/>
    <g transform="translate(32 32)" fill="#fff">
      <path d="M0 -9 L4 -2.2 H1 V3 H-1 V-2.2 H-4 Z"/>
      <path d="M0 -9 L4 -2.2 H1 V3 H-1 V-2.2 H-4 Z" transform="rotate(120)"/>
      <path d="M0 -9 L4 -2.2 H1 V3 H-1 V-2.2 H-4 Z" transform="rotate(240)"/>
      <circle r="3" fill="${c2}"/>
    </g>
  </svg>`;
}
function badgeArt(kind) {
  switch (kind) {
    case "seal": return sealBadge("#7FD08A", "#3E9E58");
    case "recycle": return sealBadge("#9AC8F0", "#4E8BD0");
    case "plant": return `<svg viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="32" cy="52" rx="17" ry="6" fill="#8B5A2B"/>
      <path d="M32 50V28" stroke="#4E8B3A" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 38c-8 0-14-5-15-13 8-1 14 4 15 13z" fill="#7CCB6A"/>
      <path d="M32 32c7 0 13-5 14-13-8-1-13 4-14 13z" fill="#5FB85A"/>
      <path d="M32 44c-6 0-11-3-13-9 6-1 11 2 13 9z" fill="#9ADB84"/>
    </svg>`;
    case "target": return `<svg viewBox="0 0 64 64" aria-hidden="true">
      <polygon points="${sealPoints(32, 34, 27, 23)}" fill="#E9B94A"/>
      <circle cx="32" cy="34" r="19" fill="#F7D98A"/>
      <circle cx="32" cy="34" r="12" fill="#FFF4D6"/>
      <circle cx="32" cy="34" r="6" fill="#E9B94A"/>
      <circle cx="32" cy="34" r="2.4" fill="#B98520"/>
      <path d="M32 34 46 18" stroke="#B98520" stroke-width="3" stroke-linecap="round"/>
      <path d="M46 18l-7 1 4-6z" fill="#B98520"/>
    </svg>`;
    case "earth": return `<svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="24" fill="#6EA9E6"/>
      <path d="M18 22c6-6 12-4 16 0s-2 8-8 9-9 5-8 9-6 2-8-4 2-10 8-14z" fill="#7CCB6A"/>
      <path d="M40 34c5-2 10 1 11 6s-4 8-9 7-7-4-6-8 1-4 4-5z" fill="#7CCB6A"/>
      <circle cx="24" cy="20" r="5" fill="#fff" opacity=".25"/>
    </svg>`;
    case "trophy": return `<svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M22 12h20v13a10 10 0 0 1-20 0z" fill="#E9B94A" stroke="#C9971E" stroke-width="2.5"/>
      <path d="M22 16H15v5a8 8 0 0 0 7 8M42 16h7v5a8 8 0 0 1-7 8" fill="none" stroke="#C9971E" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 35v8" stroke="#C9971E" stroke-width="4"/>
      <rect x="24" y="43" width="16" height="5" rx="2" fill="#D9A93C"/>
      <rect x="19" y="48" width="26" height="6" rx="3" fill="#E7BC55" stroke="#C9971E" stroke-width="2"/>
    </svg>`;
    case "calendar": return `<svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="12" y="16" width="40" height="38" rx="8" fill="#F3B7B2"/>
      <rect x="12" y="16" width="40" height="12" rx="6" fill="#E58E88"/>
      <rect x="21" y="11" width="5" height="10" rx="2.5" fill="#B96B66"/>
      <rect x="38" y="11" width="5" height="10" rx="2.5" fill="#B96B66"/>
      <path d="M32 46c5 0 8-3.5 8-8 0-5.5-5-7-4-14-4.5 2-8 6.5-8 11 0 2-1 3-2 4 1 4.5 3.5 7 6 7z" fill="#F08A3E"/>
      <path d="M32 45c2 0 3.5-1.6 3.5-3.8 0-2.4-2-3.2-1.6-6.2-2 1-3.6 3-3.6 5 0 1-.5 1.5-1 2 .7 1.8 1.6 3 2.7 3z" fill="#FFD66B"/>
    </svg>`;
    case "book": return `<svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="13" y="12" width="38" height="40" rx="6" fill="#6BBE7A"/>
      <rect x="19" y="12" width="4" height="40" fill="#3E8B55"/>
      <path d="M28 24h17M28 32h17M28 40h11" stroke="#EAF8E6" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
    default: return `<svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="m32 8 7.4 15.4 16.6 2.3-12 11.7 2.9 16.6L32 45.9 17.1 54l2.9-16.6-12-11.7 16.6-2.3z" fill="#E9B94A" stroke="#C9971E" stroke-width="2"/>
      <circle cx="26" cy="24" r="3" fill="#FFF1BE" opacity=".8"/>
    </svg>`;
  }
}

/* ---------------- Avatars ---------------- */
const AVATARS = {
  aris: { bg: "#CDEBD8", skin: "#F0C39B", hair: "#3B2A1A", shirt: "#3E8B55", long: false },
  naya: { bg: "#F7D9E4", skin: "#F0C39B", hair: "#2A1B14", shirt: "#E8748F", long: true },
  bima: { bg: "#FBE6B8", skin: "#C98A5B", hair: "#1F140E", shirt: "#E0A33A", long: false }
};
function avatar(kind, size = 40) {
  const a = AVATARS[kind] || AVATARS.aris;
  return `<svg viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true">
    <circle cx="20" cy="20" r="20" fill="${a.bg}"/>
    ${a.long ? `<path d="M8 25c0-10 5-15 12-15s12 5 12 15v7H8z" fill="${a.hair}"/>` : ""}
    <circle cx="20" cy="17" r="7.5" fill="${a.skin}"/>
    <path d="M12.5 16a7.5 7.5 0 0 1 15 0c0-6-3-9-7.5-9s-7.5 3-7.5 9z" fill="${a.hair}"/>
    <circle cx="17.2" cy="17.6" r="1" fill="#2A1B14"/><circle cx="22.8" cy="17.6" r="1" fill="#2A1B14"/>
    <path d="M18.3 20.5q1.7 1.3 3.4 0" stroke="#2A1B14" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <path d="M8 40c1-8 5.5-12 12-12s11 4 12 12z" fill="${a.shirt}"/>
  </svg>`;
}

/* ---------------- Game scene ---------------- */
function treeArt(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-5" y="40" width="10" height="72" rx="4" fill="#8B5A2B"/>
    <circle cx="0" cy="30" r="34" fill="#7CCB6A"/>
    <circle cx="-22" cy="46" r="24" fill="#8FD47C"/>
    <circle cx="24" cy="46" r="24" fill="#6DBE5C"/>
  </g>`;
}
function bottleArt() {
  return `<g>
    <rect x="12" y="0" width="12" height="8" rx="2" fill="#2F8FC4"/>
    <path d="M8 8h20l4 12v42a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6V20z" fill="#BDEBFA" stroke="#2F7FA8" stroke-width="3"/>
    <rect x="4" y="30" width="28" height="14" fill="#6FC7E4"/>
  </g>`;
}
function canArt(c1, c2) {
  return `<g>
    <rect x="4" y="4" width="30" height="54" rx="6" fill="${c1}" stroke="#7A2A22" stroke-width="3"/>
    <ellipse cx="19" cy="5" rx="15" ry="4" fill="#DDE6E8"/>
    <rect x="4" y="20" width="30" height="16" fill="${c2}"/>
  </g>`;
}
function tissueArt() {
  return `<g>
    <rect x="2" y="16" width="40" height="30" rx="5" fill="#F4F7FA" stroke="#B9C2CC" stroke-width="3"/>
    <path d="M12 16c0-8 8-10 12-4 4-6 12-4 12 4z" fill="#fff" stroke="#D5DCE3" stroke-width="2.5"/>
    <path d="M10 30h24" stroke="#D5DCE3" stroke-width="3"/>
  </g>`;
}
function sceneBg() {
  return `<svg class="scene-bg" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#CFEDEA"/><stop offset="1" stop-color="#E6F7ED"/>
      </linearGradient>
      <linearGradient id="hillG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#D7EFB4"/><stop offset="1" stop-color="#C5E49B"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="520" fill="url(#skyG)"/>
    <circle cx="1020" cy="90" r="130" fill="#FBF3C8" opacity=".6"/>
    <g fill="#fff" opacity=".85">
      <ellipse cx="190" cy="110" rx="54" ry="18"/><ellipse cx="230" cy="100" rx="34" ry="16"/>
      <ellipse cx="780" cy="82" rx="44" ry="15"/><ellipse cx="812" cy="74" rx="28" ry="13"/>
      <ellipse cx="930" cy="170" rx="38" ry="13"/><ellipse cx="958" cy="163" rx="24" ry="11"/>
    </g>
    <path d="M0 330 Q150 250 330 310 T680 300 T1000 320 T1200 300 V520 H0Z" fill="#DDF3C4"/>
    <path d="M0 380 Q190 300 420 365 T820 350 T1200 372 V520 H0Z" fill="url(#hillG)"/>
    ${treeArt(120, 300, 1)}
    ${treeArt(1040, 290, .9)}
    ${treeArt(1100, 315, .7)}
    <rect y="410" width="1200" height="110" fill="#CDE9A8"/>
    <path d="M0 438 Q300 412 600 438 T1200 432 V520 H0Z" fill="#BFDF9B"/>
    <g class="conveyor-group">
      <!-- Kaki penyangga conveyor -->
      <rect x="180" y="390" width="15" height="48" rx="4" fill="#3B4740"/>
      <rect x="660" y="390" width="15" height="48" rx="4" fill="#3B4740"/>
      <rect x="980" y="390" width="15" height="48" rx="4" fill="#3B4740"/>
      <!-- Sabuk Conveyor Belt -->
      <rect x="26" y="356" width="1148" height="34" rx="17" fill="#45534C"/>
      <rect x="42" y="364" width="1116" height="5" rx="3" fill="#5C6B61" opacity=".65"/>
      <!-- Track bergaris yang bergerak terus menerus -->
      <path class="conveyor-moving-track" d="M42 373h1116" stroke="#93A79A" stroke-width="4" stroke-dasharray="18 22" stroke-linecap="round" opacity=".85"/>
      <!-- Roller kiri yang berputar -->
      <g class="conveyor-wheel wheel-left">
        <circle cx="44" cy="373" r="18" fill="#3B4740" stroke="#2E3833" stroke-width="4"/>
        <circle cx="44" cy="373" r="6" fill="#2E3833"/>
        <line x1="44" y1="358" x2="44" y2="388" stroke="#829487" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="29" y1="373" x2="59" y2="373" stroke="#829487" stroke-width="2.5" stroke-linecap="round"/>
      </g>
      <!-- Roller kanan yang berputar -->
      <g class="conveyor-wheel wheel-right">
        <circle cx="1156" cy="373" r="18" fill="#3B4740" stroke="#2E3833" stroke-width="4"/>
        <circle cx="1156" cy="373" r="6" fill="#2E3833"/>
        <line x1="1156" y1="358" x2="1156" y2="388" stroke="#829487" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="1141" y1="373" x2="1171" y2="373" stroke="#829487" stroke-width="2.5" stroke-linecap="round"/>
      </g>
    </g>
    <!-- Sampah yang mengantre di atas conveyor belt -->
    <g class="conveyor-items">
      <g transform="translate(960 292)">${bottleArt()}</g>
      <g transform="translate(1030 304)">${canArt("#E2594F", "#fff")}</g>
      <g transform="translate(1090 304)">${canArt("#3E4C58", "#E2594F")}</g>
      <g transform="translate(1146 310)">${tissueArt()}</g>
    </g>
    <g fill="#fff" opacity=".9">
      <path d="M700 190l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/>
      <path d="M880 250l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>
    </g>
    <g fill="#8FD07A" opacity=".8">
      <path d="M540 210c-10-4-16-12-16-22 10 0 18 6 20 16z"/>
      <path d="M560 320c8-6 18-7 26-2-4 8-14 12-24 8z"/>
    </g>
  </svg>`;
}

/* ---------------- Content ---------------- */
const CATEGORIES = [
  { id: "organik", name: "Organik", chip: "Organik", card: "mint", badge: "Tempat sampah hijau",
    desc: ["Kulit buah, sisa makanan, daun", "Olah menjadi kompos"],
    detail: "Sampah organik adalah sampah yang berasal dari makhluk hidup — seperti tumbuhan dan hewan — yang bisa terurai secara alami dengan bantuan mikroorganisme seperti bakteri dan jamur.",
    examples: ["Kulit buah & sayur", "Daun kering & ranting", "Sisa nasi & makanan", "Cangkang telur"],
    traits: ["Berasal dari makhluk hidup", "Mudah membusuk dalam hitungan hari–minggu", "Kaya unsur hara seperti nitrogen dan kalium", "Bisa diubah jadi kompos atau biopori"],
    exampleDetails: [
      { n: "Kulit buah & sayur", d: "Mengandung kalium dan vitamin, sehingga cepat menjadi kompos subur." },
      { n: "Daun & ranting", d: "Dicacah halus bisa jadi mulsa yang menjaga kelembapan tanah." },
      { n: "Sisa nasi & makanan", d: "Masih bisa dijadikan pakan ternak atau campuran kompos." },
      { n: "Cangkang telur", d: "Sumber kalsium alami untuk menyuburkan tanaman." }
    ],
    steps: ["Pisahkan dari sampah plastik dan kertas sejak di rumah.", "Potong atau cacah kecil supaya lebih cepat terurai.", "Masukkan ke komposter, lubang biopori, atau tong hijau.", "Siram secukupnya lalu biarkan mikroorganisme bekerja."],
    why: "Kalau tercampur plastik, kompos jadi terkontaminasi mikroplastik dan tidak bisa dipakai. Memisahkan sampah organik bisa mengurangi sampah yang dibuang ke TPA sampai sekitar 50%.",
    fact: "Dalam ± 3 bulan, 1 kg sampah organik bisa berubah menjadi sekitar 0,5 kg kompos yang siap menyuburkan tanah.",
    dont: ["Membakar daun kering (mencemar udara)", "Mencampur sisa makanan dengan plastik", "Membuang sisa kuah ke saluran air"],
    tip: "Dapat diolah menjadi pupuk kompos atau biopori." },
  { id: "daur", name: "Daur Ulang", chip: "Daur Ulang", card: "blue", badge: "Tempat sampah kuning / biru",
    desc: ["Botol, plastik, kertas, kaleng", "Bersihkan lalu daur ulang"],
    detail: "Sampah daur ulang adalah sampah yang sulit terurai secara alami, tetapi bernilai ekonomi karena bisa diolah kembali menjadi bahan atau barang baru, misalnya kertas, plastik, logam, dan kaca.",
    examples: ["Botol & gelas plastik", "Kertas & kardus bersih", "Kaleng aluminium", "Botol kaca"],
    traits: ["Butuh puluhan hingga ratusan tahun untuk terurai", "Memiliki nilai jual di Bank Sampah", "Bisa diolah menjadi bahan baru", "Harus bersih dan kering sebelum dikumpulkan"],
    exampleDetails: [
      { n: "Botol plastik PET", d: "Dilebur dan dipintal jadi serat polyester untuk pakaian." },
      { n: "Kertas & kardus", d: "Digiling jadi pulp lalu dibuat kertas baru lagi." },
      { n: "Kaleng aluminium", d: "Bisa didaur ulang berulang kali tanpa kehilangan mutu." },
      { n: "Botol kaca", d: "Dilebur kembali menjadi botol baru berkali-kali." }
    ],
    steps: ["Kosongkan isi botol atau kemasan sampai bersih.", "Bilas dan keringkan agar tidak berjamur.", "Pipihkan kardus dan kaleng supaya hemat ruang.", "Serahkan ke Bank Sampah atau tong daur ulang."],
    why: "Mendaur ulang 1 ton kertas bisa menyelamatkan sekitar 17 pohon dan menghemat ribuan liter air. Plastik yang tidak dipilah berakhir di laut dan bisa dimakan ikan.",
    fact: "Kaleng aluminium bisa didaur ulang tanpa batas dan menghemat sampai 95% energi dibanding membuat aluminium baru.",
    dont: ["Membakar plastik di halaman", "Mencampur kertas berminyak dengan kertas bersih", "Membuang botol ke sungai atau selokan"],
    tip: "Bersihkan dan pipihkan kemasan sebelum diserahkan ke Bank Sampah." },
  { id: "b3", name: "B3", chip: "B3", card: "peach", badge: "Tempat sampah merah",
    desc: ["Baterai, lampu, obat kedaluwarsa", "Serahkan ke tempat khusus"],
    detail: "B3 adalah singkatan dari Bahan Berbahaya dan Beracun. Sampah jenis ini mengandung zat yang bisa membahayakan kesehatan manusia, makhluk hidup, dan lingkungan jika dibuang sembarangan.",
    examples: ["Baterai bekas", "Lampu neon / LED rusak", "Kaleng aerosol / cat", "Obat kedaluwarsa"],
    traits: ["Mengandung zat beracun, korosif, atau mudah terbakar", "Bisa mencemari tanah, air, dan udara", "Membutuhkan penanganan serta tempat khusus", "Tidak boleh dicampur dengan sampah biasa"],
    exampleDetails: [
      { n: "Baterai bekas", d: "Mengandung logam berat seperti merkuri, kadmium, dan timbal." },
      { n: "Lampu neon / LED", d: "Berisi merkuri dan komponen elektronik yang sensitif." },
      { n: "Kaleng aerosol / cat", d: "Bertekanan, mudah terbakar, dan berisi bahan kimia." },
      { n: "Obat kedaluwarsa", d: "Senyawanya bisa mengganggu ekosistem air jika terbuang." }
    ],
    steps: ["Jangan dibuka, dipotong, atau dibakar.", "Simpan terpisah di wadah kering dan aman.", "Beri label 'B3' supaya mudah dikenali petugas.", "Serahkan ke titik pengumpulan limbah B3 terdekat."],
    why: "Satu baterai yang dibuang ke tanah bisa mencemari ribuan liter air tanah. Logam beratnya masuk ke rantai makanan dan akhirnya sampai ke manusia.",
    fact: "Merkuri dari satu lampu neon saja mampu mencemari hingga puluhan ribu liter air bersih.",
    dont: ["Membuang baterai ke tong sampah biasa", "Mengubur limbah B3 di kebun", "Membakar kaleng aerosol atau cat"],
    tip: "Selalu pisahkan dari sampah biasa dan serahkan ke titik pengumpulan B3." },
  { id: "residu", name: "Residu", chip: "Residu", card: "lavender", badge: "Tempat sampah abu-abu",
    desc: ["Tisu, popok, plastik berlapis", "Bungkus dan buang dengan aman"],
    detail: "Sampah residu adalah sampah yang sudah tidak bisa didaur ulang, dikompos, atau dimanfaatkan lagi. Karena sering mengandung kuman, sampah ini harus dibungkus dan dibuang dengan aman.",
    examples: ["Tisu kotor", "Popok bekas", "Plastik berlapis", "Pensil bekas"],
    traits: ["Tidak bisa didaur ulang maupun dikompos", "Sering mengandung kuman atau bau", "Harus dibungkus sebelum dibuang", "Jumlahnya bisa ditekan dengan barang pakai ulang"],
    exampleDetails: [
      { n: "Tisu kotor", d: "Seratnya sudah rusak, jadi tidak bisa dibuat kertas lagi." },
      { n: "Popok bekas", d: "Mengandung kuman, jadi perlu dibungkus rapat sebelum dibuang." },
      { n: "Plastik berlapis", d: "Campuran plastik dan aluminium sulit dipisahkan." },
      { n: "Pensil bekas", d: "Ukurannya terlalu kecil dan tidak bernilai daur ulang." }
    ],
    steps: ["Bungkus sampah rapat dengan kertas atau kantong.", "Ikat atau perekat supaya tidak terlepas.", "Berikan tanda 'Residu' jika perlu.", "Masukkan ke tong abu-abu agar diambil petugas kebersihan."],
    why: "Residu yang dibiarkan terbuka menyebarkan bau dan kuman ke sampah lain. Akibatnya sampah organik dan daur ulang ikut tercemar dan tidak bisa diolah.",
    fact: "Cara paling ampuh mengurangi residu adalah membawa tumbler dan wadah makan sendiri dari rumah.",
    dont: ["Mencampur residu dengan sampah organik", "Membiarkan popok bekas terbuka", "Membakar sampah residu di halaman"],
    tip: "Bungkus rapat sebelum membuang agar tidak menyebarkan bau dan kuman." }
];

const BIN_DESC = {
  organik: "Sisa makanan & daun",
  daur: "Botol, plastik, kertas",
  b3: "Baterai, lampu, obat",
  residu: "Tisu, popok, limbah"
};

const LEVELS = [
  { id: 1, name: "Taman Sekolah", sub: "Zona hijau & halaman", items: [
    { name: "Daun Kering", bin: "organik", hint: "Tempat sampah ini cocok untuk sisa tumbuhan yang mudah membusuk.", fact: "Daun kering bisa diolah menjadi pupuk kompos untuk menyuburkan tanaman!", svg: `<svg viewBox="0 0 96 96"><path d="M74 20C42 22 22 42 22 70c28 0 50-18 52-50z" fill="#d9822b" stroke="#6e3b0c" stroke-width="4"/><path d="M18 76c14-14 30-30 48-46M38 56l-10-4M48 46l-10-4M46 56l4 10" stroke="#6e3b0c" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>` },
    { name: "Botol Plastik", bin: "daur", hint: "Bahan plastik PET ini bisa dibersihkan lalu didaur ulang.", fact: "Botol plastik butuh ratusan tahun untuk terurai, tapi bisa didaur ulang jadi serat baru.", svg: `<svg viewBox="0 0 96 96"><rect x="40" y="12" width="16" height="10" rx="3" fill="#0d88a8"/><path d="M38 22h20l8 14v40a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8V36z" fill="#9ee8fa" stroke="#084c61" stroke-width="4"/><rect x="30" y="45" width="36" height="18" fill="#32b8d9"/></svg>` },
    { name: "Kulit Pisang", bin: "organik", hint: "Sisa buah alami ini cepat terurai dan bagus untuk kompos.", fact: "Kulit pisang kaya kalium dan sangat bagus dijadikan kompos alami.", svg: `<svg viewBox="0 0 96 96"><path d="M22 64c12-18 28-30 48-34 4-1 7 2 5 6-10 22-28 36-50 38-6 1-8-4-3-10z" fill="#ffd43b" stroke="#8c6200" stroke-width="4"/><path d="M36 52c8 10 14 18 14 26" stroke="#e6a800" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>` },
    { name: "Kertas Bekas", bin: "daur", hint: "Kertas bersih masih bisa diolah kembali menjadi kertas baru.", fact: "Mendaur ulang 1 ton kertas dapat menyelamatkan belasan pohon di hutan!", svg: `<svg viewBox="0 0 96 96"><path d="M26 16h32l14 14v50H26z" fill="#fff" stroke="#3c6270" stroke-width="4"/><path d="M58 16v14h14" fill="#d5edf2" stroke="#3c6270" stroke-width="4"/><path d="M36 42h24M36 54h24M36 66h16" stroke="#78a6b5" stroke-width="4"/></svg>` },
    { name: "Baterai Bekas", bin: "b3", hint: "Benda ini mengandung bahan kimia berbahaya bagi tanah dan air.", fact: "Baterai termasuk limbah B3 yang harus dipisahkan agar tidak mencemari air tanah.", svg: `<svg viewBox="0 0 96 96"><rect x="40" y="14" width="16" height="8" rx="2" fill="#8fa3ad"/><rect x="30" y="22" width="36" height="58" rx="8" fill="#465963" stroke="#222d33" stroke-width="4"/><rect x="30" y="22" width="36" height="22" rx="6" fill="#ff9f1c"/><path d="M50 50l-7 11h6l-2 10 8-12h-6z" fill="#ffd43b"/></svg>` },
    { name: "Kaleng Minuman", bin: "daur", hint: "Logam aluminium ini bernilai tinggi untuk didaur ulang.", fact: "Aluminium bisa didaur ulang berkali-kali tanpa kehilangan kualitasnya.", svg: `<svg viewBox="0 0 96 96"><rect x="30" y="20" width="36" height="56" rx="8" fill="#e8594f" stroke="#751d17" stroke-width="4"/><ellipse cx="48" cy="20" rx="18" ry="5" fill="#d5e2e6"/><rect x="30" y="38" width="36" height="20" fill="#fff" opacity=".88"/></svg>` }
  ]},
  { id: 2, name: "Kantin Sekolah", sub: "Zona jajan & makan", items: [
    { name: "Sisa Apel", bin: "organik", hint: "Sisa makanan alami ini mudah terurai menjadi kompos.", fact: "Sisa apel bisa dijadikan kompos atau dimasukkan ke lubang biopori di kebun sekolah.", svg: `<svg viewBox="0 0 96 96"><path d="M48 26c-12-4-24 6-24 22 0 18 12 30 24 28 12 2 24-10 24-28 0-16-12-26-24-22z" fill="#ef4747" stroke="#7a1818" stroke-width="4"/><path d="M48 26c0-8 4-12 10-14" stroke="#593718" stroke-width="4" fill="none"/><path d="M50 18c8-4 14 0 14 6-6 2-12 0-14-6z" fill="#5ec443"/></svg>` },
    { name: "Kotak Susu", bin: "daur", hint: "Kemasan karton ini bisa didaur ulang setelah dibersihkan.", fact: "Bilas dan pipihkan kotak susu sebelum memasukkan ke tempat daur ulang.", svg: `<svg viewBox="0 0 96 96"><path d="M30 34h36v46H30z" fill="#fff" stroke="#22577a" stroke-width="4"/><path d="M30 34l10-14h16l10 14z" fill="#72c6ef" stroke="#22577a" stroke-width="4"/><rect x="30" y="50" width="36" height="16" fill="#4aaee3"/></svg>` },
    { name: "Bungkus Snack", bin: "residu", hint: "Kemasan plastik berlapis ini tidak bisa didaur ulang.", fact: "Kemasan berlapis sulit didaur ulang, jadi buang ke residu dan kurangi jajanan sekali pakai.", svg: `<svg viewBox="0 0 96 96"><path d="M26 22l44 0-4 52-36 0z" fill="#ff7043" stroke="#7d290f" stroke-width="4"/><path d="M24 22l8-6 8 6 8-6 8 6 8-6 8 6" stroke="#7d290f" stroke-width="3.5" fill="none"/><circle cx="48" cy="48" r="11" fill="#ffd54f"/></svg>` },
    { name: "Gelas Plastik", bin: "daur", hint: "Plastik bening bekas minuman ini masih bisa didaur ulang.", fact: "Membawa tumbler sendiri membantu mengurangi sampah gelas plastik.", svg: `<svg viewBox="0 0 96 96"><path d="M28 32h40l-6 46H34z" fill="#d9f4ff" stroke="#1b6782" stroke-width="4"/><path d="M26 32c0-10 44-10 44 0z" fill="#9ee3fc" stroke="#1b6782" stroke-width="4"/><path d="M52 14l-4 18" stroke="#ff5c77" stroke-width="5"/></svg>` },
    { name: "Kaleng Aerosol", bin: "b3", hint: "Wadah bertekanan ini berisi bahan kimia berbahaya.", fact: "Kaleng aerosol tidak boleh dibakar dan harus dipisahkan sebagai limbah B3.", svg: `<svg viewBox="0 0 96 96"><rect x="42" y="14" width="12" height="10" rx="2" fill="#e63946"/><path d="M32 34c0-6 8-10 16-10s16 4 16 10v44H32z" fill="#a8dadc" stroke="#244a54" stroke-width="4"/><polygon points="48,42 58,60 38,60" fill="#ffb703"/></svg>` },
    { name: "Tisu Kotor", bin: "residu", hint: "Tisu bekas ini tidak bisa didaur ulang, bungkus lalu buang.", fact: "Tisu kotor harus dibungkus dan dibuang ke tempat sampah residu agar kuman tidak menyebar.", svg: `<svg viewBox="0 0 96 96"><path d="M24 26q22-10 48 0l-6 48-36 0z" fill="#fff" stroke="#a89bb5" stroke-width="4"/><path d="M34 44q14 8 28 0M34 58q12 6 24 0" stroke="#c6bdd1" stroke-width="3" fill="none"/></svg>` }
  ]},
  { id: 3, name: "Jalan Depan Sekolah", sub: "Zona gerbang & trotoar", items: [
    { name: "Botol Kaca", bin: "daur", hint: "Kaca utuh bisa dilebur dan didaur ulang kembali.", fact: "Kaca dapat didaur ulang 100% terus-menerus jika dipisahkan dengan aman.", svg: `<svg viewBox="0 0 96 96"><path d="M42 14h12v14l10 14v36a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6V42l10-14z" fill="#80ed99" stroke="#1b6b3a" stroke-width="4"/></svg>` },
    { name: "Lampu LED Bekas", bin: "b3", hint: "Komponen elektronik ini harus ditangani secara khusus.", fact: "Lampu bekas termasuk limbah elektronik (B3) agar tidak mencemari lingkungan.", svg: `<svg viewBox="0 0 96 96"><path d="M32 40a16 16 0 1 1 32 0c0 8-6 13-8 20H40c-2-7-8-12-8-20z" fill="#fff3b0" stroke="#785e00" stroke-width="4"/><rect x="40" y="62" width="16" height="14" rx="4" fill="#9fb3bd"/></svg>` },
    { name: "Kardus Paket", bin: "daur", hint: "Karton tebal ini mudah didaur ulang menjadi kertas baru.", fact: "Lipat kardus agar hemat ruang dan mudah dikirim ke bank sampah.", svg: `<svg viewBox="0 0 96 96"><rect x="20" y="30" width="56" height="44" rx="6" fill="#d49b63" stroke="#6b441d" stroke-width="4"/><path d="M20 42h56M48 30v44" stroke="#6b441d" stroke-width="3.5"/></svg>` },
    { name: "Ranting & Daun", bin: "organik", hint: "Sampah kebun alami ini cepat terurai.", fact: "Daun dan ranting yang dicacah cepat berubah menjadi mulsa penyubur tanah.", svg: `<svg viewBox="0 0 96 96"><path d="M74 20C42 22 22 42 22 70c28 0 50-18 52-50z" fill="#d9822b" stroke="#6e3b0c" stroke-width="4"/><path d="M18 76c14-14 30-30 48-46" stroke="#6e3b0c" stroke-width="3.5" fill="none"/></svg>` },
    { name: "Popok Bekas", bin: "residu", hint: "Popok bekas tidak bisa didaur ulang dan harus dibungkus.", fact: "Popok bekas masuk residu: bungkus rapat agar tidak mengotori lingkungan.", svg: `<svg viewBox="0 0 96 96"><path d="M28 26c14-6 28-6 40 0l6 46c-16 8-36 8-52 0z" fill="#f4eef8" stroke="#9a8ba9" stroke-width="4"/><path d="M34 48q14 8 28 0" stroke="#bcaecb" stroke-width="3" fill="none"/></svg>` },
    { name: "Botol Plastik", bin: "daur", hint: "Botol minuman di pinggir jalan ini bisa didaur ulang.", fact: "Satu botol daur ulang menghemat energi untuk menyalakan lampu berjam-jam.", svg: `<svg viewBox="0 0 96 96"><rect x="40" y="12" width="16" height="10" rx="3" fill="#0d88a8"/><path d="M38 22h20l8 14v40a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8V36z" fill="#9ee8fa" stroke="#084c61" stroke-width="4"/><rect x="30" y="45" width="36" height="18" fill="#32b8d9"/></svg>` }
  ]}
];

const QUIZ = [
  { q: "Kulit pisang dan daun kering sebaiknya dimasukkan ke tempat sampah berwarna apa?", opts: ["Hijau (Organik)", "Merah (B3)", "Kuning (Daur Ulang)", "Abu-abu (Residu)"], answer: 0, fact: "Tepat! Keduanya mudah membusuk sehingga masuk kategori organik (hijau)." },
  { q: "Mengapa baterai bekas tidak boleh dibuang ke tempat sampah biasa?", opts: ["Karena terlalu ringan", "Mengandung zat kimia berbahaya", "Karena bisa dimakan semut", "Karena warnanya menarik"], answer: 1, fact: "Benar! Baterai termasuk limbah B3 karena mengandung logam berat yang mencemari tanah dan air." },
  { q: "Apa langkah terbaik sebelum membuang botol plastik ke tempat daur ulang?", opts: ["Membakarnya dulu", "Mengosongkan dan meremas botol", "Mencampurnya dengan sisa kuah", "Menyimpannya di dalam ruangan"], answer: 1, fact: "Keren! Mengosongkan dan meremas botol menghemat ruang dan menjaga bahan tetap bersih." },
  { q: "Tisu kotor dan popok bekas termasuk sampah apa?", opts: ["Organik", "Daur Ulang", "B3", "Residu"], answer: 3, fact: "Betul! Keduanya tidak bisa didaur ulang, jadi dibungkus dan dibuang ke residu." }
];

/* =========================================================
   Sistem Pengguna & Database Multi-User (Dinamis)
   ========================================================= */
const DB_USERS_KEY = "ecosorter_users_db_v2";
const DB_SESSION_KEY = "ecosorter_active_session_v2";

const LEVEL_TIERS = [
  { level: 0, name: "Penjaga Bumi Pemula", min: 0, max: 300 },
  { level: 1, name: "Penjelajah Taman", min: 300, max: 700 },
  { level: 2, name: "Penjaga Kantin", min: 700, max: 1200 },
  { level: 3, name: "Penjaga Bumi Muda", min: 1200, max: 2000 },
  { level: 4, name: "Pahlawan Kebersihan", min: 2000, max: 3000 },
  { level: 5, name: "Master Penjaga Bumi", min: 3000, max: 5000 }
];

function getLevelTier(poin = 0) {
  let tier = LEVEL_TIERS[0];
  for (let t of LEVEL_TIERS) {
    if (poin >= t.min) tier = t;
  }
  return tier;
}

function createDefaultAccount(id, name, avatarName) {
  return {
    id,
    name,
    avatar: avatarName || "aris",
    poin: 0,
    koin: 0,
    level: 0,
    selected: 1,
    quizDone: false,
    games: 0,
    correct: 0,
    answered: 0,
    missionClaimed: false,
    levels: [{ stars: 0 }, { stars: 0 }, { stars: 0 }],
    cats: { organik: 0, daur: 0, b3: 0, residu: 0 },
    weekly: [0, 0, 0, 0, 0]
  };
}

function getInitialDatabase() {
  return [
    createDefaultAccount("user_aris", "Aris", "aris"),
    createDefaultAccount("user_naya", "Naya", "naya"),
    createDefaultAccount("user_bima", "Bima", "bima")
  ];
}

function loadUsersDatabase() {
  try {
    const raw = localStorage.getItem(DB_USERS_KEY);
    if (!raw) {
      const initial = getInitialDatabase();
      saveUsersDatabase(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initial = getInitialDatabase();
      saveUsersDatabase(initial);
      return initial;
    }
    return parsed;
  } catch {
    const initial = getInitialDatabase();
    saveUsersDatabase(initial);
    return initial;
  }
}

function saveUsersDatabase(users) {
  try {
    localStorage.setItem(DB_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Gagal menyimpan database pengguna:", e);
  }
}

function getActiveUser() {
  const users = loadUsersDatabase();
  let currentId = localStorage.getItem(DB_SESSION_KEY);
  let user = users.find(u => u.id === currentId);
  if (!user) {
    user = users[0];
    localStorage.setItem(DB_SESSION_KEY, user.id);
  }
  user.level = getLevelTier(user.poin || 0).level;
  return user;
}

let currentUser = getActiveUser();
let state = currentUser; // Pointer langsung ke data akun aktif

const save = () => {
  updateLevel();
  const users = loadUsersDatabase();
  const idx = users.findIndex(u => u.id === currentUser.id);
  if (idx !== -1) {
    users[idx] = currentUser;
  } else {
    users.push(currentUser);
  }
  saveUsersDatabase(users);
};

let game = null;
let quiz = { i: 0, answered: false, picked: -1, correct: 0, score: 0 };
let filter = "semua";
let query = "";
let badgeFilter = "semua";

function updateLevel() {
  state.level = getLevelTier(state.poin).level;
}

/* ---------------- Navigation ---------------- */
function showPage(page) {
  const names = { beranda: "Beranda", ensiklopedia: "Ensiklopedia", statistik: "Statistik", pencapaian: "Pencapaian", game: "Permainan", kuis: "Kuis harian" };
  const isGame = page === "game";
  $("#app").hidden = isGame;
  $("#gameRoot").hidden = !isGame;
  ["beranda", "ensiklopedia", "statistik", "pencapaian", "kuis"].forEach(p => {
    const el = $("#page-" + p);
    if (el) el.hidden = p !== page;
  });
  $$(".side-nav button").forEach(b => b.classList.toggle("active", b.dataset.page === page));
  $("#crumb").textContent = names[page] || "Ensiklopedia";
  if (page === "statistik") renderStats();
  if (page === "pencapaian") renderBadges();
  if (page === "kuis") renderQuiz();
  if (!isGame) window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------- Sidebar / topbar ---------------- */
const levelName = () => getLevelTier(state.poin).name;

function renderShell() {
  updateLevel();
  const tier = getLevelTier(state.poin);
  const streakEl = $("#streak");
  if (streakEl) streakEl.textContent = `${state.streak} hari`;
  $("#poinTop").textContent = fmt(state.poin);

  const span = tier.max - tier.min;
  const inTier = Math.max(0, state.poin - tier.min);
  const pct = Math.min(100, Math.round((inTier / span) * 100));

  $("#sideLevel").innerHTML = `
    <div class="lc-top">
      <div class="ring" style="background:conic-gradient(#2C6B4F 0 ${pct}%, rgba(255,255,255,.55) ${pct}% 100%)"><span>${tier.level}</span></div>
      <span class="lc-badge-tag">LVL ${tier.level}</span>
    </div>
    <strong>Level ${tier.level}</strong>
    <p>${tier.name}</p>
    <div class="bar"><span style="width:${pct}%"></span></div>
    <div class="poin">${fmt(state.poin)} / ${fmt(tier.max)} poin</div>`;

  const topAva = $("#topAva");
  if (topAva) topAva.innerHTML = avatar(currentUser.avatar || "aris");
}

function renderLeaderboard() {
  // Papan Peringkat dinonaktifkan
}

/* ---------------- Encyclopedia ---------------- */
function renderChips() {
  const all = ["semua", ...CATEGORIES.map(c => c.id)];
  $("#chips").innerHTML = all.map(id => {
    const label = id === "semua" ? "Semua" : CATEGORIES.find(c => c.id === id).chip;
    return `<button class="chip ${filter === id ? "active" : ""}" data-filter="${id}">${label}</button>`;
  }).join("");
}

function renderEco() {
  const list = CATEGORIES.filter(c => (filter === "semua" || c.id === filter) &&
    (!query || (c.name + " " + c.detail + " " + c.examples.join(" ")).toLowerCase().includes(query)));
  $("#ecoGrid").innerHTML = list.length ? list.map(c => {
    const count = state.cats[c.id] || 0;
    return `<article class="eco-card ${c.card}" data-cat="${c.id}">
      <div class="eco-art">${CATEGORY_ART[c.id]}</div>
      <div class="eco-info">
        <h3>${c.name} <span class="eco-count">${count}x</span></h3>
        <p>${c.desc[0]}<br>${c.desc[1]}</p>
        <div class="eco-progress">
          <div class="bar"><span style="width:${Math.min(100, count)}%"></span></div>
          <span class="lbl">${count}x</span>
        </div>
        <button class="eco-learn" data-learn="${c.id}">Pelajari ${ico("arrow", 12)}</button>
      </div>
    </article>`;
  }).join("") : `<p class="eco-empty">Tidak ada sampah yang cocok dengan pencarianmu.</p>`;
}

function categoryDetail(id) {
  const c = CATEGORIES.find(x => x.id === id);
  openModal(`<button class="close" data-close>${ico("close", 20)}</button>
    <div class="dm-head">
      <div class="dm-art">${CATEGORY_ART[id]}</div>
      <div class="dm-headtext">
        <span class="dm-badge ${c.card}">${c.badge}</span>
        <h2>${c.name}</h2>
        <p>${c.detail}</p>
      </div>
    </div>

    <div class="dm-section">
      <h4><span>1</span> Ciri-cirinya</h4>
      <div class="dm-traits">${c.traits.map(t => `<span>${ico("check", 13)} ${t}</span>`).join("")}</div>
    </div>

    <div class="dm-section">
      <h4><span>2</span> Contoh di sekitarmu</h4>
      <div class="dm-examples">${c.exampleDetails.map(e => `<div><strong>${e.n}</strong><p>${e.d}</p></div>`).join("")}</div>
    </div>

    <div class="dm-section">
      <h4><span>3</span> Cara menangani yang benar</h4>
      <ol class="dm-steps">${c.steps.map((s, i) => `<li><b>${i + 1}</b><span>${s}</span></li>`).join("")}</ol>
    </div>

    <div class="dm-section">
      <h4><span>4</span> Kenapa ini penting?</h4>
      <p class="dm-why">${c.why}</p>
      <div class="dm-fact">${ico("bulb", 18)}<p><strong>Tahukah kamu?</strong> ${c.fact}</p></div>
    </div>

    <div class="dm-section">
      <h4><span>5</span> Yang sering salah</h4>
      <div class="dm-dont">${c.dont.map(d => `<div>${ico("close", 13)} ${d}</div>`).join("")}</div>
    </div>

    <div class="dm-tip">${ico("bulb", 16)}<span>${c.tip}</span></div>
    <div class="dm-actions">
      <button class="btn-soft" data-close>Tutup</button>
      <button class="btn-dark" data-play="${id}">Mainkan misi ${ico("arrow", 14)}</button>
    </div>`, "detail-modal");
  $("[data-play]").onclick = () => { closeModal(); startGame(state.selected); };
}

/* ---------------- Beranda ---------------- */
function renderMissions() {
  $("#missionGrid").innerHTML = LEVELS.map((l, idx) => {
    const stars = state.levels[idx]?.stars || 0;
    // Level 1 selalu terbuka bagi siapa pun (termasuk pemain Level 0)
    // Level 2 terbuka jika Level 1 sudah diselesaikan (minimal 1 bintang), dst.
    const locked = idx > 0 && (state.levels[idx - 1]?.stars || 0) === 0;
    return `<article class="mission-card ${locked ? "locked" : ""}">
      <span class="num">LEVEL 0${l.id}</span>
      <h3>${l.name}</h3>
      <p>${l.sub}</p>
      <div class="stars">${[0, 1, 2].map(i => `<span class="${i < stars ? "on" : ""}">${ico("star", 18)}</span>`).join("")}</div>
      <button class="${locked ? "btn-soft" : "btn-dark"}" data-misi="${l.id}" ${locked ? "disabled" : ""}>${locked ? "Terkunci" : "Mainkan misi"} ${ico("arrow", 13)}</button>
    </article>`;
  }).join("");
}

/* ---------------- Game ---------------- */
function startGame(id) {
  const lv = LEVELS.find(l => l.id === id);
  const idx = LEVELS.findIndex(l => l.id === id);
  if (!lv) return;
  // Level 1 selalu bisa dimainkan. Level berikutnya butuh bintang di level sebelumnya.
  if (idx > 0 && (state.levels[idx - 1]?.stars || 0) === 0) return;
  state.selected = id; save();
  game = { id, i: 0, correct: 0, combo: 0, score: 0, hearts: 3, answered: false, hint: false, wrong: false, picked: null, earned: 0 };
  showPage("game");
  renderGame();
}

function renderGame() {
  const lv = LEVELS.find(l => l.id === game.id);
  const item = lv.items[game.i];
  const pct = Math.round(game.i / lv.items.length * 100);
  const totalPts = state.poin + game.score;
  $("#gameRoot").innerHTML = `
    <div class="game-page">
      <header class="game-top">
        <button class="g-exit" id="gameBack">${ico("chevron-left", 13)} Keluar</button>
        <div class="g-brand"><svg width="22" height="22"><use href="#i-logo"/></svg><span>Eco-Sorter<em>STEM</em></span></div>
        <div class="g-levelbar">
          <span class="g-level-badge"><i></i> Level ${lv.id}</span>
          <span class="g-level-name">${lv.name}</span>
          <div class="g-progress"><span style="width:${pct}%"></span></div>
          <span class="g-count">${game.i + 1}/${lv.items.length}</span>
        </div>
        <div class="g-actions">
          <div class="g-hearts">${[0, 1, 2].map(i => `<span class="${i < game.hearts ? "" : "lost"}">${ico("heart", 13)}</span>`).join("")}</div>
          <div class="g-combo ${game.combo ? "" : "off"}">${ico("shield", 12)} x${game.combo}</div>
          <div class="g-coins">${ico("coin", 14)} ${fmt(totalPts)}</div>
          <div class="g-school-wrap" title="Logo Sekolah"><img class="g-school-logo" src="assets/logo-sekolah.png" alt="Logo Sekolah"></div>
        </div>
      </header>

      <div class="game-scene">
        ${sceneBg()}
        <div class="scene-hint">
          <span class="sh-ico">${ico("bulb", 14)}</span>
          <div><strong>Petunjuk</strong><p>${item.hint}</p></div>
        </div>
        <div class="scene-prompt">${ico("leaf-small", 11)} Tempat sampah mana yang tepat?</div>
        <div class="scene-level">
          <span class="lv"><i></i> Level ${lv.id} dari ${LEVELS.length}</span>
          <span class="pts">${ico("star", 10)} ${fmt(totalPts)} poin</span>
        </div>

        <span class="waste-glow"></span>
        <div class="waste-card ${game.answered ? (game.wrong ? "bad" : "ok") : ""}" id="waste" draggable="${!game.answered}">
          <div class="visual">${item.svg}</div>
          <h2>${item.name} ${ico("sparkle", 11)}</h2>
          <button class="hint-chip ${game.hint ? "on" : ""}" id="hintBtn">${ico("bulb", 10)} Petunjuk</button>
        </div>

        ${game.answered ? feedback(item) : ""}
      </div>

      <div class="game-bins">
        ${CATEGORIES.map((c) => `
          <button class="g-bin ${c.id} ${game.answered && c.id === item.bin ? "hit" : ""} ${game.answered && game.wrong && c.id === game.picked ? "miss" : ""}" data-bin="${c.id}" ${game.answered ? "disabled" : ""}>
            <span class="g-bin-art">${binArt(c.id)}</span>
            <div class="g-bin-txt">
              <h3>${ico("check-circle", 12)} ${c.name}</h3>
              <p>${BIN_DESC[c.id]}</p>
            </div>
          </button>`).join("")}
      </div>
    </div>`;
  bindGame(item);
}

function feedback(item) {
  const last = game.i === LEVELS.find(l => l.id === game.id).items.length - 1;
  const ok = !game.wrong;
  const binName = CATEGORIES.find(c => c.id === item.bin).name;
  const title = ok
    ? (game.combo === 1 ? "Tepat sekali! +100 poin" : `Hebat! Kombo x${game.combo} (+${game.earned} poin)`)
    : `Ups! Seharusnya masuk ke ${binName}`;
  return `<div class="game-feedback ${ok ? "" : "bad"}">
    <div class="fb-ico">${ok ? ico("check", 15) : "!"}</div>
    <div class="fb-txt">
      <strong>${title}</strong>
      <p>${ok ? item.fact : "Pikirkan jenis sampahnya, lalu coba lagi di misi berikutnya."}</p>
    </div>
    <button class="btn-dark sm" id="nextItem">${last || game.hearts <= 0 ? "Lihat hasil" : "Lanjut"} ${ico("arrow", 12)}</button>
  </div>`;
}

function bindGame(item) {
  $("#gameBack").onclick = () => showPage("beranda");
  $("#hintBtn")?.addEventListener("click", () => { game.hint = !game.hint; renderGame(); });
  $$(".g-bin").forEach(b => {
    b.onclick = () => answer(b.dataset.bin);
    b.addEventListener("dragover", e => { if (!game.answered) { e.preventDefault(); b.classList.add("hit"); } });
    b.addEventListener("dragleave", () => b.classList.remove("hit"));
    b.addEventListener("drop", e => {
      e.preventDefault(); b.classList.remove("hit");
      if (!game.answered) answer(b.dataset.bin);
    });
  });
  $("#waste")?.addEventListener("dragstart", e => { e.dataTransfer.setData("text/plain", item.name); });
  const nx = $("#nextItem");
  if (nx) nx.onclick = () => {
    const last = game.i === LEVELS.find(l => l.id === game.id).items.length - 1;
    if (last || game.hearts <= 0) finishGame();
    else { game.i++; game.answered = false; game.hint = false; game.wrong = false; game.picked = null; renderGame(); }
  };
}

function answer(bin) {
  if (game.answered) return;
  game.answered = true;
  game.picked = bin;
  const item = LEVELS.find(l => l.id === game.id).items[game.i];
  game.wrong = bin !== item.bin;
  state.answered++;
  if (game.wrong) {
    game.combo = 0;
    game.hearts--;
  } else {
    game.combo++;
    game.earned = 100 + (game.combo - 1) * 25;
    game.score += game.earned;
    game.correct++;
    state.correct++;
    state.cats[item.bin] = (state.cats[item.bin] || 0) + 1;
    // Catat ke statistik aktivitas harian
    const dayIdx = Math.min(4, Math.max(0, new Date().getDay() - 1));
    if (!state.weekly || state.weekly.length !== 5) state.weekly = [0, 0, 0, 0, 0];
    state.weekly[dayIdx] = (state.weekly[dayIdx] || 0) + 1;
  }
  save();
  renderGame();
}

function finishGame() {
  const lv = LEVELS.find(l => l.id === game.id);
  const total = lv.items.length;
  const pct = Math.round(game.correct / total * 100);
  const stars = pct === 100 ? 3 : pct >= 67 ? 2 : pct >= 34 ? 1 : 0;
  const coins = Math.round(30 * game.correct / total);
  state.poin += game.score;
  state.koin += coins;
  state.energi = Math.max(0, state.energi - 5);
  state.games++;
  state.levels[game.id - 1].stars = Math.max(state.levels[game.id - 1].stars, stars);
  updateLevel();
  save();
  renderShell();
  renderMissions();

  const ok = stars > 0;
  const next = LEVELS[game.id];
  $("#gameRoot").innerHTML = `<div class="game-result-wrap"><div class="result">
    <span class="badge">${ok ? "Misi selesai!" : "Coba lagi"}</span>
    <h1>${ok ? `Keren, Pahlawan ${lv.name}!` : "Belum beruntung, jangan menyerah!"}</h1>
    <p>${ok ? "Kamu berhasil memilah sampah dan menjaga lingkungan sekolah tetap bersih." : "Pelajari kembali jenis sampah, lalu coba misi ini lagi ya!"}</p>
    <div class="stars">${[0, 1, 2].map(i => `<span class="${i < stars ? "on" : ""}">${ico("star", 34)}</span>`).join("")}</div>
    <div class="stats">
      <div><small>Akurasi</small><strong>${pct}%</strong></div>
      <div><small>Poin</small><strong>+${fmt(game.score)}</strong></div>
      <div><small>Koin</small><strong>+${coins}</strong></div>
    </div>
    <div class="actions">
      <button class="btn-soft" id="replay">${ico("refresh", 15)} Main lagi</button>
      ${ok && next ? `<button class="btn-dark" id="nextLevel">Level berikutnya ${ico("arrow", 14)}</button>` : ""}
      <button class="btn-soft" id="toHome">Kembali ke beranda</button>
    </div>
  </div></div>`;
  $("#replay").onclick = () => startGame(lv.id);
  $("#nextLevel")?.addEventListener("click", () => startGame(next.id));
  $("#toHome").onclick = () => showPage("beranda");
}

/* ---------------- Quiz ---------------- */
function renderQuiz() {
  const c = $("#quizCard");
  if (state.quizDone) {
    const userScore = state.lastQuizScore || 0;
    const userCorrect = state.lastQuizCorrect || 0;
    c.innerHTML = `<div class="quiz-done">
      <div class="medal">${ico("trophy", 32)}</div>
      <h2>Kuis Selesai!</h2>
      <p>Kamu berhasil menjawab <strong>${userCorrect} dari ${QUIZ.length}</strong> pertanyaan dengan tepat.</p>
      <div class="quiz-score-badge">+${userScore} Poin Kuis</div>

      <div class="quiz-done-actions">
        <button class="btn-soft" id="retryQuiz">${ico("refresh", 14)} Coba kuis lagi</button>
        <button class="btn-dark" id="btnLihatPeringkat">Kembali ke Beranda ${ico("arrow", 12)}</button>
      </div>
    </div>`;
    return;
  }
  const q = QUIZ[quiz.i], letters = ["A", "B", "C", "D"];
  c.innerHTML = `<div class="meta">Pertanyaan ${quiz.i + 1} dari ${QUIZ.length}</div>
    <h2>${q.q}</h2>
    <div>${q.opts.map((o, i) => {
      let cls = "";
      if (quiz.answered) cls = i === q.answer ? "correct" : i === quiz.picked ? "wrong" : "";
      return `<button class="quiz-option ${cls}" data-opt="${i}" ${quiz.answered ? "disabled" : ""}><span>${letters[i]}</span>${o}</button>`;
    }).join("")}</div>
    ${quiz.answered ? `<div class="quiz-feedback"><p>${q.fact}</p><button class="btn-dark" id="quizNext">${quiz.i === QUIZ.length - 1 ? "Selesaikan kuis" : "Pertanyaan berikutnya"} ${ico("arrow", 14)}</button></div>` : ""}`;
}

function answerQuiz(i) {
  if (quiz.answered) return;
  quiz.answered = true;
  quiz.picked = i;
  if (i === QUIZ[quiz.i].answer) {
    quiz.correct = (quiz.correct || 0) + 1;
    quiz.score = (quiz.score || 0) + 50;
    state.poin += 50;
    state.koin += 5;
    updateLevel();
    save();
    renderShell();
  }
  renderQuiz();
}

/* ---------------- Statistics ---------------- */
function renderStats() {
  updateLevel();
  const tier = getLevelTier(state.poin);
  const total = Object.values(state.cats).reduce((a, b) => a + b, 0);
  const acc = state.answered > 0 ? Math.round(state.correct / state.answered * 100) : 0;
  const cards = [
    { ic: "star", cls: "", v: fmt(state.poin), l: "Total poin" },
    { ic: "bin", cls: "mint", v: fmt(total), l: "Sampah dipilah" },
    { ic: "target", cls: "blue", v: state.answered > 0 ? acc + "%" : "-", l: "Akurasi pemilahan" },
    { ic: "trophy", cls: "peach", v: `Level ${tier.level}`, l: tier.name }
  ];
  $("#statCards").innerHTML = cards.map(c => `
    <div class="stat-box">
      <div class="ic ${c.cls}">${ico(c.ic, 18)}</div>
      <div><strong>${c.v}</strong><small>${c.l}</small></div>
    </div>`).join("");

  const weekly = state.weekly && state.weekly.length === 5 ? state.weekly : [0, 0, 0, 0, 0];
  const labels = ["Sen", "Sel", "Rab", "Kam", "Jum"];
  const weeklyTotal = weekly.reduce((a, b) => a + b, 0);
  const maxVal = Math.max(10, ...weekly);
  $("#chartTotal").textContent = fmt(weeklyTotal);
  $("#activityBars").innerHTML = `
    <div class="chart-y">
      <span>${maxVal}</span>
      <span>${Math.round(maxVal * 0.66)}</span>
      <span>${Math.round(maxVal * 0.33)}</span>
      <span>0</span>
    </div>
    <div class="chart-plot">
      <div class="chart-grid-lines"><i></i><i></i><i></i><i></i></div>
      <div class="chart-bars">
        ${weekly.map((v, i) => `<div class="bar-col">
          <div class="bar-track">
            <span class="bar-val">${v}</span>
            <span class="bar ${v > 0 && v === Math.max(...weekly) ? "max" : ""}" style="height:${Math.round(v / maxVal * 100)}%"></span>
          </div>
          <small>${labels[i]}</small>
        </div>`).join("")}
      </div>
    </div>`;

  const order = ["organik", "daur", "b3", "residu"];
  const colors = { organik: "#6BBE83", daur: "#6EA9E6", b3: "#E58E75", residu: "#A98BD0" };
  const R = 54, C = 2 * Math.PI * R;

  if (total === 0) {
    $("#donutChart").innerHTML = `<svg viewBox="0 0 150 150">
      <circle cx="75" cy="75" r="${R}" fill="none" stroke="#E2EADE" stroke-width="17"/>
      <circle cx="75" cy="75" r="45" fill="#fff"/>
    </svg>
    <div class="donut-center"><strong>0</strong><small>sampah</small></div>`;
    $("#donutLegend").innerHTML = order.map(id => {
      const c = CATEGORIES.find(x => x.id === id);
      return `<div class="legend-row"><i style="background:${colors[id]}"></i><span>${c.name}</span><b>0%</b></div>`;
    }).join("");
  } else {
    let offset = 0;
    const arcs = order.map(id => {
      const count = state.cats[id] || 0;
      const len = (count / total) * C;
      const seg = `<circle cx="75" cy="75" r="${R}" fill="none" stroke="${colors[id]}" stroke-width="17" stroke-dasharray="${len.toFixed(2)} ${(C - len).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" transform="rotate(-90 75 75)"/>`;
      offset += len;
      return seg;
    }).join("");
    $("#donutChart").innerHTML = `<svg viewBox="0 0 150 150">
      ${arcs}
      <circle cx="75" cy="75" r="45" fill="#fff"/>
    </svg>
    <div class="donut-center"><strong>${fmt(total)}</strong><small>sampah</small></div>`;
    $("#donutLegend").innerHTML = order.map(id => {
      const c = CATEGORIES.find(x => x.id === id);
      const count = state.cats[id] || 0;
      return `<div class="legend-row"><i style="background:${colors[id]}"></i><span>${c.name}</span><b>${Math.round(count / total * 100)}%</b></div>`;
    }).join("");
  }

  if (state.poin === 0) {
    $("#achText").textContent = "Mulai petualanganmu dan kumpulkan poin pertamamu!";
  } else {
    $("#achText").textContent = `Hebat! Kamu sudah meraih ${fmt(state.poin)} poin (Akurasi ${acc}%)`;
  }
  const achAva = $("#achAva");
  if (achAva) achAva.innerHTML = avatar("aris");
}

/* ---------------- Achievements ---------------- */
function badgeData() {
  const acc = state.answered > 0 ? Math.round(state.correct / state.answered * 100) : 0;
  const stars = state.levels.reduce((a, l) => a + (l.stars || 0), 0);
  const total = Object.values(state.cats).reduce((a, b) => a + b, 0);

  return [
    { n: "Pemula Hijau", d: "Selesaikan misi pertamamu", ok: state.games >= 1, art: "seal", prog: [Math.min(1, state.games), 1] },
    { n: "Pilah 10 Sampah", d: "Pilah 10 sampah dengan tepat", ok: total >= 10, art: "plant", prog: [total, 10] },
    { n: "Akurasi Hebat", d: "Capai akurasi 80% ke atas", ok: state.answered >= 5 && acc >= 80, art: "target", prog: [state.answered >= 5 ? acc : 0, 80] },
    { n: "Penjelajah Taman", d: "Naik ke Level 1 (300 poin)", ok: state.poin >= 300, art: "earth", prog: [state.poin, 300] },
    { n: "Penjaga Kantin", d: "Naik ke Level 2 (700 poin)", ok: state.poin >= 700, art: "trophy", prog: [state.poin, 700] },
    { n: "Bintang Sejati", d: "Kumpulkan 3 bintang misi", ok: stars >= 3, art: "star", prog: [stars, 3] },
    { n: "Ahli Kuis", d: "Selesaikan kuis harian", ok: state.quizDone, art: "book", prog: [state.quizDone ? 1 : 0, 1] },
    { n: "Kolektor Bintang", d: "Kumpulkan 9 bintang", ok: stars >= 9, art: "star", prog: [stars, 9] }
  ];
}

function renderBadges() {
  const list = badgeData();
  const shown = badgeFilter === "terkunci" ? list.filter(b => !b.ok) : list;
  const unlocked = list.filter(b => b.ok).length;
  $("#badgeCount").textContent = `${unlocked} / ${list.length}`;
  $("#badgeGrid").innerHTML = shown.length ? shown.map(b => {
    const prog = b.prog || [0, 1];
    return `<article class="badge-card ${b.ok ? "" : "locked"}">
      ${!b.ok ? `<span class="b-lock">${ico("lock", 10)}</span>` : ""}
      <div class="badge-art">${badgeArt(b.art)}</div>
      <div>
        <h3>${b.n}</h3>
        <p>${b.d}</p>
        ${b.ok
          ? `<span class="b-status">${ico("check", 9)} ${b.st || "Terbuka"}</span>`
          : `<div class="b-progress"><span style="width:${Math.min(100, Math.round(prog[0] / prog[1] * 100))}%"></span></div>
             <div class="b-progress-label">${prog[0]} / ${prog[1]}</div>`}
      </div>
    </article>`;
  }).join("") : `<p class="eco-empty">Semua lencana sudah terbuka. Hebat!</p>`;
  renderLevelProgress();
  renderMissionBanner();
}

function renderLevelProgress() {
  updateLevel();
  const tier = getLevelTier(state.poin);
  const span = tier.max - tier.min;
  const inTier = Math.max(0, state.poin - tier.min);
  const pct = Math.min(100, Math.round((inTier / span) * 100));
  $("#levelProgress").innerHTML = `
    <div class="lp-top"><strong>${tier.name}</strong><span>Level ${tier.level} · ${fmt(state.poin)} / ${fmt(tier.max)} poin</span></div>
    <div class="lp-bar"><span style="width:${pct}%"></span></div>
    <div class="lp-pct">${pct}%</div>`;
}

function renderMissionBanner() {
  const done = Math.min(3, state.games);
  const pct = Math.round(done / 3 * 100);
  $("#missionBanner").innerHTML = `
    <span class="mb-ico">${ico("flame", 18)}</span>
    <div class="mb-copy"><strong>Misi harian</strong><p>Selesaikan 3 misi hari ini</p></div>
    <div class="mb-bar"><span style="width:${pct}%"></span></div>
    <span class="mb-count">${done} / 3</span>
    <button class="btn-dark sm" id="klaimMisi">${state.missionClaimed ? "Sudah diklaim" : `100 poin ${ico("arrow", 11)}`}</button>`;
  $("#klaimMisi").onclick = () => {
    if (state.missionClaimed) {
      return openModal(`<button class="close" data-close>${ico("close", 20)}</button>
        <div class="big">${ico("check", 26)}</div><h2>Hadiah sudah diambil</h2>
        <p>Kamu sudah mengklaim 100 poin untuk misi harian ini. Kembali besok untuk misi baru!</p>
        <div class="actions"><button class="btn-dark" data-close>Oke</button></div>`);
    }
    if (state.games < 3) {
      return openModal(`<button class="close" data-close>${ico("close", 20)}</button>
        <div class="big">${ico("flame", 26)}</div><h2>Misi harian belum selesai</h2>
        <p>Selesaikan ${3 - state.games} misi lagi untuk mendapatkan 100 poin. Semangat!</p>
        <div class="actions"><button class="btn-soft" data-close>Nanti</button><button class="btn-dark" id="keMisi">Main misi ${ico("arrow", 13)}</button></div>`);
    }
    state.poin += 100;
    state.koin += 10;
    state.missionClaimed = true;
    save();
    renderShell();
    renderBadges();
    openModal(`<button class="close" data-close>${ico("close", 20)}</button>
      <div class="big">${ico("star", 26)}</div><h2>Misi harian selesai!</h2>
      <p>Kamu mendapatkan <strong>+100 poin</strong> dan <strong>+10 koin</strong>. Terima kasih sudah menjaga bumi hari ini!</p>
      <div class="actions"><button class="btn-dark" data-close>Lanjut belajar</button></div>`);
  };
}

/* ---------------- Modal ---------------- */
function openModal(html, cls = "") {
  $("#modalRoot").innerHTML = `<div class="modal-backdrop" id="backdrop"><div class="modal ${cls}" role="dialog" aria-modal="true">${html}</div></div>`;
  $("#backdrop").addEventListener("click", e => { if (e.target.id === "backdrop") closeModal(); });
  $$("[data-close]", $("#modalRoot")).forEach(b => b.onclick = closeModal);
  const toMisi = $("#keMisi");
  if (toMisi) toMisi.onclick = () => { closeModal(); showPage("beranda"); };
}
function closeModal() { $("#modalRoot").innerHTML = ""; }

function openAccountModal() {
  const users = loadUsersDatabase();
  users.sort((a, b) => (b.poin || 0) - (a.poin || 0));

  openModal(`
    <button class="close" data-close>${ico("close", 20)}</button>
    <div class="account-modal-wrap">
      <h2>Pilih atau Ganti Akun</h2>
      <p>Masuk sebagai pengguna terdaftar untuk bermain game dan memilah sampah.</p>

      <div class="user-list-select">
        ${users.map(u => `
          <button class="user-item-btn ${u.id === currentUser.id ? "active" : ""}" data-switch-user="${u.id}">
            <span class="user-item-ava">${avatar(u.avatar || "aris", 34)}</span>
            <div class="user-item-info">
              <strong>${u.name} ${u.id === currentUser.id ? "<small>(Sedang Aktif)</small>" : ""}</strong>
              <span>${fmt(u.poin || 0)} poin · Level ${getLevelTier(u.poin || 0).level}</span>
            </div>
            <span class="btn-select-pill">${u.id === currentUser.id ? "Aktif" : "Masuk"}</span>
          </button>
        `).join("")}
      </div>

      <div class="divider-text"><span>atau daftar akun baru</span></div>

      <div class="new-user-form">
        <label for="newUserNameInput">Nama Pengguna Baru:</label>
        <div class="new-user-inputs">
          <input type="text" id="newUserNameInput" placeholder="Ketik nama (contoh: Siti / Rizky)..." maxlength="16">
          <select id="newUserAvatarSelect">
            <option value="aris">Avatar Aris (Hijau)</option>
            <option value="naya">Avatar Naya (Pink)</option>
            <option value="bima">Avatar Bima (Cokelat)</option>
          </select>
        </div>
        <button class="btn-dark" id="btnCreateNewUser" style="width:100%; margin-top:10px;">
          Daftar Akun Baru & Masuk ${ico("arrow", 12)}
        </button>
      </div>
    </div>
  `, "account-modal");
}

/* ---------------- Wiring ---------------- */
$$(".side-nav button").forEach(b => b.onclick = () => showPage(b.dataset.page));
$("#brandHome").onclick = () => showPage("beranda");

$("#btnLogout").onclick = () => openAccountModal();

$("#btnLanjutBelajar").onclick = () => showPage("ensiklopedia");
$("#btnCobaKuisHome").onclick = () => {
  quiz = { i: 0, answered: false, picked: -1, correct: 0, score: 0 };
  state.quizDone = false;
  showPage("kuis");
};
$("#achMore").onclick = () => showPage("pencapaian");

$("#missionGrid").addEventListener("click", e => {
  const b = e.target.closest("[data-misi]");
  if (b && !b.disabled) startGame(Number(b.dataset.misi));
});
$("#chips").addEventListener("click", e => {
  const b = e.target.closest("[data-filter]");
  if (!b) return;
  filter = b.dataset.filter;
  renderChips();
  renderEco();
});
$("#searchInput").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); renderEco(); });
$("#ecoGrid").addEventListener("click", e => {
  const b = e.target.closest("[data-learn]");
  if (b) categoryDetail(b.dataset.learn);
});
$$("[data-badge-filter]").forEach(b => b.onclick = () => {
  badgeFilter = b.dataset.badgeFilter;
  $$("[data-badge-filter]").forEach(x => x.classList.toggle("active", x === b));
  renderBadges();
});
$("#modalRoot").addEventListener("click", e => {
  const switchBtn = e.target.closest("[data-switch-user]");
  if (switchBtn) {
    const targetId = switchBtn.dataset.switchUser;
    localStorage.setItem(DB_SESSION_KEY, targetId);
    currentUser = getActiveUser();
    state = currentUser;
    closeModal();
    renderShell();
    renderMissions();
    renderChips();
    renderEco();
    renderQuiz();
    showPage("beranda");
    return;
  }

  if (e.target.closest("#btnCreateNewUser")) {
    const input = $("#newUserNameInput");
    const name = input ? input.value.trim() : "";
    if (!name) {
      alert("Silakan masukkan nama pengguna terlebih dahulu.");
      return;
    }
    const av = $("#newUserAvatarSelect") ? $("#newUserAvatarSelect").value : "aris";
    const newId = "user_" + Date.now();
    const newUser = createDefaultAccount(newId, name, av);
    const users = loadUsersDatabase();
    users.push(newUser);
    saveUsersDatabase(users);
    localStorage.setItem(DB_SESSION_KEY, newId);
    currentUser = newUser;
    state = currentUser;
    closeModal();
    renderShell();
    renderMissions();
    renderChips();
    renderEco();
    renderQuiz();
    showPage("beranda");
    return;
  }
});
$("#quizCard").addEventListener("click", e => {
  const o = e.target.closest("[data-opt]");
  if (o && !quiz.answered) answerQuiz(Number(o.dataset.opt));
  if (e.target.closest("#quizNext")) {
    if (quiz.i === QUIZ.length - 1) {
      state.quizDone = true;
      state.lastQuizScore = quiz.score || 0;
      state.lastQuizCorrect = quiz.correct || 0;
      save();
      quiz = { i: 0, answered: false, picked: -1, correct: 0, score: 0 };
    } else {
      quiz.i++;
      quiz.answered = false;
      quiz.picked = -1;
    }
    renderQuiz();
  }
  if (e.target.closest("#btnLihatPeringkat")) {
    showPage("beranda");
  }
  if (e.target.closest("#retryQuiz")) {
    state.quizDone = false;
    save();
    quiz = { i: 0, answered: false, picked: -1, correct: 0, score: 0 };
    renderQuiz();
  }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ---------------- Init ---------------- */
$("#artEco").innerHTML = heroArt();
$("#artHome").innerHTML = heroArt();
$("#artBadge").innerHTML = trophyArt();
renderShell();
renderChips();
renderEco();
renderMissions();
renderQuiz();




