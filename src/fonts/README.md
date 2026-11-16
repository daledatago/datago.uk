# Fonts

The site's typefaces are kept in this folder and loaded with `next/font/local`
(`src/app/layout.tsx` and `src/app/demos/layout.tsx`). The build reads them from
the repository and fetches nothing from Google or any other host.

Each file is the variable (weight axis) woff2 for the Latin subset, copied
unchanged from its Fontsource package on npm.

| File | Family | Source package | Version | Licence |
| --- | --- | --- | --- | --- |
| `archivo-latin-wght-normal.woff2` | Archivo | `@fontsource-variable/archivo` | 5.3.0 | SIL OFL 1.1, `LICENSE-archivo.txt` |
| `public-sans-latin-wght-normal.woff2` | Public Sans | `@fontsource-variable/public-sans` | 5.3.0 | SIL OFL 1.1, `LICENSE-public-sans.txt` |
| `source-code-pro-latin-wght-normal.woff2` | Source Code Pro | `@fontsource-variable/source-code-pro` | 5.3.1 | SIL OFL 1.1, `LICENSE-source-code-pro.txt` |
| `geist-latin-wght-normal.woff2` | Geist (demonstrations only) | `@fontsource-variable/geist` | 5.3.0 | SIL OFL 1.1, `LICENSE-geist.txt` |

To update a font, download the new package version (`npm pack <package>`), copy
`files/<name>-latin-wght-normal.woff2` and `LICENSE` here, and change the
version in the table.
