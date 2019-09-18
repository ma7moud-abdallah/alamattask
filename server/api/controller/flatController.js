const Flat = require('../schema/flat')


exports.addOne = async(req,res,next) => {
    try{
        const flat = new Flat(req.body)
        flat.dayes = flat.getDays(flat.available.startDate,flat.available.endDate)
        console.log(flat.dayes)
        await flat.save()
        return res.status(200).json({msg:'success',flat})
    }catch(error){
        console.log({error})
        return res.status(500).json({msg:'server error'})
    }
}


exports.getAll = async(req,res,next) => {
    try{
        const flat = await Flat.find({'available.isAvailable':true})
        if(!flat) return res.status(404).json({msg:'flat not  found'})
        return res.status(200).json({msg:'success',flat})
    }catch(error){
        console.log({error})
        return res.status(500).json({msg:'server error'})
    }
}

exports.getOne = async(req,res,next) => {
    try{
        const {id} = req.params
        if(!id) return res.status(400).json({msg:'bad request'})
        const flat = await Flat.findOne({_id:id})
        if(!flat) return res.status(404).json({msg:'flat not found'})
        return res.status(200).json({msg:'success',flat})
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:error})
    }
}