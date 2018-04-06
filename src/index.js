'use strict'

import type {Money} from './money'

const {money, hrMoney, divide, sum, subtract, isMoney} = require('./money')

type FormattedTransaction = {
  description?: string,
  amount: string,
  from: User,
  to: User,
}

type User = {
  name: string,
}

type Transaction = {
  description?: string,
  amount: Money,
  from: User,
  to: User,
}

function user(def: Object): User {
  return def
}

function transaction(def: {
  amount: number | Money,
  from: User,
  to: User,
  description?: string,
}): Transaction {
  const result = {
    from: def.from,
    to: def.to,
    amount: money(def.amount),
    description: def.description,
  }

  return result
}

function balance(transactions: Transaction[]): [User, string][] {
  const balance = transactions.reduce((balance, transaction) => {
    const from = balance.get(transaction.from) || money(0)

    balance.set(transaction.from, sum(from, transaction.amount))

    const to = balance.get(transaction.to) || money(0)

    balance.set(transaction.to, subtract(to, transaction.amount))

    return balance
  }, new Map())

  return Array.from(balance).map(([key, value]) => [key, hrMoney(value)])
}

function compact(transactions: Transaction[]): Transaction[] {
  return transactions.filter(transaction => {
    return !transactions.find(
      t =>
        transaction.from === t.to &&
        transaction.to === t.from &&
        transaction.amount === t.amount
    )
  })
}

function split(users: User[], paid: Transaction): Transaction[] {
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

function formatTransaction(transaction: Transaction): FormattedTransaction {
  const result = {
    amount: hrMoney(transaction.amount),
    from: transaction.from,
    to: transaction.to,
    description: transaction.description,
  }

  return result
}

function format(transactions: Transaction[]): FormattedTransaction[] {
  return transactions.map(formatTransaction)
}

function print(transactions: Transaction[]): void {
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
