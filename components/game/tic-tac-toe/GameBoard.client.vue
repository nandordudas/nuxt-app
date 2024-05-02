<script setup lang="ts">
const MINIMUM_STEP_COUNT = 5
const SYMBOLS = ['X', 'O'] as const

type FieldSymbol = typeof SYMBOLS[number]

const key = ref(Date.now())
const hasWinner = ref(false)
const stepCount = ref(0)
const currentSymbol = ref<FieldSymbol>('X')
const fields = ref<Field[]>()

const sortedFields = computed(() => fields.value?.toSorted(sortFieldsByPosition))

function reset() {
  key.value = Date.now()
  hasWinner.value = false
  stepCount.value = 0
  currentSymbol.value = 'X'

  fields.value = [
    { position: { x: 0, y: 0 }, value: null },
    { position: { x: 0, y: 1 }, value: null },
    { position: { x: 0, y: 2 }, value: null },
    { position: { x: 1, y: 0 }, value: null },
    { position: { x: 1, y: 1 }, value: null },
    { position: { x: 1, y: 2 }, value: null },
    { position: { x: 2, y: 0 }, value: null },
    { position: { x: 2, y: 1 }, value: null },
    { position: { x: 2, y: 2 }, value: null },
  ]
}

function incrementStepCount() {
  stepCount.value++
}

function switchCurrentUser() {
  currentSymbol.value = currentSymbol.value === 'X' ? 'O' : 'X'
}

function sortFieldsByPosition(next: Field, previous: Field) {
  return next.position.x - previous.position.x || next.position.y - previous.position.y
}

function onFieldSelect(field: Field) {
  if (hasWinner.value)
    return

  const selectedField = sortedFields.value?.find(createFindByField(field))

  if (!selectedField)
    return

  if (selectedField.value)
    return

  switchCurrentUser()
  incrementStepCount()

  selectedField.value = currentSymbol.value
}

function createFindByField(field: Field) {
  return (item: Field) => {
    return item.position.x === field.position.x && item.position.y === field.position.y
  }
}

function hasWinnerLine(fields: Field[], symbol: FieldSymbol) {
  const isWinningLine = (line: Field[]) => line.every(field => field.value === symbol)

  for (let i = 0; i < 3; ++i) {
    const row = fields.filter(field => field.position.y === i)
    const column = fields.filter(field => field.position.x === i)

    if (isWinningLine(row) || isWinningLine(column))
      return true
  }

  const diagonal = fields.filter(field => field.position.x === field.position.y)
  const diagonallyOpposite = fields.filter(field => field.position.x + field.position.y === 2)

  return isWinningLine(diagonal) || isWinningLine(diagonallyOpposite)
}

onMounted(reset)

watch(fields, (value) => {
  if (stepCount.value < MINIMUM_STEP_COUNT)
    return

  if (!value)
    return

  if (!hasWinnerLine(value, currentSymbol.value))
    return

  hasWinner.value = true
}, { deep: true })
</script>

<template>
  <div class="grid place-items-center h-[calc(100vh-48px)]">
    <GameTicTacToeGameBoardFieldWrapper v-if="fields?.length === 9" :key>
      <GameTicTacToeGameBoardField
        v-for="(field, n) in sortedFields"
        :key="n"
        :disabled="hasWinner"
        :field
        @select="onFieldSelect"
      />
    </GameTicTacToeGameBoardFieldWrapper>
    <div class="prose dark:prose-invert prose-slate">
      <div v-if="hasWinner">
        <p>{{ currentSymbol }} wins, the game is over</p>
        <UButton @click="reset">
          Reset the game
        </UButton>
      </div>
      <div v-else-if="stepCount === 9">
        <p>It's a draw, the game is over</p>
        <UButton @click="reset">
          Reset the game
        </UButton>
      </div>
      <div v-else>
        <p>{{ currentSymbol }}'s turn</p> <!-- TODO: wrong symbol shown -->
      </div>
    </div>
  </div>
</template>
