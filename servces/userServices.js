const User = require('../models/users');

const  userServices = {
    create : async function(req) {
        const body = new User({
            name : req.body.name,
            email: req.body.email
        });
        try {
            var data = await body.save();
            return {data: data, status : 'success'}
        } catch (error) {          
            return error;
        }
        
    },    
    get : async function(){
        try {
            var data = await User.find({});
            return {data: data, status : 'success'}
        } catch (error) {
            return error;
        }
    }
}

module.exports = userServices