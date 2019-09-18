const User = require('../api/schema/user')

// it should be with activation link via email or code via mobile 
exports.validateUser = (id) => {
    try{
        setTimeout(async () => {
            await User.updateOne({_id:id},{isActive:true})
            console.log('updated',id)
            },20000)
    }catch(err) {
        console.log(err)
    }
}