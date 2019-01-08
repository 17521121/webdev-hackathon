var mongoose = require('mongoose');

var posts = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  category: [{
    type: String
  }],
  createdDate: {
    type: Date,
    require: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
})

module.exports = posts;