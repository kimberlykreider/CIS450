var path = require('path');
var jwt = require('jsonwebtoken');

let checkAuthentication = function (req, res, next) {
    //grabs token
    var token = req.body.token || req.query.token || req.headers['auth-token'];
    
    if (token) {
      jwt.verify(token, 'this is the secret', function (err, decoded) {
        if (err) {
            res.redirect('localhost:3000');
        } else {
            next();
        }
      });
    } else {
        res.redirect('localhost:3000');
    }
}

module.exports = checkAuthentication;