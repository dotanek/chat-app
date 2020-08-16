import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

class Chat extends Component {
    state = {}

    authentication() {
       const username = queryString.parse(this.props.location.search).username;

       if (!username || username.length === 0 || /[^A-Za-z0-9]+/g.test(username)) {
           return true;
       }

       return false;
    }

    render() { 
        return ( 
            <React.Fragment>
                <h1>Chat</h1>
                {this.authentication() && <Redirect to='/' />}
            </React.Fragment> 
        );
    }
}
 
export default Chat;