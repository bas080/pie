'use strict'

const {user} = require('./index')

const floris = user({name: 'Floris'})
const richard = user({name: 'Richard'})
const luigi = user({name: 'Luigi'})
const bas = user({name: 'Bas'})
const olympia = user({name: 'Olympia'})

module.exports = {
  floris,
  olympia,
  richard,
  luigi,
  bas,
}
