const {transaction, user, split, print} = require('../../dist/index')

const john = user({name: 'John'})
const jane = user({name: 'Jane'})
const radioPalace = user({name: 'RadioPalace'})
const johnAndJane = [john, jane]

const transactions = split(johnAndJane,
  transaction({
    description: 'Radio',
    amount: 20,
    from: john,
    to: radioPalace,
  })
)

print(transactions)
