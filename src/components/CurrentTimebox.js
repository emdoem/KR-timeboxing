import React, { useContext, useRef, useEffect } from 'react';
import AuthenticationContext from '../contexts/AuthenticationContexts';


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
    finishTimeboxRemotely
} from './actions';

import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTimebox } from './timeboxesReducer';

function CurrentTimebox() {

    const dispatch = useDispatch();
    const isPaused = useSelector(state => getPauseStatus(state.currentTimebox));
    const isRunning = useSelector(state => getRunningStatus(state.currentTimebox));
    const pausesCount = useSelector(state => getPausesCount(state.currentTimebox));
    // all 'isFinished' logic is most probably completely unnecessary
    const isFinished = useSelector(state => isTimeboxFinished(state.currentTimebox));
    const elapsedTimeInSeconds = useSelector(state => getElapsedTimeInSeconds(state.currentTimebox));
    //these selectors refer to timeboxesManager part of the state
    const currentTimeboxFromState = useSelector(state => getCurrentTimebox(state.timeboxesManager));
    const title = currentTimeboxFromState ? currentTimeboxFromState.title : null;
    const totalTimeInMinutes = currentTimeboxFromState ? currentTimeboxFromState.totalTimeInMinutes : null;

    const { accessToken } = useContext(AuthenticationContext);

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
    useEffect(() => {
        if (timeLeftInSeconds <= 0.001) {
            dispatch(finishTimeboxRemotely(currentTimeboxFromState, accessToken));
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
                    Pauses count: {pausesCount}
                    <button onClick={handleBackToList}>Close</button>
                </div> : null}
        </>
    )
}

export default CurrentTimebox;