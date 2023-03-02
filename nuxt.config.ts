import { PluginOption } from "vite";
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  ssr: false,
  srcDir: "src",
  telemetry: false,
  css: ["~/assets/scss/main.scss", "@mdi/font/css/materialdesignicons.min.css"],
  appConfig: {
    analyze: true,
  },
  app: {
    head: {
      title: "Simon Hyll",
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      meta: [{ name: "description", content: "My amazing site." }],
    },
  },
  modules: [
    [
      "@kevinmarrec/nuxt-pwa",
      {
        pwa: { enabled: true },
        // workbox: { enabled: true },
        manifest: {
          enabled: true,
          name: "Pacifist Editor",
          short_name: "pa-editor",
          lang: "en",
        },
        icon: {
          enabled: true,
          fileName: "icon.png",
        },
      },
    ],
    [
      "@nuxtjs/i18n-edge",
      {
        lazy: true,
        langDir: "lang",
        defaultLocale: "en",
        locales: [
          {
            code: "en",
            file: "en-US.yaml",
          },
          {
            code: "sv",
            file: "sv-SE.yaml",
          },
        ],
      },
    ],
  ],
  hooks: {
    "vite:extendConfig": async (config: any) => {
      config.plugins?.push(
        ...vuetify({
          styles: { configFile: "assets/scss/vuetify/variables.scss" },
        })
      );
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    build: {
      target: "es2022",
    },
    server: {
      strictPort: true,
      hmr: {
        protocol: "ws",
        host: "192.168.50.222",
        port: 5183,
      },
    },
  },
});
