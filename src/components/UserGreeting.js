import React from 'react';
import * as jose from "jose";
import AuthenticationContext from '../contexts/AuthenticationContexts';

function UserGreeting(props) {
    return (
        <AuthenticationContext.Consumer>
            {({accessToken}) => <>Witaj {getUserEmail(accessToken)}!</>}
        </AuthenticationContext.Consumer>
    );
}

export default UserGreeting;

function getUserEmail(accessToken) {
    const userEmail = jose.decodeJwt(accessToken).email;
    return userEmail;
}