var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/templates/index.html');
  });

http.listen(port, () => {
  console.log('Escuchando el puerto '+port+"...");
});

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

