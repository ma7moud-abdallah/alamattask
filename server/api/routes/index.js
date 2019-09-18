const router = require('express').Router();

const userRoute = require('../routes/userRoutes')
const reservationRoute = require('../routes/reservationRoutes')
const flatRoute = require('../routes/flatRoute')

router.use('/reservation',reservationRoute)
router.use('/user',userRoute)
router.use('/flat',flatRoute)

module.exports = router
