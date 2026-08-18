/**
 * Palette registry — this order is the order in `contributes.themes`.
 *
 * To add a character:
 *   1. create `src/palettes/<id>.mjs` exporting `definePalette({...})`
 *   2. import it and add it to the array below
 *   3. run `npm run build` (writes the JSON and syncs `contributes.themes`)
 *
 * Each palette here produces two themes: the dark one written by hand and the
 * light one derived from it in `src/build/light.mjs`.
 */

// Protagonists
import tanjiro from './tanjiro.mjs';
import nezuko from './nezuko.mjs';
import zenitsu from './zenitsu.mjs';
import inosuke from './inosuke.mjs';

// Hashira
import giyu from './giyu.mjs';
import shinobu from './shinobu.mjs';
import rengoku from './rengoku.mjs';
import tengen from './tengen.mjs';
import mitsuri from './mitsuri.mjs';
import muichiro from './muichiro.mjs';
import obanai from './obanai.mjs';
import sanemi from './sanemi.mjs';
import gyomei from './gyomei.mjs';

// Demons
import muzan from './muzan.mjs';
import kokushibo from './kokushibo.mjs';
import doma from './doma.mjs';
import akaza from './akaza.mjs';
import hantengu from './hantengu.mjs';
import gyokko from './gyokko.mjs';
import gyutaro from './gyutaro.mjs';
import daki from './daki.mjs';
import enmu from './enmu.mjs';
import rui from './rui.mjs';
import tamayo from './tamayo.mjs';

/** @type {import('./_schema.mjs').Palette[]} */
export const palettes = [
  tanjiro,
  nezuko,
  zenitsu,
  inosuke,

  giyu,
  shinobu,
  rengoku,
  tengen,
  mitsuri,
  muichiro,
  obanai,
  sanemi,
  gyomei,

  muzan,
  kokushibo,
  doma,
  akaza,
  hantengu,
  gyokko,
  gyutaro,
  daki,
  enmu,
  rui,
  tamayo,
];

export default palettes;
