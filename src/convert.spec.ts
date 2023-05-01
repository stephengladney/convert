import {
  convertLength,
  convertString,
  convertTemperature,
  convertTime,
} from "./convert"

describe("STRING", () => {
  const cases = [
    "CamelCase",
    "ConstCase",
    "KabobCase",
    "PascalCase",
    "SnakeCase",
    "String",
  ]

  const casedText = {
    CamelCase: "helloWorld",
    ConstCase: "HELLO_WORLD",
    KabobCase: "hello-world",
    PascalCase: "HelloWorld",
    SnakeCase: "hello_world",
    String: "hello world",
  }

  cases.forEach((inputCase) => {
    cases.forEach((outputCase) => {
      test(`${inputCase} -> ${outputCase}`, () => {
        expect(
          convertString(casedText[inputCase])[`to${outputCase}`]()
        ).toEqual(casedText[outputCase])
      })
    })
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

  const twoMiles = {
    Millimeters: 3218687.99,
    Centimeters: 321868.8,
    Meters: 3218.688,
    Kilometers: 3.218688,
    Inches: 126720,
    Feet: 10560,
    Yards: 3520,
    Miles: 2,
  }

  units.forEach((inputCase) => {
    units.forEach((outputCase) => {
      test(`${inputCase} -> ${outputCase}`, () => {
        expect(
          Number(
            convertLength(twoMiles[inputCase])
              [inputCase.toLowerCase()]()
              [`to${outputCase}`]()
              .toFixed(2)
          )
        ).toBeCloseTo(twoMiles[outputCase], 1)
      })
    })
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
  const oneYear = {
    Seconds: 31536000,
    Minutes: 525600,
    Hours: 8760,
    Days: 365,
    Weeks: 52.142857142857146,
    Years: 1,
  }

  units.forEach((inputCase) => {
    units.forEach((outputCase) => {
      test(`${inputCase} -> ${outputCase}`, () => {
        expect(
          Number(
            convertTime(oneYear[inputCase])
              [inputCase.toLowerCase()]()
              [`to${outputCase}`]()
              .toFixed(2)
          )
        ).toBeCloseTo(oneYear[outputCase], 1)
      })
    })
  })
})
