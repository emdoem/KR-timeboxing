import React, { useReducer, useRef, useEffect } from 'react';

import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getPauseStatus, getRunningStatus, getPausesCount, getElapsedTimeInSeconds } from './currentTimeboxReducer';
import {finishCurrentTimebox, startTimerAction, stopTimerAction, runTimer, togglePauseAction} from './actions';

import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTimebox } from './timeboxesReducer';

function CurrentTimebox() {

    const dispatch = useDispatch();
    const isPaused = useSelector(state => getPauseStatus(state.currentTimebox));
    const isRunning = useSelector(state => getRunningStatus(state.currentTimebox));
    const pausesCount = useSelector(state => getPausesCount(state.currentTimebox));
    //no idea why this one below works without reffering to the currentTimebox part of the state...
    const elapsedTimeInSeconds = useSelector(getElapsedTimeInSeconds);
    //these selectors refer to timeboxesManager part of the state
    const currentTimeboxFromState = useSelector(state => getCurrentTimebox(state.timeboxesManager));
    const title = currentTimeboxFromState ? currentTimeboxFromState.title : null;
    const totalTimeInMinutes = currentTimeboxFromState ? currentTimeboxFromState.totalTimeInMinutes : null;
    
    let intervalIdRef = useRef(null);

    function handleStart() {
        dispatch(startTimerAction())
        startTimer();
    }
    function handleStop() {
        dispatch(stopTimerAction())
        stopTimer();
    }
    function startTimer() {
        if (intervalIdRef.current === null) {
            intervalIdRef.current = window.setInterval(
                () => dispatch(runTimer()), 100
            )
        }

    }
    function stopTimer() {
        window.clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
    }
    function togglePause() {
        dispatch(togglePauseAction())
        if (isPaused) {
            startTimer();
        } else {
            stopTimer();
        }
    }
    function handleBackToList() {
        dispatch(finishCurrentTimebox())
    }
    // console.table(state);

    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;

    return (
        <>
        {currentTimeboxFromState ? 
        <div className="CurrentTimebox">
            <h1>{title}</h1>
            <Clock
                totalTimeInSeconds={totalTimeInSeconds}
                className={isPaused ? "inactive" : ""}
            />
            <ProgressBar
                className={isPaused ? "inactive" : ""}
                timeLeft={timeLeftInSeconds}
                totalTime={totalTimeInSeconds}
                color="purp"
                big
            />
            <button onClick={handleStart} disabled={isRunning}>Start</button>
            <button onClick={handleStop} disabled={!isRunning}>Stop</button>
            <button onClick={togglePause} disabled={!isRunning}>{isPaused ? "Resume" : "Pause"}</button>
            Liczba przerw: {pausesCount}
            <button onClick={handleBackToList} disabled={isRunning}>Zakończ</button>
        </div> : null}
        </>
        
    )

}

export default CurrentTimebox;