var express = require('express');
var api = express();
var port = process.env.PORT || 1337;
var bp = require('body-parser');
var jwt = require('jsonwebtoken');
var eJwt = require('express-jwt');
var repo = require('./repository');
var secret = 'garyzsuperbigsecret';

//middleware
api.use(bp.json());

//routes
api.get('/', function(request, response){
   response.send('hey azure'); 
});
api.get('/api/music', repo.get);
api.get('/api/music/:id', repo.findOne);
api.post('/api/music', repo.save);
api.put('/api/music/:id', repo.update);
api.delete('/api/music/:id', repo.delete);

api.post('/api/login', repo.login);

//error handler

//start
api.listen(port, function(){
    console.log('listening on port ' + port + '....');
});
