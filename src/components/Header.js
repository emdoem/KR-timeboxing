import React from 'react';
import UserGreeting from './UserGreeting';
import AuthenticationContext from '../contexts/AuthenticationContexts';


function Header() {
    return (
        <header className="header">
            <UserGreeting />
            <AuthenticationContext.Consumer>
                {({ handleLogout }) =>
                    <a
                        onClick={handleLogout}
                        className="header__logout-link"
                        href="#"
                    >Wyloguj się</a>}
            </AuthenticationContext.Consumer>

        </header>

    );
}

export default Header;