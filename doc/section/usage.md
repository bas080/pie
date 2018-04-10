# Usage

Create a file and require the following functions.

```js
require ./src/radio.example.js
```

This is how you would run this file.

```bash
require ./doc/example/radio.sh
```

The result of running this script is a json string that is written to the
stdout.

```json
require ./doc/example/radio.output.json
```

I like to generate something more user friendly. To do this I use mustache's
template rendering.

```bash
require ./doc/example/report.sh
```

By running this, the json that is produced is piped to the mustache command.
It's output is written to a file named `report.txt` which contains the
following.

```txt
require ./doc/example/report.txt
```
