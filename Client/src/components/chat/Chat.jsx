import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';

import Channel from './Channel';
import Message from './Message';

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
    background-color: #ffffff;
    width: 80%;
    height: 75%;
    color: #000000;
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

const ChannelAdd = styled.button`
    display: flex;
    width: 100%;
    height: 8%;
    justify-content: center;
    align-items: center;
    border: 0;
    background: none;
    color: #ffffff;
    font-size: 0.6vw;
    border-bottom: 1px solid rgba(255,255,255,0.5);
    transition: 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        color: #0d2f07;
        background-color: rgba(255,255,255,0.3);
    }
`

const InputBar = styled.div`
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
    state = { }

    authentication() {
       const username = queryString.parse(this.props.location.search).username;
       if (!username || username.length === 0 || /[^A-Za-z0-9]+/g.test(username)) {
           return true;
       }
       return false;
    }

    onClickChannel(channel) {
        const channels = [...this.state.channels];
        channels.forEach(ch => ch.active = false);
        const target = channels.find(ch => ch.id === channel.id);
        target.active = true;
        this.socket.emit('get-channel-contents', channel);
        this.setState({channels});
    }

    renderChannels() {
        if(this.state.channels) {
            return this.state.channels.map(ch => <Channel
                key={ch.id}
                name={ch.name}
                active={ch.active}
                channel={ch}
                handleOnClick={() => this.onClickChannel(ch)}
            />);
        }
    }

    renderMessages() {
        if (!this.state.messages) {
            return <Placeholder>Enter a channel using menu at the side!</Placeholder>
        } else if (this.state.messages.length === 0) {
            return <Placeholder>There are no messages in this channel.</Placeholder>
        } else {
            return this.state.messages.map(m => <Message
                key={m.author+this.state.messages.length}
                author={m.author}
                content={m.content}
            />);
        }
    }

    componentDidMount() {
        if (this.authentication()) return; // Prevent connecting on redirect.
        //const username = queryString.parse(this.props.location.search).username;
        this.socket = io('localhost:9000');
        this.socket.on('channel-list', channels => {
            this.setState({channels});
        });
        this.socket.on('channel-contents', contents => {
            if (contents.error) {
                return alert('Error retrieving channel contents.');
            }
            this.setState({ messages:contents.messages });
            console.log(this.state.messages);
        })
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.authentication() && <Redirect to='/' />}
                <Container>
                    <Window>
                        <Header>
                            <IconHeader src={iconClouds} />
                            chat-app
                            </Header>
                        <Display>
                            {this.renderMessages()}
                        </Display>
                        <Navigator>
                            {this.renderChannels()}
                            <ChannelAdd>+ new channel</ChannelAdd>
                        </Navigator>
                        <InputBar>
                            <Input />
                            <Send>Send</Send>
                        </InputBar>
                    </Window>
                </Container>
            </React.Fragment> 
        );
    }
}
 
export default Chat;