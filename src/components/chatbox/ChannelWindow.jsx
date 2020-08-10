import React, { Component, useRef, useEffect } from 'react';
import styled,{css} from 'styled-components';

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 25%;
    height: 96%;
    flex-grow: 1;
    flex-basis: 0;
    transition: 0.4s ease-in-out;
    background-color: white;
    margin: 1%;
    overflow: hidden;
`

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vw;
    font-size: 1vw;
    font-weight: bold;
    background-color: #00688B;
`

const Display = styled.div`
    display: flex;
    height: 5vw;
    flex-direction: column;
    align-items: flex-start;
    overflow: auto;
    flex: 1;
`

const Message = styled.div`
    max-width: 40%;
    margin: 0.5vw;
    padding: 1vw;
    color: black;
    border-radius: 0 2vw 2vw 2vw;
    background-color: #38C438;
    overflow-wrap: break-word;
`

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
};

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

    &:hover {
        cursor: pointer;
    }
`

class ChannelWindow extends Component {
    state = {  }

    constructor(props) {
        super(props);
        this.chatWindowBottom = React.createRef();
    }

    componentDidMount() {
        this.props.onMount(this.chatWindowBottom);
    }

    render() { 
        return ( 
            <Contents>
                <Header> {this.props.channel.name} </Header>
                <Display ref={this.chatWindowBottom}>
                    <Message>Aaaaaaaaaaaaaaa?</Message>
                    <Message>Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Message>
                    <Message>No elo kurwa</Message>
                    <Message>Siemaneczko</Message>
                    <Message>Aa</Message>
                    <Message>a</Message>
                </Display>
                <Input>
                    <TextField />
                    <SendButton>Send</SendButton>
                </Input>
            </Contents>
        );
    }
}
 
export default ChannelWindow;