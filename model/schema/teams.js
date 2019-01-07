var mongoose = require('mongoose');

var teams = new mongoose.Schema({
  teamName: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true
  },
  emailLeader: { 
    type: String,
    require: true
  },
  platform: { 
    type: String,
    require: true
  },
  member: [{
    name: String,
    MSSV: String,
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
    round: Number,
    judge: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'}
    }]
  }]

})

module.exports = teams;