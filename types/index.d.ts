declare global {
  interface Coordinate {
    x: number
    y: number
  }

  interface Field<T extends string = string> {
    position: Coordinate
    value: T | null
  }

  type Prettify<T> = {
    [K in keyof T]: T[K]
  } & unknown
}

export {}
