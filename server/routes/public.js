var express = require('express');
var checkAuthentication = require('../middleware/checkAuthentication');
var path = require('path');

var publicRouter = express.Router();

publicRouter.use('/auth',checkAuthentication);

publicRouter.get('/signin', function(req, res) {
    res.sendFile(path.join(__dirname, '../../src/public/sign-in.html'));
});

publicRouter.get('/auth/plan', function(req, res) {
    res.sendFile(path.join(__dirname, '../../src/public/date-planner.html'));
});

publicRouter.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../src/public/sign-in.html'));
});

module.exports = publicRouter;
