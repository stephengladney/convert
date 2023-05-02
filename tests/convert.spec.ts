import {
  convertLength,
  convertString,
  convertTemperature,
  convertTime,
} from "../src/convert"

describe("STRING", () => {
  const cases = [
    "camelCase",
    "constCase",
    "kabobCase",
    "pascalCase",
    "snakeCase",
    "string",
  ]

  type CasedText = {
    camelCase: string
    constCase: string
    kabobCase: string
    pascalCase: string
    snakeCase: string
    string: string
  }
  const casedText: CasedText = {
    camelCase: "helloWorld",
    constCase: "HELLO_WORLD",
    kabobCase: "hello-world",
    pascalCase: "HelloWorld",
    snakeCase: "hello_world",
    string: "hello world",
  }

  cases.forEach((inputCase) => {
    if (inputCase !== "camelCase") {
      test(`${inputCase} -> camelCase`, () => {
        expect(
          convertString(casedText[inputCase as keyof CasedText]).toCamelCase()
        ).toEqual(casedText.camelCase)
      })
    }

    if (inputCase !== "constCase") {
      test(`${inputCase} -> constCase`, () => {
        expect(
          convertString(casedText[inputCase as keyof CasedText]).toConstCase()
        ).toEqual(casedText.constCase)
      })
    }

    if (inputCase !== "kabobCase") {
      test(`${inputCase} -> kabobCase`, () => {
        expect(
          convertString(casedText[inputCase as keyof CasedText]).toKabobCase()
        ).toEqual(casedText.kabobCase)
      })
    }

    if (inputCase !== "pascalCase") {
      test(`${inputCase} -> pascalCase`, () => {
        expect(
          convertString(casedText[inputCase as keyof CasedText]).toPascalCase()
        ).toEqual(casedText.pascalCase)
      })
    }

    if (inputCase !== "snakeCase") {
      test(`${inputCase} -> snakeCase`, () => {
        expect(
          convertString(casedText[inputCase as keyof CasedText]).toSnakeCase()
        ).toEqual(casedText.snakeCase)
      })
    }

    if (inputCase !== "string") {
      test(`${inputCase} -> string`, () => {
        expect(
          convertString(casedText[inputCase as keyof CasedText]).toString()
        ).toEqual(casedText.string)
      })
    }
  })
})

describe("LENGTH", () => {
  const units = [
    "Millimeters",
    "Centimeters",
    "Meters",
    "Kilometers",
    "Inches",
    "Feet",
    "Yards",
    "Miles",
  ]

  type TwoMiles = {
    Millimeters: number
    Centimeters: number
    Meters: number
    Kilometers: number
    Inches: number
    Feet: number
    Yards: number
    Miles: number
  }

  const twoMiles: TwoMiles = {
    Millimeters: 3218687.99,
    Centimeters: 321868.8,
    Meters: 3218.688,
    Kilometers: 3.218688,
    Inches: 126720,
    Feet: 10560,
    Yards: 3520,
    Miles: 2,
  }
  type ResultMap = {
    Millimeters: any
    Centimeters: any
    Meters: any
    Kilometers: any
    Inches: any
    Feet: any
    Yards: any
    Miles: any
  }

  const getResultMap = (inputCase: keyof ResultMap) => {
    const resultMap: ResultMap = {
      Millimeters: convertLength(
        twoMiles[inputCase as keyof TwoMiles]
      ).millimeters(),
      Centimeters: convertLength(
        twoMiles[inputCase as keyof TwoMiles]
      ).centimeters(),
      Meters: convertLength(twoMiles[inputCase as keyof TwoMiles]).meters(),
      Kilometers: convertLength(
        twoMiles[inputCase as keyof TwoMiles]
      ).kilometers(),
      Inches: convertLength(twoMiles[inputCase as keyof TwoMiles]).inches(),
      Feet: convertLength(twoMiles[inputCase as keyof TwoMiles]).feet(),
      Yards: convertLength(twoMiles[inputCase as keyof TwoMiles]).yards(),
      Miles: convertLength(twoMiles[inputCase as keyof TwoMiles]).miles(),
    }
    return resultMap[inputCase]
  }

  units.forEach((inputCase) => {
    if (inputCase !== "Millimeters") {
      test(`${inputCase.toLowerCase()} -> millimeters`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toMillimeters()
              .toFixed(2)
          )
        ).toBeCloseTo(twoMiles.Millimeters, 1)
      })
    }

    if (inputCase !== "Centimeters") {
      test(`${inputCase.toLowerCase()} -> centimeters`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toCentimeters()
              .toFixed(2)
          )
        ).toBeCloseTo(twoMiles.Centimeters, 1)
      })
    }
    if (inputCase !== "Meters") {
      test(`${inputCase.toLowerCase()} -> meters`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toMeters()
              .toFixed(2)
          )
        ).toBeCloseTo(twoMiles.Meters, 1)
      })
    }
    if (inputCase !== "Kilometers") {
      test(`${inputCase.toLowerCase()} -> kilometers`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toKilometers()
              .toFixed(2)
          )
        ).toBeCloseTo(twoMiles.Kilometers, 1)
      })
    }
    if (inputCase !== "Inches") {
      test(`${inputCase.toLowerCase()} -> inches`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toInches()
              .toFixed(2)
          )
        ).toBeCloseTo(twoMiles.Inches, 1)
      })
    }
    if (inputCase !== "Feet") {
      test(`${inputCase.toLowerCase()} -> feet`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toFeet()
              .toFixed(2)
          )
        ).toBeCloseTo(twoMiles.Feet, 1)
      })
    }
    if (inputCase !== "Yards") {
      test(`${inputCase.toLowerCase()} -> yards`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toYards()
              .toFixed(2)
          )
        ).toBeCloseTo(twoMiles.Yards, 1)
      })
    }
    if (inputCase !== "Miles") {
      test(`${inputCase.toLowerCase()} -> miles`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toMiles()
              .toFixed(2)
          )
        ).toBeCloseTo(twoMiles.Miles, 1)
      })
    }
  })

  test("applies appropriate float", () => {
    expect(convertLength(2).miles().toKilometers({ float: 2 })).toEqual(3.22)
    expect(convertLength(2).miles().toMeters({ float: 1 })).toEqual(3218.7)
    expect(convertLength(2).miles().toMeters({ float: 0 })).toEqual(3219)
  })
})

describe("TEMPERATURE", () => {
  test("Celsius -> Fahrenheit", () => {
    expect(convertTemperature(0).celsius().toFahrenheit()).toEqual(32)
  })

  test("Fahrenheit -> Celsius", () => {
    expect(convertTemperature(32).fahrenheit().toCelsius()).toEqual(0)
  })

  test("applies appropriate float", () => {
    expect(convertTemperature(28).fahrenheit().toCelsius({ float: 2 })).toEqual(
      -2.22
    )
    expect(convertTemperature(38).celsius().toFahrenheit({ float: 1 })).toEqual(
      100.4
    )
  })
})

describe("TIME", () => {
  const units = ["Seconds", "Minutes", "Hours", "Days", "Weeks", "Years"]

  type OneYear = {
    Seconds: number
    Minutes: number
    Hours: number
    Days: number
    Weeks: number
    Years: number
  }

  const oneYear: OneYear = {
    Seconds: 31536000,
    Minutes: 525600,
    Hours: 8760,
    Days: 365,
    Weeks: 52.142857142857146,
    Years: 1,
  }

  type ResultMap = {
    Seconds: any
    Minutes: any
    Hours: any
    Days: any
    Weeks: any
    Years: any
  }

  const getResultMap = (inputCase: keyof ResultMap) => {
    const resultMap: ResultMap = {
      Seconds: convertTime(oneYear[inputCase as keyof OneYear]).seconds(),
      Minutes: convertTime(oneYear[inputCase as keyof OneYear]).minutes(),
      Hours: convertTime(oneYear[inputCase as keyof OneYear]).hours(),
      Days: convertTime(oneYear[inputCase as keyof OneYear]).days(),
      Weeks: convertTime(oneYear[inputCase as keyof OneYear]).weeks(),
      Years: convertTime(oneYear[inputCase as keyof OneYear]).years(),
    }
    return resultMap[inputCase]
  }

  units.forEach((inputCase) => {
    if (inputCase !== "Seconds") {
      test(`${inputCase.toLowerCase()} -> seconds`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toSeconds()
              .toFixed(2)
          )
        ).toBeCloseTo(oneYear.Seconds, 1)
      })
    }
    if (inputCase !== "Minutes") {
      test(`${inputCase.toLowerCase()} -> minutes`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toMinutes()
              .toFixed(2)
          )
        ).toBeCloseTo(oneYear.Minutes, 1)
      })
    }
    if (inputCase !== "Hours") {
      test(`${inputCase.toLowerCase()} -> hours`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toHours()
              .toFixed(2)
          )
        ).toBeCloseTo(oneYear.Hours, 1)
      })
    }
    if (inputCase !== "Days") {
      test(`${inputCase.toLowerCase()} -> days`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toDays()
              .toFixed(2)
          )
        ).toBeCloseTo(oneYear.Days, 1)
      })
    }
    if (inputCase !== "Weeks") {
      test(`${inputCase.toLowerCase()} -> weeks`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toWeeks()
              .toFixed(2)
          )
        ).toBeCloseTo(oneYear.Weeks, 1)
      })
    }
    if (inputCase !== "Years") {
      test(`${inputCase.toLowerCase()} -> years`, () => {
        expect(
          Number(
            getResultMap(inputCase as keyof ResultMap)
              .toYears()
              .toFixed(2)
          )
        ).toBeCloseTo(oneYear.Years, 1)
      })
    }
  })
})
