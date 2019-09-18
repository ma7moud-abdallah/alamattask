const mongoose = require('mongoose');
const config = require('config');


//Promise = require('bluebird');
mongoose.Promise = Promise;
module.exports = {
  connect: () => {
    const db = config.get('db').url;
    mongoose.connect(
      db,
      { useNewUrlParser: true },
      (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
      },
      console.log('connected')
    );
  }
};