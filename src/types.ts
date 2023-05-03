export type DecimalPoints = { float: number }

export interface TemperatureInputMethod {
  celsius: () => TemperatureOutputMethod
  fahrenheit: () => TemperatureOutputMethod
}

export interface TemperatureOutputMethod {
  toFahrenheit: (d?: DecimalPoints) => number
  toCelsius: (d?: DecimalPoints) => number
}
export interface TimeInputMethod {
  seconds: () => TimeOutputMethod
  minutes: () => TimeOutputMethod
  hours: () => TimeOutputMethod
  days: () => TimeOutputMethod
  weeks: () => TimeOutputMethod
  years: () => TimeOutputMethod
}

export interface TimeOutputMethod {
  toSeconds: (d?: DecimalPoints) => number
  toMinutes: (d?: DecimalPoints) => number
  toHours: (d?: DecimalPoints) => number
  toDays: (d?: DecimalPoints) => number
  toWeeks: (d?: DecimalPoints) => number
  toYears: (d?: DecimalPoints) => number
}
export interface LengthInputMethod {
  millimeters: () => LengthOutputMethod
  centimeters: () => LengthOutputMethod
  meters: () => LengthOutputMethod
  kilometers: () => LengthOutputMethod
  inches: () => LengthOutputMethod
  feet: () => LengthOutputMethod
  yards: () => LengthOutputMethod
  miles: () => LengthOutputMethod
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
