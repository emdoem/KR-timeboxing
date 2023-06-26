import React from 'react';

const AuthenticationContext = React.createContext({ 
    accessToken: null,
    /* this still needs work
    handleLogout: function() {
        this.setState({
            accessToken: null,
            previousLoginAttemptFailed: false
        });
    } 
    */
});

export default AuthenticationContext;