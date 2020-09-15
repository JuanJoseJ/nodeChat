var express = require('express');
var app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var port = 3000;

app.use(express.static(path.join(__dirname, '')));

//Rutas
app.get('/chat', (req, res) => {
    res.sendFile(__dirname+'/templates/chat.html');
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
    socket.on('message', (text) => {
        io.emit('message', text);
        console.log('Mensaje en el puerto '+port+": " + text.mensaje);
    });
    socket.on('disconnect', () => {
        console.log('Se ha cortado una conexión');
    });
});

