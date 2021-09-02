const mongoose = require('mongoose');


const UsersSchema = mongoose.Schema({  
  name: {
    type: String,
    required: true
  },
  email: String
});

module.exports = mongoose.model('Users', UsersSchema);