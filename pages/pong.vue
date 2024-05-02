<script setup lang="ts">
useHead({
  title: 'Pong',
})
</script>

<template>
  <section class="p-4">
    <article class="prose dark:prose-invert prose-slate">
      <h1>
        Pong
      </h1>
    </article>
    <NuxtErrorBoundary>
      <template #error="{ error }">
        <p>An error occurred: {{ error }}</p>
      </template>

      <GamePongGameBoard />
    </NuxtErrorBoundary>
  </section>
</template>
