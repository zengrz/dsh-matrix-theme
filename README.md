# dsh-matrix-theme

The Matrix movie theme for the [dsh](https://github.com/deepseek-ai/deepseek-harness) web GUI as an installable plugin: the selectable `matrix` theme (green-on-black palette over the dark base), a digital-rain ambient backdrop (a faithful port of the [zengrz.github.io](https://github.com/zengrz/zengrz.github.io) glyph wall), and its General-settings toggle row. One package carries both roles: the `dsh.bundle` patch layer (`cordis.patch.yml` inserts the `ui-matrix-theme` browser roster row) and the `dsh.client` plugin itself (`lib/client.js`, prebuilt and committed — no build step runs at install time).

## Install

```sh
dsh plugin --profile <name> add github:zengrz/dsh-matrix-theme
```

Pin a commit so a later push cannot silently change what runs:

```sh
dsh plugin --profile <name> add github:zengrz/dsh-matrix-theme#<sha>
```

No build permission (`allowBuilds`) is needed: the published entry points are committed, and the package has no `prepare` script.

## Requirements and compatibility

- The profile must be a browser-surface composition whose client stack declares the `shell.backdrop` slot (ui-layout from the dsh release that introduced the ambient backdrop slot).
- The patch **appends and does not dedupe**: adding this plugin to a profile whose layers already register `ui-matrix-theme` — the stock `dsh-web-app` bundle ships the theme in-box from the same release — fails the load with `duplicate loader entry id: ui-matrix-theme`. Such profiles already have the theme; this plugin targets custom browser-surface rosters and web-app versions that predate the theme.
- The browser half resolves its platform peers (`react`, the `@deepseek-ai/dsh-client-*` module table) from the host profile's own client stack; this repository bundles only the theme's own code.

## Model Experience

None: the theme manages a browser-side preference and the backdrop is decorative (`aria-hidden`); nothing reaches a model request.

## Rebuilding the artifacts

`lib/` is committed. To regenerate it after editing `src/`, build inside a [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) checkout (the client bundle's loader-handoff id must match this package name). Create a machine-local `build.tsdown.config.ts` (gitignored):

```ts
import { clientBundle } from '<harness>/packages/client/tsdown.client.ts'
export default clientBundle('dsh-matrix-theme', ['src/index.ts'])
```

then run:

```sh
cd <this-repo>
ln -sfn <harness>/packages/client/ui-matrix-theme/node_modules node_modules
<harness>/node_modules/.bin/tsdown --config build.tsdown.config.ts
```

## License

[MIT](LICENSE), matching the dsh family. The theme engine is a port of the MIT-licensed [zengrz.github.io](https://github.com/zengrz/zengrz.github.io) effect.
