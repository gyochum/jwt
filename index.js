var express = require('express');
var api = express();
var jwt = require('jsonwebtoken');
var eJwt = require('express-jwt');
var repo = require('./repository');
var secret = 'garyzsuperbigsecret';

//middleware

//routes
api.get('/api/music', repo.get);


//error handler

//start
api.listen(3000, function(){
    console.log('listening on port 3000....');
});
