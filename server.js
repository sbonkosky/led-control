const PORT = 9191;

// configure pi pin
const rpio = require('rpio');
var pin = 12;
rpio.open(pin, rpio.OUTPUT, rpio.LOW);

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    var buttonState = 0; //variable to store button state
    socket.on('state', function (data) { //get button state from client
        console.log("Data recieved");
        rpio.write(pin, data); //turn LED on or off
    });
});

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});