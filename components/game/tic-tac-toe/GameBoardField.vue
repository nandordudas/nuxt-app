<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  field: Field
}>()

const emit = defineEmits<{
  select: [value: Field]
}>()

const iconName = computed(() => props.field.value === 'O' ? 'i-mdi-circle-outline' : 'i-charm-cross')

function selectField() {
  emit('select', props.field)
}
</script>

<template>
  <UButton
    :ui="{ padding: 0 }"
    color="red"
    variant="outline"
    v-bind="$attrs"
    @click.once="selectField"
  >
    <UIcon v-if="props.field.value" :name="iconName" class="text-4xl" />
  </UButton>
</template>
