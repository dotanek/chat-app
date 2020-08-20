import React, { Component } from 'react';
import styled from 'styled-components';

const Contents = styled.div`
    width: 99%;
    height: auto;
    padding: 0.5%;
`
const Author = styled.div`
    width: 100%;
    font-size: 0.8vw;
    font-weight: bold;
`

const Content = styled.div`
    height: auto;
    word-wrap: break-word;
    font-size: 0.9vw;
`

class Message extends Component {
    state = {  }

    render() { 
        return (  
            <Contents>
                <Author>{this.props.author}</Author>
                <Content>{this.props.content}</Content>
            </Contents>
        );
    }
}
 
export default Message;