type EventType = 'init' | 'radius'

interface PayloadFactory<T extends EventType, V = 'You need to specify the type'> {
  type: T
  value: V
}

type InitPayload = PayloadFactory<'init', OffscreenCanvas>
type RadiusPayload = PayloadFactory<'radius', number>

type Payload = InitPayload | RadiusPayload

type EventMap = {
  [K in EventType]: (data: Extract<Payload, { type: K }>['value']) => void
}

let RADIUS = 2 // INFO: it will be changed back to constant in the future

const logger = useLogger('canvasWorker.ts')

let context: OffscreenCanvasRenderingContext2D | null = null
const dotPosition = new Vector2D(4, 4) // 2 * RADIUS
const dotVelocity = new Vector2D(2, 2)

const animate: FrameRequestCallback = () => {
  draw()
  move()
  requestAnimationFrame(animate)
}

addEventListener('message', onMessage)

const eventMap: EventMap = {
  init: (data) => {
    context = data.getContext('2d', { alpha: false })

    requestAnimationFrame(animate)
    postMessage({ type: 'ready' })
  },
  radius: (data) => {
    RADIUS = data
  },
}

function onMessage(event: MessageEvent<Payload>) {
  logger.info('onMessage', event.data)
  // @ts-expect-error Type 'Payload' is not assignable to type 'InitPayload | RadiusPayload'.
  eventMap[event.data.type]?.(event.data.value)
}

function draw() {
  clearCanvas()
  drawDot(dotPosition, RADIUS)
  postMessage({ type: 'draw', value: dotPosition.toJSON() })
}

function move() {
  moveDot()
  checkDotCollision()
}

function moveDot() {
  dotPosition.add(dotVelocity)
}

function checkDotCollision() {
  const context = getContext()

  const dot = new Vector2D(RADIUS, RADIUS)
  const bottomRightPosition = dotPosition.clone().add(dotVelocity).add(dot)
  const topLeftPosition = dotPosition.clone().add(dotVelocity).subtract(dot)

  if (bottomRightPosition.x > context.canvas.width || topLeftPosition.x < 0)
    dotVelocity.invertX()

  if (bottomRightPosition.y > context.canvas.height || topLeftPosition.y < 0)
    dotVelocity.invertY()
}

function drawDot(position: Coordinate, radius: number) {
  const context = getContext()

  context.beginPath()
  context.arc(position.x, position.y, radius, 0, TAU)

  context.fillStyle = 'white'

  context.fill()
}

function clearCanvas() {
  const context = getContext()

  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

function getContext() {
  if (!context)
    throw new Error('Canvas context is not initialized')

  return context
}
