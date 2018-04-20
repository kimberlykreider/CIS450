var express = require('express');
var checkAuthentication = require('../middleware/checkAuthentication');
var path = require('path');

var publicRouter = express.Router();

//publicRouter.use('/auth',checkAuthentication);

publicRouter.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../src/public/sign-in.html'));
    console.log(path.join(__dirname, '../../src/public/sign-in.html'));
});

publicRouter.get('/auth/plan', function(req, res) {
    console.log(path.join(__dirname, '../../src/public/date-planner.html'));
    res.render(path.join(__dirname, '../../src/public/date-planner.html'));
});

module.exports = publicRouter;
