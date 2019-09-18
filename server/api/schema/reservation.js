const mongoose = require('mongoose');
const {publishToWepApp} = require('../../index')
const Flat = require('./flat')
const io = require('../../index');


const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId,'ref':'User'},
    flat:{
        _id: {type: mongoose.Types.ObjectId,'ref':'Flat'},
        bedRoomes:{
            type: Number,
            required: true
        },
        status:{
            type:String,
            enum: ["Furnished","not Furnished"],
            default: "not Furnished"
        },
        bathrooms:{
            type: Number,
        },
        Level: {
            type: Number,
        },
        address:{
            addr: {type:String,required:true},
            keyWords: {type : Array,default:[]}      
        },
        area: {
            type:Number
        },
        description:{
          type:String
        },
        available:{
         isAvailable:{type: Boolean,default: true},
         startDate: {type: Date, required: true},
         endDate: {type: Date, required: true}
        },
        pricePerDay:{
            type:Number,
            required:true
         },
         dayes:[]
    },
    dayes:[],
    numberOfDayes:{type:Number},
    stillRuning:{type: Boolean, required: true, default: true},
    price:{type: Number, required: true}
})

// must be here cause it has alot of buseniss 
reservationSchema.methods.addReservation = async(reservation) => {
    try{
      reservation.dayes.forEach(reservationDay => {
          reservation.flat.dayes.forEach(flatDay => {
            if(reservationDay._id == flatDay._id) {
                if(flatDay.available == false) return 
                flatDay.available = false
            }
          })
      })
      await reservation.save()
      await Flat.updateOne({_id:reservation.flat._id}, reservation.flat)
      publishToWepApp('reservation-added',{flat:reservation.flat,userId:reservation.userId})
      return reservation
    }catch(error){
     console.log({error})  
  }
  }

module.exports = mongoose.model('Reservation', reservationSchema);


  