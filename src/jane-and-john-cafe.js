const {john, jane} = require('./jane-and-john-users')
const {user, transaction, split} = require('./index')

const cafeCrock = user({name: 'Cafe Crock'})

const transactions = [

  transaction({
    description: "Jane's Cake",
    from: cafeCrock,
    to: jane,
    amount: 2,
  }),
  transaction({
    description: "Jane's Cake",
    from: john,
    to: cafeCrock,
    amount: 2,
  }),

  ...split([jane, john], transaction({
    description: 'Coffee and water',
    from: john,
    to: cafeCrock,
    amount: 6,
  }))
]

module.exports = transactions
