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

// Variables and objects


// Routes

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
    const name = reqUrl.searchParams.get('name');
    const password = reqUrl.searchParams.get('password');
    const owner = reqUrl.searchParams.get('owner');

    const channel = { 
        id: name,
        name: name,
        owner: owner,
        password: (password.length !== 0),
        users: 0
    }

    const channelMessages = {
        channelId: name,
        messages: [],
    }

    const channelSecurity = {
        channelId: name,
        password: password
    }

    if (channels.some(ch => ch.name === channel.name || ch.id === channel.name)) {
        return res.json({ error: 'Channel already exists!'});
    }

    channels.push(channel);
    channelsMessages.push(channelMessages);
    channelsSecurity.push(channelSecurity);
    io.sockets.emit('channel-list', channels);

    res.json({ status:'Channel created successfully.' });
});

app.get('/remove-channel', (req,res) => { // User name availability
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

    const reqUrl = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const channelId = reqUrl.searchParams.get('channelId');
    const owner = reqUrl.searchParams.get('owner');

    if (owner === '$erver') {
        return; // Prevents users from removing default channels.
    }

    console.log(channelId,' - ', owner);

    const target = channels.find(ch => ch.id === channelId);

    if (typeof target === 'undefined') {
        return res.json({ error: 'Channel does not exist.'});
    }

    if (target.owner !== owner) {
        return res.json({ error: 'Not the owner of the channel.'});
    }

    const targetMessages = channelsMessages.find(ch => ch.id === channelId);

    users.forEach(u => {
        if (u.channel === target) {
            u.channel = undefined;
        }
    });

    channels.splice(channels.indexOf(target),1);
    channelsMessages.splice(channelsMessages.indexOf(targetMessages),1);

    io.sockets.emit('channel-list', channels);
    res.json({ status:'Channel removed successfully.' });
});

app.get('/password-check', (req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

    const reqUrl = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const channelId = reqUrl.searchParams.get('channelID');
    const user = reqUrl.searchParams.get('user');
    const password = reqUrl.searchParams.get('password');

    const target = channels.find(ch => ch.id === channelId);

    if (typeof target === 'undefined') {
        console.log('Channel does not exist.')
        return res.json({ error:'Channel does not exist.' });
    }

    if (!target.password) {
        console.log('Channel has no password.')
        return res.json({ result: true }); 
    }

    const targetSecurity = channelsSecurity.find(ch => ch.channelId === target.id);

    if (typeof targetSecurity === 'undefined') {
        console.log('Requested channel has no security counterpart.');
        return res.json({ error:'Requested channel has no security counterpart.' });
    }

    if (targetSecurity.password !== password) {
        console.log('Incorrect password was given.')
        return res.json({ result: false }); 
    }

    res.json({ result: true });
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
            user.channel.users--;
            io.to(user.channel.id).emit('channel-update', user.channel);
        }
    });

    socket.on('join-channel', data => {
        const channel = data.channel;
        const password = data.password;
        const target = channels.find(ch => ch.id === channel.id);

        if (typeof target !== 'undefined') {
            if (target.password) {
                const targetSecurity = channelsSecurity.find(ch => ch.channelId === target.id);

                if (typeof targetSecurity === 'undefined') {
                    console.log('Requested channel has no security counterpart.');
                    return socket.emit('status', { error: 'Requested channel has no security counterpart. This is a technical issue.' });
                }

                if (password !== targetSecurity.password) {
                    console.log('Incorrect password was given.');
                    return socket.emit('status', { error: 'Incorrect password was given.' });
                }
            }

            if (user.channel) {
                socket.leave(user.channel.id);
                user.channel.users--;
                io.to(user.channel.id).emit('channel-update', user.channel);
            }

            user.channel = target;
            user.channel.users++;
            socket.join(user.channel.id);
            io.to(user.channel.id).emit('channel-update', user.channel);
        } else {
            console.log('Requested channel does not exist.');
            return socket.emit('status', { error: 'Requested channel does not exist.' });
        }
    });

    socket.on('message', message => {
        if (user.channel) {
            let newMessage = {
                author: user.username,
                content: message,
                date: Date.now()
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
        owner: '$erwer',
        password: false,
        users: 0
    },
    { 
        id:'default2',
        name:'Default2',
        owner: '$erwer',
        password: false,
        users: 0
    },
    { 
        id:'default3',
        name:'Default3',
        owner: '$erwer',
        password: false,
        users: 0
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

let channelsSecurity = [
    {
        channelId: 'default1',
        password: ''
    },
    {
        channelId: 'default2',
        password: '',
    },
    {
        channelId: 'default3',
        password: '',
    }
]