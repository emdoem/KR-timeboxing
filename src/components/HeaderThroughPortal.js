import React from 'react';
import ReactDOM from 'react-dom';
import UserGreeting from './UserGreeting';

const headerRoot = document.getElementById("headerRoot");

function Header({ onLogout }) {
    // console.log('DRUKUJ headerRoot', headerRoot);
    return ReactDOM.createPortal(
        <header className="header">
            <UserGreeting />

            <a onClick={onLogout} className="header__logout-link" href="#">Wyloguj się</a>
        </header>
        , headerRoot
    );
}

export default Header;