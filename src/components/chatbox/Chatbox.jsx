import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import ChannelWindow from './ChannelWindow';

const Contents = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    width: 98vw;
    padding: 1%;
    transition: 0.4s ease-in-out;
    overflow: auto;
    box-shadow: inset 5px 0px 40px rgba(0,0,0,0.5);
    ${props => props.navActive && css`
        padding: 0.9vw 1%;
        width: 85.2vw;
    `}
`
const Placeholder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1vw;
    color: #7E8A95;
`
class Chatbox extends Component {
    state = {}

    constructor(props) {
        super(props);
        this.references = [];
    }

    generateChatWindows() {
        let windows = this.props.channels.public.filter(ch => ch.active);
        if (windows.length > 0) {
            return windows.map(ch =>  {
                return (
                    <ChannelWindow
                        key={ch.id+windows.length}
                        channel={ch}
                        activeChannels={windows.length}
                        onClickChannel={(channel => this.props.onClickChannel(channel))}
                    />
                );
            });

        } else {
            return <Placeholder className='no-select'>No active channels - use the side menu to enter one.</Placeholder>;
        }
    }

    render() {
        return (
            <Contents navActive={this.props.flags.navActive}>
                {this.generateChatWindows()}
            </Contents>
        );
    }
}
 
export default Chatbox;