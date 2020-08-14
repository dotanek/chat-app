import React, { Component } from 'react';
import styled from 'styled-components';

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    color: black;
    /*background-color: #38C438;*/
    overflow-wrap: break-word;
`
const MessageAuthor = styled.div`
    font-size: 15px;
    margin-bottom: 0.1vw;
    font-weight: bold;
`

const MessageContents = styled.div`
    font-size: 15px;
    margin-bottom: 15px;
`

class Message extends Component {
    state = {  }
    render() { 
        return (
            <Contents>
                <MessageAuthor>{this.props.author}</MessageAuthor>
                <MessageContents>{this.props.contents}</MessageContents>
            </Contents>
        );
    }
}
 
export default Message;