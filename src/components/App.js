import React from 'react';

import TimeboxList from "./TimeboxList"
import EditableTimebox from './EditableTimebox';
function App() {
    return (
        <div className="App">
            <TimeboxList />
            <EditableTimebox />
        </div>
    )
}

export default App;