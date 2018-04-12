const {transaction} = require('./index')
const {john, jane, wheelz} = require('./jane-and-john-users')

const bike = [
  transaction({
    description: 'Creditcard payment for bike',
    from: jane,
    to: wheelz,
    amount: 100,
  }),
  transaction({
    description: 'Wheelz gives 100 euros worth bike',
    from: wheelz,
    to: john,
    amount: 100
  }),
  // john was given 100 euros value but hasn't paid anything
]

module.exports = bike
