import React, { useReducer, useRef, useEffect } from 'react';

import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getPauseStatus, getRunningStatus, getPausesCount, getElapsedTimeInSeconds } from './currentTimeboxReducer';

import { useDispatch, useSelector } from 'react-redux';


const runTimer = () => ({ type: "TIMER_RUNNING" });

function CurrentTimebox({ title, totalTimeInMinutes }) {

    const dispatch = useDispatch();
    const isPaused = useSelector(state => getPauseStatus(state.currentTimebox));
    const isRunning = useSelector(state => getRunningStatus(state.currentTimebox));
    const pausesCount = useSelector(state => getPausesCount(state.currentTimebox));
    //no idea why this one below works without reffering to the currentTimebox part of the state...
    const elapsedTimeInSeconds = useSelector(getElapsedTimeInSeconds);
    
    let intervalIdRef = useRef(null);

    function handleStart() {
        dispatch({ type: "TIMER_START" })
        startTimer();
    }
    function handleStop() {
        dispatch({ type: "TIMER_STOP" })
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
        dispatch({ type: "PAUSE_TOGGLE" })
        if (isPaused) {
            startTimer();
        } else {
            stopTimer();
        }
    }
    // console.table(state);

    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;

    return (
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
        </div>
    )

}

export default CurrentTimebox;