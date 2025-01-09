const express = require('express');
const { Login, GetUserById, GetAllUsers } = require('../Controllers/UserController');
const route = express.Router();

route.post('/login',Login);
route.get('/user/:id',GetUserById);
route.get('/allusers',GetAllUsers);

module.exports = route;