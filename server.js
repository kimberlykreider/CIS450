const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var oracledb = require('oracledb');
var mongoose = require('mongoose')
var uuid = require('node-uuid');;

//allows use of mongoose promises
mongoose.Promise = global.Promise;

//connects to local noSQL database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/users');

//function which takes in a queryString and executes the query. Returns promise which will return data as array of objects.
function query(queryString) {
  return 
}

// instantiate express app
const app = express();

// Generate a random cookie secret for this app
var generateCookieSecret = function () {
  return 'iamasecret' + uuid.v4();
};

//use cookies
app.use(require('cookie-session')({secret: generateCookieSecret()}));

// instantiate bodyParser middleware so we can get fields from post requests via req.body.fieldName
app.use(bodyParser.urlencoded({ extended: true }));

//moved querying route to server since it requires a direct connection
app.get('/api/data', function(req, res) {
  oracledb.getConnection(
    {
      user          : 'team13',
      password      : 'team13!!',
      connectString : '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=finalprojectcis450.cjppovwc5n4y.us-east-2.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SID=ORCL)))'
    }, function (err, connection) {
      if (err) {
        res.json({message: 'failed to connect', data: err});
      } else {
        console.log(req.data.query);
        connection.execute('select * from joined where rownum < 4', function(err, data) {
          if (err) {
            res.json({message: 'error querying', data: err.message});
          } else {
            res.json({message: 'success', data: data});
          }
          connection.close(function(err) {
            if (err) {
              console.log('error closing');
              console.log(err.message);
            };
          });
        });
      }
    });
});

//api router
var apiRouter  = require('./routes/api');
app.use('/api', apiRouter);

//public router
var publicRouter = require('./routes/public');
app.use(express.static('public'));
app.use('/', publicRouter);

// set up app to listen on port 3000  or any env port specified
app.listen(process.env.PORT || 3000, () => {
  console.log('listening on ' + (process.env.PORT || 3000));
});

module.exports = query;
