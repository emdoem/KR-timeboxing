import React, { useReducer, useRef, useEffect } from 'react';

import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getMinsAndSecsFromSecs } from "../lib/time";
import { currentTimeboxReducer, initialState } from './currentTimeboxReducer';

import { useForceUpdate } from './reduxStore';
import { useStore } from 'react-redux';


const runTimer = () => ({ type: "TIMER_RUNNING" });

function CurrentTimebox({ title, totalTimeInMinutes }) {

    // const [state, dispatch] = useReducer(currentTimeboxReducer, initialState, currentTimeboxReducer);
    const store = useStore();
    const forceUpdate = useForceUpdate();
    const state = store.getState().currentTimebox;
    const dispatch = store.dispatch;
    useEffect(() => store.subscribe(forceUpdate), []);
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
        if (state.isPaused) {
            startTimer();
        } else {
            stopTimer();
        }
    }
    // console.table(state);
    const { isPaused, isRunning, pausesCount, elapsedTimeInSeconds } = state;
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