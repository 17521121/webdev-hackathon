var mongoose = require('mongoose');

var testContents = new mongoose.Schema({
  content: {
    type: String,
    require: true
  },
  year: {
    type: Date.year,
    require: true
  },
  semester: {
    type: Number,
    require: true
  },
  deadline: {
    type: Date,
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