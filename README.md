# jwt
small node application for demonstrating how to use json web tokens

#To Run
1. npm install
2. node (or node-dev) server.js

#Postman Endpoints
https://www.getpostman.com/collections/2545c2d24ef039451a35

#Token Instructions
Once you post to the login endpoint, it will return a token.  To use the non-GET endpoints, add the Authorization header to the request with a value of 'Bearer [the token from the login endpoint]'.