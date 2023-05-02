# :left_right_arrow: @gladney/convert

Utility library that performs commonly needed conversions.

## Helpful tips

- All methods that return numerical values can accept `{float: n}` as a parameter in the last method of the chain, where n is the number of float places.<br><br>
  _Example:_

```typescript
convertLength(2).miles().toKilometers() // 3.218688

convertLength(2).miles().toKilometers({ float: 2 }) // 3.22

convertLength(2).miles().toKilometers({ float: 0 }) // 3
```

## Methods

### `convertString`

String from one casing to another. Starting case is detected automatically.

<details>
<summary>Supported cases</summary>
<ul>
<li>camelCase</li>
<li>CONST_CASE</li>
<li>kabob-case</li>
<li>PascalCase</li>
<li>snake_case</li>
<li>string case</li>
</ul>
</details>

_Example:_

```typescript
convertCase("helloWorld").toPascalCase() // "HelloWorld"
```

### `convertTemperature`

Temperature from/to Celsius/Fahrenheit<br><br>
_Example:_

```typescript
convertTemperature(100).celsius().toFahrenheit() // 212
convertTemperature(32).fahrenheit().toCelsius() // 0
```

### `convertLength`

Length from one unit to another (metric or imperial)

<details>
<summary>Supported units</summary>
<ul>
<br><li><b>Metric</b></li>
<ul><li>millimeters</li>
<li>centimeters</li>
<li>meters</li>
<li>kilometers</li>
</ul>
<br><li><b>Imperial</b></li>
<ul>
<li>inches</li>
<li>feet</li>
<li>yards</li>
<li>miles</li>
</ul>
</ul>
</details>

_Example:_

```typescript
convertLength(2).miles().toKilometers() // 3.218688
```

### `convertTime`

Length from one unit to another (metric or imperial)

<details>
<summary>Supported units</summary>
<ul>
<li>seconds</li>
<li>minutes</li>
<li>hours</li>
<li>days</li>
<li>weeks</li>
<li>years</li>
</ul>
</details>

_Example:_

```typescript
convertTime(2).weeks().toMinutes() // 20160
```
