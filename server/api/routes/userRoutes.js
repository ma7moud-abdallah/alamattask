const express = require('express')
const user = require('../controller/userControllre')

const route = express.Router()

route.post('/login',user.login)
route.post('/register',user.register)

module.exports = route