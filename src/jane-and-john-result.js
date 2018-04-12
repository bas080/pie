const cafeTransactions = require('./jane-and-john-cafe')
const wheelzTransactions = require('./jane-and-john-bike')
const {print} = require('./index')

print([
  ...cafeTransactions,
  ...wheelzTransactions
])
