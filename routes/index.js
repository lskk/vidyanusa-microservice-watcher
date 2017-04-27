var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');

var mubsub = require('mubsub');

var client = mubsub('mongodb://127.0.0.1:27017/vidyanusa');
var channel = client.channel('vidyanusa');

client.on('error', console.error);
channel.on('error', console.error);

channel.subscribe('bar', function (message) {
    console.log(message.foo); // => 'bar'
});

channel.subscribe('baz', function (message) {
    console.log(message); // => 'baz'
});
// The given event was published
channel.on('myevent', console.log);

// Any event was published
channel.on('message', console.log);

// Document was inserted
channel.on('document', console.log);

channel.on('ready', console.log);

channel.publish('bar', { foo: 'bar' });
channel.publish('baz', 'baz');

module.exports = router;
