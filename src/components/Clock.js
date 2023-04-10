import React from 'react';

function Clock({ className = "", minutes = 7, seconds = 0 }) {
    // here making sure the numbers display as double digits
    let minutesDisplay = minutes.toString();
    if (minutesDisplay.length < 2) {
        minutesDisplay = '0' + minutesDisplay;
    };
    let secondsDisplay = seconds.toString();
    if (secondsDisplay.length < 2) {
        secondsDisplay = '0' + secondsDisplay;
    };
    
    return <h2 className={"Clock " + className}>Pozostało {minutesDisplay}:{secondsDisplay}</h2>
}

export default Clock;