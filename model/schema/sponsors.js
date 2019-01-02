var mongoose = require('mongoose');

var sponsors = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  link: {
    type: String,
    require: true
  },
  sponsored: {
    type: String,
    require: true
  },
  linkLogo: {
    type: String,
    require: true
  }
})
module.exports = sponsors;