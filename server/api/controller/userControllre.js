const bcrypt = require('bcrypt-nodejs');
const User = require('../schema/user')
const {validateUser} = require('../../utitilies/helper')

exports.login = async(req,res,next) => {
    try{
        console.log(req.body)
        const {phone, password} = req.body
        if(!phone || !password) return res.status(400).json({msg:'bad request'})
        const user = await User.findOne({phone})
        if(!user) return res.status(404).json({msg:'user not  found'})
        if(!user.isActive) return res.status(200).json({msg:'not active'})
        const isValid = user.validPassword(password)
        if(!isValid) return res.status(403).json({msg:'not authorized'})

        return res.status(200).json({msg:'success',user})
    }catch(error){
        console.log({error})
        return res.status(500).json({msg:'server error'})
    }
}

exports.register = async(req,res,next) => {
    try{
        const {phone, password,name} = req.body
        if(!phone || !password, !name) return res.status(400).json({msg:'bad request'})
        const user = await User.findOne({phone})
        console.log({user2:user})
        if(user) return res.status(400).json({msg:'this account is already registered'})
        const newUser = new User({phone, password,name})
         await newUser.save()
        console.log({newUser})
        validateUser(newUser._id)
        return res.status(200).json({msg:'success',user:newUser})
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:error})
    }
}