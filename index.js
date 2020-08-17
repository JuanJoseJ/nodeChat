'use strict';

var express = require('express');
var app = express()
var io = require('socket.io')(http);
var path = require('path');
var port = 3000;

app.use(express.static(path.join(__dirname, '')));

module.exports = app;

//Rutas
app.get('/chat', (req, res) => {
    res.sendFile(__dirname+'/templates/index.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/templates/landing.html');
});

//Controlador del socket
io.on('connection', (socket) => {
    console.log('Se ha establecido una conexión');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('Mensaje en el puerto '+port+": " + msg);
    });
    socket.on('disconnect', () => {
        console.log('Se ha cortado una conexión');
    });
});

