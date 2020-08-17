'use strict';
var express = require('express');
var app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var port = 3000;

app.use(express.static(path.join(__dirname, '')));

//Rutas
app.get('/chat', (req, res) => {
    res.sendFile(__dirname+'/templates/index.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/templates/landing.html');
});

//
http.listen(port, () => {
  console.log('Escuchando el puerto '+port+"...");
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

module.exports = app;