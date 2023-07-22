import React, { useEffect } from 'react';
import Error from "./ErrorBoundary";
import { Timebox } from './TimeboxManager';
import { getAllTimeboxes } from './timeboxesReducer';

import { useForceUpdate } from './reduxStore';
import { connect, useStore } from 'react-redux';

export function TimeboxesList({ timeboxes, renderTimebox }) {
    return <div className="TimeboxesList">{timeboxes.map(renderTimebox)}</div>
}

// since state is combined out of 2 reducers, 
// the .timeboxesManager property needed to be specified in mapStateToProps fn.
const mapStateToProps = (state) => ({ timeboxes: getAllTimeboxes(state.timeboxesManager) });
export const AllTimeboxesList = connect(mapStateToProps)(TimeboxesList);

/* 
custom connect function - replaced by connect()() from react-redux
that's some nice currying!
*/
function connectToRedux(mapStateToProps) {
    return function (Component) {
        function ConnectedComponent(props) {
            const store = useStore();
            const forceUpdate = useForceUpdate();
            const state = store.getState().timeboxesManager;
            useEffect(() => store.subscribe(forceUpdate), []);

            const mappedProps = mapStateToProps(state);
            const newProps = {
                ...props,
                ...mappedProps
            }
            return <Component
                {...newProps}
            />
        }
        return ConnectedComponent;
    }
}

