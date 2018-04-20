var express = require('express');

var publicRouter = express.Router();

publicRouter.get('/', function(req, res) {
    res.render('./public/sign-in.html');
});

publicRouter.get('/plan', function(req, res) {
    
});

module.exports = publicRouter;
