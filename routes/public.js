var express = require('express');
var checkAuthentication = require('../middleware/checkAuthentication');
var path = require('path');

var publicRouter = express.Router();
publicRouter.use(express.static('public'));

publicRouter.use('/auth',checkAuthentication);

publicRouter.get('/signin', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/sign-in.html'));
});

publicRouter.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/sign-up.html'));
});

publicRouter.get('/auth/plan', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/date-planner.html'));
});

publicRouter.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/sign-in.html'));
});

module.exports = publicRouter;
