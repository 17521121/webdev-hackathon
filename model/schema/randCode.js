var mongoose = require('mongoose');

var randCode = new mongoose.Schema({
  text: {
    type: String,
    default: ""
  },
  teamId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teams'
  },
  expired: {
    type: Date,
    require: true
  }

})

module.exports = randCode;