import express from 'express'


var app = exress();
app.get('/', function(req, res) {
    res.send('./public/signIn.html');
});