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

/* ---------------- Sound Effects (Web Audio API) ---------------- */
const soundState = {
  enabled: true,
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  },
  toggle() {
    this.enabled = !this.enabled;
    const btn = document.getElementById("soundToggle");
    if (btn) {
      btn.classList.toggle("muted", !this.enabled);
      btn.innerHTML = ico(this.enabled ? "volume" : "volume-mute", 16);
    }
    if (this.enabled) this.play("click");
    return this.enabled;
  },
  play(type) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(820, now + 0.05);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "correct") {
        // Melodi harmonis menang nada C5 -> G5
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "wrong") {
        // Getaran deselerasi bass nada rendah
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "coin" || type === "badge") {
        // Nada berkilau gemerincing koin/lencana
        osc.type = "sine";
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.09);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch (e) {
      console.warn("Audio Context playback error:", e);
    }
  }
};

/* ---------------- Scenery illustrations ---------------- */
function homeHeroArt() {
  return `<svg viewBox="0 0 380 200" aria-hidden="true" class="hero-svg-main">
    <defs>
      <linearGradient id="earthGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#80D8F8"/>
        <stop offset="100%" stop-color="#46A7E8"/>
      </linearGradient>
      <linearGradient id="woodGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#E5B270"/>
        <stop offset="100%" stop-color="#C78E4B"/>
      </linearGradient>
    </defs>
    <!-- Hill backdrop -->
    <ellipse cx="200" cy="188" rx="175" ry="24" fill="#6EA858" opacity=".35"/>
    <ellipse cx="200" cy="180" rx="160" ry="20" fill="#7EC664"/>
    <ellipse cx="200" cy="176" rx="145" ry="16" fill="#92D677"/>

    <!-- Smiling Earth Mascot in Center -->
    <g transform="translate(175 108)">
      <!-- Earth Body -->
      <circle cx="0" cy="0" r="54" fill="url(#earthGrad)" stroke="#3288C2" stroke-width="2.5"/>
      <!-- Continents -->
      <path d="M-40 -20 C-30 -35 -10 -40 5 -38 C15 -35 25 -20 15 -5 C5 5 -15 -2 -25 5 C-35 8 -42 0 -40 -20 Z" fill="#65BE47"/>
      <path d="M-30 20 C-20 15 5 20 12 30 C15 42 0 52 -20 48 C-35 45 -38 32 -30 20 Z" fill="#65BE47"/>
      <path d="M20 -15 C35 -20 45 -10 42 10 C38 25 22 18 20 -15 Z" fill="#65BE47"/>
      <!-- Smiling Face -->
      <ellipse cx="-14" cy="-5" rx="3.5" ry="5.5" fill="#173522"/>
      <ellipse cx="14" cy="-5" rx="3.5" ry="5.5" fill="#173522"/>
      <circle cx="-15" cy="-7" r="1.5" fill="#fff"/>
      <circle cx="13" cy="-7" r="1.5" fill="#fff"/>
      <!-- Rosy Cheeks -->
      <ellipse cx="-23" cy="4" rx="5.5" ry="3.5" fill="#FF8D9D" opacity=".7"/>
      <ellipse cx="23" cy="4" rx="5.5" ry="3.5" fill="#FF8D9D" opacity=".7"/>
      <!-- Smile Mouth -->
      <path d="M-8 6 Q0 16 8 6 Z" fill="#942626"/>
      <path d="M-6 8 Q0 15 6 8" stroke="#FF6B7A" stroke-width="2" fill="none"/>
    </g>

    <!-- Green Recycling Bin (Left) -->
    ${binSvg("organik", { x: 70, y: 76, s: .78 })}

    <!-- Blue Recycling Bin (Right-Center) -->
    ${binSvg("daur", { x: 185, y: 82, s: .78 })}

    <!-- Wooden Sign "Jaga Lingkungan Kita!" -->
    <g transform="translate(262 76)">
      <!-- Posts -->
      <rect x="16" y="32" width="7" height="60" rx="3" fill="#8C5C30" stroke="#663E1A" stroke-width="1.5"/>
      <rect x="52" y="32" width="7" height="60" rx="3" fill="#8C5C30" stroke="#663E1A" stroke-width="1.5"/>
      <!-- Board -->
      <rect x="0" y="8" width="76" height="42" rx="7" fill="url(#woodGrad)" stroke="#7A4C22" stroke-width="2"/>
      <line x1="4" y1="22" x2="72" y2="22" stroke="#B87E3E" stroke-width="1.5"/>
      <line x1="4" y1="36" x2="72" y2="36" stroke="#B87E3E" stroke-width="1.5"/>
      <text x="38" y="22" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="9" fill="#542F10" text-anchor="middle">Jaga</text>
      <text x="38" y="33" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="8.5" fill="#542F10" text-anchor="middle">Lingkungan</text>
      <text x="38" y="44" font-family="'Baloo 2', sans-serif" font-weight="800" font-size="9" fill="#542F10" text-anchor="middle">Kita!</text>
      <!-- Tufts of grass around posts -->
      <path d="M12 88 Q14 78 20 84 Q22 75 26 88 Z" fill="#4FAE55"/>
      <path d="M48 88 Q50 78 56 84 Q58 75 62 88 Z" fill="#4FAE55"/>
    </g>

    <!-- Daisies & Sparkles -->
    <g transform="translate(145 174)">
      <circle cx="0" cy="0" r="6" fill="#fff"/>
      <circle cx="0" cy="0" r="2.5" fill="#F5C542"/>
    </g>
    <g transform="translate(235 178)">
      <circle cx="0" cy="0" r="7" fill="#fff"/>
      <circle cx="0" cy="0" r="3" fill="#F5C542"/>
    </g>
    <g transform="translate(55 170)">
      <circle cx="0" cy="0" r="5" fill="#fff"/>
      <circle cx="0" cy="0" r="2" fill="#F5C542"/>
    </g>
    <g fill="#fff" opacity=".95">
      <path d="M120 38l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>
      <path d="M260 32l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
      <path d="M340 54l2 4 4 2-4 2-2 4-2-4-4-2 4-2z"/>
    </g>
  </svg>`;
}

function badgeHeroArt() {
  return `<svg viewBox="0 0 340 200" aria-hidden="true" class="hero-svg-badge">
    <defs>
      <linearGradient id="goldCup" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFE779"/>
        <stop offset="40%" stop-color="#F7C434"/>
        <stop offset="100%" stop-color="#D99B16"/>
      </linearGradient>
      <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#A56E28"/>
        <stop offset="100%" stop-color="#6F4512"/>
      </linearGradient>
    </defs>
    <!-- Hill mound -->
    <ellipse cx="170" cy="186" rx="145" ry="18" fill="#6EA858" opacity=".35"/>
    <ellipse cx="170" cy="178" rx="130" ry="15" fill="#84CF68"/>
    <ellipse cx="170" cy="174" rx="115" ry="12" fill="#99DF7D"/>

    <!-- Trophy Group -->
    <g transform="translate(170 102)">
      <!-- Pedestal Base -->
      <polygon points="-32,60 32,60 36,70 -36,70" fill="url(#baseGrad)" stroke="#52320A" stroke-width="1.5"/>
      <rect x="-24" y="44" width="48" height="16" rx="3" fill="#D49B24" stroke="#8A5A0A" stroke-width="1.5"/>
      <!-- Stem -->
      <path d="M-8 26 L8 26 L12 44 L-12 44 Z" fill="#F0BC2E" stroke="#9A690C" stroke-width="1.5"/>
      <!-- Handles -->
      <path d="M-36 -12 C-55 -12 -55 22 -30 22" fill="none" stroke="#F5C538" stroke-width="7" stroke-linecap="round"/>
      <path d="M-36 -12 C-55 -12 -55 22 -30 22" fill="none" stroke="#9A690C" stroke-width="2" stroke-linecap="round"/>
      <path d="M36 -12 C55 -12 55 22 30 22" fill="none" stroke="#F5C538" stroke-width="7" stroke-linecap="round"/>
      <path d="M36 -12 C55 -12 55 22 30 22" fill="none" stroke="#9A690C" stroke-width="2" stroke-linecap="round"/>
      <!-- Cup Body -->
      <path d="M-38 -34 H38 C38 12 24 28 0 28 C-24 28 -38 12 -38 -34 Z" fill="url(#goldCup)" stroke="#8A5A0A" stroke-width="2.5"/>
      <ellipse cx="0" cy="-34" rx="38" ry="7" fill="#FFF199" stroke="#8A5A0A" stroke-width="2"/>
      <!-- Star on Trophy -->
      <path d="M0 -15 L2.5 -7 H10 L4 -2 L6.5 6 L0 1.5 L-6.5 6 L-4 -2 L-10 -7 H-2.5 Z" fill="#FFF8C6" stroke="#C4880E" stroke-width="1.2"/>

      <!-- Laurel Leaves on Sides -->
      <g stroke="#3D8A46" stroke-width="1.5" fill="#58BF65">
        <ellipse cx="-44" cy="38" rx="8" ry="5" transform="rotate(-30 -44 38)"/>
        <ellipse cx="-52" cy="22" rx="8" ry="5" transform="rotate(-50 -52 22)"/>
        <ellipse cx="-52" cy="5" rx="8" ry="5" transform="rotate(-70 -52 5)"/>
        <ellipse cx="44" cy="38" rx="8" ry="5" transform="rotate(30 44 38)"/>
        <ellipse cx="52" cy="22" rx="8" ry="5" transform="rotate(50 52 22)"/>
        <ellipse cx="52" cy="5" rx="8" ry="5" transform="rotate(70 52 5)"/>
      </g>
    </g>

    <!-- Daisies & Sparkles -->
    <g transform="translate(90 172)"><circle cx="0" cy="0" r="7" fill="#fff"/><circle cx="0" cy="0" r="3" fill="#F5C542"/></g>
    <g transform="translate(250 174)"><circle cx="0" cy="0" r="8" fill="#fff"/><circle cx="0" cy="0" r="3.5" fill="#F5C542"/></g>
    <g fill="#FFF" opacity=".95">
      <path d="M85 45l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
      <path d="M255 40l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
      <path d="M170 20l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>
    </g>
  </svg>`;
}

function statHeroArt() {
  return `<svg viewBox="0 0 340 200" aria-hidden="true" class="hero-svg-stat">
    <defs>
      <linearGradient id="earthGradS" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#80D8F8"/>
        <stop offset="100%" stop-color="#46A7E8"/>
      </linearGradient>
    </defs>
    <!-- Hill mound -->
    <ellipse cx="170" cy="186" rx="145" ry="18" fill="#6EA858" opacity=".35"/>
    <ellipse cx="170" cy="178" rx="130" ry="15" fill="#84CF68"/>
    <ellipse cx="170" cy="174" rx="115" ry="12" fill="#99DF7D"/>

    <!-- Smiling Earth on Left -->
    <g transform="translate(115 110)">
      <circle cx="0" cy="0" r="50" fill="url(#earthGradS)" stroke="#3288C2" stroke-width="2.5"/>
      <path d="M-36 -18 C-25 -32 -8 -36 5 -34 C12 -30 22 -18 12 -5 C4 5 -12 -2 -22 5 C-32 8 -38 0 -36 -18 Z" fill="#65BE47"/>
      <path d="M-26 18 C-18 12 4 18 10 26 C12 36 0 46 -18 42 C-32 40 -34 28 -26 18 Z" fill="#65BE47"/>
      <path d="M18 -12 C30 -18 40 -8 36 8 C32 20 18 14 18 -12 Z" fill="#65BE47"/>
      <!-- Eyes & Smile -->
      <ellipse cx="-12" cy="-4" rx="3" ry="5" fill="#173522"/>
      <ellipse cx="12" cy="-4" rx="3" ry="5" fill="#173522"/>
      <circle cx="-13" cy="-6" r="1.3" fill="#fff"/>
      <circle cx="11" cy="-6" r="1.3" fill="#fff"/>
      <ellipse cx="-20" cy="4" rx="5" ry="3" fill="#FF8D9D" opacity=".7"/>
      <ellipse cx="20" cy="4" rx="5" ry="3" fill="#FF8D9D" opacity=".7"/>
      <path d="M-7 6 Q0 15 7 6 Z" fill="#942626"/>
    </g>

    <!-- 3D Rising Bar Chart on Right -->
    <g transform="translate(195 70)">
      <!-- Bar 1 (Low) -->
      <rect x="0" y="56" width="18" height="38" rx="4" fill="#A4DE87" stroke="#3D8A46" stroke-width="1.8"/>
      <!-- Bar 2 (Medium) -->
      <rect x="24" y="32" width="18" height="62" rx="4" fill="#6EC776" stroke="#3D8A46" stroke-width="1.8"/>
      <!-- Bar 3 (High) -->
      <rect x="48" y="8" width="18" height="86" rx="4" fill="#3D9E4E" stroke="#256B32" stroke-width="1.8"/>
      <!-- Upward Trend Arrow -->
      <path d="M-6 64 Q24 24 64 6" fill="none" stroke="#225134" stroke-width="4.5" stroke-linecap="round"/>
      <polygon points="64,-4 76,8 60,14" fill="#225134"/>
    </g>

    <!-- Daisies & Sparkles -->
    <g transform="translate(60 174)"><circle cx="0" cy="0" r="7" fill="#fff"/><circle cx="0" cy="0" r="3" fill="#F5C542"/></g>
    <g transform="translate(285 174)"><circle cx="0" cy="0" r="7" fill="#fff"/><circle cx="0" cy="0" r="3" fill="#F5C542"/></g>
    <g fill="#FFF" opacity=".95">
      <path d="M70 45l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
      <path d="M295 40l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
    </g>
  </svg>`;
}

function ecoHeroArt() {
  return `<svg viewBox="0 0 340 200" aria-hidden="true" class="hero-svg-eco">
    <!-- Hill mound -->
    <ellipse cx="170" cy="186" rx="145" ry="18" fill="#6EA858" opacity=".35"/>
    <ellipse cx="170" cy="178" rx="130" ry="15" fill="#84CF68"/>
    <ellipse cx="170" cy="174" rx="115" ry="12" fill="#99DF7D"/>

    <!-- Green Smiling Recycling Bin Mascot -->
    <g transform="translate(135 62)">
      ${binSvg("organik", { x: 0, y: 0, s: 1.05 })}
      <!-- Large Leaf Held in Hand -->
      <g transform="translate(-16 38) rotate(-22)">
        <path d="M0 45 C15 35 25 15 20 0 C5 10 -5 30 0 45 Z" fill="#7FD656" stroke="#2E7A34" stroke-width="2"/>
        <line x1="0" y1="45" x2="16" y2="6" stroke="#2E7A34" stroke-width="2"/>
      </g>
    </g>

    <!-- Daisies & Sparkles -->
    <g transform="translate(75 172)"><circle cx="0" cy="0" r="7" fill="#fff"/><circle cx="0" cy="0" r="3" fill="#F5C542"/></g>
    <g transform="translate(265 174)"><circle cx="0" cy="0" r="8" fill="#fff"/><circle cx="0" cy="0" r="3.5" fill="#F5C542"/></g>
    <g fill="#FFF" opacity=".95">
      <path d="M60 45l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
      <path d="M285 45l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
      <path d="M170 20l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>
    </g>
  </svg>`;
}

/* ---------------- Mission Thumbnails (2D Illustrations) ---------------- */
function missionThumbnail(id) {
  if (id === 1) {
    // Level 1: Taman Sekolah (School building with bell tower & trees)
    return `<svg viewBox="0 0 280 130" preserveAspectRatio="xMidYMid slice" class="m-thumb-svg">
      <rect width="280" height="130" fill="#E6F6FD"/>
      <!-- Hills & Grass -->
      <ellipse cx="140" cy="170" rx="170" ry="60" fill="#7DC667"/>
      <ellipse cx="140" cy="155" rx="150" ry="40" fill="#93D67D"/>
      <!-- Trees on sides -->
      <g transform="translate(25 45)">
        <rect x="18" y="30" width="8" height="30" fill="#754722"/>
        <circle cx="22" cy="22" r="24" fill="#4FAE55"/>
        <circle cx="16" cy="16" r="16" fill="#69C970"/>
      </g>
      <g transform="translate(210 45)">
        <rect x="18" y="30" width="8" height="30" fill="#754722"/>
        <circle cx="22" cy="22" r="24" fill="#4FAE55"/>
        <circle cx="28" cy="16" r="16" fill="#69C970"/>
      </g>
      <!-- School Building -->
      <g transform="translate(90 32)">
        <!-- Wall -->
        <rect x="0" y="24" width="100" height="46" rx="3" fill="#FFF0C2" stroke="#D19E45" stroke-width="1.8"/>
        <!-- Main Pitched Roof -->
        <polygon points="-8,24 50,-4 108,24" fill="#E86148" stroke="#AD331D" stroke-width="2"/>
        <!-- Bell / Clock Tower -->
        <rect x="36" y="-22" width="28" height="22" fill="#FFF0C2" stroke="#D19E45" stroke-width="1.5"/>
        <polygon points="32,-22 50,-38 68,-22" fill="#E86148" stroke="#AD331D" stroke-width="1.8"/>
        <!-- Clock Face -->
        <circle cx="50" cy="-11" r="6" fill="#fff" stroke="#D19E45" stroke-width="1.2"/>
        <line x1="50" y1="-11" x2="50" y2="-14" stroke="#523512" stroke-width="1.2"/>
        <line x1="50" y1="-11" x2="53" y2="-11" stroke="#523512" stroke-width="1.2"/>
        <!-- Entrance Door -->
        <path d="M40 70 V48 A10 10 0 0 1 60 48 V70 Z" fill="#688EA8" stroke="#3A5C74" stroke-width="1.5"/>
        <!-- Windows -->
        <rect x="12" y="36" width="16" height="18" rx="2" fill="#9CE2F7" stroke="#3A5C74" stroke-width="1.2"/>
        <rect x="72" y="36" width="16" height="18" rx="2" fill="#9CE2F7" stroke="#3A5C74" stroke-width="1.2"/>
      </g>
      <!-- Pathway -->
      <polygon points="130,102 150,102 170,130 110,130" fill="#E2BA84"/>
      <!-- Daisies -->
      <circle cx="70" cy="115" r="3.5" fill="#fff"/><circle cx="70" cy="115" r="1.5" fill="#F5C542"/>
      <circle cx="210" cy="118" r="3.5" fill="#fff"/><circle cx="210" cy="118" r="1.5" fill="#F5C542"/>
    </svg>`;
  } else if (id === 2) {
    // Level 2: Kantin Sekolah (Playground slide / canteen pavilion & picnic lawn)
    return `<svg viewBox="0 0 280 130" preserveAspectRatio="xMidYMid slice" class="m-thumb-svg">
      <rect width="280" height="130" fill="#FDF3E3"/>
      <ellipse cx="140" cy="170" rx="170" ry="60" fill="#7DC667"/>
      <ellipse cx="140" cy="155" rx="150" ry="40" fill="#93D67D"/>
      <!-- Bushes -->
      <circle cx="35" cy="85" r="22" fill="#4FAE55"/>
      <circle cx="55" cy="88" r="18" fill="#65BE47"/>
      <circle cx="235" cy="85" r="22" fill="#4FAE55"/>
      <circle cx="255" cy="88" r="18" fill="#65BE47"/>
      <!-- Playground Slide / Canteen Kiosk -->
      <g transform="translate(100 35)">
        <!-- Kiosk Awning / Tent -->
        <polygon points="0,28 40,8 80,28" fill="#F26B50" stroke="#B83A20" stroke-width="1.8"/>
        <rect x="8" y="28" width="64" height="42" fill="#FFF9E6" stroke="#D19E45" stroke-width="1.5"/>
        <rect x="18" y="40" width="44" height="16" fill="#F5C542" rx="2"/>
        <!-- Slide on Right -->
        <path d="M72 40 C85 40 92 65 110 70" fill="none" stroke="#3DAEE9" stroke-width="7" stroke-linecap="round"/>
        <path d="M72 40 C85 40 92 65 110 70" fill="none" stroke="#1D6994" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="72" y1="40" x2="72" y2="70" stroke="#754722" stroke-width="3"/>
        <line x1="68" y1="48" x2="76" y2="48" stroke="#D19E45" stroke-width="2"/>
        <line x1="68" y1="56" x2="76" y2="56" stroke="#D19E45" stroke-width="2"/>
      </g>
      <!-- Picnic bench -->
      <rect x="45" y="94" width="35" height="6" rx="2" fill="#8C5C30"/>
      <rect x="52" y="100" width="4" height="12" fill="#663E1A"/>
      <rect x="70" y="100" width="4" height="12" fill="#663E1A"/>
      <!-- Daisies -->
      <circle cx="190" cy="115" r="3.5" fill="#fff"/><circle cx="190" cy="115" r="1.5" fill="#F5C542"/>
    </svg>`;
  } else {
    // Level 3: Jalan Depan Sekolah (School gate, sidewalk, street crosswalk)
    return `<svg viewBox="0 0 280 130" preserveAspectRatio="xMidYMid slice" class="m-thumb-svg">
      <rect width="280" height="130" fill="#E8F4FC"/>
      <!-- Road asphalt -->
      <rect y="85" width="280" height="45" fill="#525B60"/>
      <!-- Sidewalk curb -->
      <rect y="74" width="280" height="12" fill="#BDC6CC"/>
      <!-- Zebra cross lines -->
      <g fill="#FFFFFF" opacity=".9">
        <rect x="60" y="92" width="14" height="32" rx="1"/>
        <rect x="85" y="92" width="14" height="32" rx="1"/>
        <rect x="110" y="92" width="14" height="32" rx="1"/>
        <rect x="135" y="92" width="14" height="32" rx="1"/>
        <rect x="160" y="92" width="14" height="32" rx="1"/>
        <rect x="185" y="92" width="14" height="32" rx="1"/>
        <rect x="210" y="92" width="14" height="32" rx="1"/>
      </g>
      <!-- School Gate & Fence -->
      <g transform="translate(65 24)">
        <!-- Left Pillar -->
        <rect x="0" y="10" width="18" height="42" fill="#D98A52" stroke="#8C4A1C" stroke-width="1.5"/>
        <rect x="-2" y="6" width="22" height="6" fill="#F2E6D8" stroke="#8C4A1C" stroke-width="1.2"/>
        <circle cx="9" cy="2" r="4" fill="#F2E6D8" stroke="#8C4A1C" stroke-width="1.2"/>
        <!-- Right Pillar -->
        <rect x="130" y="10" width="18" height="42" fill="#D98A52" stroke="#8C4A1C" stroke-width="1.5"/>
        <rect x="128" y="6" width="22" height="6" fill="#F2E6D8" stroke="#8C4A1C" stroke-width="1.2"/>
        <circle cx="139" cy="2" r="4" fill="#F2E6D8" stroke="#8C4A1C" stroke-width="1.2"/>
        <!-- Iron Gate Bars -->
        <rect x="18" y="20" width="112" height="32" fill="none" stroke="#3E4A52" stroke-width="2"/>
        <line x1="36" y1="18" x2="36" y2="52" stroke="#3E4A52" stroke-width="2"/>
        <line x1="56" y1="18" x2="56" y2="52" stroke="#3E4A52" stroke-width="2"/>
        <line x1="74" y1="15" x2="74" y2="52" stroke="#3E4A52" stroke-width="2.5"/>
        <line x1="92" y1="18" x2="92" y2="52" stroke="#3E4A52" stroke-width="2"/>
        <line x1="112" y1="18" x2="112" y2="52" stroke="#3E4A52" stroke-width="2"/>
      </g>
      <!-- Streetlamp on Left -->
      <g transform="translate(30 20)">
        <line x1="0" y1="54" x2="0" y2="8" stroke="#485661" stroke-width="3"/>
        <path d="M0 8 Q8 0 16 4" fill="none" stroke="#485661" stroke-width="2.5"/>
        <polygon points="12,4 20,4 18,10 14,10" fill="#FCE36D"/>
      </g>
      <!-- Tree on Right -->
      <g transform="translate(235 30)">
        <rect x="10" y="24" width="8" height="24" fill="#754722"/>
        <circle cx="14" cy="18" r="20" fill="#4FAE55"/>
      </g>
    </svg>`;
  }
}

function heroArt() {
  return homeHeroArt();
}

function trophyArt() {
  return badgeHeroArt();
}

function tentangArt() {
  return `<svg viewBox="0 0 360 210" aria-hidden="true">
    <defs>
      <linearGradient id="laptopScreenGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F5FCEB"/>
        <stop offset="100%" stop-color="#D7F2B7"/>
      </linearGradient>
    </defs>
    <!-- Background Glow & Hill -->
    <circle cx="260" cy="100" r="88" fill="#EBF9CF" opacity=".7"/>
    <ellipse cx="190" cy="186" rx="156" ry="16" fill="#7FB86B" opacity=".35"/>
    <ellipse cx="190" cy="178" rx="142" ry="14" fill="#8FCB77"/>

    <!-- Fluffy Clouds -->
    <g fill="#FFFFFF" opacity=".75">
      <circle cx="95" cy="52" r="16"/>
      <circle cx="114" cy="46" r="20"/>
      <circle cx="132" cy="52" r="15"/>
      <rect x="95" y="52" width="37" height="15" rx="7"/>
    </g>

    <!-- Potted Plant (Left) -->
    <g transform="translate(86 98)">
      <polygon points="12,48 28,48 34,22 6,22" fill="#E88B58"/>
      <rect x="4" y="18" width="32" height="6" rx="2" fill="#D37340"/>
      <ellipse cx="20" cy="20" rx="14" ry="3" fill="#6B422B"/>
      <path d="M20 18 Q20 5 14 0" stroke="#468834" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M14 0 C10 -10 2 -2 14 0" fill="#65BE47"/>
      <path d="M17 10 C27 4 25 -4 17 6" fill="#88D659"/>
      <path d="M15 14 C5 10 7 2 15 11" fill="#72C64E"/>
    </g>

    <!-- Laptop (Center) -->
    <g transform="translate(130 38)">
      <rect x="18" y="12" width="134" height="96" rx="10" fill="#2F3934"/>
      <rect x="24" y="18" width="122" height="84" rx="6" fill="#3D4B44"/>
      <rect x="28" y="22" width="114" height="76" rx="4" fill="url(#laptopScreenGrad)"/>
      <path d="M85 40 C68 40 60 55 60 67 C72 67 87 59 87 40 Z" fill="#4BAE55"/>
      <path d="M60 67 C72 67 80 52 80 40" fill="none" stroke="#FFFFFF" stroke-width="1.6" opacity=".7"/>
      <path d="M2 110 L168 110 L180 128 L-10 128 Z" fill="#D2DBDC"/>
      <path d="M0 112 L170 112 L178 126 L-8 126 Z" fill="#E8EFF0"/>
      <rect x="68" y="113" width="34" height="5" rx="2" fill="#B5C0C2"/>
      <rect x="18" y="108" width="134" height="4" rx="2" fill="#5F6F67"/>
    </g>

    <!-- Green Recycling Bin (Right) -->
    <g transform="translate(268 64)">
      <polygon points="12,106 56,106 62,32 6,32" fill="#4BAE55"/>
      <rect x="2" y="24" width="64" height="11" rx="4" fill="#3D9B47"/>
      <rect x="18" y="16" width="32" height="9" rx="3" fill="#36863E"/>
      <g fill="#FFFFFF" transform="translate(24 56) scale(0.9)">
        <path d="M12 2 L15 7 L12 7 L12 11 L10 11 L10 7 L7 7 Z"/>
        <path d="M21 16 L17 13 L17 15 L13 13 L12 15 L16 17 L16 19 Z"/>
        <path d="M3 16 L7 19 L7 17 L11 15 L10 13 L6 15 L6 13 Z"/>
      </g>
    </g>

    <!-- Sparkles -->
    <g fill="#FFF" opacity=".95">
      <path d="M336 46 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z"/>
      <path d="M74 86 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z"/>
      <path d="M136 30 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2 z"/>
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

const ACCESSORIES = [
  { id: "none", name: "Standar", icon: "🌱", cost: 0, desc: "Tampilan asli tanpa aksesori" },
  { id: "topi_daun", name: "Topi Daun", icon: "🍃", cost: 150, desc: "Topi ramah lingkungan dari daun hijau" },
  { id: "kacamata_stem", name: "Kacamata STEM", icon: "👓", cost: 300, desc: "Kacamata ilmuwan cilik peneliti sampah" },
  { id: "lencana_juara", name: "Mahkota Juara", icon: "👑", cost: 500, desc: "Mahkota emas pahlawan pemilah bumi" }
];

function getAccessorySvg(accId) {
  if (accId === "topi_daun") {
    return `<path d="M11 12 C14 4 26 4 29 12 C24 10 16 10 11 12 Z" fill="#4CAF50" stroke="#2E7D32" stroke-width="0.8"/>
            <path d="M20 5 Q23 1 27 2" fill="none" stroke="#2E7D32" stroke-width="0.8" stroke-linecap="round"/>`;
  } else if (accId === "kacamata_stem") {
    return `<circle cx="16" cy="18" r="3.2" fill="none" stroke="#00BCD4" stroke-width="1.2"/>
            <circle cx="24" cy="18" r="3.2" fill="none" stroke="#00BCD4" stroke-width="1.2"/>
            <line x1="19.2" y1="18" x2="20.8" y2="18" stroke="#00BCD4" stroke-width="1.2"/>`;
  } else if (accId === "lencana_juara") {
    return `<polygon points="12,12 15,6 20,9 25,6 28,12" fill="#FFD700" stroke="#FFA000" stroke-width="0.8"/>`;
  }
  return "";
}
function avatar(kind, size = 40, acc = null) {
  const a = AVATARS[kind] || AVATARS.aris;
  const currentAcc = acc !== null ? acc : (state?.accessory || "none");
  return `<svg viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true">
    <circle cx="20" cy="20" r="20" fill="${a.bg}"/>
    ${a.long ? `<path d="M8 25c0-10 5-15 12-15s12 5 12 15v7H8z" fill="${a.hair}"/>` : ""}
    <circle cx="20" cy="17" r="7.5" fill="${a.skin}"/>
    <path d="M12.5 16a7.5 7.5 0 0 1 15 0c0-6-3-9-7.5-9s-7.5 3-7.5 9z" fill="${a.hair}"/>
    <circle cx="17.2" cy="17.6" r="1" fill="#2A1B14"/><circle cx="22.8" cy="17.6" r="1" fill="#2A1B14"/>
    <path d="M18.3 20.5q1.7 1.3 3.4 0" stroke="#2A1B14" stroke-width="1.1" fill="none" stroke-linecap="round"/>
    <path d="M8 40c1-8 5.5-12 12-12s11 4 12 12z" fill="${a.shirt}"/>
    ${getAccessorySvg(currentAcc)}
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
      <pattern id="hazardStripes" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="16" fill="#F5C538"/>
        <rect x="8" width="8" height="16" fill="#243028"/>
      </pattern>
    </defs>
    <!-- Background Image 2 for Misi / Arena Permainan -->
    <image href="assets/bg-game.jpg" x="0" y="0" width="1200" height="520" preserveAspectRatio="xMidYMid slice"/>

    <!-- Industrial Conveyor Belt -->
    <g class="conveyor-group">
      <!-- Steel Support Pillars with Hazard Stripes Footings -->
      <rect x="172" y="385" width="18" height="52" rx="3" fill="#3B4740"/>
      <rect x="157" y="426" width="48" height="16" rx="3" fill="url(#hazardStripes)" stroke="#1B221E" stroke-width="1.5"/>
      <rect x="652" y="385" width="18" height="52" rx="3" fill="#3B4740"/>
      <rect x="637" y="426" width="48" height="16" rx="3" fill="url(#hazardStripes)" stroke="#1B221E" stroke-width="1.5"/>
      <rect x="972" y="385" width="18" height="52" rx="3" fill="#3B4740"/>
      <rect x="957" y="426" width="48" height="16" rx="3" fill="url(#hazardStripes)" stroke="#1B221E" stroke-width="1.5"/>

      <!-- Main Heavy Conveyor Bed -->
      <rect x="24" y="354" width="1152" height="36" rx="18" fill="#36423B" stroke="#222B25" stroke-width="2.5"/>
      <rect x="42" y="362" width="1116" height="5" rx="3" fill="#58675E" opacity=".7"/>

      <!-- Moving Belt Track with Road Markings -->
      <path class="conveyor-moving-track" d="M42 372h1116" stroke="#93A79A" stroke-width="4.5" stroke-dasharray="20 22" stroke-linecap="round" opacity=".9"/>

      <!-- Rotating Gear Wheel (Left) -->
      <g class="conveyor-wheel wheel-left">
        <circle cx="42" cy="372" r="20" fill="#2E3833" stroke="#1A221E" stroke-width="4"/>
        <circle cx="42" cy="372" r="13" fill="#46544D"/>
        <circle cx="42" cy="372" r="6" fill="#1A221E"/>
        <line x1="42" y1="354" x2="42" y2="390" stroke="#8A9D91" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="24" y1="372" x2="60" y2="372" stroke="#8A9D91" stroke-width="2.5" stroke-linecap="round"/>
      </g>
      <!-- Rotating Gear Wheel (Right) -->
      <g class="conveyor-wheel wheel-right">
        <circle cx="1158" cy="372" r="20" fill="#2E3833" stroke="#1A221E" stroke-width="4"/>
        <circle cx="1158" cy="372" r="13" fill="#46544D"/>
        <circle cx="1158" cy="372" r="6" fill="#1A221E"/>
        <line x1="1158" y1="354" x2="1158" y2="390" stroke="#8A9D91" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="1140" y1="372" x2="1176" y2="372" stroke="#8A9D91" stroke-width="2.5" stroke-linecap="round"/>
      </g>
    </g>

    <!-- Queued Waste Items on Right Side of Conveyor -->
    <g class="conveyor-items">
      <g transform="translate(950 286)">${bottleArt()}</g>
      <g transform="translate(1020 298)">${canArt("#E2594F", "#fff")}</g>
      <g transform="translate(1080 298)">${canArt("#3E4C58", "#F5C538")}</g>
      <g transform="translate(1138 304)">${tissueArt()}</g>
    </g>

    <!-- Sparkles and subtle nature accents -->
    <g fill="#fff" opacity=".95">
      <path d="M700 180l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
      <path d="M880 230l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>
    </g>
  </svg>`;
}

/* ---------------- Content ---------------- */
const CATEGORIES = [
  { id: "organik", name: "Organik", chip: "Organik", card: "mint", badge: "Tempat sampah hijau",
    desc: ["Kulit buah, sisa makanan, daun", "Olah menjadi kompos & biogas"],
    detail: "Sampah organik adalah sampah hayati yang berasal dari sisa makhluk hidup (tumbuhan dan hewan) yang dapat didekomposisi secara biologis oleh mikroorganisme tanah, cacing, atau larva pengurai.",
    examples: ["Kulit buah & sayur", "Daun kering & ranting kebun", "Sisa nasi & lauk makanan", "Cangkang telur & ampas kopi"],
    traits: ["Berasal dari biomassa makhluk hidup", "Mudah membusuk dalam hitungan 2–6 minggu", "Kaya unsur hara N-P-K (Nitrogen, Fosfor, Kalium)", "Dapat diolah menjadi pupuk kompos, pupuk cair, dan biogas"],
    exampleDetails: [
      { n: "Kulit buah & sayur", d: "Mengandung kalium dan mikronutrien penting, cepat hancur jadi kompos subur." },
      { n: "Daun & ranting kebun", d: "Sumber karbon cokelat (C) yang menjaga aerasi dan kelembapan kompos." },
      { n: "Sisa nasi & makanan", d: "Bisa diolah dengan biokonversi maggot BSF menjadi pakan ternak berprotein tinggi." },
      { n: "Cangkang telur & ampas kopi", d: "Sumber kalsium alami serta peningkat struktur kegemburan tanah tanaman." }
    ],
    decompTime: "2 Minggu hingga 6 Bulan (sangat cepat terurai alami)",
    scienceReason: "Dekomposisi organik oleh bakteri melepaskan nutrisi kembali ke tanah. Namun jika menumpuk di TPA tanpa udara (anaerobik), sampah organik menghasilkan gas metana (CH₄) berbahaya.",
    recycleFlow: "Pemilahan dari sumber ➔ Pencacahan/Pengecilan ukuran ➔ Pengomposan aerobik/Biopori (atau reaktor Biogas) ➔ Penyaringan pupuk matang siap pakai untuk tanaman.",
    steps: ["Pisahkan dari kemasan plastik, staples, dan karet sejak dari piring/dapur.", "Potong atau cacah kecil agar luas permukaan kontak mikroorganisme bertambah.", "Masukkan ke komposter, lubang biopori, atau pot tanaman pekarangan.", "Jaga kelembapan seimbang (jangan terlalu basah atau kering) agar tidak timbul bau."],
    why: "Sekitar 50–60% timbulan sampah harian adalah organik. Memilahnya mencegah ledakan gas metana di TPA dan menghasilkan pupuk alami gratis.",
    fact: "Dalam ± 3 bulan, 100 kg sampah organik dapat menghasilkan 30–40 kg kompos kaya hara yang mampu menggantikan pupuk kimia sintetis.",
    dont: ["Membakar daun kering (menghasilkan asap beracun dan CO₂)", "Mencampur sisa makanan berminyak dengan plastik kresek", "Membuang sisa makanan ke selokan yang memicu pendangkalan"],
    tip: "Manfaatkan lubang biopori di sekolah atau pekarangan rumah untuk menyerap air hujan sekaligus mengolah sampah organik." },
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
  { q: "Kulit pisang dan daun kering sebaiknya dimasukkan ke tempat sampah berwarna apa?", opts: ["Hijau (Organik)", "Merah (B3)", "Kuning (Daur Ulang)", "Abu-abu (Residu)"], answer: 0, fact: "Tepat! Keduanya mudah membusuk secara alami sehingga masuk kategori organik (hijau)." },
  { q: "Mengapa baterai bekas tidak boleh dibuang ke tempat sampah biasa?", opts: ["Karena terlalu ringan", "Mengandung logam berat dan bahan kimia beracun", "Karena bisa dimakan semut", "Karena warnanya menarik"], answer: 1, fact: "Benar! Baterai termasuk limbah B3 karena mengandung timbal, merkuri, dan kadmium yang dapat mencemari air minum tanah." },
  { q: "Apa dampak pencampuran sampah organik di TPA jika menumpuk tanpa udara (kondisi anaerobik)?", opts: ["Menghasilkan gas metana yang memperparah pemanasan global", "Menjadikan TPA semakin wangi", "Membuat plastik cepat hancur", "Tidak ada dampak apa pun"], answer: 0, fact: "Tepat sekali! Sampah organik tanpa oksigen menghasilkan gas metana (CH₄) yang 25x lebih kuat memerangkap panas dibanding CO₂." },
  { q: "Mengapa kertas struk belanja (thermal paper) dan kemasan berminyak tidak diterima pabrik daur ulang?", opts: ["Karena mengandung zat kimia BPA/lemak yang merusak bubur kertas", "Karena warnanya terlalu putih", "Karena ukurannya terlalu kecil", "Karena terlalu wangi"], answer: 0, fact: "Tepat! Lapisan kimia thermal BPA dan minyak pekat mengkontaminasi bubur pulp daur ulang, sehingga masuk sampah residu." },
  { q: "Apa langkah paling awal yang harus dilakukan sebelum menyetor botol plastik ke Bank Sampah?", opts: ["Mengosongkan sisa cairan dan membilasnya", "Membakarnya sampai meleleh", "Mengecatnya dengan warna baru", "Menguburnya di dalam tanah"], answer: 0, fact: "Keren! Sisa cairan yang tertinggal menimbulkan bau busuk dan jamur yang menurunkan nilai jual daur ulang." },
  { q: "Apa aksi nyata paling berdampak dalam prinsip Zero Waste sebelum daur ulang dilakukan?", opts: ["Mengurangi pemakaian wadah sekali pakai (Reduce)", "Membeli lebih banyak kantong plastik", "Membuang semua sampah ke sungai", "Membakar sampah di halaman rumah"], answer: 0, fact: "Luar biasa! Hirarki pengelolaan sampah terbaik selalu diawali dengan mencegah (Reduce) dan menggunakan kembali (Reuse)." }
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
    accessory: "none",
    ownedAccessories: ["none"],
    poin: 0,
    koin: 0,
    level: 0,
    selected: 1,
    quizDone: false,
    games: 0,
    correct: 0,
    answered: 0,
    streak: 1,
    lastActiveDate: new Date().toISOString().split("T")[0],
    lastSpinDate: "",
    lastWrongItems: [],
    missionClaimed: false,
    levels: [{ stars: 0 }, { stars: 0 }, { stars: 0 }, { stars: 0 }, { stars: 0 }, { stars: 0 }],
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
  renderLeaderboard();
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
  const names = {
    beranda: "Beranda",
    ensiklopedia: "Ensiklopedia",
    statistik: "Statistik",
    pencapaian: "Pencapaian",
    game: "Permainan",
    kuis: "Kuis harian",
    tentang: "Tentang"
  };
  const isGame = page === "game";
  $("#app").hidden = isGame;
  $("#gameRoot").hidden = !isGame;
  ["beranda", "ensiklopedia", "statistik", "pencapaian", "kuis", "tentang"].forEach(p => {
    const el = $("#page-" + p);
    if (el) el.hidden = p !== page;
  });
  $$(".side-nav button").forEach(b => b.classList.toggle("active", b.dataset.page === page));
  $("#crumb").textContent = names[page] || "Ensiklopedia";
  if (page === "beranda") {
    const ah = $("#artHome"); if (ah && !ah.children.length) ah.innerHTML = homeHeroArt();
    renderMissions();
  }
  if (page === "ensiklopedia") {
    const ae = $("#artEco"); if (ae && !ae.children.length) ae.innerHTML = ecoHeroArt();
    renderEco();
  }
  if (page === "statistik") {
    const as = $("#artStat"); if (as && !as.children.length) as.innerHTML = statHeroArt();
    renderStats();
  }
  if (page === "pencapaian") {
    const ab = $("#artBadge"); if (ab && !ab.children.length) ab.innerHTML = badgeHeroArt();
    renderBadges();
  }
  if (page === "kuis") renderQuiz();
  if (page === "tentang") renderAbout();
  if (!isGame) window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------- Sidebar / topbar ---------------- */
const levelName = () => getLevelTier(state.poin).name;

function updateDailyStreak() {
  const today = new Date().toISOString().split("T")[0];
  if (!state.lastActiveDate) {
    state.lastActiveDate = today;
    state.streak = 1;
  } else if (state.lastActiveDate !== today) {
    const lastDate = new Date(state.lastActiveDate);
    const currDate = new Date(today);
    const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      state.streak = (state.streak || 1) + 1;
    } else if (diffDays > 1) {
      state.streak = 1;
    }
    state.lastActiveDate = today;
  }
}

function renderShell() {
  updateDailyStreak();
  updateLevel();
  const tier = getLevelTier(state.poin);
  const streakDaysEl = $("#streakDays");
  if (streakDaysEl) streakDaysEl.textContent = `${state.streak || 1} Hari`;
  $("#poinTop").textContent = fmt(state.poin);

  const missionCountNote = $("#missionCountNote");
  if (missionCountNote) missionCountNote.textContent = `${LEVELS.length} level aktif`;

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

  renderLeaderboard();
  const topAva = $("#topAva");
  if (topAva) topAva.innerHTML = avatar(currentUser.avatar || "aris", 40, state.accessory);
  renderImpactCalculator();
}

function renderLeaderboard() {
  const sb = $("#sideBoard");
  if (!sb) return;

  const users = loadUsersDatabase();
  users.sort((a, b) => (b.poin || 0) - (a.poin || 0));
  const top3 = users.slice(0, 3);

  sb.innerHTML = top3.map((u, idx) => {
    const isCurrent = currentUser && u.id === currentUser.id;
    return `
      <div class="board-row ${isCurrent ? "is-user" : ""}">
        <span class="rank-badge r${idx + 1}">${idx + 1}</span>
        <span class="ba">${avatar(u.avatar || "aris")}</span>
        <span class="bn">${u.name}${isCurrent ? " (Kamu)" : ""}</span>
        <span class="bp">${fmt(u.poin || 0)}</span>
      </div>
    `;
  }).join("");
}

function renderAbout() {
  const el = $("#artTentang");
  if (el && !el.innerHTML.trim()) {
    el.innerHTML = tentangArt();
  }
}

/* ---------------- Encyclopedia ---------------- */
function renderChips() {
  const all = ["semua", ...CATEGORIES.map(c => c.id)];
  $("#chips").innerHTML = all.map(id => {
    const label = id === "semua" ? "Semua" : CATEGORIES.find(c => c.id === id).chip;
    return `<button class="chip ${filter === id ? "active" : ""}" data-filter="${id}">${label}</button>`;
  }).join("");
}


/* ---------------- Data Detail Khusus Item Ensiklopedia ---------------- */
const ENCYCLOPEDIA_ITEM_DATABASE = {
  organik: [
    {
      name: "Sisa Nasi & Sayur",
      icon: "🍚",
      traits: "Tinggi karbohidrat, air, dan nitrogen (materi hijau)",
      science: "Mudah terurai bakteri anaerobik/aerobik. Menjadi sumber makanan larva Maggot BSF atau biopori.",
      decomp: "2 – 4 Minggu",
      recycle: "Pengomposan rumah tangga / biopori / pakan ternak terfermentasi",
      confusing: "Nasi berminyak pekat sebaiknya dicampur serbuk kayu/daun kering agar tidak bau",
      ecoTip: "Ambil porsi makan secukupnya untuk mencegah timbulan sampah organik (Food Waste Prevention)"
    },
    {
      name: "Kulit Buah & Sayuran",
      icon: "🍌",
      traits: "Kaya vitamin, kalium, dan serat selulosa alami",
      science: "Mikroorganisme tanah mengurai selulosa menjadi humus gembur penyubur akar tanaman.",
      decomp: "1 – 2 Bulan",
      recycle: "Pembuatan Eco-Enzyme (cairan pembersih alami serbaguna) & pupuk kompos",
      confusing: "Biji buah yang sangat keras (alpukat/mangga) butuh waktu lebih lama terurai, cacah terlebih dahulu",
      ecoTip: "Kulit jeruk dan nanas sangat baik dibuat Eco-Enzyme yang wangi dan bebas kimia sintetis"
    },
    {
      name: "Daun Kering & Ranting",
      icon: "🍂",
      traits: "Serat lignin dan karbon cokelat (C) yang kering dan renyah",
      science: "Berfungsi sebagai penyeimbang rasio C/N dalam komposter dan menjaga sirkulasi oksigen.",
      decomp: "2 – 6 Bulan",
      recycle: "Mulsa penutup tanah taman sekolah & bahan kompos cokelat",
      confusing: "Jangan pernah dibakar! Pembakaran daun kering menghasilkan asap jelaga dan karbon monoksida",
      ecoTip: "Kumpulkan daun kering di sudut kebun sekolah untuk diolah menjadi kompos daun alami"
    },
    {
      name: "Cangkang Telur & Ampas Kopi",
      icon: "🥚",
      traits: "Kalsium karbonat padat (cangkang) & nitrogen asam alami (kopi)",
      science: "Cangkang telur memperkuat dinding sel tanaman, sedangkan ampas kopi memperbaiki struktur tanah.",
      decomp: "3 – 6 Bulan",
      recycle: "Penabur langsung pada pot tanaman atau campuran komposter",
      confusing: "Remas cangkang telur sampai halus sebelum dimasukkan ke media tanam",
      ecoTip: "Ampas kopi juga dapat mengusir hama semut secara alami di kebun sekolah"
    }
  ],
  daur: [
    {
      name: "Botol Plastik PET (Kode 1)",
      icon: "🧴",
      traits: "Bening, ringan, tidak berbau, kedap air dan gas",
      science: "Polietilena tereftalat adalah polimer sintetis rantai panjang yang sangat tahan dekomposisi biologis.",
      decomp: "450 Tahun",
      recycle: "Dicuci, dicacah jadi serpihan, dilelehkan jadi serat polyester pakaian olahraga",
      confusing: "Label plastik PVC dan tutup botol HDPE sebaiknya dipisah jika memungkinkan",
      ecoTip: "Kosongkan isi, bilas dengan air sedikit, lalu remas hingga pipih sebelum disetor"
    },
    {
      name: "Kardus & Kertas Bersih",
      icon: "📦",
      traits: "Serat selulosa kayu yang mudah menyerap cairan",
      science: "Dapat direndam menjadi bubur pulp dan dicetak ulang hingga 5–7 kali siklus daur ulang.",
      decomp: "2 – 6 Minggu (kertas) | 2 – 5 Bulan (kardus)",
      recycle: "Pulping industri menjadi kertas buram, karton kemasan, dan egg tray",
      confusing: "Kardus terkena minyak atau sisa makanan tidak bisa didaur ulang karena merusak bubur kertas",
      ecoTip: "Lipat rapi kardus bekas paket dan kumpulkan kering di wadah terpisah"
    },
    {
      name: "Kaleng Minuman Aluminium",
      icon: "🥫",
      traits: "Logam non-ferrous ringan, anti-karat, konduktor panas baik",
      science: "Aluminium dapat didaur ulang 100% tanpa batas tanpa mengurangi kualitas atom logamnya.",
      decomp: "200 – 500 Tahun",
      recycle: "Peleburan ulang menjadi kaleng baru, suku cadang sepeda, atau komponen konstruksi",
      confusing: "Kaleng bekas cat atau pelumas kimia masuk ke limbah B3, bukan daur ulang biasa",
      ecoTip: "Injak kaleng hingga pipih untuk menghemat ruang tempat penyimpanan Bank Sampah"
    },
    {
      name: "Botol & Pecahan Kaca",
      icon: "🍾",
      traits: "Silika (pasir kuarsa) padat, transparan, non-reaktif, rapuh",
      science: "Kaca tidak melepaskan senyawa berbahaya, tetapi pecahan tajam membahayakan lingkungan dan pekerja.",
      decomp: "1 Juta Tahun (praktis tidak pernah terurai secara alami)",
      recycle: "Peleburan dalam tungku suhu tinggi 1.500°C menjadi botol kaca baru",
      confusing: "Bungkus pecahan kaca dengan kardus/koran tebal sebelum diserahkan demi keselamatan petugas",
      ecoTip: "Gunakan botol kaca berkali-kali sebagai wadah air atau bumbu dapur (Reuse)"
    }
  ],
  b3: [
    {
      name: "Baterai Kering & Aki",
      icon: "🔋",
      traits: "Silinder/kotak logam padat berisi pasta kimia elektrolit asam/alkali",
      science: "Mengandung logam berat timbal (Pb), merkuri (Hg), nikel (Ni), dan kadmium (Cd) beracun tinggi.",
      decomp: "Tidak terurai aman (meracuni biosfer selama puluhan tahun)",
      recycle: "Ekstraksi hidrometalurgi untuk memulihkan seng dan mangan di fasilitas berizin",
      confusing: "Baterai jam dinding dan baterai kancing remote semuanya masuk limbah B3",
      ecoTip: "Beralihlah ke baterai isi ulang (Rechargeable) untuk memotong ratusan timbulan baterai sekali pakai"
    },
    {
      name: "Lampu Neon & LED Rusak",
      icon: "💡",
      traits: "Tabung kaca berisi gas merkuri atau papan driver semikonduktor",
      science: "Uap merkuri pada neon merusak sistem saraf jika terhirup saat kaca pecah.",
      decomp: "Kaca tahan lama, uap merkuri langsung mencemari udara seketika",
      recycle: "Pemisahan fosfor merkuri dengan distilasi vakum oleh pengolah resmi",
      confusing: "Jangan buang lampu neon ke kantong sampah plastik biasa karena rentan pecah tertekan",
      ecoTip: "Simpan lampu rusak dalam kotak kemasannya sebelum diserahkan ke drop-point B3"
    },
    {
      name: "Obat Kedaluwarsa",
      icon: "💊",
      traits: "Tablet, kapsul, atau sirup senyawa farmakologi aktif",
      science: "Jika dibuang ke toilet atau tanah, antibiotik dan hormon memicu resistensi bakteri patogen.",
      decomp: "Senyawa kimia aktif mencemari air hingga hitungan tahun",
      recycle: "Insinerasi suhu sangat tinggi (>1.100°C) di instalasi pengolahan limbah medis",
      confusing: "Jangan membuang sirup obat langsung ke wastafel; campur dulu dengan tanah/ampas kopi lalu buang",
      ecoTip: "Kembalikan obat kedaluwarsa ke fasilitas apotek atau puskesmas terdekat"
    },
    {
      name: "E-Waste (Ponsel & Kabel Bekas)",
      icon: "📱",
      traits: "Papan PCB semikonduktor, komponen solder, dan kawat berinsulasi",
      science: "Mengandung senyawa brominated flame retardants dan logam berat yang berbahaya bila dibakar.",
      decomp: "Ratusan tahun pada plastik insulasi kabel",
      recycle: "Urban mining: peleburan untuk memulihkan emas, tembaga, dan perak berharga tinggi",
      confusing: "Jangan membakar kabel untuk mengambil tembaga karena asap dioksin sangat mematikan",
      ecoTip: "Donasikan perangkat elektronik lama yang masih berfungsi atau serahkan ke bank sampah elektronik"
    }
  ],
  residu: [
    {
      name: "Styrofoam (Gabus Makanan)",
      icon: "🥡",
      traits: "Putih, sangat ringan, berpori, mudah patah jadi butiran kecil",
      science: "Expanded Polystyrene (EPS) mengandung 95% udara dan polistirena yang sangat sulit didaur ulang ekonomis.",
      decomp: "Lebih dari 500 Tahun",
      recycle: "Pengepresan dengan pelarut limonen (masih sangat terbatas teknologinya)",
      confusing: "Styrofoam bukan daur ulang umum; masukkan ke residu dan hindari penggunaannya",
      ecoTip: "Bawa kotak makan misting sendiri dari rumah saat jajan di kantin sekolah"
    },
    {
      name: "Kertas Struk Thermal Kasir",
      icon: "🧾",
      traits: "Tipis, licin, berubah hitam jika dipanaskan atau digesek kuku",
      science: "Dilapisi bahan kimia Bisphenol-A (BPA) atau BPS yang berbahaya bagi hormon manusia.",
      decomp: "Sangat lambat karena lapisan kimia pelindung",
      recycle: "Ditolak pabrik kertas karena merusak mutu bubur kertas daur ulang",
      confusing: "Meskipun berbahan kertas, struk kasir TIDAK boleh masuk tong daur ulang",
      ecoTip: "Minta struk belanja digital (e-receipt) via ponsel saat bertransaksi"
    },
    {
      name: "Popok & Pembalut Bekas",
      icon: "🧻",
      traits: "Mengandung super absorbent polymer (SAP), serat sintetis, dan materi biologis kotor",
      science: "Gel polimer menyerap cairan ratusan kali beratnya dan tidak dapat diurai alami.",
      decomp: "450 – 500 Tahun",
      recycle: "Pemusnahan terkelola di TPA sanitari atau insinerator suhu tinggi",
      confusing: "Bungkus rapat dengan plastik atau kertas bekas sebelum dibuang agar kuman tidak menyebar",
      ecoTip: "Bagi bayi atau keperluan sehari-hari, pertimbangkan cloth diaper (popok kain cuci ulang)"
    },
    {
      name: "Plastik Sachet Berlapis Metalik",
      icon: "🍫",
      traits: "Plastik luar mengilap dengan lapisan foil aluminium di sisi dalam",
      science: "Material multilayer laminate (PE + Aluminium foil) menyatu rapat dan mustahil dipisah mekanis biasa.",
      decomp: "100 – 400 Tahun",
      recycle: "Pembuatan Ecobrick (dipadatkan dalam botol untuk bahan bangunan) atau bahan bakar RDF",
      confusing: "Bungkus snack dan mie instan masuk tong residu, bukan tong daur ulang plastik biasa",
      ecoTip: "Beli makanan atau bumbu dalam kemasan besar/isi ulang untuk mengurangi jumlah sachet"
    }
  ]
};

function openItemDetailModal(catId, itemIdx = 0) {
  const items = ENCYCLOPEDIA_ITEM_DATABASE[catId] || [];
  const it = items[itemIdx];
  if (!it) return;

  openModal(`
    <button class="close" data-close>${ico("close", 20)}</button>
    <div style="text-align:center; padding:10px 6px 18px;">
      <div style="font-size:42px; margin-bottom:4px;">${it.icon}</div>
      <span class="dm-badge" style="background:#E8F5E9; color:var(--green); font-size:10px; font-weight:900; padding:4px 10px; border-radius:99px; text-transform:uppercase;">
        Kategori ${catId.toUpperCase()}
      </span>
      <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin:6px 0 2px;">${it.name}</h2>
      
      <!-- Pilihan Item Lain dalam Kategori Ini -->
      <div class="item-detail-chip-grid">
        ${items.map((item, idx) => `
          <button class="item-chip-btn ${idx === itemIdx ? "active" : ""}" data-item-idx="${idx}">
            ${item.icon} ${item.name.split(" ")[0]}
          </button>
        `).join("")}
      </div>

      <!-- Kotak Rincian Sains STEM Terstruktur -->
      <div style="text-align:left; display:grid; gap:10px; margin:14px 0;">
        <div class="dm-deep-box">
          <h5>🔍 Ciri & Karakteristik Material:</h5>
          <p>${it.traits}</p>
        </div>
        <div class="dm-deep-box">
          <h5>🔬 Alasan Ilmiah STEM & Penguraian:</h5>
          <p>${it.science}</p>
        </div>
        <div class="dm-deep-box" style="background:#FFF9E6; border-color:#FFE082;">
          <h5 style="color:#E65100;">⏳ Estimasi Waktu Terurai:</h5>
          <p style="color:#5D4037; font-weight:800;">${it.decomp}</p>
        </div>
        <div class="dm-deep-box" style="background:#F1F8F1; border-color:#C8E6C9;">
          <h5 style="color:#205B3B;">🔄 Alur Pengolahan / Daur Ulang:</h5>
          <p style="color:#2F5B44;">${it.recycle}</p>
        </div>
        <div class="dm-deep-box" style="background:#FFEBEE; border-color:#FFCDD2;">
          <h5 style="color:#C62828;">⚠️ Sering Membingungkan:</h5>
          <p style="color:#8C3838;">${it.confusing}</p>
        </div>
        <div class="dm-deep-box" style="background:#E3F2FD; border-color:#BBDEFB;">
          <h5 style="color:#1565C0;">🌱 Tips Kebiasaan Bijak (Eco-Action):</h5>
          <p style="color:#1E5385;">${it.ecoTip}</p>
        </div>
      </div>

      <button class="btn-dark" data-close style="margin-top:8px;">Paham, Tutup</button>
    </div>
  `);

  $(".item-chip-btn").forEach(btn => {
    btn.onclick = () => {
      soundState.play("click");
      openItemDetailModal(catId, Number(btn.dataset.itemIdx));
    };
  });
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
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-top:8px;">
          <button class="eco-learn" data-learn="${c.id}">Pelajari Panduan ${ico("arrow", 12)}</button>
          <button class="eco-card-flip-btn" data-detail-items="${c.id}">🔍 Rincian Contoh Item</button>
        </div>
      </div>
    </article>`;
  }).join("") : `<p class="eco-empty">Tidak ada sampah yang cocok dengan pencarianmu.</p>`;
}

function categoryDetail(id) {
  const c = CATEGORIES.find(x => x.id === id);
  const decompTimeMap = {
    organik: "2 Minggu – 6 Bulan (Cepat terurai hayati)",
    daur: "Botol Plastik: 450 Tahun | Kaleng: 200 Tahun | Kertas: 2–6 Minggu | Kaca: 1 Juta Tahun",
    b3: "Tidak pernah terurai aman (mengendap & meracuni biosfer tanah/air)",
    residu: "Styrofoam: >500 Tahun | Popok & Pembalut: 450–500 Tahun | Tisu sintetis: 2–4 Minggu"
  };
  const decompTime = c.decompTime || decompTimeMap[id] || "Bervariasi";

  const scienceReasonMap = {
    organik: "Berasal dari siklus biogeokimia karbon dan nitrogen alam. Saat dikomposkan dengan baik, mikroba tanah mengubahnya menjadi humus penyerap air.",
    daur: "Bahan polimer sintetik atau logam paduan yang membutuhkan energi tinggi saat diproduksi. Mendaur ulang menghemat 70–95% emisi industri.",
    b3: "Mengandung logam berat (Pb, Hg, Cd) atau senyawa kimia reaktif yang merusak sistem saraf makhluk hidup dan mencemari akuifer air minum.",
    residu: "Bahan multi-lapis (multilayer laminate) atau material non-biodegradable yang sulit dipisahkan secara mekanis pada fasilitas daur ulang umum."
  };
  const scienceReason = c.scienceReason || scienceReasonMap[id];

  const recycleFlowMap = {
    organik: "Pemilahan dari sumber ➔ Pencacahan ➔ Pengomposan / Biopori ➔ Pupuk humus kaya hara.",
    daur: "Pengosongan & Pembilasan ➔ Pengepresan & Pengiriman ke Bank Sampah ➔ Pencucian & Pencacahan jadi serpihan ➔ Pelelehan jadi pelet/produk baru.",
    b3: "Penyimpanan terisolasi kering ➔ Pengumpulan terpisah berlabel B3 ➔ Pengiriman ke pengolah berizin ➔ Solidifikasi & netralisasi kimiawi aman.",
    residu: "Pembungkusan rapat aman ➔ Pengangkutan reguler ➔ Pemrosesan terkelola di TPA / insinerator modern ramah lingkungan."
  };
  const recycleFlow = c.recycleFlow || recycleFlowMap[id];

  openModal(`<button class="close" data-close>${ico("close", 20)}</button>
    <div class="dm-head">
      <div class="dm-art">${CATEGORY_ART[id]}</div>
      <div class="dm-headtext">
        <span class="dm-badge ${c.card}">${c.badge}</span>
        <h2>${c.name}</h2>
        <p>${c.detail}</p>
      </div>
    </div>

    <!-- Kotak Sains & Waktu Dekomposisi Terstruktur -->
    <div class="dm-deep-grid">
      <div class="dm-deep-box">
        <h5>⏳ Waktu Terurai Alami</h5>
        <p>${decompTime}</p>
      </div>
      <div class="dm-deep-box">
        <h5>🔬 Alasan Sains STEM</h5>
        <p>${scienceReason}</p>
      </div>
    </div>

    <div class="dm-deep-box" style="margin-bottom:14px; background:#F1F8F1; border-color:#C8E6C9;">
      <h5 style="color:#205B3B;">🔄 Alur Pengolahan & Daur Ulang:</h5>
      <p style="color:#2F5B44;">${recycleFlow}</p>
    </div>

    <div class="dm-section">
      <h4><span>1</span> Ciri-ciri & Sifat Fisik</h4>
      <div class="dm-traits">${c.traits.map(t => `<span>${ico("check", 13)} ${t}</span>`).join("")}</div>
    </div>

    <div class="dm-section">
      <h4><span>2</span> Contoh Nyata di Sekitarmu</h4>
      <div class="dm-examples">${c.exampleDetails.map(e => `<div><strong>${e.n}</strong><p>${e.d}</p></div>`).join("")}</div>
    </div>

    <div class="dm-section">
      <h4><span>3</span> Langkah Penanganan Benar</h4>
      <ol class="dm-steps">${c.steps.map((s, i) => `<li><b>${i + 1}</b><span>${s}</span></li>`).join("")}</ol>
    </div>

    <div class="dm-section">
      <h4><span>4</span> Mengapa Ini Sangat Penting?</h4>
      <p class="dm-why">${c.why}</p>
      <div class="dm-fact">${ico("bulb", 18)}<p><strong>Tahukah kamu?</strong> ${c.fact}</p></div>
    </div>

    <div class="dm-section">
      <h4><span>5</span> Kesalahan yang Sering Terjadi</h4>
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
    const locked = idx > 0 && (state.levels[idx - 1]?.stars || 0) === 0;
    return `<article class="mission-card ${locked ? "locked" : ""}">
      <div class="mission-thumb">
        ${missionThumbnail(l.id)}
      </div>
      <div class="mission-content">
        <div class="mission-top-row">
          <span class="mission-badge ${locked ? "locked-badge" : ""}">LEVEL 0${l.id}</span>
        </div>
        <h3>${l.name}</h3>
        <p>${l.sub}</p>
        <div class="stars">${[0, 1, 2].map(i => `<span class="${i < stars ? "on" : ""}">${ico("star", 18)}</span>`).join("")}</div>
        <button class="${locked ? "btn-soft btn-locked" : "btn-dark"}" data-misi="${l.id}" ${locked ? "disabled" : ""}>
          ${locked ? `Terkunci ${ico("lock", 12)}` : `Mainkan misi ${ico("arrow", 13)}`}
        </button>
      </div>
    </article>`;
  }).join("");
}

/* ---------------- Game ---------------- */

/* ---------------- Particle & Confetti Celebration ---------------- */
function launchConfetti(count = 45) {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ["#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#00BCD4", "#E91E63"];
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.4 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 1.2) * 12,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.02 + 0.012
    });
  }
  let animId;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravitasi
      p.alpha -= p.decay;
      if (p.alpha > 0) {
        alive = true;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1;
    if (alive) {
      animId = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  update();
}

/* ---------------- Mascot Expressions ---------------- */
const mascotTips = [
  "Baterai & limbah B3 harus dipisah agar air tanah tidak tercemar!",
  "Mendaur ulang 1 kaleng aluminium menghemat energi setara 3 jam TV menyala!",
  "Tahukah kamu? Plastik kresek butuh puluhan tahun untuk bisa terurai.",
  "Sampah organik bisa disulap jadi kompos subur dan biogas ramah bumi!",
  "Yuk kurangi sedotan plastik dan bawa tumbler sendiri ke sekolah!"
];

function setMascotSpeech(text) {
  const el = document.getElementById("mascotSpeech");
  if (el) {
    el.textContent = text;
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "popIn .3s ease-out";
  }
}

/* ---------------- Impact & Decomposition Calculator ---------------- */
function getImpactData() {
  const cats = state.cats || {};
  const org = cats.organik || 0;
  const daur = cats.daur || 0;
  const b3 = cats.b3 || 0;
  const residu = cats.residu || 0;
  const total = org + daur + b3 + residu;

  // Rumus STEM realistis sederhana:
  // 1 item daur ulang ~= 0.04 kg CO2 dicegah & 0.03 kWh listrik dihemat
  // 1 item organik ~= 0.05 kg pupuk kompos & 0.02 kg metana dicegah
  // 1 item b3 ~= 10 liter air tanah diselamatkan dari kontaminasi
  const co2Saved = ((daur * 0.04) + (org * 0.02)).toFixed(2);
  const compostKg = (org * 0.05).toFixed(2);
  const waterProtected = (b3 * 10);
  const yearsSaved = (daur * 450) + (residu * 100);

  return { total, org, daur, b3, residu, co2Saved, compostKg, waterProtected, yearsSaved };
}

function renderImpactCalculator() {
  const row = document.getElementById("impactMetricsRow");
  if (!row) return;
  const im = getImpactData();
  row.innerHTML = `
    <div class="impact-metric-box">
      <div class="im-ico">🌿</div>
      <div>
        <strong>${im.co2Saved} kg</strong>
        <small>Estimasi CO₂ Dicegah</small>
      </div>
    </div>
    <div class="impact-metric-box">
      <div class="im-ico">🌱</div>
      <div>
        <strong>${im.compostKg} kg</strong>
        <small>Potensi Kompos Subur</small>
      </div>
    </div>
    <div class="impact-metric-box">
      <div class="im-ico">💧</div>
      <div>
        <strong>${im.waterProtected} Liter</strong>
        <small>Air Bersih Dilindungi</small>
      </div>
    </div>
  `;
}

let currentPlayMode = "classic"; // "classic" atau "rush"
let gameTimerInterval = null;

function startGame(id, mode = null) {
  if (mode) currentPlayMode = mode;
  const lv = LEVELS.find(l => l.id === id);
  const idx = LEVELS.findIndex(l => l.id === id);
  if (!lv) return;
  // Level 1 selalu terbuka, level berikutnya butuh bintang kecuali di mode rush
  if (currentPlayMode !== "rush" && idx > 0 && (state.levels[idx - 1]?.stars || 0) === 0) return;
  
  if (gameTimerInterval) clearInterval(gameTimerInterval);

  state.selected = id; 
  save();
  
  game = { 
    id, 
    mode: currentPlayMode,
    timeLeft: currentPlayMode === "rush" ? 60 : 0,
    i: 0, 
    correct: 0, 
    combo: 0, 
    maxCombo: 0,
    score: 0, 
    hearts: currentPlayMode === "rush" ? 5 : 3, 
    answered: false, 
    hint: false, 
    wrong: false, 
    picked: null, 
    earned: 0,
    wrongList: []
  };

  if (currentPlayMode === "rush") {
    gameTimerInterval = setInterval(() => {
      if (game && game.timeLeft > 0 && !game.answered) {
        game.timeLeft--;
        const el = document.getElementById("gameTimerCount");
        if (el) el.textContent = `${game.timeLeft}s`;
        if (game.timeLeft <= 0) {
          clearInterval(gameTimerInterval);
          finishGame();
        }
      }
    }, 1000);
  }

  showPage("game");
  renderGame();
  setMascotSpeech("Misi dimulai! Pilah sampah dengan cermat ya!");
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
          ${game.mode === "rush" ? `<div class="g-timer" id="gameTimerBadge">⏳ <span id="gameTimerCount">${game.timeLeft}s</span></div>` : ""}
          <div class="g-hearts">${Array.from({length: game.mode === "rush" ? 5 : 3}).map((_, i) => `<span class="${i < game.hearts ? "" : "lost"}">${ico("heart", 14)}</span>`).join("")}</div>
          <div class="g-combo ${game.combo ? "" : "off"}">${ico("shield", 12)} x${game.combo}</div>
          <div class="g-coins">${ico("coin", 14)} ${fmt(totalPts)}</div>
          <button class="g-sound-btn ${soundState.enabled ? '' : 'muted'}" id="soundToggle" title="${soundState.enabled ? 'Matikan Suara' : 'Nyalakan Suara'}">
            ${ico(soundState.enabled ? "volume" : "volume-mute", 16)}
          </button>
        </div>
      </header>

      <div class="game-scene">
        ${sceneBg()}
        <div class="scene-hint-card ${game.hint ? "expanded" : ""}" id="sceneHintCard">
          <div class="shc-header">
            <span class="shc-ico">${ico("bulb", 15)}</span>
            <strong>Petunjuk</strong>
            <span class="shc-toggle">${game.hint ? "▲" : "▼"}</span>
          </div>
          <p class="shc-text">${item.hint}</p>
        </div>
        <div class="scene-prompt">${ico("leaf-small", 11)} Tempat sampah mana yang tepat?</div>
        <div class="scene-hud-right">
          <span class="scene-badge-pill lv">${ico("leaf-small", 11)} Level ${lv.id} dari ${LEVELS.length}</span>
          <span class="scene-badge-pill pts">${ico("star", 11)} + ${fmt(game.score)} poin</span>
        </div>

        <span class="waste-glow"></span>
        <div class="waste-card ${game.answered ? (game.wrong ? "bad" : "ok") : ""}" id="waste" draggable="${!game.answered}">
          <div class="visual">${item.svg}</div>
          <h2>${item.name} <span class="waste-sparkle">✦</span></h2>
          ${item.tricky ? `<span class="tricky-badge">⚠️ Sampah Jebakan</span>` : ""}
          <button class="hint-chip ${game.hint ? "on" : ""}" id="hintBtn">${ico("bulb", 11)} Petunjuk</button>
        </div>

        ${game.answered ? feedback(item) : ""}
      </div>

      <div class="game-bins">
        ${CATEGORIES.map((c) => `
          <button class="g-bin ${c.id} ${game.answered && c.id === item.bin ? "hit" : ""} ${game.answered && game.wrong && c.id === game.picked ? "miss" : ""}" data-bin="${c.id}" ${game.answered ? "disabled" : ""}>
            <span class="g-bin-foliage f-left"></span>
            <span class="g-bin-foliage f-right"></span>
            <span class="g-bin-art">${binArt(c.id)}</span>
            <div class="g-bin-txt">
              <h3>${ico("check-circle", 13)} ${c.name}</h3>
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
  $("#soundToggle")?.addEventListener("click", () => {
    soundState.toggle();
  });
  $("#sceneHintCard")?.addEventListener("click", () => {
    game.hint = !game.hint;
    renderGame();
  });
  $("#hintBtn")?.addEventListener("click", () => {
    game.hint = !game.hint;
    renderGame();
  });
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

  const binEl = document.querySelector(`.g-bin.${bin}`);

  if (game.wrong) {
    soundState.play("wrong");
    if (binEl) binEl.classList.add("shake-wrong");
    game.combo = 0;
    game.hearts--;
    game.wrongList.push(item);
    if (!state.lastWrongItems) state.lastWrongItems = [];
    state.lastWrongItems.push({ item: item.name, rightBin: item.bin, chosenBin: bin });
    setMascotSpeech(`Jangan bingung! ${item.name} seharusnya masuk ke tempat sampah ${CATEGORIES.find(c => c.id === item.bin)?.name}.`);
  } else {
    soundState.play("correct");
    if (binEl) binEl.classList.add("squash");
    game.combo++;
    game.maxCombo = Math.max(game.maxCombo || 0, game.combo);
    // Combo multiplier STEM gamifikasi
    const multiplier = 1 + (game.combo - 1) * 0.25;
    game.earned = Math.round(100 * multiplier);
    game.score += game.earned;
    game.correct++;
    state.correct++;
    state.cats[item.bin] = (state.cats[item.bin] || 0) + 1;
    
    // Luncurkan partikel kecil jika combo 3 ke atas
    if (game.combo >= 3) {
      launchConfetti(20);
      setMascotSpeech(`Luar biasa! Kombo x${game.combo}! Terus jaga fokusmu!`);
    } else {
      setMascotSpeech(`Tepat sekali! Kamu menyelamatkan bumi selangkah demi selangkah!`);
    }

    const dayIdx = Math.min(4, Math.max(0, new Date().getDay() - 1));
    if (!state.weekly || state.weekly.length !== 5) state.weekly = [0, 0, 0, 0, 0];
    state.weekly[dayIdx] = (state.weekly[dayIdx] || 0) + 1;
  }
  save();
  renderGame();
}

function finishGame() {
  if (gameTimerInterval) clearInterval(gameTimerInterval);
  const lv = LEVELS.find(l => l.id === game.id);
  const total = lv.items.length;
  const pct = Math.round(game.correct / total * 100);
  const stars = pct === 100 ? 3 : pct >= 67 ? 2 : pct >= 34 ? 1 : 0;
  const coins = Math.round(30 * game.correct / total) + (game.mode === "rush" ? 25 : 0);
  state.poin += game.score;
  state.koin += coins;
  state.energi = Math.max(0, state.energi - 5);
  state.games++;

  if (state.levels[game.id - 1]) {
    state.levels[game.id - 1].stars = Math.max(state.levels[game.id - 1].stars || 0, stars);
  }

  updateLevel();
  save();
  renderShell();
  renderMissions();

  const ok = stars > 0;
  if (ok) {
    soundState.play("badge");
    launchConfetti(50);
    setMascotSpeech(`Selamat! Kamu menyelesaikan ${lv.name} dengan gemilang!`);
  } else {
    soundState.play("wrong");
    setMascotSpeech("Jangan patah semangat! Coba ulangi lagi item yang salah ya!");
  }

  const next = LEVELS[game.id];
  const hasWrongItems = game.wrongList && game.wrongList.length > 0;

  $("#gameRoot").innerHTML = `
    <div class="game-result-wrap">
      <div class="result" id="summaryCardToShare">
        <span class="badge">${ok ? (game.mode === "rush" ? "RUSH HOUR SELESAI!" : "Misi selesai!") : "Coba lagi"}</span>
        <h1>${ok ? `Keren, Pahlawan ${lv.name}!` : "Belum beruntung, jangan menyerah!"}</h1>
        <p>${ok ? "Sampah berhasil dipilah. Mari kita saksikan simulasi daur ulang dan dampak nyatanya!" : "Pelajari kembali petunjuk jenis sampah, lalu ulangi item yang salah ya!"}</p>
        
        <div class="stars">${[0, 1, 2].map(i => `<span class="${i < stars ? "on" : ""}">${ico("star", 34)}</span>`).join("")}</div>
        
        <div class="stats">
          <div><small>Akurasi</small><strong>${pct}%</strong></div>
          <div><small>Poin</small><strong>+${fmt(game.score)}</strong></div>
          <div><small>Koin</small><strong>+${coins}</strong></div>
        </div>

        <!-- Mini-Lab Daur Ulang / Alur Pengolahan Lanjutan -->
        <div style="background:#F7FAF5; border:1px solid #DDF2C5; border-radius:14px; padding:12px; margin:14px 0; text-align:left;">
          <strong style="display:flex; align-items:center; gap:6px; font-size:12px; color:var(--ink);">
            🔬 Mini-Lab Simulasi Daur Ulang STEM:
          </strong>
          <p style="font-size:11px; color:#5D7A68; margin-top:4px; line-height:1.4;">
            • <b>Organik:</b> Masuk komposter sekolah & fermentasi biopori menjadi pupuk kompos.<br>
            • <b>Anorganik Daur Ulang:</b> Dicacah dan dilelehkan kembali jadi pelet material baru.<br>
            • <b>B3:</b> Diamankan di wadah khusus untuk dinetralkan fasilitas berizin.
          </p>
        </div>

        ${hasWrongItems ? `
          <div style="background:#FFF5F5; border:1px solid #FFD8D8; border-radius:12px; padding:10px; margin-bottom:14px; text-align:left;">
            <strong style="font-size:11.5px; color:#C62828;">⚠️ Review Kesalahan (${game.wrongList.length} item):</strong>
            <p style="font-size:10.5px; color:#8C3838; margin-top:2px;">
              ${game.wrongList.map(w => `${w.name} → ${CATEGORIES.find(c => c.id === w.bin)?.name}`).join(", ")}
            </p>
          </div>
        ` : ""}

        <div class="actions">
          ${hasWrongItems ? `<button class="btn-soft" id="retryWrongItems" style="background:#FFE8CC; color:#D9480F; border-color:#FFD8A8;">Ulangi Item Salah</button>` : ""}
          <button class="btn-soft" id="replay">${ico("refresh", 15)} Main lagi</button>
          ${ok && next ? `<button class="btn-dark" id="nextLevel">Level berikutnya ${ico("arrow", 14)}</button>` : ""}
          <button class="btn-soft" id="toHome">Kembali ke beranda</button>
        </div>
      </div>
    </div>`;

  $("#replay").onclick = () => startGame(lv.id, game.mode);
  $("#nextLevel")?.addEventListener("click", () => startGame(next.id, game.mode));
  $("#toHome").onclick = () => showPage("beranda");

  const retryWrongBtn = $("#retryWrongItems");
  if (retryWrongBtn) {
    retryWrongBtn.onclick = () => {
      // Buat ronde latihan singkat hanya untuk item yang salah
      const tempLevel = { id: lv.id, name: `Latihan ${lv.name}`, items: [...game.wrongList] };
      game.i = 0;
      game.correct = 0;
      game.score = 0;
      game.hearts = 3;
      game.answered = false;
      game.wrongList = [];
      renderGame();
      setMascotSpeech("Ayo fokus! Buktikan kamu bisa memilah item-item ini dengan benar!");
    };
  }
}


/* ---------------- Mini-Game 1: Recycling & Waste-to-Value Lab ---------------- */
const RECYCLE_SIM_DATA = {
  plastik: {
    name: "Botol Plastik PET",
    icon: "🧴",
    steps: [
      { num: 1, title: "Sortir & Cuci Bersih", desc: "Label dilepas, botol dicuci dengan air sabun panas untuk menghilangkan residu gula & minyak." },
      { num: 2, title: "Pencacahan (Flakes)", desc: "Botol bersih dipotong mesin pisau putar menjadi serpihan kecil berukuran 5–10 mm." },
      { num: 3, title: "Pelelehan & Ekstrusi", desc: "Serpihan dipanaskan pada suhu ±260°C hingga meleleh, lalu dicetak menjadi biji plastik (pelet rPET)." },
      { num: 4, title: "Produk Baru Bernilai", desc: "Biji plastik dipintal menjadi serat dakron kaos olahraga, tas daur ulang, atau botol baru!" }
    ],
    impact: "Menghemat 66% energi dan mengurangi 1,5 kg emisi CO₂ per 1 kg botol plastik daur ulang!"
  },
  kertas: {
    name: "Kardus & Kertas Bekas",
    icon: "📦",
    steps: [
      { num: 1, title: "Pulping (Bubur Kertas)", desc: "Kertas direndam dalam air dan diputar kencang hingga terurai menjadi serat selulosa murni." },
      { num: 2, title: "De-inking & Pembersihan", desc: "Tinta dan lem dihilangkan dengan proses flotasi gelembung udara dan penyaringan berulang." },
      { num: 3, title: "Pengepresan & Pengeringan", desc: "Bubur serat diratakan di atas anyaman kawat, diperas airnya, dan dipanaskan dengan silinder rol." },
      { num: 4, title: "Gulungan Kertas Baru", desc: "Menghasilkan lembaran karton daur ulang, egg tray (wadah telur), atau buku tulis baru!" }
    ],
    impact: "1 ton kardus daur ulang menyelamatkan 17 pohon dewasa dan 26.000 liter air bersih!"
  },
  organik: {
    name: "Sampah Organik Dapur",
    icon: "🍎",
    steps: [
      { num: 1, title: "Pencacahan Biomassa", desc: "Sisa buah dan sayur dicacah agar luas permukaan mikroba bertambah untuk mempercepat proses." },
      { num: 2, title: "Pencampuran Rasio C/N", desc: "Materi hijau kaya nitrogen dicampur dengan materi cokelat (daun kering/serbuk kayu) secara seimbang." },
      { num: 3, title: "Fermentasi & Aerasi", desc: "Bakteri pengurai bekerja menaikkan suhu tumpukan hingga 55–65°C, membunuh patogen secara alami." },
      { num: 4, title: "Kompos Humus Hitam", desc: "Menghasilkan pupuk kompos matang yang kaya nutrisi mikro dan makro untuk menghijaukan kebun!" }
    ],
    impact: "Mencegah pembentukan gas metana di TPA dan memperbaiki kesuburan tanah tanpa pestisida kimia."
  }
};

let activeLabMat = "plastik";
let activeLabStep = 0;

/* ---------------- Recycling Lab 5-Stage Complete STEM Simulation ---------------- */
const RECYCLE_LAB_5STAGES = {
  plastik: {
    name: "Botol Plastik PET",
    icon: "🧴",
    targetProducts: ["Biji Plastik rPET Serbaguna", "Serat Polyester Kain Jersey Olahraga", "Tali Pengikat Industri Ekologis"],
    stages: [
      {
        num: 1,
        title: "Pemilihan Bahan & Target Produk",
        desc: "Botol plastik PET (kode 1) dipilih untuk diolah kembali. Target produk: Serat kain jersey sekolah ramah bumi.",
        interact: "Bahan siap: Botol PET bening bebas pewarna pekat agar nilai daur ulang tinggi."
      },
      {
        num: 2,
        title: "Pemeriksaan Kontaminasi & Kondisi",
        desc: "Periksa sisa cairan gula, minyak pekat, perekat lem label, dan cincin tutup botol (HDPE).",
        interact: "Tindakan: Label dilepas manual, cairan sisa dibilas, cincin tutup dipisahkan untuk menjaga kemurnian polimer."
      },
      {
        num: 3,
        title: "Stasiun Pengolahan Mesin",
        desc: "Proses pencucian panas (hot wash) pada 85°C, dilanjutkan pemotongan mesin pisau rotari menjadi serpihan (flakes 8 mm).",
        interact: "Status mesin: Pisau pencacah memotong botol menjadi 1.200 serpihan siap leleh."
      },
      {
        num: 4,
        title: "Tantangan Parameter STEM",
        desc: "Berapa suhu leleh optimal untuk ekstrusi polietilena tereftalat (PET) tanpa merusak rantai polimernya?",
        question: "Pilih suhu ekstrusi:",
        options: ["100°C (Kurang panas, polimer tidak leleh)", "260°C (Suhu leleh optimal PET)", "500°C (Terlalu panas, plastik terbakar)"],
        correctOpt: 1
      },
      {
        num: 5,
        title: "Laporan Hasil Lab & Manfaat Ekologis",
        desc: "Hasil olahan berhasil dicetak menjadi serat kain berkualitas tinggi!",
        co2Saved: "1,8 kg CO₂ dicegah",
        energySaved: "66% energi listrik dihemat",
        ptsEarned: 80
      }
    ]
  },
  kertas: {
    name: "Kardus & Kertas Bekas",
    icon: "📦",
    targetProducts: ["Lembaran Karton Duplex", "Egg Tray (Wadah Telur)", "Buku Catatan Kertas Daur Ulang"],
    stages: [
      {
        num: 1,
        title: "Pemilihan Bahan & Target Produk",
        desc: "Kardus cokelat bergelombang (corrugated carton) dipilih untuk dibuat menjadi egg tray biodegradable.",
        interact: "Bahan siap: Serat selulosa panjang dari kayu kraft yang kokoh dan mudah menyerap air."
      },
      {
        num: 2,
        title: "Pemeriksaan Kontaminasi & Kondisi",
        desc: "Periksa lakban plastik, staples kawat besi, dan bercak minyak goreng yang menempel di kardus.",
        interact: "Tindakan: Lakban plastik ditarik lepas dan staples dicabut agar pisau mesin pulper tidak macet."
      },
      {
        num: 3,
        title: "Stasiun Pengolahan Mesin (Pulping)",
        desc: "Kardus direndam dalam bak air hangat dan diaduk hidropulper berkecepatan tinggi menjadi bubur bubur serat kertas.",
        interact: "Status mesin: Serat selulosa terurai sempurna menjadi bubur pulp siap cetak."
      },
      {
        num: 4,
        title: "Tantangan Parameter STEM",
        desc: "Berapa rasio perbandingan air dan serat kertas ideal dalam tangki pulper untuk pembentukan lembaran seragam?",
        question: "Pilih konsistensi pulp:",
        options: ["1% serat, 99% air (Terlalu encer)", "4% serat, 96% air (Konsistensi optimal)", "50% serat, 50% air (Terlalu kental, mesin macet)"],
        correctOpt: 1
      },
      {
        num: 5,
        title: "Laporan Hasil Lab & Manfaat Ekologis",
        desc: "Bubur dicetak vacum dan dipanaskan menjadi wadah karton telur yang ramah lingkungan!",
        co2Saved: "0,9 kg CO₂ dicegah",
        energySaved: "70% air bersih dihemat",
        ptsEarned: 80
      }
    ]
  },
  organik: {
    name: "Biomassa Sampah Organik",
    icon: "🌱",
    targetProducts: ["Kompos Humus Hitam Gembur", "Pupuk Organik Cair (POC)", "Briket Biomassa Energi"],
    stages: [
      {
        num: 1,
        title: "Pemilihan Bahan & Target Produk",
        desc: "Sisa sayuran kantin dan daun kebun sekolah dipilih untuk diproses menjadi pupuk kompos humus.",
        interact: "Bahan siap: Campuran sisa sayuran (hijau) dan daun kering kebun (cokelat)."
      },
      {
        num: 2,
        title: "Pemeriksaan Kontaminasi & Kondisi",
        desc: "Periksa potongan plastik kresek, tusuk sate, staples bungkus nasi, dan tali rafia.",
        interact: "Tindakan: Seluruh plastik dan staples disaring agar cacing dan mikroba tanah tidak terkontaminasi mikroplastik."
      },
      {
        num: 3,
        title: "Stasiun Pengolahan Komposter",
        desc: "Pencacahan biomassa menjadi potongan 2–3 cm, lalu ditumpuk berlapis dalam komposter aerobik dengan aerasi udara.",
        interact: "Status komposter: Mikroba aerobik mulai mengurai gula dan protein menghasilkan panas 60°C."
      },
      {
        num: 4,
        title: "Tantangan Parameter STEM",
        desc: "Berapa rasio Karbon dan Nitrogen (C/N ratio) yang seimbang untuk pengomposan cepat tanpa bau menyengat?",
        question: "Pilih perbandingan C : N:",
        options: ["10 : 1 (Terlalu basah, timbul bau amonia)", "30 : 1 (Keseimbangan C/N sempurna)", "100 : 1 (Terlalu kering, mikroba berhenti tumbuh)"],
        correctOpt: 1
      },
      {
        num: 5,
        title: "Laporan Hasil Lab & Manfaat Ekologis",
        desc: "Kompos matang beraroma tanah gembur siap menyuburkan tanaman bunga dan sayuran sekolah!",
        co2Saved: "2,5 kg gas metana dicegah",
        energySaved: "100% menggantikan pupuk kimia sintetis",
        ptsEarned: 80
      }
    ]
  }
};

let currentLabMaterialKey = "plastik";
let currentLabStageIdx = 0;

function openRecyclingLabModal() {
  const labData = RECYCLE_LAB_5STAGES[currentLabMaterialKey];
  const stage = labData.stages[currentLabStageIdx];

  openModal(`
    <button class="close" data-close>${ico("close", 20)}</button>
    <div class="recycling-lab-container">
      <div style="text-align:center;">
        <span style="background:#E1F5FE; color:#0288D1; font-weight:900; font-size:10px; padding:4px 10px; border-radius:99px; text-transform:uppercase;">
          STEM Waste-to-Value Lab (5 Tahapan)
        </span>
        <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin:6px 0 2px;">Simulasi Daur Ulang: ${labData.name}</h2>
        <p style="font-size:12px; color:#5D7A68; font-weight:700;">Tahap ${stage.num} dari 5: ${stage.title}</p>
      </div>

      <!-- Pemilihan Material (Tahap 1) -->
      ${currentLabStageIdx === 0 ? `
        <div class="lab-material-select">
          ${Object.keys(RECYCLE_LAB_5STAGES).map(k => {
            const m = RECYCLE_LAB_5STAGES[k];
            return `
              <div class="lab-mat-btn ${k === currentLabMaterialKey ? "active" : ""}" data-change-lab-mat="${k}">
                <div class="lab-mat-icon">${m.icon}</div>
                <span class="lab-mat-title">${m.name}</span>
              </div>
            `;
          }).join("")}
        </div>
      ` : ""}

      <!-- Navigasi 5 Tahapan -->
      <div class="lab-stage-nav">
        ${labData.stages.map((s, i) => `
          <span class="lab-stage-pill ${i === currentLabStageIdx ? "active" : ""}">
            Tahap ${s.num}
          </span>
        `).join("")}
      </div>

      <!-- Kotak Interaksi Tahapan -->
      <div class="lab-interactive-box">
        <h4 style="font:700 16px 'Baloo 2', sans-serif; color:var(--ink); margin-bottom:4px;">
          ${stage.title}
        </h4>
        <p style="font-size:12px; color:#5D7A68; font-weight:700; line-height:1.45; margin-bottom:12px;">
          ${stage.desc}
        </p>

        ${stage.interact ? `
          <div style="background:#F1F8F1; border:1px solid #C8E6C9; border-radius:12px; padding:12px; font-size:11.5px; color:#2E7D32; font-weight:800;">
            ⚙️ ${stage.interact}
          </div>
        ` : ""}

        ${stage.question ? `
          <div style="margin-top:10px;">
            <strong style="font-size:12px; color:#E65100; display:block; margin-bottom:8px;">🔬 ${stage.question}</strong>
            <div style="display:grid; gap:8px;">
              ${stage.options.map((opt, oIdx) => `
                <button class="btn-soft lab-stem-opt-btn" data-opt-idx="${oIdx}" style="text-align:left; justify-content:flex-start; padding:10px 14px;">
                  ${opt}
                </button>
              `).join("")}
            </div>
          </div>
        ` : ""}

        ${currentLabStageIdx === 4 ? `
          <!-- Laporan Hasil Lab Lengkap -->
          <div style="background:#E8F5E9; border:1.5px solid #A5D6A7; border-radius:16px; padding:16px; margin:12px 0;">
            <strong style="font-size:13px; color:var(--green); display:block;">📋 Laporan Ekologis Daur Ulang:</strong>
            <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:10px; margin-top:8px;">
              <div style="background:#FFF; padding:8px 12px; border-radius:10px; border:1px solid #C8E6C9;">
                <small style="font-size:9.5px; color:#78909C; font-weight:800; display:block;">PENGURANGAN EMISI</small>
                <strong style="font-size:14px; color:#2E7D32;">${stage.co2Saved}</strong>
              </div>
              <div style="background:#FFF; padding:8px 12px; border-radius:10px; border:1px solid #C8E6C9;">
                <small style="font-size:9.5px; color:#78909C; font-weight:800; display:block;">PENGHEMATAN ENERGI</small>
                <strong style="font-size:14px; color:#0288D1;">${stage.energySaved}</strong>
              </div>
            </div>
          </div>
        ` : ""}
      </div>

      <!-- Tombol Aksi Kontrol Tahap -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px;">
        <button class="btn-soft" id="btnPrevLab5Stage" ${currentLabStageIdx === 0 ? "disabled" : ""}>
          ← Tahap Sebelumnya
        </button>
        ${currentLabStageIdx === 4 ? `
          <button class="btn-dark" id="btnFinishLab5Stage" style="background:#2E7D32;">
            Selesai & Klaim +${stage.ptsEarned} Poin!
          </button>
        ` : `
          <button class="btn-dark" id="btnNextLab5Stage">
            Lanjut ke Tahap ${currentLabStageIdx + 2} →
          </button>
        `}
      </div>
    </div>
  `);

  $("[data-change-lab-mat]").forEach(btn => {
    btn.onclick = () => {
      currentLabMaterialKey = btn.dataset.changeLabMat;
      currentLabStageIdx = 0;
      soundState.play("click");
      openRecyclingLabModal();
    };
  });

  const nextBtn = document.getElementById("btnNextLab5Stage");
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (currentLabStageIdx < 4) {
        currentLabStageIdx++;
        soundState.play("correct");
        openRecyclingLabModal();
      }
    };
  }

  const prevBtn = document.getElementById("btnPrevLab5Stage");
  if (prevBtn) {
    prevBtn.onclick = () => {
      if (currentLabStageIdx > 0) {
        currentLabStageIdx--;
        soundState.play("click");
        openRecyclingLabModal();
      }
    };
  }

  $(".lab-stem-opt-btn").forEach(btn => {
    btn.onclick = () => {
      const oIdx = Number(btn.dataset.optIdx);
      if (oIdx === stage.correctOpt) {
        soundState.play("badge");
        launchConfetti(25);
        alert("Jawaban Tepat! Keputusan parameter STEM kamu sangat akurat untuk efisiensi daur ulang.");
        if (currentLabStageIdx < 4) {
          currentLabStageIdx++;
          openRecyclingLabModal();
        }
      } else {
        soundState.play("wrong");
        alert("Kurang tepat. Perhatikan kembali sifat fisik dan suhu proses bahan.");
      }
    };
  });

  const finishBtn = document.getElementById("btnFinishLab5Stage");
  if (finishBtn) {
    finishBtn.onclick = () => {
      closeModal();
      state.poin += stage.ptsEarned;
      state.koin = (state.koin || 0) + 20;
      save();
      renderShell();
      soundState.play("badge");
      launchConfetti(55);
      setMascotSpeech("Luar biasa! Kamu menyelesaikan 5 Tahap Pengolahan Daur Ulang STEM!");

      openModal(`
        <button class="close" data-close>${ico("close", 20)}</button>
        <div style="text-align:center; padding:18px 12px;">
          <div style="font-size:42px; margin-bottom:8px;">🏅</div>
          <span style="background:#E8F5E9; color:var(--green); font-weight:900; font-size:10px; padding:4px 10px; border-radius:99px;">
            SERTIFIKASI LAB SELESAI
          </span>
          <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin:8px 0 4px;">Pahlawan Daur Ulang STEM</h2>
          <p style="font-size:12px; color:#5D7A68; font-weight:700;">
            Kamu telah berhasil menguasai 5 tahapan konversi limbah menjadi produk baru bernilai tinggi!
          </p>
          <div style="display:flex; justify-content:center; gap:10px; margin-top:16px;">
            <button class="btn-soft" id="btnRepeatLabSame">Ulangi Bahan Ini</button>
            <button class="btn-dark" data-close>Lanjut Eksplorasi</button>
          </div>
        </div>
      `);

      const repeatBtn = document.getElementById("btnRepeatLabSame");
      if (repeatBtn) {
        repeatBtn.onclick = () => {
          currentLabStageIdx = 0;
          soundState.play("click");
          openRecyclingLabModal();
        };
      }
    };
  }
}


/* ---------------- Mini-Game 2: Spot the Mistake (Temukan Kesalahan) ---------------- */
const MISTAKE_SCENARIOS = [
  {
    title: "Skenario Tempat Sampah Kantin Sekolah",
    desc: "Ada satu item yang salah masuk ke tempat sampah Daur Ulang. Bisakah kamu menemukannya?",
    bins: [
      {
        binId: "daur",
        binName: "Tempat Sampah Daur Ulang (Kuning/Biru)",
        items: [
          { name: "Botol Plastik Bersih", isMistake: false },
          { name: "Kertas Struk Thermal", isMistake: true, reason: "Kertas struk belanja mengandung zat kimia BPA/BPS yang mengkontaminasi bubur daur ulang. Harusnya masuk tong Residu!" },
          { name: "Kardus Paket Bersih", isMistake: false }
        ]
      },
      {
        binId: "organik",
        binName: "Tempat Sampah Organik (Hijau)",
        items: [
          { name: "Kulit Pisang", isMistake: false },
          { name: "Sisa Apel", isMistake: false }
        ]
      }
    ]
  },
  {
    title: "Skenario Tempat Sampah Kelas",
    desc: "Perhatikan tempat sampah Organik ini! Ada benda berbahaya yang tidak boleh ada di sini.",
    bins: [
      {
        binId: "organik",
        binName: "Tempat Sampah Organik (Hijau)",
        items: [
          { name: "Daun Kering Kebun", isMistake: false },
          { name: "Baterai Jam Dinding Bekas", isMistake: true, reason: "Baterai adalah limbah B3 beracun! Logam beratnya meracuni mikroba kompos dan mencemari tanah. Harusnya masuk tong B3!" },
          { name: "Cangkang Telur", isMistake: false }
        ]
      },
      {
        binId: "residu",
        binName: "Tempat Sampah Residu (Abu-abu)",
        items: [
          { name: "Tisu Kotor", isMistake: false },
          { name: "Puntung Rokok", isMistake: false }
        ]
      }
    ]
  }
];

let curMistakeScenario = 0;

function openSpotMistakeModal() {
  const scen = MISTAKE_SCENARIOS[curMistakeScenario];
  openModal(`
    <button class="close" data-close>${ico("close", 20)}</button>
    <div class="mistake-scene-card">
      <span style="background:#FCE4EC; color:#C2185B; font-weight:900; font-size:10px; padding:4px 10px; border-radius:99px; text-transform:uppercase;">Game Analisis Kritis</span>
      <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin:6px 0 2px;">Temukan Sampah yang Salah Tempat!</h2>
      <p style="font-size:12px; color:#5D7A68; font-weight:700;">${scen.desc}</p>

      <div class="mistake-bin-station">
        ${scen.bins.map(b => `
          <div class="mistake-bin-column">
            <h4 class="mistake-bin-title">${b.binName}</h4>
            <div>
              ${b.items.map((it, idx) => `
                <div class="mistake-item-pill" data-mistake-bin="${b.binId}" data-mistake-idx="${idx}">
                  <span>${it.name}</span>
                  <span style="font-size:10px; color:#9E9E9E;">Pilih ➔</span>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>

      <p style="font-size:11px; color:#78909C; font-weight:700;">Klik pada nama sampah yang menurutmu keliru diletakkan di tempat sampah tersebut.</p>
    </div>
  `);

  $(".mistake-item-pill").forEach(pill => {
    pill.onclick = () => {
      const bId = pill.dataset.mistakeBin;
      const idx = Number(pill.dataset.mistakeIdx);
      const binData = scen.bins.find(b => b.binId === bId);
      const item = binData.items[idx];

      if (item.isMistake) {
        soundState.play("correct");
        launchConfetti(40);
        state.poin += 75;
        save();
        renderShell();
        pill.classList.add("found-mistake");

        openModal(`
          <button class="close" data-close>${ico("close", 20)}</button>
          <div style="text-align:center; padding:18px 12px;">
            <div style="font-size:40px; margin-bottom:8px;">🎯</div>
            <span style="background:#E8F5E9; color:var(--green); font-weight:900; font-size:10px; padding:4px 10px; border-radius:99px;">ANALISIS TEPAT! +75 POIN</span>
            <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin:8px 0 4px;">${item.name} Memang Salah Tempat!</h2>
            <div style="background:#FFF8E1; border:1px solid #FFE082; border-radius:14px; padding:14px; margin:14px 0; text-align:left;">
              <strong style="font-size:12px; color:#E65100; display:block;">💡 Alasan Sains & Lingkungan:</strong>
              <p style="font-size:11.5px; color:#5D4037; margin-top:4px; line-height:1.45;">${item.reason}</p>
            </div>
            <button class="btn-dark" id="btnNextMistakeScenario">
              ${curMistakeScenario < MISTAKE_SCENARIOS.length - 1 ? "Skenario Berikutnya →" : "Selesai & Keren!"}
            </button>
          </div>
        `);

        const nextScenBtn = document.getElementById("btnNextMistakeScenario");
        if (nextScenBtn) {
          nextScenBtn.onclick = () => {
            if (curMistakeScenario < MISTAKE_SCENARIOS.length - 1) {
              curMistakeScenario++;
              openSpotMistakeModal();
            } else {
              curMistakeScenario = 0;
              closeModal();
            }
          };
        }
      } else {
        soundState.play("wrong");
        alert(`Belum tepat. "${item.name}" sudah berada di tempat sampah yang benar. Coba teliti item lainnya!`);
      }
    };
  });
}


/* ---------------- Mini-Game 3: Decomp Race (Timeline Challenge) ---------------- */
const DECOMP_RACE_SETS = [
  {
    title: "Tantangan Waktu Penguraian: Kantin Sekolah",
    items: [
      { name: "Sisa Apel", icon: "🍎", time: "2 – 4 Minggu", val: 1 },
      { name: "Kardus Snack", icon: "📦", time: "2 Bulan", val: 2 },
      { name: "Kaleng Minuman", icon: "🥫", time: "200 Tahun", val: 3 },
      { name: "Botol Plastik", icon: "🧴", time: "450 Tahun", val: 4 }
    ],
    science: "Dekomposisi sangat dipengaruhi oleh keberadaan oksigen, mikroorganisme tanah, kelembapan, dan ikatan polimer kimia bahan."
  },
  {
    title: "Tantangan Waktu Penguraian: Pantai & Pesisir",
    items: [
      { name: "Kulit Pisang", icon: "🍌", time: "1 Bulan", val: 1 },
      { name: "Kertas Koran", icon: "📰", time: "6 Minggu", val: 2 },
      { name: "Styrofoam", icon: "🥡", time: "500 Tahun", val: 3 },
      { name: "Botol Kaca", icon: "🍾", time: "1 Juta Tahun", val: 4 }
    ],
    science: "Bahan anorganik seperti kaca dan styrofoam memiliki struktur molekul yang tidak dapat diuraikan oleh enzim mikroba alami."
  }
];

let curDecompSet = 0;
let userDecompOrder = [];

function openDecompRaceModal() {
  const currentSet = DECOMP_RACE_SETS[curDecompSet];
  userDecompOrder = [];

  function renderDecompScreen() {
    openModal(`
      <button class="close" data-close>${ico("close", 20)}</button>
      <div class="decomp-race-modal">
        <span style="background:#FFF3E0; color:#E65100; font-weight:900; font-size:10px; padding:4px 10px; border-radius:99px; text-transform:uppercase;">
          STEM Timeline Challenge
        </span>
        <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin:6px 0 2px;">${currentSet.title}</h2>
        <p style="font-size:12px; color:#5D7A68; font-weight:700;">
          Klik kartu sampah secara berurutan mulai dari yang <strong>PALING CEPAT TERURAI</strong> hingga yang <strong>PALING LAMA</strong>!
        </p>

        <div class="decomp-cards-grid">
          ${currentSet.items.map((it, idx) => {
            const orderIdx = userDecompOrder.indexOf(idx);
            const isSelected = orderIdx !== -1;
            return `
              <div class="decomp-card-item ${isSelected ? "selected" : ""}" data-decomp-idx="${idx}">
                ${isSelected ? `<div class="decomp-card-order-badge">${orderIdx + 1}</div>` : ""}
                <div class="decomp-card-icon">${it.icon}</div>
                <div class="decomp-card-name">${it.name}</div>
              </div>
            `;
          }).join("")}
        </div>

        <div style="display:flex; justify-content:center; gap:10px;">
          <button class="btn-soft" id="btnResetDecompOrder">Reset Urutan</button>
          <button class="btn-dark" id="btnCheckDecompOrder" ${userDecompOrder.length === currentSet.items.length ? "" : "disabled"}>
            Periksa Garis Waktu ${ico("arrow", 12)}
          </button>
        </div>
      </div>
    `);

    $(".decomp-card-item").forEach(card => {
      card.onclick = () => {
        const idx = Number(card.dataset.decompIdx);
        if (!userDecompOrder.includes(idx)) {
          userDecompOrder.push(idx);
          soundState.play("click");
          renderDecompScreen();
        }
      };
    });

    const resetBtn = document.getElementById("btnResetDecompOrder");
    if (resetBtn) {
      resetBtn.onclick = () => {
        userDecompOrder = [];
        soundState.play("click");
        renderDecompScreen();
      };
    }

    const checkBtn = document.getElementById("btnCheckDecompOrder");
    if (checkBtn) {
      checkBtn.onclick = () => {
        // Cek urutan
        const isCorrect = userDecompOrder.every((itemIdx, i) => currentSet.items[itemIdx].val === i + 1);
        const sortedItems = [...currentSet.items].sort((a, b) => a.val - b.val);

        if (isCorrect) {
          soundState.play("badge");
          launchConfetti(45);
          state.poin += 60;
          save();
          renderShell();
        } else {
          soundState.play("wrong");
        }

        openModal(`
          <button class="close" data-close>${ico("close", 20)}</button>
          <div style="text-align:center; padding:14px 8px 18px;">
            <div style="font-size:42px; margin-bottom:6px;">${isCorrect ? "🎉" : "📚"}</div>
            <span style="background:${isCorrect ? "#E8F5E9" : "#FFF3E0"}; color:${isCorrect ? "var(--green)" : "#E65100"}; font-weight:900; font-size:10px; padding:4px 10px; border-radius:99px;">
              ${isCorrect ? "SEMPURNA! +60 POIN TIMELINE" : "PELAJARI GARIS WAKTU NYATANYA"}
            </span>
            <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin:6px 0 2px;">
              ${isCorrect ? "Urutan Dekomposisi 100% Tepat!" : "Hampir Benar! Ini Garis Waktu yang Tepat:"}
            </h2>

            <div class="decomp-timeline-result">
              ${sortedItems.map((s, i) => `
                <div class="decomp-timeline-row">
                  <div class="decomp-card-order-badge" style="background:#2E7D32;">${i + 1}</div>
                  <span style="font-size:22px;">${s.icon}</span>
                  <strong style="font-size:13px; color:var(--ink); flex:1;">${s.name}</strong>
                  <span class="decomp-timeline-time">⏳ ${s.time}</span>
                </div>
              `).join("")}
            </div>

            <div style="background:#F7FAF5; border:1px solid #DDF2C5; border-radius:12px; padding:12px; text-align:left; margin-bottom:14px;">
              <strong style="font-size:11.5px; color:var(--green); display:block;">💡 Penjelasan Ilmiah STEM:</strong>
              <p style="font-size:11px; color:#5D7A68; line-height:1.4; margin-top:2px;">${currentSet.science}</p>
            </div>

            <div style="display:flex; justify-content:center; gap:10px;">
              <button class="btn-soft" id="btnNextDecompSet">
                ${curDecompSet < DECOMP_RACE_SETS.length - 1 ? "Tantangan Berikutnya →" : "Ulangi Latihan"}
              </button>
              <button class="btn-dark" data-close>Tutup & Lanjut</button>
            </div>
          </div>
        `);

        const nextSetBtn = document.getElementById("btnNextDecompSet");
        if (nextSetBtn) {
          nextSetBtn.onclick = () => {
            curDecompSet = (curDecompSet + 1) % DECOMP_RACE_SETS.length;
            soundState.play("click");
            openDecompRaceModal();
          };
        }
      };
    }
  }

  renderDecompScreen();
}


/* ---------------- Mini-Game 4: Zero-Waste Swap (Smart Choice) ---------------- */
const ZERO_WASTE_SCENARIOS = [
  {
    title: "Membeli Minuman di Kantin Sekolah",
    desc: "Saat jam istirahat sekolah, kamu ingin membeli es teh manis segar. Pilihan manakah yang paling ramah lingkungan?",
    icon: "🧃",
    options: [
      {
        icon: "🥤",
        title: "Beli Minuman Cup Plastik Sekali Pakai",
        isBest: false,
        waste: "Menghasilkan 1 cup plastik + 1 sedotan yang butuh 450 tahun terurai.",
        impact: "Menghasilkan sampah plastik baru yang berakhir di TPA."
      },
      {
        icon: "🍶",
        title: "Bawa Tumbler Sendiri & Isi Ulang di Kantin",
        isBest: true,
        waste: "Nol sampah plastik sekali pakai (Zero-Waste).",
        impact: "Menghemat uang jajan dan mencegah ratusan timbulan gelas plastik per semester!"
      },
      {
        icon: "🧃",
        title: "Beli Minuman Kotak Tetra Pak dengan Sedotan",
        isBest: false,
        waste: "Kemasan berlapis foil dan plastik yang sulit dipisahkan mesin daur ulang lokal.",
        impact: "Sebagian besar berakhir di tempat sampah residu."
      }
    ]
  },
  {
    title: "Berbelanja Kebutuhan di Koperasi / Toko",
    desc: "Kamu membeli beberapa buku tulis dan perlengkapan sekolah di koperasi. Alternatif manakah yang terbaik?",
    icon: "🛍️",
    options: [
      {
        icon: "🛍️",
        title: "Minta Kantong Kresek Baru untuk Wadah",
        isBest: false,
        waste: "Menambah konsumsi plastik sekali pakai yang mudah terbang mencemari saluran air.",
        impact: "Memicu polusi mikroplastik di selokan sekolah."
      },
      {
        icon: "🎒",
        title: "Masukkan Langsung ke Tas Ransel / Pakai Totebag Kain",
        isBest: true,
        waste: "Bebas plastik tambahan 100%.",
        impact: "Menerapkan prinsip Reduce murni dari sumber sebelum sampah terbentuk!"
      }
    ]
  }
];

let curSwapIdx = 0;

function openZeroWasteSwapModal() {
  const scen = ZERO_WASTE_SCENARIOS[curSwapIdx];

  openModal(`
    <button class="close" data-close>${ico("close", 20)}</button>
    <div class="swap-scenario-card">
      <div style="font-size:38px; margin-bottom:4px;">${scen.icon}</div>
      <span style="background:#E8F5E9; color:#2E7D32; font-weight:900; font-size:10px; padding:4px 10px; border-radius:99px; text-transform:uppercase;">
        Smart Choice: Reduce & Reuse
      </span>
      <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin:6px 0 2px;">${scen.title}</h2>
      <p style="font-size:12px; color:#5D7A68; font-weight:700;">${scen.desc}</p>

      <div class="swap-options-list">
        ${scen.options.map((opt, idx) => `
          <button class="swap-option-btn" data-swap-opt="${idx}">
            <div class="swap-option-icon">${opt.icon}</div>
            <div class="swap-option-info">
              <strong>${opt.title}</strong>
              <p>Pilih alternatif ini untuk melihat analisis dampaknya ➔</p>
            </div>
          </button>
        `).join("")}
      </div>
    </div>
  `);

  $(".swap-option-btn").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.swapOpt);
      const opt = scen.options[idx];

      if (opt.isBest) {
        soundState.play("badge");
        launchConfetti(45);
        state.poin += 50;
        save();
        renderShell();
      } else {
        soundState.play("wrong");
      }

      openModal(`
        <button class="close" data-close>${ico("close", 20)}</button>
        <div style="text-align:center; padding:14px 8px 18px;">
          <div style="font-size:42px; margin-bottom:6px;">${opt.isBest ? "🌟" : "💡"}</div>
          <span style="background:${opt.isBest ? "#E8F5E9" : "#FFF3E0"}; color:${opt.isBest ? "var(--green)" : "#E65100"}; font-weight:900; font-size:10px; padding:4px 10px; border-radius:99px;">
            ${opt.isBest ? "PILIHAN CERDAS ZERO-WASTE! +50 POIN" : "ANALISIS DAMPAK KEBIASAAN"}
          </span>
          <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin:8px 0 4px;">${opt.title}</h2>

          <div style="background:#F7FAF5; border:1px solid #DDF2C5; border-radius:14px; padding:14px; margin:14px 0; text-align:left;">
            <div style="margin-bottom:8px;">
              <strong style="font-size:12px; color:#D9480F;">🗑️ Dampak Sampah:</strong>
              <p style="font-size:11.5px; color:#5D7A68; margin-top:2px;">${opt.waste}</p>
            </div>
            <div>
              <strong style="font-size:12px; color:var(--green);">🌍 Manfaat Sumber Daya:</strong>
              <p style="font-size:11.5px; color:#5D7A68; margin-top:2px;">${opt.impact}</p>
            </div>
          </div>

          <div style="display:flex; justify-content:center; gap:10px;">
            <button class="btn-soft" id="btnNextSwapScenario">
              ${curSwapIdx < ZERO_WASTE_SCENARIOS.length - 1 ? "Skenario Berikutnya →" : "Ulangi Latihan"}
            </button>
            <button class="btn-dark" data-close>Tutup & Lanjut</button>
          </div>
        </div>
      `);

      const nextSwapBtn = document.getElementById("btnNextSwapScenario");
      if (nextSwapBtn) {
        nextSwapBtn.onclick = () => {
          curSwapIdx = (curSwapIdx + 1) % ZERO_WASTE_SCENARIOS.length;
          soundState.play("click");
          openZeroWasteSwapModal();
        };
      }
    };
  });
}

/* ---------------- Quiz ---------------- */
function renderQuiz() {
  const c = $("#quizCard");
  if (state.quizDone) {
    const userScore = state.lastQuizScore || 0;
    const userCorrect = state.lastQuizCorrect || 0;
    c.innerHTML = `<div class="quiz-done">
      <div class="medal">${ico("trophy", 32)}</div>
      <h2>Kuis Evaluasi Selesai!</h2>
      <p>Kamu berhasil menjawab <strong>${userCorrect} dari ${QUIZ.length}</strong> studi kasus lingkungan dengan tepat.</p>
      <div class="quiz-score-badge">+${userScore} Poin Pemahaman STEM</div>

      <!-- Refleksi Belajar & Checklist Aksi Nyata (Eco-Action) -->
      <div class="eco-action-box">
        <strong style="font-size:13px; color:var(--green); display:flex; align-items:center; gap:6px;">
          🌱 Refleksi & Checklist Aksi Nyata (Eco-Action):
        </strong>
        <p style="font-size:11px; color:#4B6B55; margin-top:2px;">
          Jadikan pengetahuan ini aksi nyata di kelas, kantin, atau rumahmu:
        </p>
        <div class="eco-action-list">
          <label class="eco-action-item">
            <input type="checkbox" checked disabled>
            <span>Memisahkan botol plastik dan kertas bersih sebelum dibuang</span>
          </label>
          <label class="eco-action-item">
            <input type="checkbox">
            <span>Membawa tumbler & kotak makan sendiri untuk kurangi sampah plastik sekali pakai</span>
          </label>
          <label class="eco-action-item">
            <input type="checkbox">
            <span>Mengumpulkan baterai bekas di kotak khusus limbah B3 sekolah</span>
          </label>
          <label class="eco-action-item">
            <input type="checkbox">
            <span>Memasukkan sisa kulit buah ke lubang biopori/komposter tanaman</span>
          </label>
        </div>
      </div>

      <div class="quiz-done-actions" style="margin-top:18px;">
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
  const answered = state.answered || 0;
  const correct = state.correct || 0;
  const acc = answered > 0 ? Math.round(correct / answered * 100) : 0;
  const levels = Array.isArray(state.levels) ? state.levels : [];
  const stars = levels.reduce((a, l) => a + (l?.stars || 0), 0);
  const cats = state.cats || {};
  const total = Object.values(cats).reduce((a, b) => a + (Number(b) || 0), 0);
  const games = state.games || 0;
  const poin = state.poin || 0;

  return [
    { id: "b1", n: "Pemula Hijau", d: "Selesaikan misi pertamamu", ok: games >= 1, art: "seal", prog: [Math.min(1, games), 1] },
    { id: "b2", n: "Pilah 10 Sampah", d: "Pilah 10 sampah dengan tepat", ok: total >= 10, art: "plant", prog: [Math.min(10, total), 10] },
    { id: "b3", n: "Akurasi Hebat", d: "Capai akurasi 80% ke atas", ok: answered >= 5 && acc >= 80, art: "target", prog: [answered >= 5 ? acc : 0, 80], isPercent: true },
    { id: "b4", n: "Penjelajah Taman", d: "Naik ke Level 1 (300 poin)", ok: poin >= 300, art: "earth", prog: [Math.min(300, poin), 300] },
    { id: "b5", n: "Penjaga Kantin", d: "Naik ke Level 2 (700 poin)", ok: poin >= 700, art: "trophy", prog: [Math.min(700, poin), 700] },
    { id: "b6", n: "Bintang Sejati", d: "Kumpulkan 3 bintang misi", ok: stars >= 3, art: "star", prog: [Math.min(3, stars), 3] },
    { id: "b7", n: "Ahli Kuis", d: "Selesaikan kuis harian", ok: Boolean(state.quizDone), art: "book", prog: [state.quizDone ? 1 : 0, 1] },
    { id: "b8", n: "Kolektor Bintang", d: "Kumpulkan 9 bintang", ok: stars >= 9, art: "star", prog: [Math.min(9, stars), 9] }
  ];
}


/* ---------------- Avatar Accessories & Profile Modal ---------------- */

/* ---------------- Daily Spin / Mystery Box ---------------- */
const MYSTERY_FACTS = [
  "Mendaur ulang satu botol kaca dapat menghemat energi untuk menyalakan lampu 100 watt selama 4 jam!",
  "Sampah organik di TPA menghasilkan gas metana yang 25 kali lebih kuat memerangkap panas dibanding CO2 jika tidak dikomposkan.",
  "Setiap 1 ton kertas yang didaur ulang menyelamatkan 17 pohon dewasa dan 26.500 liter air bersih!",
  "Di SMK Yadika Soreang, pemilahan sampah mendukung pembentukan karakter peduli lingkungan dan kebersihan sekolah.",
  "Styrofoam tidak pernah terurai secara alami, sehingga alternatif terbaik adalah memakai wadah makanan reusable!"
];


/* ---------------- Onboarding / Interactive Tutorial ---------------- */
function openOnboardingTutorial() {
  const steps = [
    {
      title: "Selamat Datang di Eco-Sorter STEM!",
      desc: "Game edukasi interaktif untuk mengenalkan pemilahan 4 jenis sampah: Organik, Daur Ulang, B3, dan Residu demi kelestarian bumi.",
      icon: "🌍"
    },
    {
      title: "Tarik atau Klik Tempat Sampah",
      desc: "Saat bermain, baca petunjuk sampah, lalu seret (drag & drop) atau klik tombol tempat sampah yang sesuai sebelum waktu atau nyawa habis.",
      icon: "♻️"
    },
    {
      title: "Raih Kombo & Pantau Dampak Nyata",
      desc: "Kumpulkan poin tanpa salah untuk combo berlipat ganda, dan saksikan kalkulator dampak lingkungan serta simulasi mini-lab setelah misi!",
      icon: "🏆"
    }
  ];
  let curStep = 0;

  function renderStep(idx) {
    const s = steps[idx];
    openModal(`
      <button class="close" data-close>${ico("close", 20)}</button>
      <div class="onboarding-step-card">
        <div style="font-size:48px; margin-bottom:10px;">${s.icon}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <div class="onboarding-dots">
          ${steps.map((_, i) => `<span class="onboarding-dot ${i === idx ? "active" : ""}"></span>`).join("")}
        </div>
        <div style="display:flex; justify-content:center; gap:10px; margin-top:14px;">
          ${idx > 0 ? `<button class="btn-soft" id="onboardPrev">Kembali</button>` : ""}
          <button class="btn-dark" id="onboardNext">
            ${idx === steps.length - 1 ? "Mulai Petualangan!" : `Lanjut ${ico("arrow", 12)}`}
          </button>
        </div>
      </div>
    `);
    const btnNext = document.getElementById("onboardNext");
    if (btnNext) {
      btnNext.onclick = () => {
        if (idx < steps.length - 1) {
          renderStep(idx + 1);
        } else {
          closeModal();
          localStorage.setItem("ecosorter_tutorial_seen", "true");
          setMascotSpeech("Kamu sudah siap! Ayo taklukkan Misi Level 1!");
        }
      };
    }
    const btnPrev = document.getElementById("onboardPrev");
    if (btnPrev) {
      btnPrev.onclick = () => renderStep(idx - 1);
    }
  }

  renderStep(0);
}

function openDailySpinModal() {
  const today = new Date().toISOString().split("T")[0];
  const alreadyClaimed = state.lastSpinDate === today;

  openModal(`
    <button class="close" data-close>${ico("close", 20)}</button>
    <div style="text-align:center; padding:12px 10px 18px;">
      <div style="font-size:42px; margin-bottom:8px;">🎁</div>
      <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink);">Mystery Box Edukasi Harian</h2>
      <p style="font-size:12px; color:#5D7A68; font-weight:700; max-width:340px; margin:0 auto 16px;">
        Buka kotak misteri setiap hari untuk mendapatkan fakta sains STEM unik dan bonus poin!
      </p>

      ${alreadyClaimed ? `
        <div style="background:#EAF7EE; border:1px solid #C8E6C9; border-radius:14px; padding:16px; margin-bottom:14px;">
          <strong style="color:var(--green); font-size:13px; display:block;">Kamu sudah membuka Mystery Box hari ini!</strong>
          <p style="font-size:11.5px; color:#388E3C; margin-top:4px;">
            Kembalilah besok untuk fakta sains dan bonus harian berikutnya.
          </p>
        </div>
        <button class="btn-dark" data-close>Tutup</button>
      ` : `
        <div id="mysteryBoxArea" style="background:#FFF9E6; border:2px dashed #FFD54F; border-radius:16px; padding:24px; cursor:pointer; transition:transform .2s;" title="Klik untuk membuka!">
          <div style="font-size:48px; animation:timerPulse 1s infinite alternate;">📦</div>
          <strong style="display:block; margin-top:8px; font-size:14px; color:#E65100;">Ketuk Kotak untuk Membuka!</strong>
        </div>
      `}
    </div>
  `);

  const boxArea = document.getElementById("mysteryBoxArea");
  if (boxArea) {
    boxArea.onclick = () => {
      const bonusPts = 50 + Math.floor(Math.random() * 51);
      const fact = MYSTERY_FACTS[Math.floor(Math.random() * MYSTERY_FACTS.length)];
      state.poin += bonusPts;
      state.koin = (state.koin || 0) + 15;
      state.lastSpinDate = today;
      save();
      renderShell();
      soundState.play("badge");
      launchConfetti(45);

      openModal(`
        <button class="close" data-close>${ico("close", 20)}</button>
        <div style="text-align:center; padding:12px 10px 18px;">
          <div style="font-size:42px; margin-bottom:8px;">✨</div>
          <span style="background:#E8F5E9; color:var(--green); font-weight:900; font-size:10px; padding:4px 10px; border-radius:99px; text-transform:uppercase;">Bonus Berhasil Dibuka!</span>
          <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin:8px 0 4px;">+${bonusPts} Poin & +15 Koin</h2>
          <div style="background:#F7FAF5; border:1px solid #DDF2C5; border-radius:14px; padding:14px; margin:14px 0; text-align:left;">
            <strong style="font-size:12px; color:var(--ink); display:block;">💡 Fakta Sains STEM Hari Ini:</strong>
            <p style="font-size:11.5px; color:#5D7A68; margin-top:4px; line-height:1.45;">${fact}</p>
          </div>
          <button class="btn-dark" data-close>Keren, Terima Kasih!</button>
        </div>
      `);
    };
  }
}

function openProfileCustomModal() {
  if (!state.ownedAccessories) state.ownedAccessories = ["none"];
  const currentAcc = state.accessory || "none";

  openModal(`
    <button class="close" data-close>${ico("close", 20)}</button>
    <div style="text-align:center; padding:10px 8px 18px;">
      <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink);">Kustomisasi Profil & Aksesori STEM</h2>
      <p style="font-size:12px; color:#5D7A68; font-weight:700; margin-top:2px;">
        Koleksi aksesori ramah lingkungan menggunakan koin prestasimu!
      </p>

      <div style="margin:16px auto; display:flex; justify-content:center; align-items:center; gap:16px;">
        <div style="width:70px; height:70px; border-radius:50%; background:#FFF; border:3px solid #63B96F; display:grid; place-items:center; box-shadow:0 6px 18px rgba(0,0,0,.08);" id="avatarPreviewCustom">
          ${avatar(currentUser.avatar || "aris", 64, currentAcc)}
        </div>
        <div style="text-align:left;">
          <strong style="font-size:15px; color:var(--ink); display:block;">${currentUser.name}</strong>
          <span style="font-size:12px; font-weight:800; color:#D97706;">🪙 ${fmt(state.koin || 0)} Koin</span>
          <span style="display:block; font-size:11px; color:#78909C; font-weight:700;">Aksesori Aktif: ${ACCESSORIES.find(a => a.id === currentAcc)?.name || "Standar"}</span>
        </div>
      </div>

      <div class="avatar-custom-grid">
        ${ACCESSORIES.map(acc => {
          const owned = state.ownedAccessories.includes(acc.id);
          const equipped = currentAcc === acc.id;
          return `
            <div class="accessory-item-btn ${equipped ? "equipped" : ""}" data-acc-id="${acc.id}">
              <div class="accessory-icon">${acc.icon}</div>
              <strong class="accessory-name">${acc.name}</strong>
              <div class="accessory-status">
                ${equipped ? "Dipakai" : owned ? "Milikmu" : `🪙 ${acc.cost}`}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <p style="font-size:11px; color:#6C8573; line-height:1.4; margin-top:8px;">
        Tip: Mainkan misi dan jawab kuis harian untuk mengumpulkan koin lebih banyak!
      </p>
    </div>
  `);

  $(".accessory-item-btn").forEach(btn => {
    btn.onclick = () => {
      const accId = btn.dataset.accId;
      const acc = ACCESSORIES.find(a => a.id === accId);
      if (!acc) return;
      if (!state.ownedAccessories) state.ownedAccessories = ["none"];

      if (state.ownedAccessories.includes(accId)) {
        state.accessory = accId;
        save();
        renderShell();
        soundState.play("click");
        openProfileCustomModal();
      } else {
        if ((state.koin || 0) >= acc.cost) {
          state.koin -= acc.cost;
          state.ownedAccessories.push(accId);
          state.accessory = accId;
          save();
          renderShell();
          soundState.play("badge");
          launchConfetti(35);
          openProfileCustomModal();
        } else {
          soundState.play("wrong");
          alert(`Koin belum cukup. Kamu butuh ${acc.cost} koin untuk membuka ${acc.name}.`);
        }
      }
    };
  });
}

function renderBadges() {
  const list = badgeData();
  const shown = badgeFilter === "terkunci" ? list.filter(b => !b.ok) : list;
  const unlocked = list.filter(b => b.ok).length;
  const countEl = $("#badgeCount");
  if (countEl) countEl.textContent = `${unlocked} / ${list.length}`;

  // Sync filter buttons active state
  $$("[data-badge-filter]").forEach(x => {
    x.classList.toggle("active", x.dataset.badgeFilter === badgeFilter);
  });

  const grid = $("#badgeGrid");
  if (grid) {
    grid.innerHTML = shown.length ? shown.map(b => {
      const prog = b.prog || [0, 1];
      const pct = Math.min(100, Math.round(prog[0] / prog[1] * 100));
      return `<article class="badge-card ${b.ok ? "unlocked" : "locked"}" data-badge-id="${b.id}" tabindex="0" role="button" aria-label="${b.n}">
        ${!b.ok ? `<span class="b-lock">${ico("lock", 10)}</span>` : ""}
        <div class="badge-art">${badgeArt(b.art)}</div>
        <div class="badge-info">
          <h3>${b.n}</h3>
          <p>${b.d}</p>
          ${b.ok
            ? `<span class="b-status">${ico("check", 9)} Terbuka</span>`
            : (b.isPercent && (state.answered || 0) < 5
                ? `<span class="b-status locked-pill">${ico("lock", 9)} Terkunci</span>`
                : `<div class="b-progress"><span style="width:${pct}%"></span></div>
                   <div class="b-progress-label">${fmt(prog[0])} / ${fmt(prog[1])}${b.isPercent ? "%" : ""}</div>`)}
        </div>
      </article>`;
    }).join("") : `<p class="eco-empty">Semua lencana sudah terbuka. Hebat!</p>`;
  }
  renderLevelProgress();
  renderMissionBanner();
}

function renderLevelProgress() {
  updateLevel();
  const tier = getLevelTier(state.poin);
  const span = tier.max - tier.min;
  const inTier = Math.max(0, state.poin - tier.min);
  const pct = Math.min(100, Math.round((inTier / span) * 100));
  const el = $("#levelProgress");
  if (!el) return;
  el.innerHTML = `
    <div class="lp-top"><strong>${tier.name}</strong><span>Level ${tier.level} · ${fmt(state.poin)} / ${fmt(tier.max)} poin</span></div>
    <div class="lp-bar"><span style="width:${pct}%"></span></div>
    <div class="lp-pct">${pct}%</div>`;
}

function renderMissionBanner() {
  const mb = $("#missionBanner");
  if (!mb) return;
  const done = Math.min(3, state.games || 0);
  const pct = Math.round(done / 3 * 100);
  mb.innerHTML = `
    <span class="mb-ico">${ico("flame", 18)}</span>
    <div class="mb-copy"><strong>Misi harian</strong><p>Selesaikan 3 misi hari ini</p></div>
    <div class="mb-bar"><span style="width:${pct}%"></span></div>
    <span class="mb-count">${done} / 3</span>
    <button class="btn-dark sm" id="klaimMisi">${state.missionClaimed ? "Sudah diklaim" : `100 poin ${ico("arrow", 11)}`}</button>`;
  const km = $("#klaimMisi");
  if (km) {
    km.onclick = () => {
      if (state.missionClaimed) {
        return openModal(`<button class="close" data-close>${ico("close", 20)}</button>
          <div class="big">${ico("check", 26)}</div><h2>Hadiah sudah diambil</h2>
          <p>Kamu sudah mengklaim 100 poin untuk misi harian ini. Kembali besok untuk misi baru!</p>
          <div class="actions"><button class="btn-dark" data-close>Oke</button></div>`);
      }
      if ((state.games || 0) < 3) {
        return openModal(`<button class="close" data-close>${ico("close", 20)}</button>
          <div class="big">${ico("flame", 26)}</div><h2>Misi harian belum selesai</h2>
          <p>Selesaikan ${3 - (state.games || 0)} misi lagi untuk mendapatkan 100 poin. Semangat!</p>
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

$("#btnLogout").onclick = () => confirmLogoutClean();

function confirmLogoutClean() {
  openModal(`
    <button class="close" data-close>${ico("close", 20)}</button>
    <div style="text-align:center; padding:12px 10px 18px;">
      <div style="width:60px; height:60px; border-radius:50%; background:#FFF3E0; color:#E65100; display:grid; place-items:center; margin:0 auto 14px;">
        ${ico("logout", 28)}
      </div>
      <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin-bottom:6px;">Keluar dari Aplikasi?</h2>
      <p style="font-size:12.5px; color:#5D7A68; font-weight:700; max-width:340px; margin:0 auto 20px;">
        Progres permainan dan poinmu tersimpan secara otomatis. Sesi ini akan ditutup dengan bersih.
      </p>
      <div style="display:flex; justify-content:center; gap:10px;">
        <button class="btn-soft" data-close>Batal</button>
        <button class="btn-dark" id="btnConfirmLogoutAction" style="background:#C62828;">Keluar Sesi ${ico("arrow", 12)}</button>
      </div>
    </div>
  `);
  $("#btnConfirmLogoutAction").onclick = () => {
    closeModal();
    // Simpan progres terakhir sebelum keluar
    save();
    // Reset sesi aktif ke akun default pertama atau reset sesi bersih
    localStorage.removeItem(DB_SESSION_KEY);
    currentUser = getActiveUser();
    state = currentUser;
    showPage("beranda");
    renderShell();
    renderMissions();
    renderEco();
    renderStats();
    openModal(`
      <button class="close" data-close>${ico("close", 20)}</button>
      <div style="text-align:center; padding:18px 12px;">
        <div style="font-size:36px; margin-bottom:10px;">👋</div>
        <h2 style="font:700 20px 'Baloo 2', sans-serif; color:var(--ink);">Sampai Jumpa Lagi!</h2>
        <p style="font-size:12px; color:#5D7A68; font-weight:700; margin-top:4px;">
          Sesi telah ditutup. Terima kasih telah menjaga lingkungan bersama Eco-Sorter STEM.
        </p>
        <button class="btn-dark" data-close style="margin-top:16px;">Masuk Kembali</button>
      </div>
    `);
  };
}

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

  const itemsDetailBtn = e.target.closest("[data-detail-items]");
  if (itemsDetailBtn) {
    soundState.play("click");
    openItemDetailModal(itemsDetailBtn.dataset.detailItems, 0);
    return;
  }
  const factBtn = e.target.closest("[data-fact]");
  if (factBtn) {
    const c = CATEGORIES.find(x => x.id === factBtn.dataset.fact);
    if (c) {
      soundState.play("click");
      openModal(`
        <button class="close" data-close>${ico("close", 20)}</button>
        <div style="text-align:center; padding:12px 10px 18px;">
          <div style="width:64px; height:64px; border-radius:18px; margin:0 auto 12px; display:grid; place-items:center; background:#EAF5E3;">
            ${CATEGORY_ART[c.id]}
          </div>
          <span class="dm-badge ${c.card}">Kategori ${c.name}</span>
          <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin:8px 0 4px;">Tahukah Kamu?</h2>
          <div style="background:#F7FAF5; border:1px solid #DDF2C5; border-radius:14px; padding:16px; margin:14px 0; text-align:left;">
            <p style="font-size:12.5px; color:#2F4D39; font-weight:700; line-height:1.5;">${c.fact}</p>
            <hr style="border:0; border-top:1px dashed #CFE6D3; margin:10px 0;">
            <p style="font-size:11px; color:#5D7A68; font-weight:800;">💡 Tips STEM: ${c.tip}</p>
          </div>
          <button class="btn-dark" data-close>Paham, Tutup</button>
        </div>
      `);
    }
  }
});
$$("[data-badge-filter]").forEach(b => b.onclick = () => {
  badgeFilter = b.dataset.badgeFilter;
  $$("[data-badge-filter]").forEach(x => x.classList.toggle("active", x === b));
  renderBadges();
});

const badgeGridEl = $("#badgeGrid");
if (badgeGridEl) {
  badgeGridEl.addEventListener("click", e => {
    const card = e.target.closest("[data-badge-id]");
    if (!card) return;
    const id = card.dataset.badgeId;
    const b = badgeData().find(x => x.id === id);
    if (!b) return;
    const prog = b.prog || [0, 1];
    const pct = Math.min(100, Math.round(prog[0] / prog[1] * 100));

    openModal(`
      <button class="close" data-close>${ico("close", 20)}</button>
      <div style="text-align:center; padding: 10px 8px 18px;">
        <div style="width:72px; height:72px; margin: 0 auto 14px; display:grid; place-items:center; border-radius:22px; background:${b.ok ? "#E9F7EC" : "#F4F7F2"}; box-shadow:0 8px 20px rgba(0,0,0,0.06);">
          ${badgeArt(b.art)}
        </div>
        <h2 style="font:700 22px 'Baloo 2', sans-serif; color:var(--ink); margin-bottom:4px;">${b.n}</h2>
        <p style="font-size:12px; color:#556E5D; font-weight:700; margin-bottom:16px;">${b.d}</p>
        
        <div style="background:#F7FAF5; border:1px solid #E4ECE0; border-radius:16px; padding:12px 16px; margin-bottom:18px; text-align:left;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="font-size:12px; color:#1E4B2C;">Status Lencana:</strong>
            <span class="b-status ${b.ok ? "" : "locked-pill"}" style="margin:0;">
              ${b.ok ? `${ico("check", 10)} Terbuka` : `${ico("lock", 10)} Terkunci`}
            </span>
          </div>
          <div style="font-size:11px; color:#607365; font-weight:700; margin-bottom:6px;">
            Progres: ${b.isPercent ? `${prog[0]}% / ${prog[1]}%` : `${fmt(prog[0])} / ${fmt(prog[1])}`} (${pct}%)
          </div>
          <div class="b-progress" style="margin:0; width:100%;"><span style="width:${pct}%"></span></div>
        </div>

        <div class="actions" style="justify-content:center;">
          ${!b.ok ? `<button class="btn-dark" id="btnBadgeGoMisi">Mainkan Misi ${ico("arrow", 12)}</button>` : `<button class="btn-dark" data-close>Keren!</button>`}
        </div>
      </div>
    `);
    const goMisi = $("#btnBadgeGoMisi");
    if (goMisi) goMisi.onclick = () => { closeModal(); showPage("beranda"); };
  });
}

const btnPencapaianMore = $("#btnPencapaianMore");
if (btnPencapaianMore) btnPencapaianMore.onclick = () => showPage("beranda");
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
if ($("#artEco")) $("#artEco").innerHTML = ecoHeroArt();
if ($("#artHome")) $("#artHome").innerHTML = homeHeroArt();
if ($("#artBadge")) $("#artBadge").innerHTML = badgeHeroArt();
if ($("#artStat")) $("#artStat").innerHTML = statHeroArt();
const artTentang = $("#artTentang");
if (artTentang) artTentang.innerHTML = tentangArt();
renderShell();
renderChips();
renderEco();
renderMissions();
renderQuiz();

/* Dark Mode Init */
const isDarkModeSaved = localStorage.getItem("ecosorter_dark_mode") === "true";
if (isDarkModeSaved) document.body.classList.add("eco-dark");

const themeToggle = document.getElementById("btnThemeToggle");
if (themeToggle) {
  themeToggle.onclick = () => {
    const isDark = document.body.classList.toggle("eco-dark");
    localStorage.setItem("ecosorter_dark_mode", isDark ? "true" : "false");
    soundState.play("click");
  };
}

/* Profile Access Button */
const profileAccess = document.getElementById("btnProfileAccess");
if (profileAccess) {
  profileAccess.onclick = () => openProfileCustomModal();
}

/* Daily Spin Buttons */
const dailySpinHome = document.getElementById("btnDailySpinHome");
if (dailySpinHome) {
  dailySpinHome.onclick = () => openDailySpinModal();
}

/* Mode Switchers */
const modeClassic = document.getElementById("modeCardClassic");
const modeRush = document.getElementById("modeCardRush");
const modeLab = document.getElementById("modeCardLab");
const modeMistake = document.getElementById("modeCardMistake");

if (modeClassic && modeRush) {
  modeClassic.onclick = () => {
    currentPlayMode = "classic";
    [modeClassic, modeRush, modeLab, modeMistake].forEach(m => m?.classList.remove("active-mode"));
    modeClassic.classList.add("active-mode");
    soundState.play("click");
    setMascotSpeech("Mode Misi Standar aktif. Selesaikan misi dengan tenang!");
  };
  modeRush.onclick = () => {
    currentPlayMode = "rush";
    [modeClassic, modeRush, modeLab, modeMistake].forEach(m => m?.classList.remove("active-mode"));
    modeRush.classList.add("active-mode");
    soundState.play("click");
    setMascotSpeech("Mode Rush Hour aktif! Kejar waktu 60 detik dengan combo berlipat!");
  };
}
if (modeLab) {
  modeLab.onclick = () => {
    soundState.play("click");
    openMiniGame("lab");
  };
}
if (modeMistake) {
  modeMistake.onclick = () => {
    soundState.play("click");
    openMiniGame("audit");
  };
}

const modeDecomp = document.getElementById("modeCardDecomp");
if (modeDecomp) {
  modeDecomp.onclick = () => {
    soundState.play("click");
    openMiniGame("decomp");
  };
}

const modeSwap = document.getElementById("modeCardSwap");
if (modeSwap) {
  modeSwap.onclick = () => {
    soundState.play("click");
    openMiniGame("swap");
  };
}

/* Mascot Widget click */
const mascotBtn = document.getElementById("mascotBtn");
if (mascotBtn) {
  mascotBtn.onclick = () => {
    soundState.play("click");
    const tip = mascotTips[Math.floor(Math.random() * mascotTips.length)];
    setMascotSpeech(tip);
  };
}

/* Auto Onboarding for first time visitors */
if (!localStorage.getItem("ecosorter_tutorial_seen")) {
  setTimeout(() => openOnboardingTutorial(), 500);
}

/* =========================================================
   FULLSCREEN MINI-GAMES
   ========================================================= */
const MG_KINDS = ["audit", "decomp", "swap", "lab"];
const MG_STATE = {
  kind: null,
  returnPage: "beranda",
  audit: null,
  decomp: null,
  swap: null,
  lab: null
};

function mgDefault(kind) {
  if (kind === "audit") {
    return { scen: 0, found: {}, nopeKey: null, feedback: null, done: false, sessionPts: 0 };
  }
  if (kind === "decomp") {
    return { set: 0, order: [], selected: -1, checked: false, result: null, sessionPts: 0, rewarded: false };
  }
  if (kind === "swap") {
    return { scen: 0, picked: -1, result: null, sessionPts: 0, rewarded: false };
  }
  return { mat: "plastik", stage: 0, question: null, running: false, result: null, sessionPts: 0, rewarded: false };
}

let mgLabTimer = null;

function openMiniGame(kind) {
  if (!MG_KINDS.includes(kind)) return;
  if (mgLabTimer) { clearTimeout(mgLabTimer); mgLabTimer = null; }
  MG_STATE.kind = kind;
  MG_STATE.returnPage = document.querySelector(".side-nav button.active")?.dataset.page || "beranda";
  MG_STATE[kind] = mgDefault(kind);
  $("#app").hidden = true;
  $("#gameRoot").hidden = false;
  document.body.classList.add("mg-active");
  renderMiniGame();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function exitMiniGame() {
  if (mgLabTimer) { clearTimeout(mgLabTimer); mgLabTimer = null; }
  MG_STATE.kind = null;
  document.body.classList.remove("mg-active");
  const back = MG_STATE.returnPage || "beranda";
  $("#gameRoot").innerHTML = "";
  $("#gameRoot").hidden = true;
  $("#app").hidden = false;
  showPage(back);
}

function renderMiniGame() {
  const kind = MG_STATE.kind;
  if (!kind) return;
  if (kind === "audit") return mgRenderAudit();
  if (kind === "decomp") return mgRenderDecomp();
  if (kind === "swap") return mgRenderSwap();
  if (kind === "lab") return mgRenderLab();
}

function mgSessionPts(kind) {
  return (MG_STATE[kind] && MG_STATE[kind].sessionPts) || 0;
}

function mgAward(kind, pts, coins = 0) {
  const session = MG_STATE[kind];
  if (!session) return;
  session.sessionPts += pts;
  state.poin += pts;
  if (coins) state.koin = (state.koin || 0) + coins;
  save();
  renderShell();
}

function mgHeader(kind, meta) {
  const avatarKey = currentUser?.avatar || "aris";
  return `<header class="game-top mg-top">
    <button class="g-exit" id="mgBack">${ico("chevron-left", 13)} Keluar</button>
    <div class="g-brand"><svg width="22" height="22"><use href="#i-logo"/></svg><span>Eco-Sorter<em>STEM</em></span></div>
    <div class="g-levelbar">
      <span class="g-level-badge"><i></i> ${meta.badge}</span>
      <span class="g-level-name">${meta.name}</span>
      <div class="g-progress"><span style="width:${Math.max(0, Math.min(100, meta.pct))}%"></span></div>
      <span class="g-count">${meta.count}</span>
    </div>
    <div class="g-actions">
      ${meta.extra || ""}
      <div class="g-coins">${ico("coin", 14)} ${fmt(state.poin)}</div>
      <button class="g-sound-btn ${soundState.enabled ? "" : "muted"}" id="mgSound" title="Suara">${ico(soundState.enabled ? "volume" : "volume-mute", 16)}</button>
      <div class="g-avatar">${avatar(avatarKey)}</div>
    </div>
  </header>`;
}

function mgBindTop() {
  const back = $("#mgBack");
  if (back) back.onclick = exitMiniGame;
  const snd = $("#mgSound");
  if (snd) snd.onclick = () => {
    soundState.toggle();
    renderMiniGame();
  };
}

function mgToast(message) {
  const stage = document.querySelector(".mg-stage");
  if (!stage) return;
  const old = stage.querySelector(".mg-toast");
  if (old) old.remove();
  const el = document.createElement("div");
  el.className = "mg-toast";
  el.textContent = message;
  stage.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

function mgBindButton(sel, fn) {
  const el = document.querySelector(sel);
  if (el) el.onclick = fn;
}

/* ---------------- A. Eco-Audit: Spot the Mistake ---------------- */
const AUDIT_ICONS = {
  "Botol Plastik Bersih": "🧴",
  "Kertas Struk Thermal": "🧾",
  "Kardus Paket Bersih": "📦",
  "Kulit Pisang": "🍌",
  "Sisa Apel": "🍎",
  "Daun Kering Kebun": "🍂",
  "Baterai Jam Dinding Bekas": "🔋",
  "Cangkang Telur": "🥚",
  "Tisu Kotor": "🧻",
  "Puntung Rokok": "🚬"
};
const AUDIT_LAYOUT = [
  {
    bins: { daur: [13, 54], organik: [71, 58] },
    items: {
      "daur:0": [24, 72], "daur:1": [31, 46], "daur:2": [19, 34],
      "organik:0": [83, 76], "organik:1": [78, 42]
    }
  },
  {
    bins: { organik: [14, 52], residu: [72, 56] },
    items: {
      "organik:0": [26, 74], "organik:1": [33, 44], "organik:2": [19, 31],
      "residu:0": [84, 74], "residu:1": [80, 40]
    }
  }
];

function mgObjectPos(scenIdx, binId, idx) {
  const layout = AUDIT_LAYOUT[scenIdx] || AUDIT_LAYOUT[0];
  return layout.items[`${binId}:${idx}`] || [50, 60];
}

function mgRenderAudit() {
  const A = MG_STATE.audit;
  const scen = MISTAKE_SCENARIOS[A.scen];
  const mistakes = scen.bins.reduce((n, b) => n + b.items.filter(i => i.isMistake).length, 0);
  const foundCount = Object.keys(A.found).length;
  const allFound = foundCount >= mistakes;
  const layout = AUDIT_LAYOUT[A.scen] || AUDIT_LAYOUT[0];

  const binsHTML = scen.bins.map(b => {
    const pos = layout.bins[b.binId] || [20, 55];
    return `<div class="mg-bin-island" style="left:${pos[0]}%; top:${pos[1]}%">
      <span class="mg-bin-art">${binArt(b.binId)}</span>
      <span class="mg-bin-label">${CATEGORIES.find(c => c.id === b.binId)?.name || b.binId}</span>
    </div>`;
  }).join("");

  const objectsHTML = scen.bins.map(b => b.items.map((it, idx) => {
    const key = `${b.binId}:${idx}`;
    const pos = mgObjectPos(A.scen, b.binId, idx);
    const found = !!A.found[key];
    return `<button class="mg-object ${found ? "found" : ""} ${A.nopeKey === key ? "nope" : ""}"
      style="left:${pos[0]}%; top:${pos[1]}%"
      data-audit-bin="${b.binId}" data-audit-idx="${idx}">
      <span class="obj-ico">${AUDIT_ICONS[it.name] || "🗑️"}</span>
      <span class="obj-name">${it.name}</span>
    </button>`;
  }).join("")).join("");

  let panel = "";
  const nextLabel = A.scen < MISTAKE_SCENARIOS.length - 1 ? "Skenario berikutnya" : "Lihat hasil";
  const nextBtn = `<button class="btn-dark sm" id="mgAuditNext">${nextLabel} ${ico("arrow", 11)}</button>`;
  if (A.done) {
    panel = `<div class="mg-result-sheet">
      <div class="rs-head">
        <span class="rs-ico">🎯</span>
        <div><h3>Audit lingkungan selesai!</h3><p>Kamu berhasil menemukan semua kesalahan pemilahan.</p></div>
      </div>
      <div class="mg-rs-note" style="margin-top:10px;">Total skor sesi ini: <b>+${A.sessionPts} poin</b>. Kebiasaan teliti memilah sampah membuat lingkungan sekolah jauh lebih sehat.</div>
      <div class="mg-rs-actions">
        <button class="btn-soft" id="mgAuditAgain">${ico("refresh", 14)} Audit ulang</button>
        <button class="btn-dark" id="mgAuditHome">Kembali ke beranda ${ico("arrow", 12)}</button>
      </div>
    </div>`;
  } else if (A.feedback) {
    const fb = A.feedback;
    panel = `<div class="mg-feedback ${fb.ok ? "" : "bad"}">
      <div class="fb-ico">${fb.ok ? ico("check", 15) : "!"}</div>
      <div class="fb-copy">
        <h4>${fb.ok ? `${fb.item.name} memang salah tempat!` : "Belum tepat"}</h4>
        <p>${fb.ok ? fb.item.reason : `${fb.item.name} sudah berada di tempat sampah yang benar. Coba teliti objek lainnya!`}</p>
      </div>
      <div class="fb-actions">
        ${fb.ok || allFound ? nextBtn : `<button class="btn-soft sm" id="mgAuditClose">Tutup</button>`}
      </div>
    </div>`;
  } else if (allFound) {
    panel = `<div class="mg-feedback">
      <div class="fb-ico">${ico("check", 15)}</div>
      <div class="fb-copy">
        <h4>Semua kesalahan sudah ditemukan!</h4>
        <p>Kerja bagus. Lanjut ke skenario berikutnya untuk menguji ketelitianmu lagi.</p>
      </div>
      <div class="fb-actions">${nextBtn}</div>
    </div>`;
  }

  $("#gameRoot").innerHTML = `<div class="mg-page">
    ${mgHeader("audit", {
      badge: "Eco-Audit",
      name: "Spot the Mistake",
      pct: (foundCount / Math.max(1, mistakes)) * 100,
      count: `${foundCount}/${mistakes}`,
      extra: `<span class="mg-pill gold">${ico("search", 11)} ${foundCount}/${mistakes} kesalahan</span>`
    })}
    <div class="mg-stage">
      <div class="mg-bg garden"></div>
      <div class="mg-shade"></div>
      <div class="mg-world">${binsHTML}${objectsHTML}</div>
      <div class="mg-instruction">
        <span class="mi-ico">${ico("bulb", 15)}</span>
        <div><strong>Misi Audit</strong><p>${scen.desc} Klik objek yang kamu anggap salah tempat.</p></div>
      </div>
      <div class="mg-prompt">${ico("search", 11)} Temukan sampah yang salah tempat</div>
      <div class="mg-hud-right">
        <span class="mg-pill"><i></i> Skenario ${A.scen + 1} dari ${MISTAKE_SCENARIOS.length}</span>
        <span class="mg-pill gold">${ico("star", 11)} +${A.sessionPts} poin</span>
      </div>
      <div class="mg-audit-counter">
        <span class="ac-ico">${ico("target", 16)}</span>
        <div><strong>${foundCount} / ${mistakes} ditemukan</strong><small>Kesalahan pemilahan</small></div>
      </div>
      ${panel}
    </div>
  </div>`;

  mgBindTop();
  $$(".mg-object").forEach(btn => {
    btn.onclick = () => mgAuditClick(btn.dataset.auditBin, Number(btn.dataset.auditIdx));
  });
  mgBindButton("#mgAuditClose", () => { A.feedback = null; A.nopeKey = null; renderMiniGame(); });
  mgBindButton("#mgAuditNext", () => {
    if (A.scen < MISTAKE_SCENARIOS.length - 1) {
      A.scen++;
      A.found = {};
      A.feedback = null;
      A.nopeKey = null;
      soundState.play("click");
      renderMiniGame();
    } else {
      A.done = true;
      A.feedback = null;
      soundState.play("badge");
      launchConfetti(55);
      renderMiniGame();
    }
  });
  mgBindButton("#mgAuditAgain", () => {
    MG_STATE.audit = mgDefault("audit");
    renderMiniGame();
  });
  mgBindButton("#mgAuditHome", exitMiniGame);
}

function mgAuditClick(binId, idx) {
  const A = MG_STATE.audit;
  if (!A || A.done) return;
  const scen = MISTAKE_SCENARIOS[A.scen];
  const bin = scen.bins.find(b => b.binId === binId);
  const item = bin?.items[idx];
  if (!item) return;
  const key = `${binId}:${idx}`;
  if (A.found[key]) return;

  if (item.isMistake) {
    A.found[key] = true;
    A.nopeKey = null;
    A.feedback = { ok: true, item };
    soundState.play("correct");
    launchConfetti(40);
    mgAward("audit", 75);
    setMascotSpeech(`Tepat! ${item.name} memang salah tempat.`);
  } else {
    A.nopeKey = key;
    A.feedback = { ok: false, item };
    soundState.play("wrong");
  }
  renderMiniGame();
}

/* ---------------- B. Decomp Race ---------------- */
function mgRenderDecomp() {
  const D = MG_STATE.decomp;
  if (!Array.isArray(D.order) || D.order.length !== 4) {
    D.order = [null, null, null, null];
  }
  const set = DECOMP_RACE_SETS[D.set] || DECOMP_RACE_SETS[0];
  const placedCount = D.order.filter(v => v !== null && v !== undefined).length;
  const trayItems = set.items
    .map((it, idx) => ({ it, idx }))
    .filter(x => !D.order.includes(x.idx));

  const trayHTML = trayItems.length
    ? trayItems.map(x => `<button class="mg-waste-card ${D.selected === x.idx ? "selected" : ""}"
        draggable="true" data-item-idx="${x.idx}">
        <span class="wc-emoji">${x.it.icon}</span>
        <span class="wc-txt"><strong>${x.it.name}</strong><small>Seret ke garis waktu</small></span>
      </button>`).join("")
    : `<span class="mg-tray-empty">Semua kartu sudah ditempatkan. Periksa garis waktumu!</span>`;

  const slotsHTML = D.order.map((itemIdx, slotIdx) => {
    if (itemIdx === null || itemIdx === undefined) {
      return `<div class="mg-slot" data-slot-idx="${slotIdx}">
        <span class="slot-num">${slotIdx + 1}</span>
        <span class="slot-empty">Letakkan<br>di sini</span>
      </div>`;
    }
    const it = set.items[itemIdx];
    return `<div class="mg-slot filled" data-slot-idx="${slotIdx}">
      <span class="slot-num">${slotIdx + 1}</span>
      <span class="slot-emoji">${it.icon}</span>
      <span class="slot-name">${it.name}</span>
      <button class="slot-remove" data-slot-remove="${slotIdx}" title="Kembalikan">×</button>
    </div>`;
  }).join("");

  let resultHTML = "";
  if (D.result) {
    const sorted = [...set.items].sort((a, b) => a.val - b.val);
    const ok = D.result.correct;
    resultHTML = `<div class="mg-result-sheet">
      <div class="rs-head">
        <span class="rs-ico">${ok ? "🎉" : "📚"}</span>
        <div>
          <h3>${ok ? "Urutan dekomposisi 100% tepat!" : "Hampir benar! Ini garis waktu yang tepat"}</h3>
          <p>${ok ? "Kamu berhasil menyusun waktu penguraian dari yang tercepat." : "Bandingkan urutanmu dengan fakta sains di bawah ini."}</p>
        </div>
      </div>
      <div class="rs-list">
        ${sorted.map((s, i) => `<div class="mg-rs-row">
          <span class="rs-num">${i + 1}</span>
          <span class="rs-emoji">${s.icon}</span>
          <strong>${s.name}</strong>
          <span class="rs-time">⏳ ${s.time}</span>
        </div>`).join("")}
      </div>
      <div class="mg-rs-note"><b>Penjelasan STEM:</b> ${set.science}</div>
      <div class="mg-rs-actions">
        <button class="btn-soft" id="mgDecompRetry">${ico("refresh", 14)} Ulangi set ini</button>
        <button class="btn-dark" id="mgDecompNext">${D.set < DECOMP_RACE_SETS.length - 1 ? "Tantangan berikutnya" : "Selesai & kembali"} ${ico("arrow", 12)}</button>
      </div>
    </div>`;
  }

  $("#gameRoot").innerHTML = `<div class="mg-page">
    ${mgHeader("decomp", {
      badge: "Decomp Race",
      name: "Urutan Waktu",
      pct: (placedCount / 4) * 100,
      count: `${placedCount}/4`,
      extra: `<span class="mg-pill gold">${ico("star", 11)} +${D.sessionPts} poin</span>`
    })}
    <div class="mg-stage">
      <div class="mg-bg park"></div>
      <div class="mg-shade"></div>
      <div class="mg-instruction">
        <span class="mi-ico">${ico("clock", 15)}</span>
        <div><strong>Misi Garis Waktu</strong><p>Seret kartu sampah ke garis waktu. Susun dari yang <b>paling cepat terurai</b> di kiri hingga <b>paling lama</b> di kanan.</p></div>
      </div>
      <div class="mg-prompt">${ico("clock", 11)} Cepat terurai → Paling lama</div>
      <div class="mg-hud-right">
        <span class="mg-pill"><i></i> Set ${D.set + 1} dari ${DECOMP_RACE_SETS.length}</span>
        <span class="mg-pill gold">${ico("star", 11)} +${D.sessionPts} poin</span>
      </div>
      ${D.result ? "" : `<div class="mg-decomp">
        <div class="mg-tray" id="mgTray">${trayHTML}</div>
        <div class="mg-timeline">
          <div class="mg-tl-end"><span>🌱</span>Cepat<br>terurai</div>
          <div class="mg-tl-slots" id="mgSlots">${slotsHTML}</div>
          <div class="mg-tl-end"><span>⏳</span>Paling<br>lama</div>
        </div>
        <div class="mg-decomp-actions">
          <button class="btn-soft" id="mgDecompReset">${ico("refresh", 13)} Reset urutan</button>
          <button class="btn-dark" id="mgDecompCheck" ${placedCount < 4 ? "disabled" : ""}>Periksa garis waktu ${ico("arrow", 12)}</button>
        </div>
      </div>`}
      ${resultHTML}
    </div>
  </div>`;

  mgBindTop();
  if (D.result) {
    mgBindButton("#mgDecompRetry", () => {
      D.order = [null, null, null, null];
      D.result = null;
      D.checked = false;
      D.selected = -1;
      soundState.play("click");
      renderMiniGame();
    });
    mgBindButton("#mgDecompNext", () => {
      if (D.set < DECOMP_RACE_SETS.length - 1) {
        D.set++;
        D.order = [null, null, null, null];
        D.result = null;
        D.checked = false;
        D.selected = -1;
        D.rewarded = false;
        soundState.play("click");
        renderMiniGame();
      } else {
        exitMiniGame();
      }
    });
    return;
  }

  $$(".mg-waste-card").forEach(card => {
    const idx = Number(card.dataset.itemIdx);
    card.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", String(idx));
      e.dataTransfer.effectAllowed = "move";
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => card.classList.remove("dragging"));
    card.onclick = () => {
      D.selected = D.selected === idx ? -1 : idx;
      soundState.play("click");
      renderMiniGame();
    };
  });

  $$(".mg-slot").forEach(slot => {
    const slotIdx = Number(slot.dataset.slotIdx);
    slot.addEventListener("dragover", e => {
      e.preventDefault();
      slot.classList.add("over");
    });
    slot.addEventListener("dragleave", () => slot.classList.remove("over"));
    slot.addEventListener("drop", e => {
      e.preventDefault();
      slot.classList.remove("over");
      const raw = e.dataTransfer.getData("text/plain");
      if (raw === "") return;
      mgDecompPlace(Number(raw), slotIdx);
    });
    slot.onclick = e => {
      if (e.target.closest("[data-slot-remove]")) return;
      if (D.order[slotIdx] !== null && D.order[slotIdx] !== undefined) {
        D.order[slotIdx] = null;
        soundState.play("click");
        renderMiniGame();
        return;
      }
      if (D.selected >= 0) mgDecompPlace(D.selected, slotIdx);
    };
  });

  $$("[data-slot-remove]").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const sIdx = Number(btn.dataset.slotRemove);
      D.order[sIdx] = null;
      soundState.play("click");
      renderMiniGame();
    };
  });

  mgBindButton("#mgDecompReset", () => {
    D.order = [null, null, null, null];
    D.selected = -1;
    soundState.play("click");
    renderMiniGame();
  });

  mgBindButton("#mgDecompCheck", () => {
    if (D.order.some(v => v === null || v === undefined)) return;
    const correct = D.order.every((itemIdx, i) => set.items[itemIdx].val === i + 1);
    D.checked = true;
    D.result = { correct };
    if (correct) {
      soundState.play("badge");
      launchConfetti(50);
      if (!D.rewarded) {
        D.rewarded = true;
        mgAward("decomp", 60);
      }
    } else {
      soundState.play("wrong");
    }
    renderMiniGame();
  });
}

function mgDecompPlace(itemIdx, slotIdx) {
  const D = MG_STATE.decomp;
  if (!D || D.result) return;
  if (!Number.isInteger(itemIdx) || !Number.isInteger(slotIdx)) return;
  if (slotIdx < 0 || slotIdx > 3) return;
  const from = D.order.indexOf(itemIdx);
  if (from !== -1) D.order[from] = null;
  D.order[slotIdx] = itemIdx;
  D.selected = -1;
  soundState.play("click");
  renderMiniGame();
}

/* ---------------- C. Zero-Waste Swap ---------------- */
function mgSwapStallArt(scen) {
  const isShop = /koperasi/i.test(scen.title);
  const sign = isShop ? "KOPERASI" : "KANTIN HIJAU";
  const scallops = Array.from({ length: 9 }, (_, i) =>
    `<circle cx="${70 + i * 62}" cy="104" r="19" fill="${i % 2 ? "#FBF3D2" : "#2E7D32"}" stroke="#276B2B" stroke-width="2"/>`
  ).join("");
  const shelfItems = isShop
    ? `<g transform="translate(140 122)">
        <rect x="0" y="8" width="20" height="38" rx="3" fill="#7CC7E8" stroke="#3E8DA6" stroke-width="2"/>
        <rect x="28" y="0" width="22" height="46" rx="3" fill="#F2B36B" stroke="#B07A34" stroke-width="2"/>
        <rect x="60" y="12" width="26" height="34" rx="3" fill="#CDEFFB" stroke="#3E8DA6" stroke-width="2"/>
        <rect x="96" y="4" width="18" height="42" rx="3" fill="#9AD7A8" stroke="#4E9A5E" stroke-width="2"/>
        <rect x="124" y="14" width="24" height="32" rx="3" fill="#F6D46B" stroke="#B98A1E" stroke-width="2"/>
      </g>`
    : `<g transform="translate(140 122)">
        <rect x="0" y="14" width="18" height="32" rx="5" fill="#8FD3E8" stroke="#4E9DB5" stroke-width="2"/>
        <rect x="4" y="6" width="10" height="10" rx="3" fill="#4E9DB5"/>
        <rect x="32" y="20" width="22" height="26" rx="4" fill="#F3C25C" stroke="#B98A1E" stroke-width="2"/>
        <circle cx="86" cy="30" r="14" fill="#EF8A6B" stroke="#C25A3F" stroke-width="2"/>
        <path d="M78 24q8-6 16 0" stroke="#fff" stroke-width="3" fill="none"/>
        <rect x="114" y="16" width="16" height="30" rx="4" fill="#9AD7A8" stroke="#4E9A5E" stroke-width="2"/>
      </g>`;

  return `<svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <ellipse cx="320" cy="330" rx="248" ry="22" fill="#1b3f2d" opacity=".16"/>
    <rect x="92" y="72" width="456" height="166" rx="14" fill="#FBF3D2" stroke="#E2D3A6" stroke-width="4"/>
    <rect x="120" y="152" width="400" height="10" rx="5" fill="#D9C79C"/>
    <rect x="120" y="200" width="400" height="10" rx="5" fill="#D9C79C"/>
    ${shelfItems}
    <g transform="translate(392 126)">
      <rect x="0" y="6" width="16" height="34" rx="4" fill="#8FD3E8" stroke="#4E9DB5" stroke-width="2"/>
      <rect x="24" y="0" width="18" height="40" rx="4" fill="#F3C25C" stroke="#B98A1E" stroke-width="2"/>
      <circle cx="64" cy="22" r="12" fill="#9AD7A8" stroke="#4E9A5E" stroke-width="2"/>
    </g>
    <rect x="70" y="60" width="18" height="226" rx="6" fill="#B98352" stroke="#8A5A31" stroke-width="3"/>
    <rect x="552" y="60" width="18" height="226" rx="6" fill="#B98352" stroke="#8A5A31" stroke-width="3"/>
    <rect x="46" y="58" width="548" height="44" rx="12" fill="#2E7D32" stroke="#276B2B" stroke-width="3"/>
    ${scallops}
    <rect x="228" y="108" width="184" height="42" rx="12" fill="#FBF3D2" stroke="#D9C79C" stroke-width="4"/>
    <text x="320" y="136" text-anchor="middle" font-family="'Baloo 2',sans-serif" font-size="19" font-weight="800" fill="#3E6B55">${sign}</text>
    <rect x="90" y="238" width="460" height="60" rx="14" fill="#EFE2C2" stroke="#CBB68B" stroke-width="3"/>
    <rect x="90" y="238" width="460" height="14" rx="7" fill="#D8C49B"/>
    <g transform="translate(128 252)">
      <rect x="0" y="10" width="22" height="30" rx="6" fill="#A8DBA0" stroke="#4E9A5E" stroke-width="2"/>
      <rect x="8" y="2" width="8" height="10" rx="2" fill="#4E9A5E"/>
    </g>
    <g transform="translate(178 248)">
      <rect x="0" y="0" width="26" height="42" rx="8" fill="#fff" stroke="#C5D9CB" stroke-width="2"/>
      <rect x="3" y="8" width="20" height="22" rx="4" fill="#8FD3E8"/>
    </g>
    <g transform="translate(234 254)">
      <ellipse cx="22" cy="20" rx="22" ry="12" fill="#F6D46B" stroke="#B98A1E" stroke-width="2"/>
      <path d="M4 20q18 14 36 0" fill="none" stroke="#B98A1E" stroke-width="2"/>
    </g>
    <g transform="translate(470 250)">
      <rect x="0" y="0" width="40" height="40" rx="9" fill="#fff" stroke="#C5D9CB" stroke-width="2"/>
      <text x="20" y="27" text-anchor="middle" font-size="20">🌿</text>
    </g>
    <g transform="translate(500 214)">
      <path d="M12 26c0-14 8-22 20-26-2 14-8 22-20 26z" fill="#7CC98A" stroke="#4E9A5E" stroke-width="2"/>
      <path d="M10 28C4 18-2 13-10 12c2 11 8 17 20 16z" fill="#A8DBA0" stroke="#4E9A5E" stroke-width="2"/>
      <path d="M0 28h24l-4 18H4z" fill="#E0A46E" stroke="#A16F35" stroke-width="2"/>
    </g>
  </svg>`;
}

function mgRenderSwap() {
  const S = MG_STATE.swap;
  const scen = ZERO_WASTE_SCENARIOS[S.scen] || ZERO_WASTE_SCENARIOS[0];
  const chosen = S.picked >= 0 ? scen.options[S.picked] : null;
  const best = scen.options.find(o => o.isBest);

  const choicesHTML = S.result ? "" : `<div class="mg-choices">
    ${scen.options.map((opt, idx) => `<button class="mg-choice" data-swap-opt="${idx}">
      <span class="choice-ico">${opt.icon}</span>
      <div>
        <h4>${opt.title}</h4>
        <p>${opt.waste}</p>
      </div>
      <span class="choice-pick">${ico("arrow", 10)} Pilih ini</span>
    </button>`).join("")}
  </div>`;

  let compareHTML = "";
  if (S.result && chosen) {
    const ok = !!chosen.isBest;
    compareHTML = `<div class="mg-compare ${ok ? "" : "bad"}" style="left:50%; transform:translateX(-50%); bottom:16px; width:min(580px, calc(100% - 32px));">
      <span class="mc-badge">${ok ? `${ico("check", 10)} Pilihan terbaik` : "Analisis dampak"}</span>
      <h4>${ok ? "Pilihan cerdas zero-waste!" : "Pilihan ini masih menghasilkan sampah"}</h4>
      <div class="mc-grid">
        <div class="mc-cell"><small>Dampak sampah</small><p>${chosen.waste}</p></div>
        <div class="mc-cell"><small>Manfaat sumber daya</small><p>${chosen.impact}</p></div>
      </div>
      ${ok ? "" : `<div class="mg-rs-note" style="margin-top:8px;"><b>Alternatif terbaik:</b> ${best.title}. ${best.impact}</div>`}
      <div class="mc-actions">
        ${ok
          ? `<button class="btn-soft sm" id="mgSwapRetry">${ico("refresh", 12)} Ulangi</button>
             <button class="btn-dark sm" id="mgSwapNext">${S.scen < ZERO_WASTE_SCENARIOS.length - 1 ? "Skenario berikutnya" : "Selesai & kembali"} ${ico("arrow", 11)}</button>`
          : `<button class="btn-soft sm" id="mgSwapRetry">Coba lagi</button>
             <button class="btn-dark sm" id="mgSwapNext">${S.scen < ZERO_WASTE_SCENARIOS.length - 1 ? "Skenario berikutnya" : "Selesai & kembali"} ${ico("arrow", 11)}</button>`}
      </div>
    </div>`;
  }

  $("#gameRoot").innerHTML = `<div class="mg-page">
    ${mgHeader("swap", {
      badge: "Zero-Waste Swap",
      name: "Gaya Hidup Bijak",
      pct: S.result ? 100 : 0,
      count: `${S.scen + 1}/${ZERO_WASTE_SCENARIOS.length}`,
      extra: `<span class="mg-pill gold">${ico("star", 11)} +${S.sessionPts} poin</span>`
    })}
    <div class="mg-stage">
      <div class="mg-bg garden"></div>
      <div class="mg-shade"></div>
      <div class="mg-swap-world">
        <div class="mg-stall">${mgSwapStallArt(scen)}</div>
      </div>
      <div class="mg-instruction">
        <span class="mi-ico">${ico("bulb", 15)}</span>
        <div><strong>Apa yang kamu pilih?</strong><p>${scen.desc}</p></div>
      </div>
      <div class="mg-prompt">${ico("leaf-small", 11)} Pilih alternatif paling ramah lingkungan</div>
      <div class="mg-hud-right">
        <span class="mg-pill"><i></i> Skenario ${S.scen + 1} dari ${ZERO_WASTE_SCENARIOS.length}</span>
        <span class="mg-pill gold">${ico("star", 11)} +${S.sessionPts} poin</span>
      </div>
      ${choicesHTML}
      ${compareHTML}
    </div>
  </div>`;

  mgBindTop();
  $$("[data-swap-opt]").forEach(btn => {
    btn.onclick = () => mgSwapPick(Number(btn.dataset.swapOpt));
  });
  mgBindButton("#mgSwapRetry", () => {
    S.picked = -1;
    S.result = null;
    soundState.play("click");
    renderMiniGame();
  });
  mgBindButton("#mgSwapNext", () => {
    if (S.scen < ZERO_WASTE_SCENARIOS.length - 1) {
      S.scen++;
      S.picked = -1;
      S.result = null;
      S.rewarded = false;
      soundState.play("click");
      renderMiniGame();
    } else {
      exitMiniGame();
    }
  });
}

function mgSwapPick(idx) {
  const S = MG_STATE.swap;
  const scen = ZERO_WASTE_SCENARIOS[S.scen];
  const opt = scen.options[idx];
  if (!opt || S.result) return;
  S.picked = idx;
  S.result = { best: !!opt.isBest };
  if (opt.isBest) {
    soundState.play("badge");
    launchConfetti(50);
    if (!S.rewarded) {
      S.rewarded = true;
      mgAward("swap", 50);
    }
  } else {
    soundState.play("wrong");
  }
  renderMiniGame();
}

/* ---------------- D. Recycling Lab ---------------- */
const LAB_PRODUCTS = {
  plastik: { icon: "👕", name: "Serat Kain Jersey Olahraga", sub: "Biji rPET dipintal menjadi serat poliester" },
  kertas: { icon: "🥚", name: "Egg Tray Wadah Telur", sub: "Pulp selulosa dicetak menjadi wadah telur" },
  organik: { icon: "🌱", name: "Kompos Humus Organik", sub: "Biomassa matang menjadi pupuk alami" }
};

function mgLabRoomArt(productIcon) {
  return `<svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="labWall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#F8FDFA"/><stop offset="1" stop-color="#CFE8DA"/>
      </linearGradient>
      <linearGradient id="labMetal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#EAF4EF"/><stop offset="1" stop-color="#8FA99C"/>
      </linearGradient>
      <linearGradient id="labWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7FD6E8"/><stop offset="1" stop-color="#3D9DBA"/>
      </linearGradient>
      <radialGradient id="labGlow" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#FFE08A" stop-opacity=".95"/><stop offset="1" stop-color="#FFE08A" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1000" height="600" fill="url(#labWall)"/>
    <rect x="60" y="52" width="190" height="110" rx="14" fill="#CDEBFA" stroke="#fff" stroke-width="8"/>
    <circle cx="140" cy="92" r="18" fill="#FFE07A"/>
    <path d="M60 150c30-26 58-20 84-6s56 4 106-18v36H60z" fill="#8FD3A0"/>
    <rect x="60" y="52" width="190" height="110" rx="14" fill="none" stroke="#B7D9C7" stroke-width="3"/>
    <path d="M300 84h430v30H560v36" fill="none" stroke="#9FBAB0" stroke-width="12" stroke-linecap="round"/>
    <path d="M300 84h430v30H560v36" fill="none" stroke="#D8E7DF" stroke-width="5" stroke-linecap="round"/>
    <circle cx="986" cy="99" r="14" fill="#EF7D7D" stroke="#C25252" stroke-width="4"/>
    <rect y="470" width="1000" height="130" fill="#C3DFCE"/>
    <path d="M0 470h1000v14H0z" fill="#A9CCB8"/>
    <g opacity=".35" stroke="#A9CDB8" stroke-width="3">
      <path d="M80 530h180M80 560h180M330 530h180M330 560h180M580 530h180M580 560h180M830 530h140M830 560h140"/>
    </g>
    <g>
      <rect x="60" y="300" width="210" height="180" rx="20" fill="url(#labMetal)" stroke="#5E7C6C" stroke-width="4"/>
      <rect x="82" y="322" width="166" height="100" rx="14" fill="url(#labWater)" stroke="#3E8DA6" stroke-width="4"/>
      <path d="M82 360h166" stroke="#8FE2F2" stroke-width="5" opacity=".8"/>
      <g fill="#fff" opacity=".85">
        <circle class="mg-bubble" cx="120" cy="392" r="8"/>
        <circle class="mg-bubble" cx="160" cy="404" r="5" style="animation-delay:.5s"/>
        <circle class="mg-bubble" cx="205" cy="386" r="6" style="animation-delay:1s"/>
      </g>
      <rect x="96" y="440" width="138" height="24" rx="8" fill="#F1F7F4" stroke="#7E9C8D" stroke-width="3"/>
      <circle class="mg-wheel" cx="240" cy="334" r="16" fill="#EAF4EE" stroke="#5E7F70" stroke-width="4"/>
      <path d="M240 322v24M228 334h24" stroke="#5E7F70" stroke-width="4"/>
      <circle cx="96" cy="316" r="5" fill="#EF7D7D"/>
      <circle cx="114" cy="316" r="5" fill="#7CC98A"/>
      <rect x="78" y="262" width="174" height="28" rx="14" fill="#FBF3D2" stroke="#D9C79C" stroke-width="2"/>
      <text x="165" y="282" text-anchor="middle" font-family="'Baloo 2',sans-serif" font-size="17" font-weight="800" fill="#2F5E47">STASIUN CUCI</text>
    </g>
    <g>
      <rect x="310" y="330" width="270" height="150" rx="20" fill="url(#labMetal)" stroke="#5E7C6C" stroke-width="4"/>
      <ellipse cx="445" cy="350" rx="108" ry="26" fill="#EAF4EE" stroke="#6E8F7F" stroke-width="4"/>
      <ellipse cx="445" cy="350" rx="82" ry="16" fill="#D6EFE2" stroke="#7FA391" stroke-width="2"/>
      <g class="mg-flake" fill="#7CC7E8" stroke="#3E8DA6" stroke-width="2">
        <path d="M400 318l10-10 8 12-12 8z"/>
      </g>
      <g class="mg-flake" style="animation-delay:.7s" fill="#9AD7EE" stroke="#3E8DA6" stroke-width="2">
        <path d="M472 312l12-8 6 14-13 6z"/>
      </g>
      <rect x="330" y="382" width="230" height="18" rx="9" fill="#DDEBE4" stroke="#7E9C8D" stroke-width="3"/>
      <line class="mg-belt" x1="344" y1="391" x2="546" y2="391" stroke="#5E7C6C" stroke-width="5" stroke-linecap="round"/>
      <circle class="mg-gear" cx="365" cy="436" r="22" fill="#F6FBF8" stroke="#5E7F70" stroke-width="5"/>
      <circle class="mg-gear" cx="525" cy="436" r="22" fill="#F6FBF8" stroke="#5E7F70" stroke-width="5" style="animation-direction:reverse"/>
      <circle cx="330" cy="344" r="5" fill="#7CC98A"/>
      <circle cx="348" cy="344" r="5" fill="#F2C94C"/>
      <rect x="346" y="292" width="198" height="28" rx="14" fill="#FBF3D2" stroke="#D9C79C" stroke-width="2"/>
      <text x="445" y="312" text-anchor="middle" font-family="'Baloo 2',sans-serif" font-size="17" font-weight="800" fill="#2F5E47">MESIN PENCACAH</text>
    </g>
    <g transform="translate(-30 0)">
      <rect x="620" y="270" width="210" height="210" rx="22" fill="url(#labMetal)" stroke="#5E7C6C" stroke-width="4"/>
      <rect x="646" y="300" width="158" height="100" rx="14" fill="#3E4A45"/>
      <ellipse cx="725" cy="352" rx="58" ry="34" fill="url(#labGlow)"/>
      <rect x="646" y="300" width="158" height="100" rx="14" fill="none" stroke="#5C7368" stroke-width="4"/>
      <path d="M664 382q28-22 58 0t58 0" fill="none" stroke="#F2A65A" stroke-width="5" opacity=".85"/>
      <g class="mg-spark" fill="#FFD86B">
        <circle cx="690" cy="336" r="4"/><circle cx="742" cy="326" r="3"/><circle cx="768" cy="344" r="4"/>
      </g>
      <rect x="662" y="420" width="126" height="26" rx="10" fill="#F1F7F4" stroke="#7E9C8D" stroke-width="3"/>
      <circle class="mg-gear" cx="812" cy="420" r="18" fill="#F6FBF8" stroke="#5E7F70" stroke-width="4"/>
      <circle cx="648" cy="288" r="5" fill="#EF7D7D"/>
      <circle cx="666" cy="288" r="5" fill="#7CC98A"/>
    </g>
    <g>
      <rect x="860" y="366" width="110" height="114" rx="16" fill="#F3E7C8" stroke="#C9B487" stroke-width="4"/>
      <rect x="878" y="386" width="74" height="56" rx="12" fill="#fff" stroke="#D9C9A3" stroke-width="3"/>
      <text x="915" y="430" text-anchor="middle" font-size="30">${productIcon}</text>
      <text x="915" y="466" text-anchor="middle" font-size="10" font-weight="800" fill="#8A6A1A" font-family="'Baloo 2',sans-serif">PRODUK</text>
    </g>
    <g transform="translate(330 168)">
      <rect width="124" height="90" rx="10" fill="#FFFDF4" stroke="#D9C79C" stroke-width="3"/>
      <text x="62" y="40" text-anchor="middle" font-size="28">♻️</text>
      <text x="62" y="70" text-anchor="middle" font-family="'Baloo 2',sans-serif" font-size="10.5" font-weight="800" fill="#3E6B55">REUSE &amp; RECYCLE</text>
    </g>
    <g transform="translate(470 504)">
      <rect x="0" y="10" width="44" height="52" rx="10" fill="#7CC98A" stroke="#3E7D50" stroke-width="3"/>
      <rect x="4" y="4" width="36" height="10" rx="4" fill="#3E7D50"/>
      <path d="M22 32l5-7 5 7h-3v9h-4v-9z" fill="#fff"/>
    </g>
  </svg>`;
}

function mgLabReset(matKey) {
  const L = MG_STATE.lab;
  if (!L) return;
  if (mgLabTimer) { clearTimeout(mgLabTimer); mgLabTimer = null; }
  L.mat = matKey;
  L.stage = 0;
  L.answer = null;
  L.running = false;
}

function mgRenderLab() {
  const L = MG_STATE.lab;
  if (!L.completed) L.completed = {};
  const labData = RECYCLE_LAB_5STAGES[L.mat] || RECYCLE_LAB_5STAGES.plastik;
  const stage = labData.stages[Math.min(L.stage, 4)];
  const product = LAB_PRODUCTS[L.mat] || LAB_PRODUCTS.plastik;
  const matKeys = Object.keys(RECYCLE_LAB_5STAGES);
  const isReport = L.stage === 4;

  const matsHTML = matKeys.map(k => {
    const m = RECYCLE_LAB_5STAGES[k];
    const done = !!L.completed[k];
    return `<button class="mg-mat ${L.mat === k ? "active" : ""}" data-lab-mat="${k}">
      <span class="mat-emoji">${m.icon}</span>
      <strong>${m.name}</strong>
      <small>${done ? "Selesai ✓" : "Pilih bahan"}</small>
    </button>`;
  }).join("");

  const stagePills = labData.stages.map((s, i) => {
    const cls = i < L.stage ? "done" : i === L.stage ? "active" : "";
    return `<span class="mg-stage-pill ${cls}">${s.num}</span>`;
  }).join("");

  let note = "";
  if (stage.interact) {
    note = `<div class="mg-lab-note">${stage.interact}</div>`;
  } else if (stage.question) {
    note = `<div class="mg-lab-note"><b>${stage.question}</b> Pilih jawaban paling tepat berdasarkan sains.</div>`;
  } else if (isReport) {
    note = `<div class="mg-lab-note"><b>${stage.co2Saved}</b><br>${stage.energySaved}</div>`;
  }

  let actions = "";
  if (L.stage === 0) {
    actions = `<button class="btn-dark sm" id="mgLabStart">Mulai pemeriksaan ${ico("arrow", 12)}</button>`;
  } else if (L.stage === 1) {
    actions = `<button class="btn-dark sm" id="mgLabNextStage">Lanjut ke mesin ${ico("arrow", 12)}</button>`;
  } else if (L.stage === 2) {
    actions = `<button class="btn-dark sm" id="mgLabRun" ${L.running ? "disabled" : ""}>${L.running ? "Mesin berjalan..." : `Jalankan mesin ${ico("sparkle", 12)}`}</button>`;
  } else if (L.stage === 3) {
    const answer = L.answer;
    actions = stage.options.map((opt, i) => {
      const cls = answer && answer.idx === i ? (answer.ok ? "correct" : "wrong") : "";
      return `<button class="mg-option ${cls}" data-lab-opt="${i}">${opt}</button>`;
    }).join("");
    if (answer && answer.ok) {
      actions += `<button class="btn-dark sm" id="mgLabReport">Lihat hasil lab ${ico("arrow", 12)}</button>`;
    }
  }

  const resultHTML = isReport ? `<div class="mg-lab-result">
    <div class="lr-ico">${product.icon}</div>
    <span class="mc-badge" style="display:inline-flex; align-items:center; gap:4px; background:#E8F5E9; color:#2E7D32; border-radius:99px; padding:3px 10px; font-size:7.5px; font-weight:900; text-transform:uppercase;">Produk berhasil dibuat</span>
    <h3>${product.name}</h3>
    <p>${product.sub}. ${stage.desc}</p>
    <div class="lr-stats">
      <div><small>CO₂ dicegah</small><strong>${stage.co2Saved}</strong></div>
      <div><small>Efisiensi sumber daya</small><strong>${stage.energySaved}</strong></div>
    </div>
    <p style="font-size:9px; font-weight:800; color:#8A6A1A; margin-top:6px;">Bonus ${stage.ptsEarned || 80} poin + 20 koin</p>
    <div class="lr-actions">
      <button class="btn-soft sm" id="mgLabAgain">${ico("refresh", 12)} Coba bahan lain</button>
      <button class="btn-dark sm" id="mgLabDone">Selesai ${ico("arrow", 11)}</button>
    </div>
  </div>` : "";

  $("#gameRoot").innerHTML = `<div class="mg-page mg-lab-page">
    ${mgHeader("lab", {
      badge: "Recycling Lab",
      name: "Simulasi STEM",
      pct: ((L.stage + 1) / 5) * 100,
      count: `${L.stage + 1}/5`,
      extra: `<span class="mg-pill gold">${ico("star", 11)} +${L.sessionPts} poin</span>`
    })}
    <div class="mg-stage">
      <div class="mg-bg lab"></div>
      <div class="mg-lab-room ${L.running ? "running" : ""}">${mgLabRoomArt(product.icon)}</div>
      <div class="mg-shade"></div>
      <div class="mg-instruction">
        <span class="mi-ico">${ico("bulb", 15)}</span>
        <div><strong>Laboratorium Daur Ulang</strong><p>Pilih bahan mentah, jalankan mesin tahap demi tahap, lalu jawab tantangan parameter STEM untuk mencetak produk baru.</p></div>
      </div>
      <div class="mg-prompt">${ico("sparkle", 11)} Tahap ${stage.num} dari 5</div>
      <div class="mg-lab-mats">${matsHTML}</div>
      <aside class="mg-lab-console">
        <div class="lc-head">
          <span class="lc-ico">${labData.icon}</span>
          <div>
            <h3>${labData.name}</h3>
            <span class="lc-sub">Tahap ${stage.num} dari 5 · ${stage.title}</span>
          </div>
        </div>
        <div class="mg-stages">${stagePills}</div>
        <p>${stage.desc}</p>
        ${note}
        <div class="mg-lab-actions">${actions}</div>
      </aside>
      ${resultHTML}
    </div>
  </div>`;

  mgBindTop();

  $$("[data-lab-mat]").forEach(btn => {
    btn.onclick = () => {
      const key = btn.dataset.labMat;
      if (key === L.mat && L.stage === 0) return;
      mgLabReset(key);
      soundState.play("click");
      renderMiniGame();
    };
  });

  mgBindButton("#mgLabStart", () => {
    L.stage = 1;
    L.answer = null;
    soundState.play("click");
    renderMiniGame();
  });

  mgBindButton("#mgLabNextStage", () => {
    L.stage = 2;
    L.answer = null;
    soundState.play("click");
    renderMiniGame();
  });

  mgBindButton("#mgLabRun", () => {
    if (L.running) return;
    L.running = true;
    soundState.play("click");
    renderMiniGame();
    mgLabTimer = setTimeout(() => {
      if (MG_STATE.lab !== L || L.stage !== 2) return;
      L.running = false;
      L.stage = 3;
      L.answer = null;
      soundState.play("correct");
      renderMiniGame();
    }, 1700);
  });

  $$("[data-lab-opt]").forEach(btn => {
    btn.onclick = () => {
      if (L.stage !== 3) return;
      const i = Number(btn.dataset.labOpt);
      const ok = i === stage.correctOpt;
      L.answer = { idx: i, ok };
      if (ok) {
        soundState.play("correct");
      } else {
        soundState.play("wrong");
      }
      renderMiniGame();
    };
  });

  mgBindButton("#mgLabReport", () => {
    L.stage = 4;
    L.running = false;
    if (!L.completed[L.mat]) {
      L.completed[L.mat] = true;
      const reportStage = RECYCLE_LAB_5STAGES[L.mat].stages[4];
      mgAward("lab", reportStage.ptsEarned || 80, 20);
    }
    soundState.play("badge");
    launchConfetti(60);
    renderMiniGame();
  });

  mgBindButton("#mgLabAgain", () => {
    const nextKey = matKeys[(matKeys.indexOf(L.mat) + 1) % matKeys.length];
    mgLabReset(nextKey);
    soundState.play("click");
    renderMiniGame();
  });

  mgBindButton("#mgLabDone", exitMiniGame);
}






