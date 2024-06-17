<div align="center">

# starlight-enhanced

A plugin for Starlight to get that Simon feeling to it

</div>

## Getting Started

Simply add the package and register it in Starlight. It uses [multi sidebar](https://github.com/lorenzolewis/starlight-utils/tree/main) by [Lorenzo](https://github.com/lorenzolewis/) as a peer dependency, so make sure to add it as well..

```sh frame=none
pnpm add @simonhyll/starlight-enhanced @lorenzo_lewis/starlight-utils
```

```js
// astro.config.mjs
import starlightUtils from '@lorenzo_lewis/starlight-utils';
import starlightEnhanced from '@simonhyll/starlight-enhanced';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
        plugins: [starlightUtils({}), starlightEnhanced({})]
    })
})
```
