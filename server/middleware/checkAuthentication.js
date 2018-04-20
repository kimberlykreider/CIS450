var path = require('path');
var jwt = require('jsonwebtokens');

let checkAuthentication = function (req, res, next) {
    //grabs token
    var token = req.body.token || req.query.token || req.headers['auth-token'];
    
    if (token) {
      jwt.verify(token, 'this is the secret', function (err, decoded) {
        if (err) {
            res.redirect(path.join(__dirname, '../../src/public/sign-in'));
        } else {
            next();
        }
      });
    } else {
        res.redirect(path.join(__dirname, '../../src/public/sign-in'));
    }
}