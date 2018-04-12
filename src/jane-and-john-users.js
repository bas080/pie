const {user} = require('./index')

const jane = user({name: 'Jane'})
const john = user({name: 'John'})
const wheelz = user({name: 'Wheelz Corp'})

module.exports = {
  jane,
  john,
  wheelz
}
