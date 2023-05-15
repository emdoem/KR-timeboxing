import React from 'react';
import PropTypes from 'prop-types';

function Clock({ className, minutes, seconds }) {
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
Clock.defaultProps = {
    className: ""
}
const NumberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
Clock.propTypes = {
    className: PropTypes.string.isRequired, 
    minutes: NumberOrStringType.isRequired, 
    seconds: NumberOrStringType.isRequired
}

export default Clock;