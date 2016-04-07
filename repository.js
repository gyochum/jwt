var reader = require('jsonfile');
var jwt = require('jsonwebtoken');
var settings = require('./data/settings');


exports.get = function(request, response){
    reader.readFile('./data/music.json', function(error, tunes){
        if(error)
            console.log(error);
            
        response.json(tunes);    
    });    
}

exports.findOne = function(request, response){
    var id = request.params.id;
    
    reader.readFile('./data/music.json', function(error, tunes){
        var tune = tunes.filter(function(t, index){
           return t.id == id; 
        });
            
        response.json(tune);    
    }); 
}

exports.save = function(request, response){
    var tune = request.body;
    var tunes = reader.readFileSync('./data/music.json');
    
    if(tunes){
        tunes.push(tune);
        reader.writeFile('./data/music.json', tunes, function(error){
            if(error)
                console.log(error);
                
            response.json(tunes);
        });
    }            
}

exports.update = function(request, response){
    var id = request.params.id;
    var tune = request.body;
    var tunes = reader.readFileSync('./data/music.json');
    
    tunes.forEach(function(t, index){
        if(t.id == id){
            t.artist = tune.artist;
            t.tune = tune.tune;
            t.album = tune.album;
            t.year = tune.year;
        }
    });
    
    reader.writeFile('./data/music.json', tunes, function(error){
        if(error)
            console.log(error);
            
        response.json(tunes);
    });
}

exports.delete = function(request, response){
    var id = request.params.id;
    var tunes = reader.readFileSync('./data/music.json');
    
    var index = -1;
    tunes.forEach(function(tune, idx){
       if(tune.id == id)
        index = idx;           
    });
    
    if(index > -1){
        tunes.splice(index, 1);
        
        reader.writeFile('./data/music.json', tunes, function(error){
            if(error)
                console.log(error);
                
            response.json(tunes);
        });
    }
    else{
        response.send('could not find the tune you are trying to delete');    
    }    
}

exports.login = function(request, response, next){
    var post = request.body;
    var login = reader.readFileSync('./data/login.json');
    
    console.log(settings.secret);
    
    if(post.username === login.username && post.password === login.password){
        var payload = {
            username: post.username    
        };
        
        var token = jwt.sign(payload, settings.secret);
        
        response.send(token);                
    }
    else{
        response.sendStatus(403);
    }
}