const express = require('express')
const reservation = require('../controller/reservationController')

const route = express.Router()

route.post('/',reservation.addReservation)


module.exports = route