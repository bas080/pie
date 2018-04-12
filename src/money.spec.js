'use strict'

const tap = require('tap')
const {money, isMoney} = require('./money')

tap.test('money', t => {
  t.deepEqual(money(2), [200, 100])
  t.deepEqual(money([1, 2]), [1, 2])

  t.end()
})

tap.test('isMoney', t => {
  t.ok(isMoney(money(20)))

  t.end()
})
