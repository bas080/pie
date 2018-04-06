'use strict'

// @flow

function numer(a: Ratio): number {
  return a[0]
}

function denom(a: Ratio): number {
  return a[1]
}

type Ratio = [number, number]
export type Money = Ratio

function makeRatio(numer: number, denom: number): Ratio {
  if (isNaN(numer))
    throw new TypeError('whaaaa')

  return [numer, denom]
}

function divide(a: Ratio, b: Ratio): Ratio {
  return makeRatio(
    numer(a) * denom(b),
    denom(a) * numer(b)
  )
}

function subtract(a: Ratio, b: Ratio): Ratio {
  return makeRatio(
    (numer(a) * denom(b)) - (numer(b) * denom(a)),
    denom(a) * denom(b)
  )
}

function sum(a: Ratio, b: Ratio): Ratio {
  return makeRatio(
    (numer(a) * denom(b)) + (numer(b) * denom(a)),
    denom(a) * denom(b)
  )
}

function isRatio<a>(v: a): boolean {
  // improve detecting ration type. Maybe use a constructor or a hidden
  // property
  return Array.isArray(v) && v.length === 2
}

function isMoney(v: any): boolean {
  return isRatio(v)
}

function money(amount: number|Money): Money {
  if (typeof amount === 'number') {
    return makeRatio(amount * 100, 100)
  }

  return amount
}

function toNumber(ratio: Ratio): number {
  return numer(ratio) / denom(ratio)
}

function hrMoney(money: Money): string {
  return toNumber(money).toFixed(2)
}

module.exports = {
  toNumber,
  hrMoney,
  money,
  subtract,
  divide,
  sum,
  isMoney,
}
