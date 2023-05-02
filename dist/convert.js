"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTemperature = exports.convertTime = exports.convertLength = exports.convertString = void 0;
function convertString(input) {
    let wordArray = [];
    if (input.includes("_"))
        wordArray = input.split("_");
    else if (input.includes("-"))
        wordArray = input.split("-");
    else if (input.includes(" "))
        wordArray = input.split(" ");
    else {
        const isLowerCase = input[0] === input[0].toLowerCase();
        const wordStartIndexes = isLowerCase ? [0] : [];
        input
            .split("")
            .forEach((letter, i) => letter === letter.toUpperCase() ? wordStartIndexes.push(i) : null);
        wordStartIndexes.forEach((index, i) => {
            const endOfWord = wordStartIndexes[i + 1];
            wordArray.push(input.substring(index, endOfWord).toLowerCase());
        });
    }
    const stringOutputMethods = {
        toConstCase: () => wordArray.join("_").toUpperCase(),
        toKabobCase: () => wordArray.join("-").toLowerCase(),
        toSnakeCase: () => wordArray.join("_").toLowerCase(),
        toPascalCase: () => wordArray
            .map((word, i) => word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase())
            .join(""),
        toCamelCase: () => wordArray
            .map((word, i) => {
            return i === 0
                ? word.toLowerCase()
                : word.substring(0, 1).toUpperCase() +
                    word.substring(1).toLowerCase();
        })
            .join(""),
        toString: () => wordArray.join(" ").toLowerCase(),
    };
    return stringOutputMethods;
}
exports.convertString = convertString;
function convertLength(input) {
    let inMillimeters;
    const lengthOutputMethods = {
        toCentimeters: (d) => convertToFloat(inMillimeters / 10, d),
        toFeet: (d) => convertToFloat(inMillimeters / (25.4 * 12), d),
        toInches: (d) => convertToFloat(inMillimeters / 25.4, d),
        toKilometers: (d) => convertToFloat(inMillimeters / 1000000, d),
        toMeters: (d) => convertToFloat(inMillimeters / 1000, d),
        toMiles: (d) => convertToFloat(inMillimeters / (25.4 * 12 * 5280), d),
        toMillimeters: (d) => convertToFloat(inMillimeters, d),
        toYards: (d) => convertToFloat(inMillimeters / (25.4 * 12 * 3), d),
    };
    return {
        millimeters: () => {
            inMillimeters = input;
            return lengthOutputMethods;
        },
        centimeters: () => {
            inMillimeters = input * 10;
            return lengthOutputMethods;
        },
        meters: () => {
            inMillimeters = input * 1000;
            return lengthOutputMethods;
        },
        kilometers: () => {
            inMillimeters = input * 1000000;
            return lengthOutputMethods;
        },
        inches: () => {
            inMillimeters = input * 25.4;
            return lengthOutputMethods;
        },
        feet: () => {
            inMillimeters = input * 25.4 * 12;
            return lengthOutputMethods;
        },
        yards: () => {
            inMillimeters = input * 25.4 * 12 * 3;
            return lengthOutputMethods;
        },
        miles: () => {
            inMillimeters = input * 25.4 * 12 * 5280;
            return lengthOutputMethods;
        },
    };
}
exports.convertLength = convertLength;
function convertTime(input) {
    let nInSeconds;
    const timeOutputMethods = {
        toSeconds: () => nInSeconds,
        toMinutes: (d) => convertToFloat(nInSeconds / 60, d),
        toHours: (d) => convertToFloat(nInSeconds / 3600, d),
        toDays: (d) => convertToFloat(nInSeconds / (3600 * 24), d),
        toWeeks: (d) => convertToFloat(nInSeconds / (3600 * 24 * 7), d),
        toYears: (d) => convertToFloat(nInSeconds / (3600 * 24 * 364), d),
    };
    return {
        seconds: () => {
            nInSeconds = input;
            return timeOutputMethods;
        },
        minutes: () => {
            nInSeconds = input * 60;
            return timeOutputMethods;
        },
        hours: () => {
            nInSeconds = input * 3600;
            return timeOutputMethods;
        },
        days: () => {
            nInSeconds = input * 3600 * 24;
            return timeOutputMethods;
        },
        weeks: () => {
            nInSeconds = input * 3600 * 24 * 7;
            return timeOutputMethods;
        },
        years: () => {
            nInSeconds = input * 3600 * 24 * 365;
            return timeOutputMethods;
        },
    };
}
exports.convertTime = convertTime;
function convertTemperature(input) {
    return {
        celsius: () => {
            return {
                toCelsius: (d) => input,
                toFahrenheit: (d) => convertToFloat((input / 5) * 9 + 32, d),
            };
        },
        fahrenheit: () => {
            return {
                toCelsius: (d) => convertToFloat(((input - 32) * 5) / 9, d),
                toFahrenheit: (d) => input,
            };
        },
    };
}
exports.convertTemperature = convertTemperature;
function convertToFloat(val, d) {
    return d ? Number(val.toFixed(d.float)) : val;
}
