const Post = require('../models/posts');

const  postServices = {
    create : async function(req) {
        const body = new Post({
            title : req.body.title,
            description: req.body.description,
            user : "6130c3bd599b59e4c8b93ebd"
        });
        try {
            var data = await body.save();            
            return {data: data, status : 'success'}
        } catch (error) {          
            return error;
        }
        
    },    
    getAll : async function(){
        try {
            var data = await Post.find({user: "6130c3bd599b59e4c8b93ebd"}).populate('title').exec();
            return {data: data, status : 'success'}
        } catch (error) {
            return error;
        }
    },

    getOne : async function(id){
        try {
            var data = await Post.findById(id, 'title description').exec();           
            return {data: data, status : 'success'}
        } catch (error) {
            return error;
        }
    },

    update : async function(id, req){
        const body = req.body
        try {
            var data = await Post.findByIdAndUpdate(id, body, {new : true, select : 'title description'});            
            return {data: data, status : 'success'}
        } catch (error) {
            return error;
        }
    }
}

module.exports = postServices