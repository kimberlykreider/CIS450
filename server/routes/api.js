import express from 'express'
import { query } from '../server'


var apiRouter = express.Router();

//post request used to sign in
apiRouter.post('/signin', function (req,res) {

})

//post request used to sign up
apiRouter.post('/signUp', function(req, res) {

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