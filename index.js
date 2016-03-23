var express = require('express');
var api = express();
var bp = require('body-parser');
var jwt = require('jsonwebtoken');
var eJwt = require('express-jwt');
var repo = require('./repository');
var secret = 'garyzsuperbigsecret';

//middleware
api.use(bp.json());

//routes
api.get('/api/music', repo.get);
api.get('/api/music/:id', repo.findOne);
api.post('/api/music', repo.save);
api.put('/api/music/:id', repo.update);
api.delete('/api/music/:id', repo.delete);

//error handler

//start
api.listen(3000, function(){
    console.log('listening on port 3000....');
});
