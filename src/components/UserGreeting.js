import React, { useContext } from 'react';
import * as jose from "jose";
import AuthenticationContext from '../contexts/AuthenticationContexts';

function UserGreeting(props) {
    const {accessToken} = useContext(AuthenticationContext);
    return (
        <>Witaj {getUserEmail(accessToken)}!</>
    );
}

export default UserGreeting;

function getUserEmail(accessToken) {
    const userEmail = jose.decodeJwt(accessToken).email;
    return userEmail;
}