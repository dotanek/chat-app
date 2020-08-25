import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.button`
    display: flex;
    position: relative;
    width: 100%;
    min-height: 8%;
    padding: 0;
    border: 0;
    background: none;
    color: #ffffff;
    border-bottom: 1px solid rgba(255,255,255,0.5);
`

const Regular = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 0.6vw;
    transition: 0.2s ease-in-out;
    z-index: 0;

    &:hover {
        cursor: pointer;
        color: #0d2f07;
        background-color: rgba(255,255,255,0.3);
    }
`
const Dialog = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    z-index: 1;
    height: ${props => props.active ? '5vw' : '0'};
    overflow: hidden;
    background-color: black;
    transition: 0.2s ease-in-out;

    div {
        display: flex;
        width: 50%;
        height: 40%;
        justify-content: center;
        align-items: center;
        font-size: 0.7vw;
        font-weight: bold;
        transition: 0.2s ease-in-out;
    }
`

const Input = styled.input`
    display: flex;
    width: calc(100% - 2vw);
    height: calc(60% - 2vw);
    padding: 1vw;
    border: 0;
    font-size: 0.8vw;
    background-color: #e0ffd2;
    text-align: center;

    &:focus::placeholder {
        color: transparent;
    }
`
const Confirm = styled.div`
    background-color: #284cc3;

    &:hover {
        cursor: pointer;
        background-color: #7e9bf9;
        color: #0b1c54;
    }
`

const Cancel = styled.div`
    background-color: #c43c3c;

    &:hover {
        cursor: pointer;
        background-color: #e66d6d;
        color: #360f0f;
    }
`

class ChannelAdd extends Component {
    state = {
        dialog: false,
        channelName: ''
    }

    onClickRegular = () => {
        this.setState({ dialog:true, channelName:'' });
    }

    onClickCancel = () => {
        this.setState({dialog:false});
    }

    onChangeInput = e => {
        this.setState({channelName:e.target.value});
    }

    onClickConfirm = () => {
        this.props.onClickConfirm(this.state.channelName);
        this.setState({ dialog:false, channelName: ''});
    }

    render() { 
        return (
            <Container>
                <Regular onClick={this.onClickRegular}>
                    + new channel
                </Regular>
                <Dialog active={this.state.dialog} >
                    <Input placeholder='Channel name' value={this.state.channelName} onChange={this.onChangeInput}/>
                    <Cancel onClick={this.onClickCancel}>Cancel</Cancel>
                    <Confirm onClick={this.onClickConfirm}>Confirm</Confirm>
                </Dialog>
            </Container>
        );
    }
}
 
export default ChannelAdd;