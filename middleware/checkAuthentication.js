var path = require('path');

let checkAuthentication = function (req, res, next) {
    
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/signin');
    }
}
module.exports = checkAuthentication;