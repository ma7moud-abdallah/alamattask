const bcrypt = require('bcrypt-nodejs');
const User = require('../schema/user')
const Flat = require('../schema/flat')
const Reservation = require('../schema/reservation')

exports.addReservation = async(req,res,next) => {
    try{
        const {userId, flatId} = req.body
        if(!userId || !flatId) return res.status(400).json({msg:'bad request'})
        const user = await User.findOne({_id:userId})
        if(!user) return res.status(404).json({msg:'user not  found'})
        const flat = await Flat.findOne({_id:flatId})
        if(!flat) return res.status(404).json({msg:'flat not  found'})
        let payload = {...req.body}
        payload.flat = flat
        let reservation = new Reservation(payload)
        reservation =  reservation.addReservation(reservation)
        if(!reservation) return res.status(400).json({msg:'failed to add reservation'})
        return res.status(200).json({msg:'success',reservation})
    }catch(error){
        console.log({error})
        return res.status(500).json({msg:'server error'})
    }
}
