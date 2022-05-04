import { convert } from "./convert";

describe("convert case", () => {
  const cases = [
    "CamelCase",
    "ConstCase",
    "KabobCase",
    "PascalCase",
    "SnakeCase",
    "String",
  ];

  const casedText = {
    CamelCase: "helloWorld",
    ConstCase: "HELLO_WORLD",
    KabobCase: "hello-world",
    PascalCase: "HelloWorld",
    SnakeCase: "hello_world",
    String: "hello world",
  };

  cases.forEach((inputCase) => {
    cases.forEach((outputCase) => {
      test(`${inputCase} -> ${outputCase}`, () => {
        expect(
          convert(casedText[inputCase]).string()[`to${outputCase}`]()
        ).toEqual(casedText[outputCase]);
      });
    });
  });
});

describe("convert length", () => {
  const units = [
    "Millimeters",
    "Centimeters",
    "Meters",
    "Kilometers",
    "Inches",
    "Feet",
    "Yards",
    "Miles",
  ];

  const twoMiles = {
    Millimeters: 3218687.99,
    Centimeters: 321868.8,
    Meters: 3218.688,
    Kilometers: 3.218688,
    Inches: 126720,
    Feet: 10560,
    Yards: 3520,
    Miles: 2,
  };

  units.forEach((inputCase) => {
    units.forEach((outputCase) => {
      test(`${inputCase} -> ${outputCase}`, () => {
        expect(
          Number(
            convert(twoMiles[inputCase])
              [inputCase.toLowerCase()]()
              [`to${outputCase}`]()
              .toFixed(2)
          )
        ).toBeCloseTo(twoMiles[outputCase], 1);
      });
    });
  });

  test("applies appropriate float", () => {
    expect(convert(2).miles().toKilometers({ float: 2 })).toEqual(3.22);
    expect(convert(2).miles().toMeters({ float: 1 })).toEqual(3218.7);
    expect(convert(2).miles().toMeters({ float: 0 })).toEqual(3219);
  });
});

describe("convertTemperature", () => {
  test("Celsius -> Fahrenheit", () => {
    expect(convert(0).celsius().toFahrenheit()).toEqual(32);
  });

  test("Fahrenheit -> Celsius", () => {
    expect(convert(32).fahrenheit().toCelsius()).toEqual(0);
  });

  test("applies appropriate float", () => {
    expect(convert(28).fahrenheit().toCelsius({ float: 2 })).toEqual(-2.22);
    expect(convert(38).celsius().toFahrenheit({ float: 1 })).toEqual(100.4);
  });
});

describe("convertTime", () => {
  const units = ["Seconds", "Minutes", "Hours", "Days", "Weeks", "Years"];
  const oneYear = {
    Seconds: 31536000,
    Minutes: 525600,
    Hours: 8760,
    Days: 365,
    Weeks: 52.142857142857146,
    Years: 1,
  };

  units.forEach((inputCase) => {
    units.forEach((outputCase) => {
      test(`${inputCase} -> ${outputCase}`, () => {
        expect(
          Number(
            convert(oneYear[inputCase])
              [inputCase.toLowerCase()]()
              [`to${outputCase}`]()
              .toFixed(2)
          )
        ).toBeCloseTo(oneYear[outputCase], 1);
      });
    });
  });
});
