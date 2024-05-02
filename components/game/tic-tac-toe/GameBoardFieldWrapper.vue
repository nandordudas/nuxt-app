<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="grid grid-cols-3 gap-4 bg-zinc-600 rounded-lg p-4">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
:slotted(button) {
  @apply w-16 aspect-square grid place-items-center;
}
</style>
