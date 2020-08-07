import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import Channel from './Channel';

import userGroupSVG from '../../icon/user-group.svg';
import userAloneSVG from '../../icon/user-alone.svg';
import arrowLeftSVG from '../../icon/arrow-left.svg';
import arrowRightSVG from '../../icon/arrow-right.svg';

const Contents = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 10vw;
    background-color: #112A35;
    padding-top: 5vw;
    transition: 0.4s ease-in-out;
    ${props => props.navActive && css``}
`

const ButtonActive = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 1vw;
    left: 1vw;
    width: 8vw;
    height: 3vw;
    border-radius: 2.5vw;
    background-color: #FFB300;
    white-space: nowrap;
    overflow: hidden;
    transition: all 0.4s ease-in-out;

    & img {
        height: 1.5vw;
        width: 8vw;
        margin-left: -0.2vw;
        transition: all 0.4s ease-in-out;
        fill: white;
    }

    ${props => !props.navActive && css`
        width: 3vw;
        border-radius: 3vw;
        left: -4vw;

        & img {
            transform: rotate(270deg);
            margin-left: 0vw;
            margin-top: 0.3vw;
        }

    `}

    &:hover {
        cursor: pointer;
    }
`

class Navigator extends Component {
    state = {  }

    constructor(props) {
        super();
        this.onClick = props.onClickNav;
    }

    generatePublicChannels = () => {
        const publicChannels = this.props.channels.public;
        return publicChannels.map(ch => {
            return <Channel key={ch.id} channel={ch} icon={userGroupSVG}/>
        });
    }

    generatePrivateChannels = () => {
        const privateChannels = this.props.channels.private;
        return privateChannels.map(ch => {
            return <Channel key={ch.id} channel={ch} icon={userAloneSVG} />
        });
    }

    render() { 
        return (
            <React.Fragment>
                <Contents navActive={this.props.flags.navActive}>
                    <ButtonActive navActive={this.props.flags.navActive} onClick={this.onClick}>
                        <img src={arrowLeftSVG} />
                    </ButtonActive>
                    {this.generatePublicChannels()}
                    {this.generatePrivateChannels()}
                </Contents>
            </React.Fragment>
        );
    }
}
 
export default Navigator;