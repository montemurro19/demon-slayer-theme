# Changelog

Based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioned
with [SemVer](https://semver.org/).

## [0.1.0] — unreleased

### Added
- Protagonists: **Tanjiro Kamado**, **Nezuko Kamado**, **Zenitsu Agatsuma** and
  **Inosuke Hashibira**.
- Hashira: **Giyu Tomioka**, **Shinobu Kocho**, **Kyojuro Rengoku**,
  **Tengen Uzui**, **Mitsuri Kanroji**, **Muichiro Tokito**, **Obanai Iguro**,
  **Sanemi Shinazugawa** and **Gyomei Himejima**.
- Demons: **Muzan Kibutsuji**, the six Upper Ranks (**Kokushibo**, **Doma**,
  **Akaza**, **Hantengu**, **Gyokko**, **Gyutaro** and **Daki**), two Lower
  Ranks (**Enmu** and **Rui**) and **Tamayo**.
- A **light variant of all 24**, derived from the dark palettes in OKLCH: every
  role keeps its hue and only lightness is remapped. The background takes the
  character's accent hue; the text takes the hue of their dark background. Spot
  fixes go in `lightOverrides` on the dark palette.
- Theme generator driven by palettes: each character is described by 57 colors
  and expanded into ~300 keys per variant.
- `npm run check` in CI, so generated themes can't drift from their palettes.

### Notes
- Each theme starts from the character's whole palette — background, accents and
  syntax — and the interface structure follows: Tanjiro has the widest gap
  between surfaces (the checkered haori), Inosuke and Muichiro almost none.
- Every syntax color clears WCAG AA (≥ 4.5:1) against its editor background in
  all 48 variants. In the light ones that is guaranteed by the derivation, which
  darkens each color until it meets the target.
- Per-theme previews stay out of the `.vsix`; only the icon and the two
  galleries ship.
