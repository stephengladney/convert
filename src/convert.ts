import type {
  DecimalPoints,
  LenghInputMethod,
  TimeInputMethod,
  TimeOutputConstructor,
  LengthOutputConstructor,
  StringOutputMethod,
  TemperatureInputMethod,
  TemperatureOutputMethodC,
  TemperatureOutputMethodF,
} from "./types"

function convertToFloat(val: number, d?: DecimalPoints) {
  return d ? Number(val.toFixed(d.float)) : val
}

const averageDaysInMonth = 30.4

export function convert(input: string): StringOutputMethod
export function convert(
  input: number
): LenghInputMethod & TimeInputMethod & TemperatureInputMethod
export function convert(input: string | number) {
  if (typeof input === "string") return convertString(input)
  else if (typeof input === "number") {
    return {
      ...getLengthInput,
      ...getTimeInput,
      celsius: {
        toFahrenheit: (d?: DecimalPoints) =>
          convertToFloat((input / 5) * 9 + 32, d),
      } as TemperatureOutputMethodC,
      fahrenheit: {
        toCelsius: (d?: DecimalPoints) =>
          convertToFloat(((input - 32) * 5) / 9, d),
      } as TemperatureOutputMethodF,
    }
  }
}

export function convertString(input: string): StringOutputMethod {
  let wordArray: string[] = []
  if (input.includes("_")) wordArray = input.split("_")
  else if (input.includes("-")) wordArray = input.split("-")
  else if (input.includes(" ")) wordArray = input.split(" ")
  else {
    const isLowerCase = input[0] === input[0].toLowerCase()
    const wordStartIndexes = isLowerCase ? [0] : []
    input
      .split("")
      .forEach((letter: string, i: number) =>
        letter === letter.toUpperCase() ? wordStartIndexes.push(i) : null
      )
    wordStartIndexes.forEach((index, i) => {
      const endOfWord = wordStartIndexes[i + 1]
      wordArray.push(input.substring(index, endOfWord).toLowerCase())
    })
  }

  const stringOutputMethods: StringOutputMethod = {
    toConstCase: () => wordArray.join("_").toUpperCase(),
    toKabobCase: () => wordArray.join("-").toLowerCase(),
    toSnakeCase: () => wordArray.join("_").toLowerCase(),
    toPascalCase: () =>
      wordArray
        .map(
          (word, i) =>
            word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
        )
        .join(""),
    toCamelCase: () =>
      wordArray
        .map((word, i) => {
          return i === 0
            ? word.toLowerCase()
            : word.substring(0, 1).toUpperCase() +
                word.substring(1).toLowerCase()
        })
        .join(""),
    toString: () => wordArray.join(" ").toLowerCase(),
  }
  return stringOutputMethods
}

function getLengthInput(inMillimeters: number) {
  return {
    toCentimeters: (d?: DecimalPoints) => convertToFloat(inMillimeters / 10, d),
    toFeet: (d?: DecimalPoints) =>
      convertToFloat(inMillimeters / (25.4 * 12), d),
    toInches: (d?: DecimalPoints) => convertToFloat(inMillimeters / 25.4, d),
    toKilometers: (d?: DecimalPoints) =>
      convertToFloat(inMillimeters / 1000000, d),
    toMeters: (d?: DecimalPoints) => convertToFloat(inMillimeters / 1000, d),
    toMiles: (d?: DecimalPoints) =>
      convertToFloat(inMillimeters / (25.4 * 12 * 5280), d),
    toMillimeters: (d?: DecimalPoints) => convertToFloat(inMillimeters, d),
    toYards: (d?: DecimalPoints) =>
      convertToFloat(inMillimeters / (25.4 * 12 * 3), d),
  }
}

export function convertLength(input: number): LenghInputMethod {
  const getLengthOutputMethods: LengthOutputConstructor = (
    inMillimeters: number
  ) => getLengthInput(inMillimeters)

  return {
    millimeters: getLengthOutputMethods(input),
    centimeters: getLengthOutputMethods(input * 10),
    meters: getLengthOutputMethods(input * 1000),
    kilometers: getLengthOutputMethods(input * 1000000),
    inches: getLengthOutputMethods(input * 25.4),
    feet: getLengthOutputMethods(input * 25.4 * 12),
    yards: getLengthOutputMethods(input * 25.4 * 12 * 3),
    miles: getLengthOutputMethods(input * 25.4 * 12 * 5280),
  }
}

function getTimeInput(input: number) {
  return {
    toSeconds: () => input,
    toMinutes: (d?: DecimalPoints) => convertToFloat(input / 60, d),
    toHours: (d?: DecimalPoints) => convertToFloat(input / 3600, d),
    toDays: (d?: DecimalPoints) => convertToFloat(input / (3600 * 24), d),
    toWeeks: (d?: DecimalPoints) => convertToFloat(input / (3600 * 24 * 7), d),
    toMonths: (d?: DecimalPoints) =>
      convertToFloat(input / (3600 * 24 * 7 * averageDaysInMonth), d),
    toYears: (d?: DecimalPoints) =>
      convertToFloat(input / (3600 * 24 * 364), d),
  }
}

export function convertTime(input: number): TimeInputMethod {
  const getTimeOutputMethods: TimeOutputConstructor = (input: number) =>
    getTimeInput(input)

  const averageDaysInMonth = 30.4

  return {
    seconds: getTimeOutputMethods(input),
    minutes: getTimeOutputMethods(input * 60),
    hours: getTimeOutputMethods(input * 3600),
    days: getTimeOutputMethods(input * 3600 * 24),
    weeks: getTimeOutputMethods(input * 3600 * 24 * 7),
    months: getTimeOutputMethods(
      Math.floor(input * 3600 * 24 * averageDaysInMonth)
    ),
    years: getTimeOutputMethods(input * 3600 * 24 * 365),
  }
}

export function convertTemperature(input: number) {
  return {
    celsius: {
      toFahrenheit: (d?: DecimalPoints) =>
        convertToFloat((input / 5) * 9 + 32, d),
    } as TemperatureOutputMethodC,
    fahrenheit: {
      toCelsius: (d?: DecimalPoints) =>
        convertToFloat(((input - 32) * 5) / 9, d),
    } as TemperatureOutputMethodF,
  }
}
