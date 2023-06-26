import React from 'react';
import Header from './Header';
import TimeboxList from "./TimeboxList"
import EditableTimebox from './EditableTimebox';
import InspirationalQuote from './InspirationalQuote';

function AuthenticatedApp({onLogout}) {
    return (
        <>
            <Header onLogout={onLogout} />
            <TimeboxList />
            <EditableTimebox />
            <InspirationalQuote />
        </>
        
    );
}

export default AuthenticatedApp;