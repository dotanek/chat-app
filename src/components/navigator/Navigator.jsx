import React, { Component } from 'react';
import styled from 'styled-components';
import Channel from './Channel';

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    background-color: #001a30;
    padding-top: 3vh;
`

class Navigator extends Component {
    state = {  }

    constructor(props) {
        super();
        this.publicChannels = props.context.channels.public;
        this.privateChannels = props.context.channels.private;
    }

    generateChannels = () => {
        return this.publicChannels.map(ch => {
            return <Channel key={ch.id} channel={ch}/>
        });
    }

    render() { 
        return ( 
            <Contents>
                {this.generateChannels()}
            </Contents>
        );
    }
}
 
export default Navigator;