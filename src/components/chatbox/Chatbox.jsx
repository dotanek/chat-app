import React, { Component } from 'react';
import styled,{css} from 'styled-components';

const Contents = styled.div`
    width: 100vw;
    transition: 0.4s ease-in-out;
    box-shadow: inset 5px 0px 40px rgba(0,0,0,0.5);
    ${props => props.navActive && css`
        width: 90vw;
    `}
`
class Chatbox extends Component {
    state = {  }

    render() { 
        return (
            <Contents navActive={this.props.flags.navActive}>
            </Contents>
        );
    }
}
 
export default Chatbox;