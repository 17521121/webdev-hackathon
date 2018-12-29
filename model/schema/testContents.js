var mongoose = require('mongoose');

var testContents = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  year: {
    type: Date,
    default: new Date()
  },
  semester: {
    type: Number,
    require: true
  },
  deadline: {
    type: String,
    require: true
  },
  round: {
    type: Number,
    require: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = testContents;