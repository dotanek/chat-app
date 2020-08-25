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

app.get('/get-messages', (req,res) => { // Message fetch
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

    const reqUrl = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const id = reqUrl.searchParams.get('channelID');
    const target = channelsMessages.find(ch => ch.channelId === id);

    if (typeof target === 'undefined') {
        return res.json({ error: 'Requested channel does not exist.'});
    }

    res.json({ messages:target.messages });
});

app.get('/user-check', (req,res) => { // User name availability
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

    const reqUrl = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const username = reqUrl.searchParams.get('username');
    const target = users.find(u => u.username === username);

    if (typeof target !== 'undefined') {
        return res.json({ error: 'User is already online.'});
    }

    res.json({ status:'Username available.' });
});


app.get('/create-channel', (req,res) => { // User name availability
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

    const reqUrl = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const channelName = reqUrl.searchParams.get('channelName');

    const channel = { 
        id: channelName,
        name: channelName,
        password: '',
    }

    const channelMessages = {
        channelId: channelName,
        messages: [],
    }

    if (channels.some(ch => ch.name === channel.name || ch.id === channel.name)) {
        return res.json({ error: 'Channel already exists!'});
    }

    channels.push(channel);
    channelsMessages.push(channelMessages);
    io.sockets.emit('channel-list', channels);

    res.json({ status:'Channel created successfully.' });
});

io.on('connection', socket => {
    console.log('User connected!');

    let user = { }

    socket.emit('channel-list', channels);

    socket.on('sign-in', username => { // Sign in
        user.username = username;
        users.push(user);
    });

    socket.on('disconnect', () => { // Sign out
        if (users.some(u => u === user)) { // Not sure if should be done by reference or username.
            users.splice(users.indexOf(user),1);
        } else {
            console.log('Disconnecting user does not exist.');
        }

        if (user.channel) {
            socket.leave(user.channel.id);
        }
    });

    socket.on('join-channel', channel => {
        if (channels.some(ch => ch.id === channel.id)) {
            if (user.channel) {
                socket.leave(user.channel.id);
            }

            user.channel = channel;
            socket.join(user.channel.id);
        } else {
            console.log('Requested channel does not exist.');
            return socket.emit('status', { error: 'Requested channel does not exist.' });
        }
    });

    socket.on('message', message => {
        if (user.channel) {
            let newMessage = {
                author: user.username,
                content: message
            }
        
            const channelMessages = channelsMessages.find(chm => chm.channelId === user.channel.id);

            if (typeof channelMessages === 'undefined') {
                return console.log('Channel messages not found.')
            }

            channelMessages.messages.push(newMessage);
            io.to(user.channel.id).emit('message', newMessage);
        }
    });
});

// Data

let users = [
    { username: 'test-user1' }
]

let channels = [
    { 
        id:'default1',
        name:'Default1',
        password: '',
    },
    { 
        id:'default2',
        name:'Default2',
        password: '',
    },
    { 
        id:'default3',
        name:'Default3',
        password: '',
    },
]

let channelsMessages = [
    {
        channelId: 'default1',
        messages: [],
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