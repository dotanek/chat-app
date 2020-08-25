import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';
import axios from 'axios';

import Channel from './Channel';
import Message from './Message';
import ChannelAdd from './ChannelAdd';

import iconClouds from '../../icons/clouds-white.svg';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Window = styled.div`
    width: 50vw;
    height: 30vw;
    display: flex;
    flex-wrap: wrap;
`

const Header = styled.div`
    display: flex;
    background-color: #19640a;
    color: white;
    width: 100%;
    height: 15%;
    align-items: center;
    padding-left: 1.5vw;
    font-size: 1.5vw;
    font-weight: bold;
`

const IconHeader = styled.img`
    height: 30%;
    margin-right: 0.5%;
    transform: translateY(5%);
`

const Display = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    width: calc(80% - 2vw);
    height: calc(75% - 1vw);
    padding: 1vw 1vw 0vw 1vw;
    color: #000000;

    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #308d1e rgba(0,0,0,0);

    &::-webkit-scrollbar {
        width: 3%;
    }

    &::-webkit-scrollbar-track {
        background-color: rgba(0,0,0,0);
    }

    &::-webkit-scrollbar-thumb {
        background-color: #308d1e;
    }

    & :nth-last-child(2) div:last-child {
        margin-bottom: 1vw;
    }
`

const Placeholder = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.8vw;
`

const Navigator = styled.div`
    background-color: #308d1e;
    width: 20%;
    height: 75%;

    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #ffffff #308d1e;

    &::-webkit-scrollbar {
        width: 3%;
    }

    &::-webkit-scrollbar-track {
        background-color: #308d1e;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ffffff;
    }
`

const InputBar = styled.form`
    display: flex;
    background-color: #19640a;
    height: 6%;
    width: 96%;
    padding: 2%;
`

const Input = styled.input`
    width: 92%;
    padding: 0% 1%;
    background-color: #ffffff;
    border: 0;

`

const Send = styled.button`
    border: 0;
    background-color: #5fb94d;
    width: 8%;
    transition: 0.2s ease-in-out;
    color: #ffffff;
    font-size: 0.6vw;
    font-weight: bold;

    &:hover {
        cursor: pointer;
        color: #0d2f07;
        background-color: #9de48f;
    }
`

class Chat extends Component {
    state = {
        inputValue: ''
    }

    constructor(props) {
        super(props);
        this.state.signedIn = false;
        this.displayBottomRef = React.createRef();
    }

    connect = async () => {

        let redirect = false;

        const username = queryString.parse(this.props.location.search).username;
        if (!username || username.length === 0 || /[^A-Za-z0-9]+/g.test(username)) {
            redirect = true;
        }

        await axios.get(`http://localhost:9000/user-check?username=${username}`)
            .then(res => {
                if (res.data.error) {
                    console.log(res.data.error);
                    redirect = true;
                }
            })
            .catch(err => {
                return this.setState({redirect: true});
            });

        if (redirect) {
            if (this.mounted) {
                this.setState({redirect: true});
            }
            return;
        } 

        this.setState({signedIn: true}); 

        // After signing in.

        this.socket = io('localhost:9000');
        this.socket.emit('sign-in', username);

        this.socket.on('channel-list', channels => {
            this.setState({channels}); // In case channels get added/deleted.
        });

        this.socket.on('message', message => {
            let messages = [...this.state.messages];
            messages.push(message);
            this.setState({messages});
        });
    }

    onClickChannel = channel => {
        if (!this.state.signedIn) return;

        this.socket.emit('join-channel', channel);

        const channels = [...this.state.channels];
        channels.forEach(ch => ch.active = false);
        const target = channels.find(ch => ch.id === channel.id);
        target.active = true;

        axios.get(`http://localhost:9000/get-messages?channelID=${target.id}`)
            .then(res => {
                if (res.data.error) {
                    return this.setState({error: res.data.error});
                }
                const messages = res.data.messages;
                this.setState({messages});
            })
            .catch(err => {
                console.log(err);
            });
    }

    onChangeInput = e => {
        const value = e.target.value;
        this.setState({inputValue:value});
    }

    onSubmitInput = e => {
        e.preventDefault();
        this.socket.emit('message', this.state.inputValue);
        this.setState({inputValue:''});
    }

    onClickConfirm = channelName => {
        axios.get(`http://localhost:9000/create-channel?channelName=${channelName}`)
        .then(res => {
            console.log(res.data);
            if (res.data.error) {
                return this.setState({error: res.data.error});
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    renderChannels = () => {
        if (this.state.channels) {
            return this.state.channels.map(ch => <Channel
                key={ch.id}
                name={ch.name}
                active={ch.active}
                channel={ch}
                handleOnClick={() => this.onClickChannel(ch)}
            />);
        }
    }

    renderMessages = () => {
        if (!this.state.messages) {
            return <Placeholder>Enter a channel using menu at the side!</Placeholder>
        } else if (this.state.messages.length === 0) {
            return <Placeholder>There are no messages in this channel.</Placeholder>
        } else {
            let key = 0;
            return this.state.messages.map(m => <Message
                key={key++}
                author={m.author}
                content={m.content}
            />);
        }
    }

    componentDidMount = () => {
        this.mounted = true;
        this.connect();
        if (!this.state.signedIn) return; // Prevent connecting while not signed in.

        const username = queryString.parse(this.props.location.search).username;
    }

    componentDidUpdate = () => {
        if (!this.state.signedIn) return;
        this.displayBottomRef.current.scrollIntoView();
    }

    componentWillUnmount = () => {
        this.mounted = false;
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.state.redirect && <Redirect to='/' />}
                <Container>
                    <Window>
                        <Header>
                            <IconHeader src={iconClouds} />
                            chat-app
                            </Header>
                        <Display>
                            {this.renderMessages()}
                            <div ref={this.displayBottomRef}></div>
                        </Display>
                        <Navigator>
                            {this.renderChannels()}
                            <ChannelAdd onClickConfirm={this.onClickConfirm} />
                        </Navigator>
                        <InputBar onSubmit={this.onSubmitInput}>
                            <Input type='text' value={this.state.inputValue} onChange={this.onChangeInput} s/>
                            <Send type='submit'>Send</Send>
                        </InputBar>
                    </Window>
                </Container>
            </React.Fragment> 
        );
    }
}
 
export default Chat;