import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Window = styled.div`
    width: 50vw;
    height: 10vw;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
`

const Title = styled.div`
    display: flex;
    height: 70%;
    justify-content: center;
    font-size: 3vw;
    font-weight: bold;
`
const Line = styled.div`
    height: 3%;
    width: 50%;
    margin: auto;
    background-color: #ffffff;
`

const Form = styled.form`
    display: flex;
    flex-grow: 1;
    padding-top: 3%;
    justify-content: center;
`

const Label = styled.label`
    display: flex;
    width: 10%;
    justify-content: center;
    align-items: center;
    font-size: 0.8vw;
`
const Input = styled.input`
    display: flex;
    width: 15%;
    padding: 1%;
`

const Submit = styled.button`
    display: flex;
    width: 8%;
    justify-content: center;
    align-items: center;
    margin-left: 2%;
    font-size: 0.8vw;
    font-weight: bold;
    background-color: green;
    color: white;
    border: 0;
    transition: 0.2s ease;
    backface-visibility: hidden; /* Apparently helps with the blur */

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`
const Error = styled.div`
    height: 1vw;
    margin-bottom: 8%;
    font-size: 0.8vw;
    color: #8d2f2f;
`

class Join extends Component {

    regex = /[^A-Za-z0-9]+/g;

    onSubmit = e => {
        e.preventDefault();

        if (this.state.username.length === 0) {
            return this.setState({error: 'Username must be provided.'});
        }

        if (this.regex.test(this.state.username)) {
            return this.setState({error: 'Username must contain only letters and numbers.'});
        }

        this.setState({submitReady: true});
    }

    onChange = e => {
        this.setState({username: e.target.value});
    }

    state = {
        username: ''
    }

    render() { 
        return ( 
            <Container>
                <Window>
                    <Title>chat-app</Title>
                    <Line />
                    <Form action='/chat' method='get' id='join-form' onSubmit={this.onSubmit}>
                        <Label>Username</Label>
                        <Input type='text' name='username' value={this.state.username} onChange={this.onChange}></Input>
                        <Submit type='submit' form='join-form'>Join</Submit>
                    </Form>
                </Window>
            <Error>{this.state.error}</Error>
            {this.state.submitReady && <Redirect to={`/chat?username=${this.state.username}`} />}
            </Container>
        );
    }
}
 
export default Join;