import React from 'react';
import Error from "./ErrorBoundary";
import { Timebox } from './TimeboxManager';

export function TimeboxesList({ timeboxes, renderTimebox }) {
    return <div className="TimeboxesList">{timeboxes.map(renderTimebox)}</div>
}
