import express from 'express'

var publicRouter = express.Router();

publicRouter.get('/', function(req, res) {
    res.render('./public/sign-in.html');
});

module.exports = publicRouter;
