import React, { Component } from 'react';
import styled from 'styled-components';
import Chatbox from './components/chatbox/Chatbox.jsx';
import Navigator from './components/navigator/Navigator.jsx';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
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

      ]
    }  
  }

  render() { 
    return (
        <Container>
          <Chatbox />
          <Navigator context={this.state}/>
        </Container>
    );
  }
}
 
export default App;