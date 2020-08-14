import React, { Component } from 'react';
import styled,{ css } from 'styled-components';

const Contents = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.8vw;
    min-height: 3vw;
    width: 70%;
    border-radius: 1.5vw;
    border: 2px solid rgba(0,0,0,0);
    color: white;
    font-size: 0.8vw;
    font-weight: bold;
    white-space: nowrap;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.2);
    transition: 0.2s ease-in-out;

    & div {
        position: relative;
        box-shadow: 0px 0px 1px black;
        z-index: 0;
    }

    &:hover {
        cursor: pointer;
        background-color: rgba(255,255,255,0.05);
    }

    ${props => props.active && css`
        height: 3vw;
        border: 2px solid #195019;
    `}
`

const Icon = styled.img`
    width: 10%;
    margin-left: 10%;
    height: 1vw;
`

const Text = styled.span`
    display: flex;
    width: 40%;
    margin-left: 5%;
    justify-content: flex-start;
    transition: 0.2s ease-in-out;
`

class Channel extends Component {
    state = {  }

    render() { 
        return ( 
            <Contents active={this.props.channel.active} onClick={() => this.props.onClickChannel(this.props.channel)}>
                <Icon src={this.props.icon} />
                <Text>{this.props.channel.name}</Text>
            </Contents>
        );
    }
}
 
export default Channel;