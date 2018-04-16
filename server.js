const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const jwt = require('jsonwebtoken');
//const config = require('./config');

var oracledb = require('oracledb');
oracledb.getConnection(
  {
    user          : 'team13',
    password      : 'team13!!',
    connectString : '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=finalprojectcis450.cjppovwc5n4y.us-east-2.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SID=ORCL)))'
  }, function(err, connection) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log('connected');
  });

// instantiate express app1
const app = express();


// set the superSecret key in our app which we will use  to sign our jwts
//app.set('superSecret', config.secret);
// instantiate bodyParser middleware so we can get fields from post requests via req.body.fieldName
app.use(bodyParser.urlencoded({ extended: true }));

// set up app to listen on port 3000  or any env port specified
app.listen(process.env.PORT || 3000, () => {
  console.log('listening on ' + (process.env.PORT || 3000));
});

// export app for testing purposes
module.exports = app;
