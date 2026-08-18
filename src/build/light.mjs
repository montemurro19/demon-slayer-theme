/**
 * Derives the light variant of a dark palette.
 *
 * The premise: a character's identity lives in the hues, not in the
 * lightness. So every role keeps its hue and only lightness is remapped —
 * in OKLCH, so the hue doesn't twist on the way.
 *
 * Two choices give the light variants their character:
 *
 *   background = the character's accent hue, near white (their signature
 *                tinting the paper)
 *   text       = the character's dark background hue, near black (their
 *                shadow tone becoming the ink)
 *
 * The gap between editor and chrome is carried over proportionally from the
 * dark theme, so Tanjiro's checkered rhythm stays pronounced and Inosuke's
 * stays flat.
 *
 * Per-character corrections go in `lightOverrides` on the dark palette.
 */
import { toOklch, fromOklch, ensureContrast, contrast } from './color.mjs';
import { definePalette } from '../palettes/_schema.mjs';

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** Recolors at the requested lightness, keeping the source hue and chroma. */
const at = (hex, L, chromaScale = 1) => {
  const { C, h } = toOklch(hex);
  return fromOklch({ L, C: C * chromaScale, h });
};

/** Target lightness for each syntax role in the light variant. */
const SYNTAX_L = {
  comment: 0.56,
  keyword: 0.48,
  storage: 0.48,
  string: 0.44,
  stringEscape: 0.48,
  number: 0.46,
  constant: 0.46,
  function: 0.48,
  variable: 0.30,
  parameter: 0.46,
  property: 0.44,
  class: 0.45,
  type: 0.45,
  operator: 0.50,
  punctuation: 0.52,
  tag: 0.48,
  attribute: 0.46,
  regexp: 0.46,
  decorator: 0.48,
  invalid: 0.50,
};

const ANSI_L = {
  black: 0.25, brightBlack: 0.50,
  white: 0.80, brightWhite: 0.93,
};
const ANSI_L_NORMAL = 0.50;
const ANSI_L_BRIGHT = 0.58;

/** Minimum contrast each group must hold against the editor background. */
const MIN_SYNTAX = 4.6;
const MIN_SECONDARY_TEXT = 4.6;
const MIN_TERTIARY_TEXT = 3.6;

/**
 * @param {import('../palettes/_schema.mjs').Palette} dark
 * @returns {import('../palettes/_schema.mjs').Palette}
 */
export function deriveLight(dark) {
  const signatureHue = toOklch(dark.ui.accent).h;
  const ink = toOklch(dark.ui.bg); // the character's shadow tone

  // structural signature: how far the chrome pulls away from the editor
  const separation = clamp(
    (toOklch(dark.ui.bg).L - toOklch(dark.ui.bgDeep).L) * 1.2,
    0.020, 0.055,
  );

  const bg = fromOklch({ L: 0.975, C: 0.013, h: signatureHue });
  const ui = {
    bg,
    bgDeep: fromOklch({ L: 0.975 - separation, C: 0.017, h: signatureHue }),
    bgAlt: fromOklch({ L: 0.975 - separation * 0.5, C: 0.015, h: signatureHue }),
    bgElevated: fromOklch({ L: 0.995, C: 0.006, h: signatureHue }),

    fg: fromOklch({ L: 0.30, C: Math.max(ink.C, 0.03), h: ink.h }),
    fgMuted: fromOklch({ L: 0.48, C: Math.max(ink.C, 0.025), h: ink.h }),
    fgSubtle: fromOklch({ L: 0.60, C: Math.max(ink.C, 0.02), h: ink.h }),
    border: fromOklch({ L: 0.87, C: 0.02, h: signatureHue }),

    accent: at(dark.ui.accent, 0.52),
    accentAlt: at(dark.ui.accentAlt, 0.55),
    selection: fromOklch({ L: 0.85, C: 0.065, h: signatureHue }),
    lineHighlight: fromOklch({ L: 0.955, C: 0.022, h: signatureHue }),
    cursor: at(dark.ui.cursor, 0.52),

    error: at(dark.ui.error, 0.50),
    warning: at(dark.ui.warning, 0.50),
    info: at(dark.ui.info, 0.50),
    success: at(dark.ui.success, 0.48),
    added: at(dark.ui.added, 0.48),
    modified: at(dark.ui.modified, 0.50),
    removed: at(dark.ui.removed, 0.50),
    ignored: at(dark.ui.ignored, 0.66),
  };

  const ansi = {};
  for (const [role, value] of Object.entries(dark.ansi)) {
    const bright = role.startsWith('bright');
    ansi[role] = at(value, ANSI_L[role] ?? (bright ? ANSI_L_BRIGHT : ANSI_L_NORMAL));
  }

  const syntax = {};
  for (const [role, value] of Object.entries(dark.syntax)) {
    syntax[role] = at(value, SYNTAX_L[role]);
  }
  syntax.variable = ui.fg;
  syntax.invalid = ui.error;

  const light = { ui, ansi, syntax };
  applyOverrides(light, dark.lightOverrides);

  // keep it readable even after overrides
  for (const role of Object.keys(light.syntax)) {
    light.syntax[role] = ensureContrast(light.syntax[role], light.ui.bg, MIN_SYNTAX);
  }
  light.ui.fgMuted = ensureContrast(light.ui.fgMuted, light.ui.bg, MIN_SECONDARY_TEXT);
  light.ui.fgSubtle = ensureContrast(light.ui.fgSubtle, light.ui.bg, MIN_TERTIARY_TEXT);
  for (const role of ['error', 'warning', 'info', 'success', 'accent', 'accentAlt']) {
    light.ui[role] = ensureContrast(light.ui[role], light.ui.bg, 4.5);
  }
  // button and badge text is `bgDeep` painted on `accent`
  light.ui.accent = ensureContrast(light.ui.accent, light.ui.bgDeep, 4.5);

  return definePalette({
    id: `${dark.id}-light`,
    label: `${dark.label} (Light)`,
    type: 'light',
    ...light,
  });
}

function applyOverrides(light, overrides) {
  if (!overrides) return;
  for (const [group, values] of Object.entries(overrides)) {
    if (!light[group]) throw new Error(`lightOverrides: unknown group \`${group}\``);
    Object.assign(light[group], values);
  }
}

export { contrast };
