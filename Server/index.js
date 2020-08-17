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

// Config

server.listen(port, () => {
    console.log(`Server started on port ${port}.`)
});

io.on('connection', socket => {
    socket.emit('channel-list', channels);
    socket.on('get-channel-contents', channel => {
        const target = channelContents.find(ch => ch.channelId === channel.id);

        if (typeof target === 'undefined') {
            console.log('Requested channel does not exist.');
            return socket.emit('channel-contents', { error: 'Requested channel does not exist.' });
        }  

        socket.emit('channel-contents', target);
    });
});

// Data

let channels = [
    { 
        id:'default1',
        name:'Default1',
        password: '',
        users: [],
    },
    { 
        id:'default2',
        name:'Default2',
        password: '',
        users: [],
        messages: [],
    },
    { 
        id:'default3',
        name:'Default3',
        password: '',
        users: [],
        messages: [],
    },
]

let channelContents = [
    {
        channelId: 'default1',
        messages: [
            { author: 'test-user1', content: 'Well hello there!' },
            { author: 'test-user2', content: 'General Kenobi.' },
        ],
    },
    {
        channelId: 'default2',
        messages: [],
    },
    {
        channelId: 'default3',
        messages: [],
    }
]