import type { LenghInputMethod, TimeInputMethod, TemperatureInputMethod, StringOutputMethod } from "./types";
export declare function convertString(input: string): StringOutputMethod;
export declare function convertLength(input: number): LenghInputMethod;
export declare function convertTime(input: number): TimeInputMethod;
export declare function convertTemperature(input: number): TemperatureInputMethod;
