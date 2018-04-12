'use strict'

const {balance, split, user, transaction, format} = require('./index')
const {test} = require('tap')

const a = user({name: 'A'})
const b = user({name: 'B'})
const c = user({name: 'C'})
const z = user({name: 'Z'})

const users = [a, b, c]

const pines = transaction({
  from: a,
  to: z,
  amount: 33,
})

const jam = transaction({
  from: a,
  to: a,
  amount: 3,
})

test(t => {
  t.matchSnapshot(format(split(users, pines)))

  t.end()
})

test(t => {
  t.matchSnapshot(balance(split(users, pines)))

  t.end()
})

test(t => {
  t.matchSnapshot(balance(split(users, jam)))

  t.end()
})

test(t => {
  t.matchSnapshot(split([a, b],
    transaction({
      description: 'banana split',
      from: a,
      to: a,
      amount: 2
    })))

  t.end()
})
