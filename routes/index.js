
module.exports = app => {
  app.use('/api', require('./api'));
  app.use('/setup', require('./setup'))
  app.use('/admin', require('./adminpage'));
  app.use('/', require('./homepage'));
}