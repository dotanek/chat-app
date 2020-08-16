import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/join/Join';
import Chat from './components/chat/Chat';

class App extends Component {
    state = {  }
    render() { 
        return (
            <Router>
                <Route exact path='/' component={Join} />
                <Route path = '/chat' component={Chat} />
            </Router>
        );
    }
}
 
export default App;