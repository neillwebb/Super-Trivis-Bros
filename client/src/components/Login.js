import React, { Component } from "react";
import Form from '../components/Form'
import GameWindow from '../components/GameWindow';
import '../App.css'
import * as $ from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: '',
        reguser: '',
        regpw: '',
        allScores: [],
        isLoggedin: false,
        easterEgg: false
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value.toLowerCase()
        })
    }

    categoryClick = (event) => {
        event.preventDefault();
        this.setState({
            category: event.target.name
        })
    }

    handleRegister = (event) => {
        event.preventDefault();
        $.post('/api/user', { username: this.state.reguser, password: this.state.regpw })
            .then((data) => {
                console.log(data)
            }).catch(function (err) {
                alert("Invalid username or password (Username might be taken)")
            })
    }

    handleLogin = (event) => {
        event.preventDefault();
        $.post('/api/session', { username: this.state.username, password: this.state.password })
            .then((data) => {
                console.log(data)
                this.setState({
                    isLoggedin: true,
                    username: this.state.username,
                    password: this.state.password,
                    allScores: data.data.scores
                }, () => {
                    this.props.history.push("/gamewindow")
                })
            }).catch(function (err) {
                alert("Username or password is incorrect")
            })

    }

    render() {
        return (
            <div >
                {this.state.isLoggedin === false ?
                    <Form onChangeHandler={this.handleChange}
                        regHandler={this.handleRegister}
                        loginHandler={this.handleLogin} /> :
                    <GameWindow scores={this.state.allScores} />


                }

            </div>
        );
    }
}

export default Login;