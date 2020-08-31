import React, { Component } from 'react';
import styled, { ThemeConsumer } from 'styled-components';
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
    position: relative;
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

const ChannelInfo = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 0;
    right: 0;
    height: 100%;
    padding-right: 3%;
    font-weight: normal;
`

const Name = styled.div`
    display: flex;
    align-items: flex-end;
    font-size: 0.9vw;
    font-weight: bold;
    justify-content: flex-end;
    height: 20%;
`

const Users = styled.div`
    display: flex;
    font-size: 0.7vw;
    align-items: center;
    justify-content: flex-end;
    height: 20%;
`

const Menu = styled.div`
    display: flex;
    font-size: 0.6vw;
    color: #4e0d0d;
    justify-content: flex-end;

    &:hover {
        cursor: pointer;
    }
`


const IconHeader = styled.img`
    height: 30%;
    margin-right: 0.5%;
    transform: translateY(5%);
`

const Display = styled.div`
    display: flex;
    position: relative;
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

const Password = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    width: 100%;
    height: ${props => props.active ? '100%' : '0%' };
    justify-content: center;
    align-items: center;
    background-color: rgba(20,100,0,0.2);
    overflow: hidden;
    transition: 0.4s ease-in-out;
`

const PasswordDialog = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 40%;
    height: 20%;

    div {
        display: flex;
        width: 50%;
        height: 50%;
        justify-content: center;
        align-items: center;
        font-size: 1vw;
        font-weight: bold;
        transition: 0.2s ease-in-out;
    }
`

const InputPassword = styled.input`
    width: calc(100% - 2vw);
    height: calc(50% - 2vw);
    border: 0;
    padding: 1vw;
    border: 0;
    font-size: 1vw;
    /*background-color: #e0ffd2;*/
    background-color: white;
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0,0.1);

    &:focus::placeholder {
        color: transparent;
    }
`

const CancelPassword = styled.div`
    background-color: #c43c3c;
    color: #ffffff;

    &:hover {
        cursor: pointer;
        background-color: #e66d6d;
        color: #360f0f;
    }
`

const ConfirmPassword = styled.div`
    background-color: #284cc3;
    color: #ffffff;

    &:hover {
        cursor: pointer;
        background-color: #7e9bf9;
        color: #0b1c54;
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
        inputValue: '',
        passwordValue: ''
    }

    constructor(props) {
        super(props);
        this.state.signedIn = false;
        this.displayBottomRef = React.createRef();
    }

    connect = async () => {

        let redirect = false;

        const username = queryString.parse(this.props.location.search).username;
        this.username = username;
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

        this.socket.on('channel-list', channels => { // Using event instead of fetch in case channels get added/deleted.

            if (typeof this.state.channels !== 'undefined') {
                const activeChannel = this.state.channels.find(ch => ch.active);

                if (typeof activeChannel !== 'undefined') {
                    const target = channels.find(ch => ch.id === activeChannel.id);
                    if (typeof target !== 'undefined') {
                        target.active = true; // If channel exists keep it active.
                    } else {
                        this.setState({messages:undefined}); // The channel was not found therefore no longer exists, and the messages should be purged.
                        console.log('Active channel no longer exists.');
                    }
                }
            }
            this.setState({channels});
        });

        this.socket.on('channel-update', channel => { 
            const channels = [...this.state.channels];
            const target = channels.find(ch => ch.id === channel.id);

            if (typeof target !== 'undefined') {
                target.users = channel.users; // Only this value can change at the moment.
                this.setState({channels});
            }
        });

        this.socket.on('message', message => {
            let messages = [...this.state.messages];
            messages.push(message);
            this.setState({messages});
        });
    }

    onClickChannel = channel => {
        if (!this.state.signedIn) return;

        let password = '';

        if (channel.password) {
            this.setState({ activePassword:true, enteredChannel: channel });
        } else {
            this.setState({enteredChannel: channel }, () => {
                this.enterChannel('');
            });
        }
    }

    enterChannel = password => {
        const channel = this.state.enteredChannel;
        this.socket.emit('join-channel', {channel,password});

        const channels = [...this.state.channels];
        channels.forEach(ch => ch.active = false);
        const target = channels.find(ch => ch.id === channel.id);
        target.active = true;

        axios.get(`http://localhost:9000/get-messages?channelID=${target.id}&password=${password}`)
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

    onClickEnterPassword = () => {
        this.setState({ activePassword:false });
        const password = this.state.passwordValue;
        axios.get(`http://localhost:9000/password-check?channelID=${this.state.enteredChannel.id}&user=${this.username}&password=${this.state.passwordValue}`)
            .then(res => {
                if (res.data.error) {
                    return this.setState({error:res.data.error});
                }

                if (res.data.result) {
                    return this.enterChannel(password);
                }
            })
            .catch(err => {
                return this.setState({error:err});
            });

            this.setState({ activePassword:false, passwordValue:'' })
    }

    onClickCancelPassword = () => {
        this.setState({ activePassword:false, passwordValue:'' })
    }

    onChangeInputPassword = e => {
        this.setState({ passwordValue: e.target.value })
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

    onClickConfirm = (channelName,channelPassword) => {
        axios.get(`http://localhost:9000/create-channel?name=${channelName}&password=${channelPassword}&owner=${this.username}`)
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

    onClickMenu = channelId => {
        axios.get(`http://localhost:9000/remove-channel?channelId=${channelId}&owner=${this.username}`)
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
                date={m.date}
            />);
        }
    }

    renderChannelInfo = () => {
        let name = '';
        let id = '';
        let users = '';
        let remove = false;

        if (this.state.channels) {
            const target = this.state.channels.find(ch => ch.active);
            if (typeof target !== 'undefined') {
                name = target.name;
                id = target.id;
                
                if (target.users === 1) {
                    users = '1 online user';
                } else if (target.users > 1) {
                    users = target.users + ' online users';
                }

                if (target.owner === this.username) {
                    remove = true;
                }
            }
        }

        return (
            <React.Fragment>
                <Name>{name}</Name>
                <Users>{users}</Users>
                {remove && <Menu onClick={() => this.onClickMenu(id)}>remove</Menu>}
            </React.Fragment>
        );
    }

    componentDidMount = () => {
        this.mounted = true;
        this.connect();
        if (!this.state.signedIn) return;
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
                            <ChannelInfo>
                                {this.renderChannelInfo()}
                            </ChannelInfo>
                        </Header>
                        <Display>
                            <Password active={this.state.activePassword}>
                                <PasswordDialog>
                                    <InputPassword placeholder='Password' value={this.state.passwordValue} onChange={this.onChangeInputPassword}/>
                                    <CancelPassword onClick={this.onClickCancelPassword}>Cancel</CancelPassword>
                                    <ConfirmPassword onClick={this.onClickEnterPassword}>Enter</ConfirmPassword>
                                </PasswordDialog>
                            </Password>
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