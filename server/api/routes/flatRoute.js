const express = require('express')
const flat = require('../controller/flatController')

const route = express.Router()

route.get('/',flat.getAll)
route.post('/',flat.addOne)
route.get('/:id',flat.getOne)


module.exports = route