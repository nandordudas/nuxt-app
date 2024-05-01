import { name, version } from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  runtimeConfig: {
    public: {
      appName: name,
      appVersion: version,
    },
  },
  typescript: {
    strict: false,
  },
})
