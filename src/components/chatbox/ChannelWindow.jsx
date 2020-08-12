import React, { Component, useRef, useEffect } from 'react';
import styled, {css} from 'styled-components';
import Message from './Message.jsx';
import xIcon from '../../icon/x-white.svg';

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 96%;
    flex-grow: 1;
    transition: 0.4s ease-in-out;
    background-color: white;
    margin: 1%;
    overflow: hidden;
`

const Header = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vw;
    font-size: 1vw;
    font-weight: bold;
    background-color: #00688B;
    overflow: hidden;
`

const CloseButton = styled.img`
    position: absolute;
    right: 1.5vw;
    top: 1.5vw;
    height: 2vw;
    width: 2vw;
    border-radius: 0.5vw;
    transition: 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        right: 1.75vw;
        top: 1.75vw;
        height: 1.5vw;
        width: 1.5vw;
    }
`

const Display = styled.div`
    display: flex;
    height: 5vw;
    flex-direction: column;
    align-items: center;
    padding-top: 1.5vw;
    overflow: auto;
    flex: 1;
`

const Input = styled.div`
    display: flex;
    height: 5vw;
`
const TextField = styled.input`
    background: none;
    border: 0;
    flex-grow: 1;
    margin: 1vw;
    margin-right: 0;
    padding: 1vw;
    border-radius: 2.5vw 0 0vw 2.5vw;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
    font-family: 'Roboto', sans-serif;
`

const SendButton = styled.div`
    width: 4vw;
    margin: 1vw;
    margin-left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #195019;
    color: white;
    border-radius: 0vw 2.5vw 2.5vw 0vw;
    overflow: hidden;
    font-size: 0.7vw;

    &:hover {
        cursor: pointer;
    }
`

class ChannelWindow extends Component {
    state = {}

    constructor(props) {
        super(props);
        this.bottomRef = React.createRef();
    }

    componentDidMount() {
        this.bottomRef.current.scrollTop = this.bottomRef.current.scrollHeight;
    }

    render() {
        return ( 
            <Contents activeChannels={this.props.activeChannels}>
                <Header>
                    {this.props.channel.name}
                    <CloseButton src={xIcon} onClick={() => this.props.onClickChannel(this.props.channel)} />
                </Header>
                <Display ref={this.bottomRef}>
                    <Message
                        author='Test-user'
                        contents='Aaaaaaaaaaaaaaa?'
                    />
                    <Message
                        author='Another-test-user'
                        contents='Bbb.'
                    />
                    <Message
                        author='Test-user'
                        contents='AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    />
                </Display>
                <Input>
                    <TextField />
                    <SendButton className='no-select'>Send</SendButton>
                </Input>
            </Contents>
        );
    }
}
 
export default ChannelWindow;