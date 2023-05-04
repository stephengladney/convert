function getWordArray(input: string): string[] {
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
  return wordArray
}

export function constCase(str: string): string {
  return getWordArray(str).join("_").toUpperCase()
}

export function kabobCase(str: string): string {
  return getWordArray(str).join("-").toLowerCase()
}

export function snakeCase(str: string): string {
  return getWordArray(str).join("_").toLowerCase()
}

export function pascalCase(str: string): string {
  return getWordArray(str)
    .map(
      (word, i) =>
        word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
    )
    .join("")
}

export function camelCase(str: string): string {
  return getWordArray(str)
    .map((word, i) => {
      return i === 0
        ? word.toLowerCase()
        : word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
    })
    .join("")
}

export function deCase(str: string): any {
  return getWordArray(str).join(" ").toLowerCase()
}

type LengthTypes =
  | "millimeters"
  | "centimeters"
  | "meters"
  | "kilometers"
  | "inches"
  | "feet"
  | "yards"
  | "miles"
type TimeTypes =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "months"
  | "years"

type TempTypes = "Celsius" | "Fahrenheit"

function getBasicUnit(
  n: number,
  inUnit: LengthTypes | TimeTypes | TempTypes
): number {
  const timeInputs = ["seconds", "minutes", "hours", "days", "weeks", "years"]
  // const lengthInputs = [
  //   "millimeters",
  //   "centimeters",
  //   "meters",
  //   "kilometers",
  //   "inches",
  //   "feet",
  //   "yards",
  //   "miles",
  // ]
  const timesInSeconds: { [key: string]: number } = {
    seconds: n,
    minutes: n * 60,
    hours: n * 3600,
    days: n * 3600 * 24,
    weeks: n * 3600 * 24 * 7,
    years: n * 3600 * 24 * 7 * 52,
  }
  const lengthsInMillimeters: { [key: string]: number } = {
    millimeters: n,
    centimeteres: n * 10,
    meters: n * 100,
    kilometers: n * 100000,
    inches: n * 25.4,
    feet: n * 25.4 * 12,
    yards: 25.4 * 12 * 3,
    miles: 25.4 * 12 * 5280,
  }

  if (timeInputs.includes(inUnit)) return timesInSeconds[inUnit]
  else return lengthsInMillimeters[inUnit]
}

export function convertTime({
  n,
  from,
  to,
}: {
  n: number
  from: TimeTypes
  to: TimeTypes
}): number {
  const nInBasicUnits = getBasicUnit(n, from)
  const timeOutput: { [key: string]: number } = {
    seconds: nInBasicUnits,
    minutes: nInBasicUnits / 60,
    hours: nInBasicUnits / 3600,
    days: nInBasicUnits / (3600 * 24),
    weeks: nInBasicUnits / (3600 * 24 * 7),
    years: nInBasicUnits / (3600 * 24 * 364),
  }
  return timeOutput[to as string]
}

export function convertLength({
  n,
  from,
  to,
}: {
  n: number
  from: LengthTypes
  to: LengthTypes
}): number {
  const inMillimeters = getBasicUnit(n, from)
  const lengthOutput: { [key: string]: number } = {
    centimeters: inMillimeters / 10,
    feet: inMillimeters / (25.4 * 12),
    inches: inMillimeters / 25.4,
    kilometers: inMillimeters / 1000000,
    meters: inMillimeters / 1000,
    miles: inMillimeters / (25.4 * 12 * 5280),
    millimeters: inMillimeters,
    yards: inMillimeters / (25.4 * 12 * 3),
  }
  return lengthOutput[to as string]
}

export function convertTemperature({
  n,
  from,
  to,
}: {
  n: number
  from: TempTypes
  to: TempTypes
}): number {
  if (from === "Fahrenheit" && to === "Celsius") return ((n - 32) * 5) / 9
  if (from === "Celsius" && to === "Fahrenheit") return (n / 5) * 9 + 32
  else return n
}
