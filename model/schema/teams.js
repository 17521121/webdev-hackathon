var mongoose = require('mongoose');

var teams = new mongoose.Schema({
  teamName: {
    type: String,
    require: true
  },
  leaderId: { //mssv
    type: String,
    require: true
  },
  member: [{
    name: String,
    mssv: String,
    phone: String,
    school: String
  }],
  isPaid: {
    type: Boolean,
    default: false
  },
  submissions: [{
    year: Date,
    semester: Number,
    score: Number,
    path: String,
    judge: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'}
    }]
  }]

})

module.exports = teams;