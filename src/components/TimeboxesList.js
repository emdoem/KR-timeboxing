import React, { useEffect } from 'react';
import Error from "./ErrorBoundary";
import { Timebox } from './TimeboxManager';
import { getAllTimeboxes, getFinishedTimeboxes, getRemainingTimeboxes } from './timeboxesReducer';

import { useForceUpdate } from './reduxStore';
import { connect, useStore } from 'react-redux';

export function TimeboxesList({ timeboxes, renderTimebox }) {
    return <div className="TimeboxesList">{timeboxes.map(renderTimebox)}</div>
}

// since state is combined out of 2 reducers, 
// the .timeboxesManager property needed to be specified in mapStateToProps fn.
export const AllTimeboxesList = connect(
    (state) => ({ timeboxes: getAllTimeboxes(state.timeboxesManager) })
)(TimeboxesList);

export const RemainingTimeboxesList = connect(
    (state) => ({ timeboxes: getRemainingTimeboxes(state.timeboxesManager) })
)(TimeboxesList);

export const FinishedTimeboxesList = connect(
    (state) => ({ timeboxes: getFinishedTimeboxes(state.timeboxesManager) })
)(TimeboxesList);