<script setup lang="ts">
const logger = useLogger('app.vue')

logger.start('application is starting...')

const { appName, appVersion } = useRuntimeConfig().public
const isDev = import.meta.dev

useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: isDev ? '/favicon-dev.svg' : '/favicon.svg' }],
  titleTemplate: title => isDev ? `${title} · ${appName}@${appVersion}` : `${title} · Nuxt 3`,
})

onMounted(() => {
  logger.ready('application is ready')
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
