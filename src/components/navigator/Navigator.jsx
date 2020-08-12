import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import Channel from './Channel';

import userGroupSVG from '../../icon/user-group-white.svg';
import userAloneSVG from '../../icon/user-alone-white.svg';
import arrowLeftSVG from '../../icon/arrow-left.svg';
import arrowRightSVG from '../../icon/arrow-right.svg';

const Contents = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 13vw;
    padding-bottom: 4vw;
    background-color: #112A35;
    transition: 0.4s ease-in-out;
    overflow: auto;
    ${props => props.navActive && css``}
`

const ButtonActive = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 1vw;
    right: 2.2vw;
    width: 5vw;
    height: 3vw;
    border-radius: 2.5vw;
    background-color: #FFB300;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.2);
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
        background-color: rgba(255,179,0,0.3);

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

    generatePublicChannels = () => {
        const publicChannels = this.props.channels.public;
        return publicChannels.map(ch => {
            return <Channel
                key={ch.id}
                channel={ch}
                icon={userGroupSVG}
                onClickChannel={(channel) => this.props.onClickChannel(channel)}
            />
        });
    }

    generatePrivateChannels = () => {
        const privateChannels = this.props.channels.private;
        return privateChannels.map(ch => {
            return <Channel
                key={ch.id}
                channel={ch}
                icon={userAloneSVG}
                onClickChannel={(channel) => 0 }
            />
        });
    }

    render() { 
        return (
            <React.Fragment>
                <Contents className='no-select' navActive={this.props.flags.navActive}>
                    {this.generatePublicChannels()}
                    {this.generatePrivateChannels()}
                </Contents>
                {/*<ButtonActive navActive={this.props.flags.navActive} onClick={this.props.onClickNav}>
                        <img src={arrowLeftSVG} />
                </ButtonActive>*/}
            </React.Fragment>
        );
    }
}
 
export default Navigator;