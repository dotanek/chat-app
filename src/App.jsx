import React, { Component } from 'react';
import styled from 'styled-components';
import Chatbox from './components/chatbox/Chatbox.jsx';
import Navigator from './components/navigator/Navigator.jsx';

const Container = styled.div`
  font-family: 'PT Sans Narrow', sans-serif;
  font-family: 'Roboto', sans-serif;
  display: flex;
  width: 110vw;
  height: 100vh;
  overflow: hidden;
  background-color: #141D22;
`

class App extends Component {
  state = {
    channels: {
      public: [
        { name: 'Public 1', id: 'public1', active: true },
        { name: 'Public 2', id: 'public2', active: true },
        { name: 'Public 3', id: 'public3', active: false },
        { name: 'Public 4', id: 'public4', active: false },
        { name: 'Public 5', id: 'public5', active: false },
        { name: 'Public 6', id: 'public6', active: false },
        { name: 'Public 7', id: 'public7', active: false },
        { name: 'Public 8', id: 'public8', active: false },
        { name: 'Public 9', id: 'public9', active: false },
        { name: 'Public 10', id: 'public10', active: false },
        { name: 'Public 11', id: 'public11', active: false },
        { name: 'Public 12', id: 'public12', active: false },
      ],
      private: [
        { name: 'Private One', id: 'private1', active: false },
      ]
    },
    flags: {
      navActive: true
    }
  }

  eventHandlers = {
    Navigator: {
      onClick: () => {
        const value = this.state.flags.navActive;
        this.setState({
          flags: { navActive: !value }
        });
      }
    },
    Channel: {
      onClick: (channel) => {
        const activeChannels = this.state.channels.public.filter(ch => ch.active).length;
        const publicPool = [...this.state.channels.public];
        const privatePool = [...this.state.channels.private];
        const target = publicPool.find(ch => ch.id === channel.id);
        
        if (!target.active && activeChannels >= 3) {
          return;
        }

        target.active = !target.active;
        this.setState({
          channels: {
            public: publicPool,
            private: privatePool
          }
        });
      }
    }
  }

  render() { 
    return (
        <Container>
          <Chatbox 
            channels={this.state.channels}
            flags={this.state.flags}
            onClickChannel={(channel) => this.eventHandlers.Channel.onClick(channel)}
          />
          <Navigator
            channels={this.state.channels}
            flags={this.state.flags}
            onClickNav={() => this.eventHandlers.Navigator.onClick()}
            onClickChannel={(channel) => this.eventHandlers.Channel.onClick(channel)}
          />
        </Container>
    );
  }
}
 
export default App;