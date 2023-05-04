# :left_right_arrow: @gladney/convert

Utility library that performs commonly needed conversions.

## Methods

### `Strings`

Convert a string to a particular case. The provided string can be in the format of any supported case.

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
camelCase("hello world") // "helloWorld"
constCase("hello world") // "HELLO_WORLD"
kabobCase("hello world") // "hello-world"
pascalCase("hello world") // "HelloWorld"
snakeCase("hello world") // "hello_world"
deCase("helloWorld") // "hello world"
```

### `convertTemperature`

Temperature from/to Celsius/Fahrenheit<br><br>
_Example:_

```typescript
convertTemperature({ n:100, from"celsius", to:"fahrenheit" }) // 212
convertTemperature({ n:32, from"fahrenheit", to:"celsius" }) // 0
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
convertLength({ n:2, from"miles", to:"kilometers" }) // 3.218688
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
convertTime({ n:2, from"weeks", to:"minutes" }) // 20160
```
