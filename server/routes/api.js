import express from 'express'
import { query } from '../server'
import User from '../db/user'


var apiRouter = express.Router();

//post request used to sign in
apiRouter.post('/signin', function (req,res) {
    User.authenticate(req.username, req.password)
    .catch((err) => {
        console.log('failed to authenticate user');
    })
})

//post request used to sign up
apiRouter.post('/signUp', function(req, res) {
    User.createUser(req.body.username, req.body.password, req.body.email)
    .catch((err) => {
        console.log('failed to create user');
    })
})

//get request used to query for data
apiRouter.get('/data', function(req, res) {
    query(queryString) //needs actual query
    .then((data) => {
      res.json(data); //returns array of js objects as returned rows of query
    })
    .catch((err) => {
      res.sendStatus("500");
      console.log(err.message);
    })
  });

  module.exports = apiRouter;