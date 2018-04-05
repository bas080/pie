const {nth} = require('ramda')

// makeRatio :: Int -> Int -> Ratio
function makeRatio(numer, denom) {
  return [numer, denom]
}

const numer = nth(0)
const denom = nth(1)

function divide(a, b) {
  return makeRatio(
    numer(a) * denom(b),
    denom(a) * numer(b)
  )
}

function subtract(a, b) {
  return makeRatio(
    (numer(a) * denom(b)) - (numer(b) * denom(a)),
    denom(a) * denom(b)
  )
}

function sum(a, b) {
  return makeRatio(
    (numer(a) * denom(b)) + (numer(b) * denom(a)),
    denom(a) * denom(b)
  )
}

function isRatio(v) {
  // improve detecting ration type. Maybe use a constructor or a hidden
  // property
  return Array.isArray(v)
}

function money(amount) {
  return isRatio(amount)
    ? amount
    : makeRatio(amount * 100, 100)
}

function toNumber(ratio) {
  return numer(ratio) / denom(ratio)
}

function hrMoney(money) {
  return toNumber(money).toFixed(2)
}

module.exports = {
  toNumber,
  hrMoney,
  money,
  subtract,
  divide,
  sum,
}
