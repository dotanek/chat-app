import React, { Component } from 'react';
import styled from 'styled-components';

const Contents = styled.div`
    width: 99%;
    height: auto;
    padding: 0.5%;
`
const Header = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`
const Author = styled.span`
    font-size: 0.8vw;
    font-weight: bold;
`

const Time = styled.span`
    font-size: 0.5vw;
    margin-left: 5px;
`

const Content = styled.div`
    height: auto;
    word-wrap: break-word;
    font-size: 0.8vw;
`

class Message extends Component {
    state = {  }

    renderDate = () => {
        let dateRecieved = new Date(this.props.date);
        let dateNow = new Date();
        let dateFirst;
        let dateSecond;

        if (
            dateRecieved.getDay() === dateNow.getDay() &&
            dateRecieved.getMonth() === dateNow.getMonth() &&
            dateRecieved.getYear() === dateNow.getYear()
        ) {
            dateFirst = 'Today';
        } else {
            const d = dateRecieved.getDate();
            const mon = dateRecieved.getMonth();
            const y = dateRecieved.getFullYear();
            dateFirst = `${d > 9 ? d : '0' + d}.${mon > 9 ? mon : '0'+ mon}.${y}`;
        }

        const h = dateRecieved.getHours();
        const min = dateRecieved.getMinutes();

        dateSecond = `${h > 9 ? h : '0' + h}:${min > 9 ? min : '0' + min}`;

        return dateFirst + ' ' + dateSecond;
    }

    render() { 
        return (  
            <Contents>
                <Header>
                    <Author>{this.props.author}</Author>
                    <Time>{this.renderDate()}</Time>
                </Header>
                <Content>{this.props.content}</Content>
            </Contents>
        );
    }
}
 
export default Message;