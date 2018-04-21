var express =  require('express');
var connection = require('../server');
var User =  require('../db/user');

var apiRouter = express.Router();

//post request used to sign in
apiRouter.post('/signin', function (req,res) {
    let username = req.body.username;
    let password = req.body.password;
    User.authenticate(username, password)
    .then((result) => {
        if (result) {
            req.session.isAuthenticated = true;
            res.json({message: 'authenticantion successful'});
        } else {
            res.json({message: 'authenticantion failed'});
        }
    })
    .catch((err) => {
        res.json({message: 'error has occured', data: err.message});
    })
});

//post request used to sign up
apiRouter.post('/signup', function(req, res) {
    User.createUser(req.body.username, req.body.password, req.body.email)
    .then((user) => {
        req.session.isAuthenticated = true;
        res.json({message: 'Sign up successful', data: user});
    })
    .catch((err) => {
        res.json({message: 'error has occured', data: err.message});
    })
});

  module.exports = apiRouter;