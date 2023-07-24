import React from 'react';
import PropTypes from 'prop-types';
import { getMinsAndSecsFromSecs } from "../lib/time";
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
    const {elapsedTimeInSeconds} = state.currentTimebox;
    const timeLeftInSeconds = ownProps.totalTimeInSeconds - elapsedTimeInSeconds;
    const [minutesLeft, secondsLeft] = getMinsAndSecsFromSecs(timeLeftInSeconds);
    return {minutes: minutesLeft, seconds: secondsLeft}
}

const CurrentTimeboxTimeLeft = connect(mapStateToProps)(
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

)

/*
Clock.defaultProps = {
        className: ""
    }
function NonNegativeNumbersType(props, propName, componentName) {
        if (props[propName] < 0) {
            return new Error(`Invalid prop '${propName}' issued to component '${componentName}'. It can't be negative.`);
        };
    };
const NumberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
Clock.propTypes = {
    className: PropTypes.string.isRequired,
    minutes: NumberOrStringType.isRequired,
    seconds: NonNegativeNumbersType
}
*/

export default CurrentTimeboxTimeLeft;