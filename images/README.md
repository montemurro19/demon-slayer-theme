# Assets

- `icon.png` — Marketplace icon, 128×128 PNG (referenced from `package.json` →
  `icon`). The current one is generated; replace it with final artwork.
- `gallery.png` / `gallery-light.png` — contact sheets of all 24 characters in
  each variant, used at the top of the README.
- `preview-<id>.png` — per-theme preview of the dark variants.

Everything except the icon and the two galleries is excluded from the `.vsix`
(see `.vscodeignore`); the previews serve the repository, not the install.

All of these are mockups rendered from the palettes themselves, not real
screenshots.
