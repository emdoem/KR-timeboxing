import React, { useReducer, useRef, useEffect } from 'react';

import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { 
    getPauseStatus, 
    getRunningStatus, 
    getPausesCount, 
    getElapsedTimeInSeconds, 
    isTimeboxFinished 
} from './currentTimeboxReducer';
import { 
    closeCurrentTimebox, 
    startTimerAction, 
    stopTimerAction, 
    runTimer, 
    togglePauseAction, 
    resetCurrentTimebox, 
    finishCurrentTimebox, 
    finishTimeboxOffTheList
} from './actions';

import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTimebox } from './timeboxesReducer';

function CurrentTimebox() {

    const dispatch = useDispatch();
    const isPaused = useSelector(state => getPauseStatus(state.currentTimebox));
    const isRunning = useSelector(state => getRunningStatus(state.currentTimebox));
    const pausesCount = useSelector(state => getPausesCount(state.currentTimebox));
    const isFinished = useSelector(state => isTimeboxFinished(state.currentTimebox));
    const elapsedTimeInSeconds = useSelector(state => getElapsedTimeInSeconds(state.currentTimebox));
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
    // this was a fun one - the issue was, elapsedTimeInSeconds was undefined,
    // because the selector didn't refer to the proper slice of the state
    // so the timer never stopped
    useEffect(() => {
        if (timeLeftInSeconds <= 0.001) {
            // this could be refactored into a single action dispatch
            dispatch(finishTimeboxOffTheList());
            dispatch(finishCurrentTimebox());
            dispatch(closeCurrentTimebox())

            handleStop();
        }
    }, [elapsedTimeInSeconds])
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
        dispatch(closeCurrentTimebox())
        dispatch(resetCurrentTimebox())
        stopTimer()
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
                    <button onClick={handleStart} disabled={isRunning || isFinished}>Start</button>
                    <button onClick={handleStop} disabled={!isRunning}>Stop</button>
                    <button onClick={togglePause} disabled={!isRunning}>{isPaused ? "Resume" : "Pause"}</button>
                    Liczba przerw: {pausesCount}
                    <button onClick={handleBackToList}>Zamknij</button>
                </div> : null}
        </>
    )
}

export default CurrentTimebox;