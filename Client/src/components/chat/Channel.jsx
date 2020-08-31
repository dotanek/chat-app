import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 10%;
    justify-content: center;
    align-items: center;
    font-size: 0.9vw;
    border-bottom: 1px solid rgba(255,255,255,0.5);
    transition: 0.2s ease-in-out;
    background-color: ${props => (props.active ? '#cd9806' : "#308d1e")};

    &:hover {
        cursor: pointer;
        color: #0d2f07;
        background-color: ${props => (props.active ? '#eebc32' : "#54B740")};
    }  
`

class Channel extends Component {
    state = {  }
    render() { 
        return ( 
            <Container
                active={this.props.active}
                onClick={() => this.props.handleOnClick(this.props.channel)}
            >
                {this.props.name}
            </Container>
        );
    }
}
 
export default Channel;