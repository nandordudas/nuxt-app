export const TAU = Math.PI * 2

const RAD_TO_DEG = 360 * (TAU ** -1)
const DEG_TO_RAD = TAU * (360 ** -1)

const ADD_FACTORS = {
  ADD: 1,
  SUBTRACT: -1,
} as const

const MULTIPLY_FACTORS = {
  MULTIPLY: 1,
  DIVIDE: -1,
} as const

const DIRECTIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const

type Add = keyof typeof ADD_FACTORS
type Multiply = keyof typeof MULTIPLY_FACTORS

export class Vector2D {
  #x = 0
  #y = 0

  static radianToDegrees(value: number) {
    return value * RAD_TO_DEG
  }

  static degreesToRadian(value: number) {
    return value * DEG_TO_RAD
  }

  get x() {
    return this.#x
  }

  set x(value) {
    this.#x = value
  }

  get y() {
    return this.#y
  }

  set y(value) {
    this.#y = value
  }

  get isZero() {
    return this.x === 0 && this.y === 0
  }

  get isOnAxis() {
    return this.isZero || this.x === 0 || this.y === 0
  }

  get magnitudeSquare() {
    if (this.isZero)
      return 0

    return this.x * this.x + this.y * this.y
  }

  get magnitude() {
    const { magnitudeSquare } = this

    if (magnitudeSquare === 0)
      return 0

    return Math.sqrt(magnitudeSquare)
  }

  get unit() {
    return this.divide(this.magnitude)
  }

  get normalize() {
    if (this.magnitude !== 0)
      return this.unit

    this.zero.x = 1

    return this
  }

  get zero() {
    this.x = 0
    this.y = 0

    return this
  }

  constructor(x = 0, y = 0) {
    this.#x = x
    this.#y = y
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
    }
  }

  toString(roundNumbers = false) {
    if (roundNumbers)
      return `${this.constructor.name}(${Math.round(this.x)}, ${Math.round(this.y)})`

    return `${this.constructor.name}(${this.x}, ${this.y})`
  }

  clone() {
    return new Vector2D(this.x, this.y)
  }

  isEqualTo(vector: Vector2D) {
    return vector.x === this.x && vector.y === this.y
  }

  add(vector: number | Vector2D) {
    return this.#useAddVectorWithFactor(vector, 'ADD')
  }

  subtract(vector: number | Vector2D) {
    return this.#useAddVectorWithFactor(vector, 'SUBTRACT')
  }

  multiply(vector: number | Vector2D) {
    return this.#useMultiplyByVectorWithVector(vector, 'MULTIPLY')
  }

  divide(vector: number | Vector2D) {
    return this.#useMultiplyByVectorWithVector(vector, 'DIVIDE')
  }

  rotate(radians: number) {
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)

    const { x, y } = this

    // x * cos - y * sin
    this.x = x * cos + y * sin * -1
    this.y = x * sin + y * cos

    return this
  }

  distanceX(vector: Vector2D) {
    // this.x - vector.x
    return this.x + vector.x * -1
  }

  distanceY(vector: Vector2D) {
    // this.y - vector.y
    return this.y + vector.y * -1
  }

  distanceSquare(vector: Vector2D) {
    const distanceX = this.distanceX(vector)
    const distanceY = this.distanceY(vector)

    return distanceX * distanceX + distanceY * distanceY
  }

  distance(vector: Vector2D) {
    return Math.sqrt(this.distanceSquare(vector))
  }

  invertX() {
    this.x *= -1

    return this
  }

  invertY() {
    this.y *= -1

    return this
  }

  invert() {
    return this.invertX().invertY()
  }

  dot(vector: Vector2D) {
    return this.x * vector.x + this.y * vector.y
  }

  cross(vector: Vector2D) {
    // this.x * vector.y - this.y * vector.x
    return this.x * vector.y + this.y * vector.x * -1
  }

  swap() {
    [this.x, this.y] = [this.y, this.x]

    return this
  }

  directionToAngle(vector: Vector2D) {
    return Math.atan2(vector.y, vector.x)
  }

  horizontalAngle(asRadian = true) {
    return this.#getAngleBy('HORIZONTAL', asRadian)
  }

  verticalAngle(asRadian = true) {
    return this.#getAngleBy('VERTICAL', asRadian)
  }

  #getAngleBy = (direction: keyof typeof DIRECTIONS, asRadian = true) => {
    const vector = this.clone()
    const isVertical = direction === 'VERTICAL'

    if (isVertical)
      vector.swap()

    const result = this.directionToAngle(vector)

    if (asRadian)
      return result

    return Vector2D.radianToDegrees(result)
  }

  #useMultiplyByVectorWithVector = (vector: number | Vector2D, type: Multiply) => {
    if (typeof vector === 'number')
      vector = new Vector2D(vector, vector)

    if (type === 'DIVIDE' && vector.isOnAxis)
      throw new TypeError('Cannot divide by zero vector')

    const factor = MULTIPLY_FACTORS[type]

    // -1 => this.x / vector.x; 1 => this.x * vector.x
    this.x *= vector.x ** factor
    this.y *= vector.y ** factor

    return this
  }

  #useAddVectorWithFactor(vector: number | Vector2D, type: Add) {
    if (typeof vector === 'number')
      vector = new Vector2D(vector, vector)

    const factor = ADD_FACTORS[type]

    // -1 => this.x - vector.x; 1 => this.x + vector.x
    this.x += vector.x * factor
    this.y += vector.y * factor

    return this
  }
}
