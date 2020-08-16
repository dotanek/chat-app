import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Chatbox from './components/chatbox/Chatbox.jsx';
import Navigator from './components/navigator/Navigator.jsx';

const InterfaceContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  width: 110vw;
  height: 100vh;
  overflow: hidden;
  background-color: #141D22;
`
class App extends Component {
  state = {
    user: {},
    channels: {
      public: [
        { name: 'Public 1', id: 'public1', active: false },
        { name: 'Public 2', id: 'public2', active: false },
        { name: 'Public 3', id: 'public3', active: false },
        { name: 'Public 4', id: 'public4', active: false },
      ],
      private: [
        { name: 'Private', id: 'private1', active: false },
      ]
    },
    flags: {
    }
  }

  eventHandlers = {
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
    },
    EnterForm: {
      onSubmit: event => {

      }
    }
  }

  checkLoginStatus() {
    if(!this.state.user) {
      return <Redirect to='/'/>;
    }
  }

  render() { 
    console.log(this.state);
    return (
        <Router>
          <Switch>
            <Route exact path='/'>
            </Route>

            <Route exact path='/app'>
              { this.checkLoginStatus() }
              <InterfaceContainer>
                <Chatbox 
                  channels={this.state.channels}
                  flags={this.state.flags}
                  onClickChannel={(channel) => this.eventHandlers.Channel.onClick(channel)}
                />
                <Navigator
                  channels={this.state.channels}
                  flags={this.state.flags}
                  onClickChannel={(channel) => this.eventHandlers.Channel.onClick(channel)}
                />
              </InterfaceContainer>
            </Route>
          </Switch>
        </Router>
    );
  }
}
 
export default App;