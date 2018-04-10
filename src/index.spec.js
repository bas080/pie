'use strict'

const {balance, split, user, transaction, format, compact} = require('./index')
const tap = require('tap')

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

tap.test(t => {
  t.deepEqual(format(split(users, pines)), [
    {from: a, to: z, amount: 33, description: undefined},
    {from: z, to: a, amount: 33, description: undefined},
    {from: a, to: b, amount: 11, description: undefined},
    {from: a, to: c, amount: 11, description: undefined},
  ])

  t.end()
})

tap.test(t => {
  t.deepEqual(format(compact(split(users, pines))), [
    {from: a, to: b, amount: 11, description: undefined},
    {from: a, to: c, amount: 11, description: undefined},
  ])

  t.end()
})

tap.test(t => {
  t.deepEqual(balance(split(users, pines)), [
    [a, 22],
    [z, 0],
    [b, -11],
    [c, -11],
  ])

  t.end()
})

tap.test(t => {
  t.deepEqual(balance(split(users, jam)), [
    [a, 2],
    [b, -1],
    [c, -1]
  ])

  t.end()
})
