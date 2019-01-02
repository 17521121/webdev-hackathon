var mongoose = require('mongoose');
var schema = require('./schema/index');

module.exports = {
  users: mongoose.model('users', schema.users),
  posts: mongoose.model('posts', schema.posts),
  teams: mongoose.model('teams', schema.teams),
  sponsors: mongoose.model('sponsors', schema.sponsors),
  testContents: mongoose.model('testContents', schema.testContents),
  randCode: mongoose.model('randCode', schema.randCode)
}