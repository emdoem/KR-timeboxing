import React from 'react';

import Error from "./ErrorBoundary";
import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';
import AuthenticationAPI from "../api/FakeAuthenticationAPI";

// import AuthenticatedApp from './AuthenticatedApp';
import AuthenticationContext from '../contexts/AuthenticationContexts';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));

class App extends React.Component {
    state = {
        accessToken: null,
        previousLoginAttemptFailed: false
    }

    isUserLoggedIn() {
        return !!this.state.accessToken;
    }

    handleLoginAttempt = (credentials) => {
        AuthenticationAPI.login(credentials)
            .then(({ accessToken }) => {
                this.setState({
                    accessToken,
                    previousLoginAttemptFailed: false
                });
            }).catch(() => {
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
                            <AuthenticationContext.Provider value={{
                                accessToken: this.state.accessToken,
                                handleLogout: this.handleLogout
                            }}>
                                {<React.Suspense fallback={"... Loading"}>
                                    <AuthenticatedApp
                                    />
                                </React.Suspense>}
                            </AuthenticationContext.Provider> :
                            <LoginForm
                                errorMessage={this.state.previousLoginAttemptFailed
                                    ? "Nie udało się zalogować"
                                    : null
                                }
                                onLoginAttempt={this.handleLoginAttempt}
                            />
                    }

                </ErrorBoundary>
            </div>
        )
    }

}

export default App;