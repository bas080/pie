# Pie

Currently pie has no client. I personally use it as a command line tool

> These docs are generated. Please edit the files located in `./doc`.

# Usage

Create a file and require the following functions.

```js
const {transaction, user, split, print} = require('./index')

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
node ./dist/radio.example.js \
  > ./doc/output/radio.json
```

The result of running this script is a JSON string that is written to
`./doc/output/radio.json`

```json
{
  "transactions": [
    {
      "amount": "20.00",
      "from": {
        "name": "John"
      },
      "to": {
        "name": "RadioPalace"
      },
      "description": "Radio"
    },
    {
      "amount": "20.00",
      "from": {
        "name": "RadioPalace"
      },
      "to": {
        "name": "John"
      },
      "description": "split Radio"
    },
    {
      "amount": "10.00",
      "from": {
        "name": "John"
      },
      "to": {
        "name": "Jane"
      },
      "description": "split Radio"
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

I like to generate something more user friendly. To do this I use mustache's
template rendering.

```bash
npm install mustache -g

node ./dist/radio.example.js | mustache - ./doc/asset/report.mustache > ./doc/output/radio.md
```

By running this, the json that is produced is piped to the mustache command.
It's output is written to a file named `report.txt` which contains the
following.

```txt
# Contributors

John: 10.00
RadioPalace: 0.00
Jane: -10.00

# Transactions

20.00	Radio	 John > RadioPalace
20.00	split Radio	 RadioPalace > John
10.00	split Radio	 John > Jane
```

# Example

## Badminton team

The reason why I made this tool is to split a bill with my badminton team.
Every now and then we have a competition and after having played a competition
it's customary to sit down and have a drink and snacks together.

For convenience one of us pays the bill. At a later point we split the bill.
I have taken the responsibility of calculating "the splitting".

So let's see this real world example and how I have structured the code.

First I define all the players. This also includes the place where we have the
drinks.

```js
'use strict'

const {user} = require('./index')

const floris = user({name: 'Floris'})
const richard = user({name: 'Richard'})
const luigi = user({name: 'Luigi'})
const bas = user({name: 'Bas'})
const olympia = user({name: 'Olympia'})

module.exports = {
  floris,
  olympia,
  richard,
  luigi,
  bas,
}
```

We export and use these users to define the `from` and `to` in the
transactions.

```js
'use strict'

const {floris, richard, luigi, bas, olympia} = require('./badminton-users')
const {transaction, split} = require('./index')

const everyone = [floris, richard, luigi, bas]

function mapCat(fn, items) {
  return items.reduce((acc, item) => acc.concat(fn(item)), [])
}

module.exports = [
  transaction({
    description: 'Balans',
    from: floris,
    to: bas,
    amount: 1.71,
  }),
  transaction({
    description: 'Balans',
    from: richard,
    to: bas,
    amount: 0.55
  }),
  transaction({
    description: 'Balans',
    from: luigi,
    to: bas,
    amount: 0.55
  }),
  ...mapCat(split.bind(null, everyone), [
    transaction({
      description: '28-mrt-2018 (drinks)',
      from: bas,
      to: olympia,
      amount: 42.8,
    }),
    transaction({
      description: '28-mrt-2018 (hapjes)',
      amount: 6.85,
      from: floris,
      to: floris,
    }),
    transaction({
      description: '4-apr-2018 (drinks)',
      from: bas,
      to: olympia,
      amount: 35.2,
    }),
    transaction({
      description: '4-apr-2018 (hapjes)',
      from: floris,
      to: floris,
      amount: 7.8,
    }),
    transaction({
      description: '25-apr-2018 (drinks)',
      from: bas,
      to: olympia,
      amount: 24.70,
    }),
    transaction({
      description: '25-apr-2018 (hapjes)',
      from: floris,
      to: floris,
      amount: 7.05
    })
  ])
]
```

These transactions might be confusing. So what is a transaction, and what
effect does splitting a transaction have?

Looking at split's function signature we can learn the following.

`User[] -> Transaction -> Transaction[]`

- The first argument is the list of users I want to split the "bill" with.
- The second is the bill which is represented by an instance of a transaction

Most importantly it returns one or more transactions. It basically splits one
transaction into multiple. For more clarity we will look at another example.

## Jane and John

> Once upon a time

```js
const {user} = require('./index')

const jane = user({name: 'Jane'})
const john = user({name: 'John'})
const wheelz = user({name: 'Wheelz Corp'})

module.exports = {
  jane,
  john,
  wheelz
}
```

Jane and John are having a day out in the city. John sees a bike he would like
to buy, but he forgot his credited. He doesn't have enough cash to pay for
the bike. He asks Jane if she can help him by paying for it now. He promises her to
pay her back as soon as he gets home. Jane agrees to pay for the bike.

```js
const {transaction} = require('./index')
const {john, jane, wheelz} = require('./jane-and-john-users')

const bike = [
  transaction({
    description: 'Creditcard payment for bike',
    from: jane,
    to: wheelz,
    amount: 100,
  }),
  transaction({
    description: 'Wheelz gives 100 euros worth bike',
    from: wheelz,
    to: john,
    amount: 100
  }),
  // john was given 100 euros value but hasn't paid anything
]

module.exports = bike
```

John is a very happy man but he does owe Jane 100 euros. After some walking
they are both thirsty and would like to have a drink. They find a place,
sit down and order two tap water and two coffee. Jane is also peckish and orders
a slice of cake. As a token of good will John pays for the drinks and cake.
They agree that they'll split it later.

```js
const {john, jane} = require('./jane-and-john-users')
const {user, transaction, split} = require('./index')

const cafeCrock = user({name: 'Cafe Crock'})

const transactions = [

  transaction({
    description: "Jane's Cake",
    from: cafeCrock,
    to: jane,
    amount: 2,
  }),
  transaction({
    description: "Jane's Cake",
    from: john,
    to: cafeCrock,
    amount: 2,
  }),

  ...split([jane, john], transaction({
    description: 'Coffee and water',
    from: john,
    to: cafeCrock,
    amount: 6,
  }))
]

module.exports = transactions
```

After an eventful day they decide to go home. They say goodbye and agree that
Jane will do the bill splitting. She gets home and opens up her favorite
terminal with a bash command line.

```bash
cd ~/fun/
git clone git@github.com:bas080/pie.git
```

She has defined all the transactions and users and now only has to get the
result.

```js
const cafeTransactions = require('./jane-and-john-cafe')
const wheelzTransactions = require('./jane-and-john-bike')
const {print} = require('./index')

print([
  ...cafeTransactions,
  ...wheelzTransactions
])
```

She runs this code using some bash commands for a nice result.

```bash
npm install -g mustache

node ./dist/jane-and-john-result.js \
  | mustache - ./doc/asset/report.mustache \
  > ./doc/output/jane-and-john.md
```

```md
# Contributors

Cafe Crock: 0.00
Jane: 95.00
John: -95.00
Wheelz Corp: 0.00

# Transactions

2.00	Jane&#39;s Cake	 Cafe Crock > Jane
2.00	Jane&#39;s Cake	 John > Cafe Crock
6.00	Coffee and water	 John > Cafe Crock
3.00	split Coffee and water	 John > Jane
6.00	split Coffee and water	 Cafe Crock > John
100.00	Creditcard payment for bike	 Jane > Wheelz Corp
100.00	Wheelz gives 100 euros worth bike	 Wheelz Corp > John
```
# Roadmap

## Implement database support

Currently the transactions and users are stored as source code. It could be
much more useful to store these records in a database, making it easier to
automate and manage this data.
# Documentation

In case you want to contribute to the documentation, you can edit one of the
sections in the `./doc` folder. The generating of the `./README.md` can be done
by the maintainer.

Generating of the `./README.md` is done using
[mash](https://github.com/bas080/Mash)

Run `npm run docs` to generate the `./README.md`.

# License

Want to know more about the Licensing of this material? See the
[./LICENSE](./LICENSE)

