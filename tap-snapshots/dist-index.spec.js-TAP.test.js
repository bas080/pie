/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`dist/index.spec.js TAP  > undefined 1`] = `
[ { amount: '33.00',
    from: { name: 'A' },
    to: { name: 'Z' },
    description: undefined },
  { amount: '33.00',
    from: { name: 'Z' },
    to: { name: 'A' },
    description: undefined },
  { amount: '11.00',
    from: { name: 'A' },
    to: { name: 'B' },
    description: undefined },
  { amount: '11.00',
    from: { name: 'A' },
    to: { name: 'C' },
    description: undefined } ]
`

exports[`dist/index.spec.js TAP  > undefined 2`] = `
[ [ { name: 'A' }, '22.00' ],
  [ { name: 'Z' }, '0.00' ],
  [ { name: 'B' }, '-11.00' ],
  [ { name: 'C' }, '-11.00' ] ]
`

exports[`dist/index.spec.js TAP  > undefined 3`] = `
[ [ { name: 'A' }, '2.00' ],
  [ { name: 'B' }, '-1.00' ],
  [ { name: 'C' }, '-1.00' ] ]
`

exports[`dist/index.spec.js TAP  > undefined 4`] = `
[ { from: { name: 'A' },
    to: { name: 'A' },
    amount: [ 200, 100 ],
    description: 'banana split' },
  { from: { name: 'A' },
    to: { name: 'A' },
    amount: [ 200, 100 ],
    description: 'split banana split' },
  { from: { name: 'A' },
    to: { name: 'B' },
    amount: [ 20000, 20000 ],
    description: 'split banana split' } ]
`
