import React from 'react';

import TimeboxList from "./TimeboxList"
import EditableTimebox from './EditableTimebox';
import Error from "./ErrorBoundary";
import ErrorBoundary from './ErrorBoundary';

function App() {
    return (
        <div className="App">
            <ErrorBoundary message="Coś nie działa w całej aplikacji">
                <TimeboxList />
                <EditableTimebox />
            </ErrorBoundary>
        </div>
    )
}

export default App;