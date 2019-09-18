
const apiRouter = require('../routes/');
const express = require('express')



module.exports = function(app) {
  app.use(express.json())
  app.use('/api', apiRouter);
  app.get('*', (req, res) => {
    res.send('Not Found');
  })
}
