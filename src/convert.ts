export function convertTemperature(temp: number) {
  const celsiusToFahrenheit = () => (temp / 5) * 9 + 32
  const fahrenheitToCelsius = () => ((temp - 32) * 5) / 9
  return {
    celsiusToFahrenheit,
    fahrenheitToCelsius
  }
}

export function convertLength(n: number, decimals?: number) {
  let inMillimeters: number
  const outputMethods = {
    toCentimeters: () => inMillimeters / 10,
    toFeet: () => inMillimeters / (25.4 * 12),
    toInches: () => inMillimeters / 25.4,
    toKilometers: () => inMillimeters / 1000000,
    toMeters: () => inMillimeters / 1000,
    toMiles: () => inMillimeters / (25.4 * 12 * 5280),
    toMillimeters: () => inMillimeters,
    toYards: () => inMillimeters / (25.4 * 12 * 3)
  }
  const inputMethods = {
    millimeters: () => {
      inMillimeters = n
      return outputMethods
    },
    centimeters: () => {
      inMillimeters = n * 10
      return outputMethods
    },
    meters: () => {
      inMillimeters = n * 1000
      return outputMethods
    },
    kilometers: () => {
      inMillimeters = n * 1000000
      return outputMethods
    },
    inches: () => {
      inMillimeters = n * 25.4
      return outputMethods
    },
    feet: () => {
      inMillimeters = n * 25.4 * 12
      return outputMethods
    },
    yards: () => {
      inMillimeters = n * 25.4 * 12 * 3
      return outputMethods
    },
    miles: () => {
      inMillimeters = n * 25.4 * 12 * 5280
      return outputMethods
    }
  }
  return inputMethods
}

/**```typescript
 *convertCase("helloWorld").toPascal() // "HelloWorld"
 * ```
 */
export function convertCase(str: string) {
  let wordArray = []
  if (str.includes("_")) wordArray = str.split("_")
  else if (str.includes("-")) wordArray = str.split("-")
  else if (str.includes(" ")) wordArray = str.split(" ")
  else {
    const isLowerCase = str[0] === str[0].toLowerCase()
    const wordStartIndexes = isLowerCase ? [0] : []
    str
      .split("")
      .forEach((letter, i) =>
        letter === letter.toUpperCase() ? wordStartIndexes.push(i) : null
      )
    wordStartIndexes.forEach((index, i) => {
      const endOfWord = wordStartIndexes[i + 1]
      wordArray.push(str.substring(index, endOfWord).toLowerCase())
    })
  }
  return {
    toConst: () => wordArray.join("_").toUpperCase(),
    toKabob: () => wordArray.join("-").toLowerCase(),
    toSnake: () => wordArray.join("_").toLowerCase(),
    toPascal: () =>
      wordArray
        .map(
          (word, i) =>
            word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase()
        )
        .join(""),
    toCamel: () =>
      wordArray
        .map((word, i) => {
          return i === 0
            ? word.toLowerCase()
            : word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase()
        })
        .join(""),
    toString: () => wordArray.join(" ").toLowerCase()
  }
}
