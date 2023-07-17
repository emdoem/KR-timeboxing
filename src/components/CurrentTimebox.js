import React, { useReducer, useRef } from 'react';

import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getMinsAndSecsFromSecs } from "../lib/time";
import { currentTimeboxReducer, initialState } from './currentTimeboxReducer';

function CurrentTimebox({ title, totalTimeInMinutes }) {

    const [state, dispatch] = useReducer(currentTimeboxReducer, initialState, currentTimeboxReducer);
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
                () => dispatch({ type: "TIMER_RUNNING" }), 100
            )
        }

    }
    function stopTimer() {
        window.clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
    }
    function togglePause() {
        dispatch({type: "PAUSE_TOGGLE"})
        if (state.isPaused) {
            startTimer();
        } else {
            stopTimer();
        }
    }
    console.table(state);
    const { isPaused, isRunning, pausesCount, elapsedTimeInSeconds } = state;
    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;

    const [minutesLeft, secondsLeft] = getMinsAndSecsFromSecs(timeLeftInSeconds);

    return (
        <div className="CurrentTimebox">
            <h1>{title}</h1>
            <Clock
                minutes={minutesLeft}
                seconds={secondsLeft}
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