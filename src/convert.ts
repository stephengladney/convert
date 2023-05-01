import type {
  DecimalPoints,
  LenghInputMethod,
  TimeInputMethod,
  TemperatureInputMethod,
  LengthOutputMethod,
  TimeOutputMethod,
  TemperatureOutputMethod,
  StringOutputMethod,
} from "./types"

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

export function convertLength(input: number): LenghInputMethod {
  let inMillimeters: number

  const lengthOutputMethods: LengthOutputMethod = {
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

  return {
    millimeters: () => {
      inMillimeters = input
      return lengthOutputMethods
    },
    centimeters: () => {
      inMillimeters = input * 10
      return lengthOutputMethods
    },
    meters: () => {
      inMillimeters = input * 1000
      return lengthOutputMethods
    },
    kilometers: () => {
      inMillimeters = input * 1000000
      return lengthOutputMethods
    },
    inches: () => {
      inMillimeters = input * 25.4
      return lengthOutputMethods
    },
    feet: () => {
      inMillimeters = input * 25.4 * 12
      return lengthOutputMethods
    },
    yards: () => {
      inMillimeters = input * 25.4 * 12 * 3
      return lengthOutputMethods
    },
    miles: () => {
      inMillimeters = input * 25.4 * 12 * 5280
      return lengthOutputMethods
    },
  }
}

export function convertTime(input: number): TimeInputMethod {
  let nInSeconds: number
  const timeOutputMethods: TimeOutputMethod = {
    toSeconds: () => nInSeconds,
    toMinutes: (d?: DecimalPoints) => convertToFloat(nInSeconds / 60, d),
    toHours: (d?: DecimalPoints) => convertToFloat(nInSeconds / 3600, d),
    toDays: (d?: DecimalPoints) => convertToFloat(nInSeconds / (3600 * 24), d),
    toWeeks: (d?: DecimalPoints) =>
      convertToFloat(nInSeconds / (3600 * 24 * 7), d),
    toYears: (d?: DecimalPoints) =>
      convertToFloat(nInSeconds / (3600 * 24 * 364), d),
  }
  return {
    seconds: () => {
      nInSeconds = input
      return timeOutputMethods
    },
    minutes: () => {
      nInSeconds = input * 60
      return timeOutputMethods
    },
    hours: () => {
      nInSeconds = input * 3600
      return timeOutputMethods
    },
    days: () => {
      nInSeconds = input * 3600 * 24
      return timeOutputMethods
    },
    weeks: () => {
      nInSeconds = input * 3600 * 24 * 7
      return timeOutputMethods
    },
    years: () => {
      nInSeconds = input * 3600 * 24 * 365
      return timeOutputMethods
    },
  }
}

export function convertTemperature(input: number): TemperatureInputMethod {
  return {
    celsius: () => {
      return {
        toCelsius: (d?: DecimalPoints) => input,
        toFahrenheit: (d?: DecimalPoints) =>
          convertToFloat((input / 5) * 9 + 32, d),
      }
    },
    fahrenheit: () => {
      return {
        toCelsius: (d?: DecimalPoints) =>
          convertToFloat(((input - 32) * 5) / 9, d),
        toFahrenheit: (d?: DecimalPoints) => input,
      }
    },
  }
}

function convertToFloat(val: number, d?: DecimalPoints) {
  return d ? Number(val.toFixed(d.float)) : val
}
