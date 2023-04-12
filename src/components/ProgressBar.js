import React from 'react';
import classNames from "classnames";

function ProgressBar({ 
    className = "", 
    percent = 33, 
    timeLeft = 15*60, 
    totalTime = 30*60, 
    color = null, 
    big = false
}) {
    let progressClassName = classNames(
        "progress",
        className,
        {
            "progress--big": big,
            "progress--color-red": color === "red"
        }
    );
    // try building className using: progressClassName = ['progress','progress--big'].join(' ');
    // below: passing state variables into timeLeft/totalTime to make ProgressBar follow the timer
    percent = timeLeft/totalTime*100;
    return (
        <div className={progressClassName}>
            <div className="progress__bar" style={{width: `${percent}%`}}></div>
        </div>
    );
}

export default ProgressBar;