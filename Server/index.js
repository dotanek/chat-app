const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const url = require('url');

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

app.get('/get-messages', (req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

    const reqUrl = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const id = reqUrl.searchParams.get('channelID');
    const target = channelMessages.find(ch => ch.channelId === id);

    if (typeof target === 'undefined') {
        console.log('Request!');
        return res.json({ error: 'Requested channel does not exist.'});
    }

    res.json({ messages:target.messages });
});

io.on('connection', socket => {
    socket.emit('channel-list', channels);
    socket.on('get-channel-messages', channel => {
        const target = channelMessages.find(ch => ch.channelId === channel.id);

        if (typeof target === 'undefined') {
            console.log('Requested channel does not exist.');
            return socket.emit('channel-messages', { error: 'Requested channel does not exist.' });
        }  

        socket.emit('channel-messages', target.messages);
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

let channelMessages = [
    {
        channelId: 'default1',
        messages: [
            { author: 'test-user1', content: 'Well hello thereaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!' },
            { author: 'test-user2', content: 'General Kenobi.' },
            { author: 'test-user1', content: 'General Kenobi.' },
            { author: 'test-user1', content: 'General Kenobi.' },
            { author: 'test-user2', content: 'General Kenobi.' },
            { author: 'test-user2', content: 'General Kenobi.' },
            { author: 'test-user1', content: 'General Kenobi.' },
            { author: 'test-user1', content: 'General Kenobi.' },
            { author: 'test-user1', content: 'General Kenobi.' },
            { author: 'test-user1', content: 'General Kenobi.' },
            { author: 'test-user1', content: 'General Kenobi.' },
            { author: 'test-user1', content: 'General Kenobi.' },
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