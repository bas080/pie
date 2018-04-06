# Pie

Currently pie has no client. I personally use it as a command line tool

# Usage

Create a file and require the following functions.

```js
// ./example/radio.js

require ./example/radio.js
```

This is how you would run this file.

```bash
node ./example/radio.js
```

The result of running this script is a json string that is written to the
stdout.

```json
require ./example/radio.output.json
```

# Reference

## compact(transactions)

- transactions is an array of transactions

- returns a list of transactions

compact removes transactions that are their from history purposes only. As
a result only the transactions that are required for settling are shown.
