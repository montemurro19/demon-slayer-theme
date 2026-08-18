/**
 * Color utilities: sRGB <-> OKLCH and WCAG contrast. No dependencies.
 *
 * OKLCH because deriving the light themes means changing lightness while
 * keeping hue intact — in HSL that twists the color (a darkened yellow turns
 * olive green); in OKLab it does not.
 */

const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);

/** `#rrggbb` -> [r, g, b] in 0..1 */
export function parseHex(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
}

/** [r, g, b] in 0..1 -> `#RRGGBB` */
export function toHex(rgb) {
  return `#${rgb.map((v) => Math.round(clamp(v) * 255).toString(16).padStart(2, '0').toUpperCase()).join('')}`;
}

/** sRGB -> OKLab (Björn Ottosson) */
function rgbToOklab([r, g, b]) {
  const [lr, lg, lb] = [toLinear(r), toLinear(g), toLinear(b)];
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ];
}

/** OKLab -> sRGB (may fall outside the gamut; see `fromOklch`) */
function oklabToRgb([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3;
  return [
    toGamma(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    toGamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    toGamma(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s),
  ];
}

/** `#rrggbb` -> { L, C, h } (L in 0..1, h in degrees) */
export function toOklch(hex) {
  const [L, a, b] = rgbToOklab(parseHex(hex));
  return {
    L,
    C: Math.hypot(a, b),
    h: (Math.atan2(b, a) * 180) / Math.PI,
  };
}

const inGamut = (rgb) => rgb.every((v) => v >= -0.0005 && v <= 1.0005);

/**
 * { L, C, h } -> `#RRGGBB`, lowering chroma until the color fits in sRGB.
 * Without this, highly saturated colors at extreme lightness blow out to a
 * neighbouring hue when clipped channel by channel.
 */
export function fromOklch({ L, C, h }) {
  const rad = (h * Math.PI) / 180;
  const at = (c) => oklabToRgb([L, Math.cos(rad) * c, Math.sin(rad) * c]);

  if (inGamut(at(C))) return toHex(at(C));

  let lo = 0, hi = C;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(at(mid))) lo = mid;
    else hi = mid;
  }
  return toHex(at(lo));
}

/** WCAG relative luminance */
export function luminance(hex) {
  const [r, g, b] = parseHex(hex).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two colors (1..21) */
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Darkens (or lightens) a color, keeping hue and chroma, until it meets the
 * target contrast against the background. Returns it untouched if it already
 * passes.
 *
 * @param {string} hex
 * @param {string} bg
 * @param {number} target minimum ratio
 */
export function ensureContrast(hex, bg, target) {
  if (contrast(hex, bg) >= target) return hex;

  const { L, C, h } = toOklch(hex);
  const darken = luminance(bg) > 0.18; // light background -> darken the ink
  for (let step = 1; step <= 100; step++) {
    const next = fromOklch({ L: clamp(L + (darken ? -1 : 1) * step * 0.01), C, h });
    if (contrast(next, bg) >= target) return next;
  }
  return darken ? '#000000' : '#FFFFFF';
}
