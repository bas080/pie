# Pie

Currently pie has no client. I personally use it as a command line tool

> These docs are generated. Please edit the files located in `./doc`.

# Usage

Create a file and require the following functions.

```js
// ./example/radio.js

const {transaction, user, split, print} = require('../../dist/index')

const john = user({name: 'John'})
const jane = user({name: 'Jane'})
const radioPalace = user({name: 'RadioPalace'})
const johnAndJane = [john, jane]

const transactions = split(johnAndJane,
  transaction({
    description: 'Radio',
    amount: 20,
    from: john,
    to: radioPalace,
  })
)

print(transactions)
```

This is how you would run this file.

```bash
node ./doc/example/radio.js
```

The result of running this script is a json string that is written to the
stdout.

```json
{
  "transactions": [
    {
      "description": "split Radio",
      "from": {
        "name": "John"
      },
      "to": {
        "name": "Jane"
      },
      "amount": "10.00"
    }
  ],
  "balance": [
    [
      {
        "name": "John"
      },
      "10.00"
    ],
    [
      {
        "name": "RadioPalace"
      },
      "0.00"
    ],
    [
      {
        "name": "Jane"
      },
      "-10.00"
    ]
  ]
}
```

# Roadmap

## Use flow's libdef feature

Instead of having the type definitions be lost during a build, I want to use
the libdef feature. That way the examples can also be typechecked and using
a libdef we no longer need to strip the types from the source.

Furthermore users of this lib can leverage flow types in their own project.

- write a [libdef](https://flow.org/en/docs/libdefs/creation/)
- remove `.*/doc` from `.flowconfig`'s ignore section
- remove the build script from the `package.json` and chance its main module

# Documentation

The documentation pages are generated using mash. In case you want to
contribute to the documentation you can install mash or edit one of the
sections in the `./doc` folder.

Run `npm run docs` to generate the `./README.md`.


