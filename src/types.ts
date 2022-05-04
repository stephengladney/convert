export type DecimalPoints = { float: number }

export interface InputMethod {
  seconds?: () => OutputMethod
  minutes?: () => OutputMethod
  hours?: () => OutputMethod
  days?: () => OutputMethod
  weeks?: () => OutputMethod
  years?: () => OutputMethod
  millimeters?: () => OutputMethod
  centimeters?: () => OutputMethod
  meters?: () => OutputMethod
  kilometers?: () => OutputMethod
  inches?: () => OutputMethod
  feet?: () => OutputMethod
  yards?: () => OutputMethod
  miles?: () => OutputMethod
  celsius?: () => OutputMethod
  fahrenheit?: () => OutputMethod
  string?: () => OutputMethod
}

export interface OutputMethod {
  toCentimeters?: (d?: DecimalPoints) => void
  toFeet?: (d?: DecimalPoints) => void
  toInches?: (d?: DecimalPoints) => void
  toKilometers?: (d?: DecimalPoints) => void
  toMeters?: (d?: DecimalPoints) => void
  toMiles?: (d?: DecimalPoints) => void
  toMillimeters?: (d?: DecimalPoints) => void
  toYards?: (d?: DecimalPoints) => void
  toSeconds?: (d?: DecimalPoints) => void
  toMinutes?: (d?: DecimalPoints) => void
  toHours?: (d?: DecimalPoints) => void
  toDays?: (d?: DecimalPoints) => void
  toWeeks?: (d?: DecimalPoints) => void
  toYears?: (d?: DecimalPoints) => void
  toFahrenheit?: (d?: DecimalPoints) => void
  toCelsius?: (d?: DecimalPoints) => void
  toCamelCase?: (d?: DecimalPoints) => void
  toConstCase?: (d?: DecimalPoints) => void
  toKabobCase?: (d?: DecimalPoints) => void
  toPascalCase?: (d?: DecimalPoints) => void
  toSnakeCase?: (d?: DecimalPoints) => void
  toString?: (d?: DecimalPoints) => void
}
