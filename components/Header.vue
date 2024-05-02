<script setup lang="ts">
import type { HorizontalNavigationLink } from '#ui/types'

const logger = useLogger('default.vue')

const left: HorizontalNavigationLink[] = [
  { label: 'Home', icon: 'i-heroicons-home', to: '/' },
  { label: 'Pong', icon: 'i-mdi-table-tennis', to: '/pong' },
  { label: 'Tic tac toe', icon: 'i-ph-game-controller', to: '/tic-tac-toe' },
]

const right: HorizontalNavigationLink[] = [
  { label: 'Sign out', icon: 'i-heroicons-user', click: () => logger.info('Sign out') },
]
</script>

<template>
  <header>
    <UHorizontalNavigation :links="[left, right]" />
  </header>
</template>
