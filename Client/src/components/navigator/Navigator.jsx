import React, { Component } from 'react';
import styled from 'styled-components';
import Channel from './Channel';

import userGroupSVG from '../../icon/user-group-white.svg';
import userAloneSVG from '../../icon/user-alone-white.svg';

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
            </React.Fragment>
        );
    }
}
 
export default Navigator;