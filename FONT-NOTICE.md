# Bundled font

- File: `src/lib/styles/fonts/MinecraftRegular-Bmg3.otf`.
- Source: the existing bencica.hu project's `static/MinecraftRegular-Bmg3.otf` asset.
- CSS family: **Minecraft Regular**.
- Loaded only when importing `font.css` or the combined `styles.css`.

“Bencica Pixel” was an earlier local CSS alias for this same file; it was not a separate font and is no longer the exported family name.

The font's embedded metadata credits **Jacob Debono / JDGraphics Fonts**, includes a **2017** copyright notice, and states **“Free for Commercial Use.”** A separate license document was not supplied with the source asset. This repository preserves that asset and attribution; it does not claim authorship or assign a new font license. The package's `UNLICENSED` setting does not replace the font author's rights or terms.

To avoid importing the font, use `theme.css` and optionally `base.css`, then choose `data-bencica-font="system"` or supply your own `--font-family`. Component use does not require the bundled font.
