const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = 9000;

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

server.listen(port, () => {
    console.log(`Server started on port ${port}.`)
});
 
app.get('/backend', (req,res) => {
    console.log('Request!');
    res.send('Response!');
});

io.on('connection', socket => {
    console.log('User connected!');
    socket.on('user-message', message => {
        console.log(message);
    });
});