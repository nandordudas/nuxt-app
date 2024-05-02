<script setup lang="ts">
import CanvasWorker from '~/utils/workers/canvasWorker?worker'

type Payload =
  | { type: 'draw', value: Coordinate }
  | { type: 'ready' }

class OffscreenCanvasError extends Error {
  override message = 'Canvas cannot be transferred'
}

const logger = useLogger('GameBoard.vue')
const gui = useGUI()
const canvasWorker = new CanvasWorker()
const { data, post } = useWebWorker<Payload>(canvasWorker)

const canvas = ref<HTMLCanvasElement | null>(null)

// 🤮
const position = new Vector2D()
const settings = { radius: 2 }

gui
  .add(settings, 'radius', 2, 40, 2)
  .onChange((value: number) => post({ value, type: 'radius' }))

const folder = gui.addFolder('Position')

const xController = folder.add(position, 'x')
const yController = folder.add(position, 'y')

watch(data, (value) => {
  if (value.type !== 'draw')
    return

  xController.setValue(value.value?.x)
  yController.setValue(value.value?.y)
})

watch(canvas, (value) => {
  logger.info('transferring canvas to offscreen canvas')

  const offscreenCanvas = value?.transferControlToOffscreen()

  if (!offscreenCanvas)
    throw new OffscreenCanvasError('Canvas cannot be transferred')

  post({ value: offscreenCanvas, type: 'init' }, [offscreenCanvas])
}, { once: true })

onUnmounted(() => gui.destroy())
</script>

<template>
  <div class="grid place-items-center h-[calc(100vh-48px)]">
    <canvas ref="canvas" class="w-1/2 rounded-lg outline-1 outline-dashed" />

    <code inert>
      {{ data }}
    </code>
  </div>
</template>
