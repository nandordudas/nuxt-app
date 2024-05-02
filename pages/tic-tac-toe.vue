<script setup lang="ts">
useHead({
  title: 'Tic tac toe',
})
</script>

<template>
  <section class="p-4">
    <article class="prose dark:prose-invert prose-slate">
      <h1>
        Tic tac toe
      </h1>
    </article>
    <NuxtErrorBoundary>
      <template #error="{ error }">
        <p>An error occurred: {{ error }}</p>
      </template>

      <GameTicTacToeGameBoard />
    </NuxtErrorBoundary>
  </section>
</template>
