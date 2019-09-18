const express = require('express');
const config = require('config')
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.static(__dirname + '/public'));

var http = require('http').Server(app);
var io = require('socket.io')(http);
io.origins('*:*')
exports.publishToWepApp = (event,data) => {
   io.emit(event,data)                   
   
}

require('./api/bootstrap/db').connect();
require('./api/bootstrap/routes')(app);

const port = process.env.PORT || 3000;
http.listen(port, () => console.log(`Listening on port ${port}...`));


module.exports = io