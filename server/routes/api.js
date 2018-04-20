var express =  require('express');
var connection = require('../server');
var User =  require('../db/user');
var jwt = require('jsonwebtokens');

var apiRouter = express.Router();

//post request used to sign in
apiRouter.post('/signin', function (req,res) {
    User.authenticate(req.body.username, req.body.password)
    .then((result) => {
        if (result) {
            var payload = {
                authenticated: true
              };
              var token = jwt.sign(payload, 'this is the secret');
            res.json({message: 'authentication sucessful', token: token});
        } else {
            res.json({message: 'authenticantion failed'});
        }
    })
    .catch((err) => {
        res.json({message: 'error has occured', data: err});
    })
});

//post request used to sign up
apiRouter.post('/signUp', function(req, res) {
    User.createUser(req.body.username, req.body.password, req.body.email)
    .then((user) => {
        var payload = {
            authenticated: true
          };
          var token = jwt.sign(payload, 'this is the secret');
        res.json({message: 'Sign up successful', data: user, token: token});
    })
    .catch((err) => {
        res.json({message: 'error has occured', data: err});
    })
});

//get request used to query for data
// apiRouter.get('/data', function(req, res) {
//     console.log(query);
//     query('select * from joined where rownum < 10') //needs actual query
//     .then((data) => {
//       res.json({message: 'success', data: data}); //returns array of js objects as returned rows of query
//       //return connection.close();
//     })
//     .catch((err) => {
//       res.sendStatus("500");
//       res.json({message: 'error has occured', data: err});
//       //return connection.close;
//     });
//   });

  module.exports = apiRouter;