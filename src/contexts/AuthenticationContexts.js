import React from 'react';

const AuthenticationContext = React.createContext({
    accessToken: null,
    handleLogout: null
});

export default AuthenticationContext;