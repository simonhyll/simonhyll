<div align="center">

# starlight-glossary

A plugin for Starlight for creating glossaries

</div>

## Getting Started

Simply add the package then register it in Starlight.

```sh frame=none
pnpm add @simonhyll/starlight-glossary
```

```js
// astro.config.mjs
import starlightGlossary from '@simonhyll/starlight-glossary';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
        plugins: [starlightGlossary({})]
    })
})
```
