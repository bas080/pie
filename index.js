'use strict'

const {money, hrMoney, divide, sum, subtract} = require('./money')

function user(def) {
  return def
}

function transaction(def) {
  return {
    ...def,
    amount: money(def.amount),
  }
}

function balance(transactions) {
  const balance = transactions.reduce((balance, transaction) => {
    const from = balance.get(transaction.from) || money(0)

    balance.set(transaction.from, sum(from, transaction.amount))

    const to = balance.get(transaction.to) || money(0)

    balance.set(transaction.to, subtract(to, transaction.amount))

    return balance
  }, new Map())

  return Array.from(balance).map(([key, value]) => [key, hrMoney(value)])
}

function compact(transactions) {
  return transactions.filter(transaction => {
    return !transactions.find(
      t =>
        transaction.from === t.to &&
        transaction.to === t.from &&
        transaction.amount === t.amount
    )
  })
}

function split(users, paid) {
  const {amount, from, to} = paid
  const split = divide(amount, money(users.length))

  return [
    paid,
    ...users.map(user =>
      transaction({
        ...(paid.description ? {description: `split ${paid.description}`} : {}),
        from: user === from ? to : from,
        to: user,
        amount: user === from ? amount : split,
      })
    ),
  ]
}

function format(transactions) {
  return transactions.map(tr => ({
    ...tr,
    amount: hrMoney(tr.amount),
  }))
}

function print(transactions) {
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      {
        transactions: format(compact(transactions)),
        balance: balance(transactions),
      },
      null,
      2
    )
  )
}

module.exports = {
  split,
  transaction,
  user,
  balance,
  format,
  compact,
  print,
}
