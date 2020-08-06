import React, { Component } from 'react';
import styled from 'styled-components';

const Contents = styled.div`
    display: flex;
    width: 80%;
    height: 5%;
    background-color: #002c52;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`
class Channel extends Component {
    state = {  }
    render() { 
        return ( 
            <Contents>
                {this.props.channel.name}
            </Contents>
        );
    }
}
 
export default Channel;