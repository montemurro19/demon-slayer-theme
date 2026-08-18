/**
 * Palette contract.
 *
 * Every palette is a flat object of hex colors (`#rrggbb`, no alpha).
 * The generator (`src/build/theme.mjs`) decides where each color lands and
 * where transparency is applied — palettes never carry `#rrggbbaa`.
 *
 * @typedef {`#${string}`} Hex
 *
 * @typedef {Object} PaletteUI
 * @property {Hex} bg            Editor background
 * @property {Hex} bgDeep        Deepest background (sidebar, activity bar)
 * @property {Hex} bgAlt         Alternate background (panels, inactive tabs)
 * @property {Hex} bgElevated    Raised background (widgets, dropdowns, hover)
 * @property {Hex} fg            Primary text
 * @property {Hex} fgMuted       Secondary text
 * @property {Hex} fgSubtle      Tertiary / disabled text
 * @property {Hex} border        Borders and separators
 * @property {Hex} accent        Brand color (badges, buttons, focus)
 * @property {Hex} accentAlt     Secondary brand color
 * @property {Hex} selection     Text selection
 * @property {Hex} lineHighlight Current line
 * @property {Hex} cursor        Caret
 * @property {Hex} error
 * @property {Hex} warning
 * @property {Hex} info
 * @property {Hex} success
 * @property {Hex} added         Git: added
 * @property {Hex} modified      Git: modified
 * @property {Hex} removed       Git: deleted
 * @property {Hex} ignored       Git: ignored
 *
 * @typedef {Object} PaletteAnsi
 * @property {Hex} black
 * @property {Hex} red
 * @property {Hex} green
 * @property {Hex} yellow
 * @property {Hex} blue
 * @property {Hex} magenta
 * @property {Hex} cyan
 * @property {Hex} white
 * @property {Hex} brightBlack
 * @property {Hex} brightRed
 * @property {Hex} brightGreen
 * @property {Hex} brightYellow
 * @property {Hex} brightBlue
 * @property {Hex} brightMagenta
 * @property {Hex} brightCyan
 * @property {Hex} brightWhite
 *
 * @typedef {Object} PaletteSyntax
 * @property {Hex} comment
 * @property {Hex} keyword       if/for/return, logical operators
 * @property {Hex} storage       class/function/const/let, modifiers
 * @property {Hex} string
 * @property {Hex} stringEscape  \n, ${} in template strings
 * @property {Hex} number
 * @property {Hex} constant      true/false/null, CONSTANTS
 * @property {Hex} function      function declarations and calls
 * @property {Hex} variable
 * @property {Hex} parameter
 * @property {Hex} property      object key, member access
 * @property {Hex} class         classes, enums
 * @property {Hex} type          types, interfaces
 * @property {Hex} operator
 * @property {Hex} punctuation   {} [] () , ;
 * @property {Hex} tag           <div>, HTML/JSX tags
 * @property {Hex} attribute     HTML/JSX attributes, CSS selectors
 * @property {Hex} regexp
 * @property {Hex} decorator     @decorator, annotations
 * @property {Hex} invalid
 *
 * @typedef {Object} Palette
 * @property {string} id         slug: becomes `themes/<id>-color-theme.json`
 * @property {string} label      name shown in the VS Code theme picker
 * @property {'dark'|'light'} type
 * @property {PaletteUI} ui
 * @property {PaletteAnsi} ansi
 * @property {PaletteSyntax} syntax
 * @property {{ui?: Partial<PaletteUI>, ansi?: Partial<PaletteAnsi>, syntax?: Partial<PaletteSyntax>}} [lightOverrides]
 *   Spot fixes for the derived light variant (see `src/build/light.mjs`).
 *   Only the keys you set are replaced; everything else stays derived.
 */

const REQUIRED = {
  ui: [
    'bg', 'bgDeep', 'bgAlt', 'bgElevated',
    'fg', 'fgMuted', 'fgSubtle',
    'border', 'accent', 'accentAlt',
    'selection', 'lineHighlight', 'cursor',
    'error', 'warning', 'info', 'success',
    'added', 'modified', 'removed', 'ignored',
  ],
  ansi: [
    'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white',
    'brightBlack', 'brightRed', 'brightGreen', 'brightYellow',
    'brightBlue', 'brightMagenta', 'brightCyan', 'brightWhite',
  ],
  syntax: [
    'comment', 'keyword', 'storage', 'string', 'stringEscape', 'number',
    'constant', 'function', 'variable', 'parameter', 'property', 'class',
    'type', 'operator', 'punctuation', 'tag', 'attribute', 'regexp',
    'decorator', 'invalid',
  ],
};

const HEX = /^#[0-9a-fA-F]{6}$/;

/**
 * Validates the palette and returns it. Fails early, with a useful message.
 * @param {Palette} palette
 * @returns {Palette}
 */
export function definePalette(palette) {
  const errors = [];

  if (!palette.id || !/^[a-z0-9-]+$/.test(palette.id)) {
    errors.push('`id` must be a kebab-case slug');
  }
  if (!palette.label) errors.push('`label` is required');
  if (palette.type !== 'dark' && palette.type !== 'light') {
    errors.push("`type` must be 'dark' or 'light'");
  }

  for (const [group, keys] of Object.entries(REQUIRED)) {
    const bag = palette[group];
    if (!bag) {
      errors.push(`group \`${group}\` is missing`);
      continue;
    }
    for (const key of keys) {
      const value = bag[key];
      if (value === undefined) errors.push(`${group}.${key} is missing`);
      else if (!HEX.test(value)) {
        errors.push(`${group}.${key} = ${JSON.stringify(value)} is not #rrggbb hex`);
      }
    }
    for (const key of Object.keys(bag)) {
      if (!keys.includes(key)) errors.push(`${group}.${key} is not part of the contract`);
    }
  }

  if (errors.length) {
    throw new Error(
      `Invalid palette "${palette.id ?? '?'}":\n  - ${errors.join('\n  - ')}`,
    );
  }
  return palette;
}
