const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostsSchema = Schema({  
  title: {
    type: String,
    required: true
  },
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'Users' }
});

module.exports = mongoose.model('Posts', PostsSchema);