import { useState } from 'react';
import { timeboxesReducer } from './timeboxesReducer';
import { currentTimeboxReducer, initialState } from './currentTimeboxReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        timeboxesManager: timeboxesReducer,
        currentTimebox: currentTimeboxReducer
    }
});
export function useForceUpdate() {
    const [updateCounter, setUpdateCounter] = useState(0);
    function forceUpdate() {
        setUpdateCounter(prevCounter => prevCounter + 1);
    }
    return forceUpdate;
}
