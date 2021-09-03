const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = Schema({  
  name: {
    type: String,
    required: true
  },
  email: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }]
});

module.exports = mongoose.model('Users', UsersSchema);