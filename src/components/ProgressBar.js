import React from 'react';

function ProgressBar({ 
    className = "", 
    percent = 33, 
    timeLeft = 15*60, 
    totalTime = 30*60, 
    color = null, 
    big = false
}) {
    let progressClassName = "progress " + className;
    if(big) {
        progressClassName += " progress--big"
    };
    if(color === "purp") {
        progressClassName += " progress--color-purp"
    };
    // passing state variables into timeLeft/totalTime to make ProgressBar follow the timer
    percent = timeLeft/totalTime*100;
    return (
        <div className={progressClassName}>
            <div className="progress__bar" style={{width: `${percent}%`}}></div>
        </div>
    );
}

export default ProgressBar;