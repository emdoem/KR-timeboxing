import React from 'react';

import TimeboxList from "./TimeboxList"
import EditableTimebox from './EditableTimebox';
import Error from "./ErrorBoundary";
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';
import AuthenticationAPI from "../api/FetchAuthenticationAPI";
import * as jose from "jose";

class App extends React.Component {
    state = {
        accessToken: null,
        previousLoginAttemptFailed: false
    }

    isUserLoggedIn() {
        return !!this.state.accessToken;
    }

    getUserEmail() {
        const userEmail = jose.decodeJwt(this.state.accessToken).email;
        return userEmail;
    }

    handleLoginAttempt = (credentials) => {
        AuthenticationAPI.login(credentials)
            .then( ({ accessToken }) => {
                this.setState({
                    accessToken,
                    previousLoginAttemptFailed: false
                });    
            }).catch( () => {
                this.setState({
                    previousLoginAttemptFailed: true
                }); 
            })
        
    }

    handleLogout = () => {
        this.setState({
            accessToken: null,
            previousLoginAttemptFailed: false
        }); 
    }

    render() {
        return (
            <div className="App">
                <ErrorBoundary message="Coś nie działa w całej aplikacji">
                    {
                        this.isUserLoggedIn() ?
                        <>
                            <header className="header">
                                Witaj {this.getUserEmail()}!
                                <a onClick={this.handleLogout} className="header__logout-link" href="#">Wyloguj się</a>
                            </header>
                            <TimeboxList accessToken={this.state.accessToken} />
                            <EditableTimebox />
                        </> : 
                        <LoginForm 
                            errorMessage={this.state.previousLoginAttemptFailed ? "Nie udało się zalogować" : null} 
                            onLoginAttempt={this.handleLoginAttempt}
                        />
                    }
                    
                </ErrorBoundary>
            </div>
        )    
    }
   
}

export default App;