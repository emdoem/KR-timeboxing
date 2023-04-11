import React from 'react';

function ProgressBar({ className = "", percent = 33, timeLeft = 15*60, totalTime = 30*60 }) {
    // passing state variables into timeLeft/totalTime to make ProgressBar follow the timer
    percent = timeLeft/totalTime*100
    return (
        <div className={"progress progress--big progress--color-purp" + className}>
            <div className="progress__bar" style={{width: `${percent}%`}}></div>
        </div>
    );
}

export default ProgressBar;