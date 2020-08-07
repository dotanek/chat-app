import React, { Component } from 'react';
import styled from 'styled-components';

const Contents = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1vw;
    background-color: white;
    height: 3vw;
    width: 80%;
    border-radius: 1.5vw;
    color: black;
    font-size: 0.8vw;
    font-weight: bold;
    white-space: nowrap;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.2);

    & div {
        position: relative;
        box-shadow: 0px 0px 1px black;
        z-index: 0;
    }

    &:hover {
        cursor: pointer;
    }
`

const Icon = styled.img`
    width: 25%;
    margin-left: 10%;
    height: 1vw;
`

const Text = styled.span`
    display: flex;
    width: 75%;
    justify-content: flex-start;
`

const bgColor = '#FCA800';
const shadow = '0px 0px 1px black;';

class Channel extends Component {
    state = {  }
    render() { 
        return ( 
            <Contents>
                <Icon src={this.props.icon} />
                <Text>{this.props.channel.name}</Text>
            </Contents>
        );
    }
}
 
export default Channel;