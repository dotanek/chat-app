import React, { Component } from 'react';
import styled from 'styled-components';

const Contents = styled.div`
    width: 98%;
    height: auto;
    word-wrap: break-word;
    border-bottom: 1px solid black;
    padding: 1%;
`
const Author = styled.div`
    align-items: flex-end;
    height: 50%;
    font-size: 0.9vw;
    font-weight: bold;
    background-color: red;
`

const Content = styled.div`
`

class Message extends Component {
    state = {  }
    render() { 
        return (  
            <Contents>
                {this.props.content}
            </Contents>
        );
    }
}
 
export default Message;