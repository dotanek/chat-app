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
        { name: 'Public One', id: 'public1' },
        { name: 'Public Two', id: 'public2' },
        { name: 'Public Three', id: 'public3' },
      ],
      private: [
        { name: 'Private One', id: 'private1' },
      ]
    },
    flags: {
      navActive: true
    }
  }

  handlerOnClickNav = () => {
    const value = this.state.flags.navActive;
    this.setState({
      flags: { navActive: !value }
    });
  }

  render() { 
    return (
        <Container>
          <Chatbox 
            channels={this.state.channels}
            flags={this.state.flags}
          />
          <Navigator
            channels={this.state.channels}
            flags={this.state.flags}
            onClickNav={this.handlerOnClickNav}
          />
        </Container>
    );
  }
}
 
export default App;