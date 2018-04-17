const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var oracledb = require('oracledb');

//function which takes in a queryString and executes the query. Returns promise which will return data as array of objects.
let query = (queryString) => {
  oracledb.getConnection(
    {
      user          : 'team13',
      password      : 'team13!!',
      connectString : '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=finalprojectcis450.cjppovwc5n4y.us-east-2.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SID=ORCL)))'
    })
    .then((connection) => {
      console.log('connected');
      return connection.execute(queryString);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// instantiate express app
const app = express();

app.get('/', function(req, res) {
  res.send('./public/sign-in.html');
});


app.get('/api/data', function(req, res) {
  query(queryString) //needs actual query
  .then((data) => {
    res.json(data); //returns array of js objects as returned rows of query
  })
  .catch((err) => {
    res.sendStatus("500");
    console.log(err.message);
  })
})

// instantiate bodyParser middleware so we can get fields from post requests via req.body.fieldName
app.use(bodyParser.urlencoded({ extended: true }));

// set up app to listen on port 3000  or any env port specified
app.listen(process.env.PORT || 3000, () => {
  console.log('listening on ' + (process.env.PORT || 3000));
});

// export app for testing purposes
module.exports = app;
