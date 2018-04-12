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
