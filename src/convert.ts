import type {
  DecimalPoints,
  LengthInputMethod,
  TimeInputMethod,
  TemperatureInputMethod,
  LengthOutputMethod,
  TimeOutputMethod,
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

export function convertLength(input: number): LengthInputMethod {
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

type ReturnType<T> = T extends string
  ? StringOutputMethod
  : TimeInputMethod & LengthInputMethod & TemperatureInputMethod

export function convert<T extends number | string>(input: T): ReturnType<T> {
  if (typeof input === "string") {
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

    const stringOutputMethods = {
      toConstCase: () => wordArray.join("_").toUpperCase(),
      toKabobCase: () => wordArray.join("-").toLowerCase(),
      toSnakeCase: () => wordArray.join("_").toLowerCase(),
      toPascalCase: () =>
        wordArray
          .map(
            (word, i) =>
              word.substring(0, 1).toUpperCase() +
              word.substring(1).toLowerCase()
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
    } as ReturnType<T>
    return stringOutputMethods
  } else {
    let nInSeconds: number
    let inMillimeters: number

    const timeOutputMethods: TimeOutputMethod = {
      toSeconds: () => nInSeconds,
      toMinutes: (d?: DecimalPoints) => convertToFloat(nInSeconds / 60, d),
      toHours: (d?: DecimalPoints) => convertToFloat(nInSeconds / 3600, d),
      toDays: (d?: DecimalPoints) =>
        convertToFloat(nInSeconds / (3600 * 24), d),
      toWeeks: (d?: DecimalPoints) =>
        convertToFloat(nInSeconds / (3600 * 24 * 7), d),
      toYears: (d?: DecimalPoints) =>
        convertToFloat(nInSeconds / (3600 * 24 * 364), d),
    }

    const lengthOutputMethods: LengthOutputMethod = {
      toCentimeters: (d?: DecimalPoints) =>
        convertToFloat(inMillimeters / 10, d),
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
      seconds: () => {
        nInSeconds = input
        return timeOutputMethods
      },
      minutes: () => {
        nInSeconds = (input as number) * 60
        return timeOutputMethods
      },
      hours: () => {
        nInSeconds = (input as number) * 3600
        return timeOutputMethods
      },
      days: () => {
        nInSeconds = (input as number) * 3600 * 24
        return timeOutputMethods
      },
      weeks: () => {
        nInSeconds = (input as number) * 3600 * 24 * 7
        return timeOutputMethods
      },
      years: () => {
        nInSeconds = (input as number) * 3600 * 24 * 365
        return timeOutputMethods
      },
      celsius: () => {
        return {
          toCelsius: (d?: DecimalPoints) => input,
          toFahrenheit: (d?: DecimalPoints) =>
            convertToFloat(((input as number) / 5) * 9 + 32, d),
        }
      },
      fahrenheit: () => {
        return {
          toCelsius: (d?: DecimalPoints) =>
            convertToFloat((((input as number) - 32) * 5) / 9, d),
          toFahrenheit: (d?: DecimalPoints) => input,
        }
      },
      millimeters: () => {
        inMillimeters = input
        return lengthOutputMethods
      },
      centimeters: () => {
        inMillimeters = (input as number) * 10
        return lengthOutputMethods
      },
      meters: () => {
        inMillimeters = (input as number) * 1000
        return lengthOutputMethods
      },
      kilometers: () => {
        inMillimeters = (input as number) * 1000000
        return lengthOutputMethods
      },
      inches: () => {
        inMillimeters = (input as number) * 25.4
        return lengthOutputMethods
      },
      feet: () => {
        inMillimeters = (input as number) * 25.4 * 12
        return lengthOutputMethods
      },
      yards: () => {
        inMillimeters = (input as number) * 25.4 * 12 * 3
        return lengthOutputMethods
      },
      miles: () => {
        inMillimeters = (input as number) * 25.4 * 12 * 5280
        return lengthOutputMethods
      },
    } as unknown as ReturnType<T>
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
