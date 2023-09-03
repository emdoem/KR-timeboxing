import React, { useContext } from 'react';
// using jose instead of jsonwebtoken lib - the latter no longer supported
import * as jose from "jose";
import AuthenticationContext from '../contexts/AuthenticationContexts';

function UserGreeting(props) {
    const {accessToken} = useContext(AuthenticationContext);
    return (
        <>Hi {getUserEmail(accessToken)}!</>
    );
}

export default UserGreeting;

function getUserEmail(accessToken) {
    const userEmail = jose.decodeJwt(accessToken).email;
    return userEmail;
}