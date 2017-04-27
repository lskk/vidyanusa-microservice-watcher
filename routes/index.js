var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');

//Deklarasi library untuk listen Mongo DB
var mongoOplog = require('mongo-oplog');
//import MongoOplog from 'mongo-oplog'
const oplog = mongoOplog('mongodb://127.0.0.1:27017/vidyanusa', { ns: 'vidyanusa.schools' })

oplog.tail();

oplog.on('op', data => {
  console.log(data);
});

oplog.on('insert', doc => {
  console.log(doc);
});

oplog.on('update', doc => {
  console.log(doc);
});

oplog.on('delete', doc => {
  console.log(doc.o._id);
});

oplog.on('error', error => {
  console.log(error);
});

oplog.on('end', () => {
  console.log('Stream ended');
});

oplog.stop(() => {
  console.log('server stopped');
});

module.exports = router;
