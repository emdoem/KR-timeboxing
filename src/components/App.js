import React from 'react';

import TimeboxList from "./TimeboxList"
import EditableTimebox from './EditableTimebox';
import Error from "./Error";
import ErrorBoundary from './Error';

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