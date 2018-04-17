import express from 'express'

var publicRouter = express.Router();

publicRouter.get('/', function(req, res) {
    res.send('./public/sign-in.html');
});

module.exports = publicRouter;
