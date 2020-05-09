const express = require("express");
const bodyParser = require('body-parser');
const app = express(); app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); 

var OK = 200
var CREATED = 201
var NO_CONTENT = 204
var NOT_FOUND = 404
var BAD_REQUEST = 400

let user = {
  name: '',
  surname: ''
}; 

var response = {
  message: ''
}; 

// GETs
app.get('/', function (req, res) {
  res.status(NOT_FOUND).send(response.message = "Not found");
}); 

app.get('/user', function (req, res) {
  if (user.name === '' || user.surname === '') {
    response['message'] = 'User not found'
    res.status(NOT_FOUND).send(response);
  } else {
    response['message'] = 'user fetched';
    response['user'] = user;
    res.status(OK).send(response);
  }
}); 

// POSTs
app.post('/user', function (req, res) {
  if (!req.body.name || !req.body.surname) {
    response['message'] = 'Missing required fields'
    res.status(BAD_REQUEST).send(response);
  } else {
    if (user.name !== '' || user.surname !== '') {
      response['message'] = 'User already exists'
      res.status(BAD_REQUEST).send(response);
    } else {
      user['name'] = req.body.name,
      user['surname'] = req.body.surname;
      response['message'] = 'User created successfully'
      res.status(CREATED).send(response);
    }
  }
}); 

// PUTs
app.put('/user', function (req, res) {
  if (!req.body.name || !req.body.surname) {
    response['message'] = 'User already exists'
    res.status(BAD_REQUEST).send(response);
  } else {
    if (user.name === '' || user.surname === '') {
      response['message'] = 'Fields name and surname could not be empty'
      res.status(BAD_REQUEST).send(response);
    } else {
      user['name'] = req.body.name,
      user['surname'] = req.body.surname;
      response['message'] = 'User updated successfully'
      res.status(200).send(response);
    }
  }
}); 

// DELETEs
app.delete('/user', function (req, res) {
  if (user.name === '' || user.surname === '') {
    response['message'] = 'Fields name and surname could not be empty'
    res.status(BAD_REQUEST).send(response);
  } else {
    res.status(NO_CONTENT).send();
  }
}); 

app.use(function (req, res, next) {
  res.status(NOT_FOUND).send();
}); 

app.listen(3000, () => {
  console.log("Server listening on PORT: 3000");
});