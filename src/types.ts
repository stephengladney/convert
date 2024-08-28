export type DecimalPoints = { float: number }

export type LengthOutputConstructor = (
  inMillimeters: number
) => LengthOutputMethod
export type TimeOutputConstructor = (inMillimeters: number) => TimeOutputMethod

export interface TemperatureInputMethod {
  celsius: TemperatureOutputMethodC
  fahrenheit: TemperatureOutputMethodF
}

export interface TemperatureOutputMethodF {
  toCelsius: (d?: DecimalPoints) => number
}

export interface TemperatureOutputMethodC {
  toFahrenheit: (d?: DecimalPoints) => number
}
export interface TimeInputMethod {
  seconds: TimeOutputMethod
  minutes: TimeOutputMethod
  hours: TimeOutputMethod
  days: TimeOutputMethod
  weeks: TimeOutputMethod
  months: TimeOutputMethod
  years: TimeOutputMethod
}

export interface TimeOutputMethod {
  toSeconds: (d?: DecimalPoints) => number
  toMinutes: (d?: DecimalPoints) => number
  toHours: (d?: DecimalPoints) => number
  toDays: (d?: DecimalPoints) => number
  toWeeks: (d?: DecimalPoints) => number
  toMonths: (d?: DecimalPoints) => number
  toYears: (d?: DecimalPoints) => number
}
export interface LenghInputMethod {
  millimeters: LengthOutputMethod
  centimeters: LengthOutputMethod
  meters: LengthOutputMethod
  kilometers: LengthOutputMethod
  inches: LengthOutputMethod
  feet: LengthOutputMethod
  yards: LengthOutputMethod
  miles: LengthOutputMethod
}

export interface LengthOutputMethod {
  toCentimeters: (d?: DecimalPoints) => number
  toFeet: (d?: DecimalPoints) => number
  toInches: (d?: DecimalPoints) => number
  toKilometers: (d?: DecimalPoints) => number
  toMeters: (d?: DecimalPoints) => number
  toMiles: (d?: DecimalPoints) => number
  toMillimeters: (d?: DecimalPoints) => number
  toYards: (d?: DecimalPoints) => number
}
export interface StringOutputMethod {
  toCamelCase: () => string
  toConstCase: () => string
  toKabobCase: () => string
  toPascalCase: () => string
  toSnakeCase: () => string
  toString: () => string
}
