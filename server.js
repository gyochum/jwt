var express = require('express');
var api = express();
var port = process.env.PORT || 1337;
var bp = require('body-parser');
var jwt = require('jsonwebtoken');
var eJwt = require('express-jwt');
var repo = require('./repository');
var settings = require('./data/settings');

//middleware
api.use(bp.json());

//verify jwt
api.use(eJwt({
    secret: settings.secret,
    getToken: function(request){
       if(request.headers.authorization){
           var token = request.headers.authorization.split(' ')[1];
           return token;
       }               
    }
}).unless({
    method: 'GET',
    path: [
        '/api/login'        
    ]
}));

//routes
api.get('/api/music', repo.get);
api.get('/api/music/:id', repo.findOne);
api.post('/api/music', repo.save);
api.put('/api/music/:id', repo.update);
api.delete('/api/music/:id', repo.delete);

api.post('/api/login', repo.login);

//error handler
api.use(function(error, request, response, next){
   response.status(401).send({
      name: error.name,
      message: error.message 
   });
});

//start
api.listen(port, function(){
    console.log('listening on port ' + port + '....');
});
