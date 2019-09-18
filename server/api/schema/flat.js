const mongoose = require('mongoose');
const moment =require('moment')

const Schema = mongoose.Schema;

const flatSchema = new Schema({
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
    pricePerDay:{
       type:Number,
       required:true
    },
    available:{
     isAvailable:{type: Boolean,default: true},
     startDate: {type: Date, required: true},
     endDate: {type: Date, required: true}

     // needs a script to run periodically to archive un available announcements 
    },
    dayes:{type:[{
        available:{
        type:Boolean
    },
    day : Date
    }],default: []}
})


flatSchema.methods.getDays = (startDate,endDate) => {
    console.log({startDate,endDate})
    let start = moment(startDate), // Sept. 1st
        end = moment(endDate), // Nov. 2nd
        day = 0;
        result = []                    // Sunday
    var current = start.clone();
    while (current.day(day).isBefore(end)) {
      result.push({available:true,day:current.clone()});
      day++
      if(day === 8) day = 0
    }
    result.forEach(m => m.day.format('ll'))
    return result
  }

  module.exports = mongoose.model('Flat', flatSchema);



