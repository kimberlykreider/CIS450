var express = require('express');
var checkAuthentication = require('../middleware/checkAuthentication');

var publicRouter = express.Router();

publicRouter.use(checkAuthentication);

publicRouter.get('/', function(req, res) {
    res.render('./public/sign-in.html');
});

publicRouter.get('/plan', function(req, res) {

});

module.exports = publicRouter;
