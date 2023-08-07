import createTimeboxesAPI from "../api/FetchTimeboxesAPI"
import { getCurrentTimebox } from "./timeboxesReducer";

export const setTimeboxes = timeboxes => ({ type: "TIMEBOXES_SET", timeboxes });
export const setError = error => ({ type: "ERROR_SET", error });
export const disableLoadingIndicator = () => ({ type: "LOADING_INDICATOR_DISABLE" });
export const addTimebox = timebox => ({ type: "TIMEBOX_ADD", timebox });
export const removeTimebox = removedTimebox => ({ type: "TIMEBOX_REMOVE", removedTimebox });
export const replaceTimebox = replacedTimebox => ({ type: "TIMEBOX_REPLACE", replacedTimebox });
export const startEditingTimebox = currentlyEditedTimeboxId => ({ type: "TIMEBOX_EDIT_START", currentlyEditedTimeboxId });
export const stopEditingTimebox = () => ({ type: "TIMEBOX_EDIT_STOP" });
export const makeTimeboxCurrent = timebox => ({ type: "TIMEBOX_MAKE_CURRENT", timebox });
export const closeCurrentTimebox = () => ({ type: "CURRENT_TIMEBOX_CLOSE" });
export const finishTimeboxOffTheList = (finishedTimebox) => ({ type: "TIMEBOX_FINISH", finishedTimebox });

// insert custom URL in the call below:
const TimeboxesAPI = createTimeboxesAPI("http://localhost:5000/timeboxes/");

export const fetchAllTimeboxes = (accessToken) => (dispatch) => {
    TimeboxesAPI.getAllTimeboxes(accessToken).then(
        (timeboxes) => {
            dispatch(setTimeboxes(timeboxes))
            // console.table(timeboxes)
        }
    ).catch(
        (error) => dispatch(setError(error))
    ).finally(
        () => dispatch(disableLoadingIndicator())
    )
}

export const removeTimeboxRemotely = (timebox, accessToken) => dispatch => {
    TimeboxesAPI.removeTimebox(timebox, accessToken)
        .then(
            () => dispatch(removeTimebox(timebox))
        );
}

export const updateTimeboxRemotely = (timebox, updatedTimebox, accessToken) => dispatch => {
    TimeboxesAPI.replaceTimebox({ ...timebox, ...updatedTimebox }, accessToken)
        .then(
            (replacedTimebox) => dispatch(replaceTimebox(replacedTimebox))
        )
    dispatch(stopEditingTimebox());
};

export const finishTimeboxRemotely = (timebox, accessToken) => dispatch => {
    const updatedTimebox = { ...timebox, finished: true}
    TimeboxesAPI.replaceTimebox({ ...timebox, ...updatedTimebox }, accessToken)
        .then(finishedTimebox => dispatch(finishTimeboxOffTheList(finishedTimebox)))
}

export const runTimer = () => ({ type: "TIMER_RUNNING" });
export const startTimerAction = () => ({ type: "TIMER_START" });
export const stopTimerAction = () => ({ type: "TIMER_STOP" });
export const togglePauseAction = () => ({ type: "PAUSE_TOGGLE" });
export const resetCurrentTimebox = () => ({ type: "CURRENT_TIMEBOX_RESET" });
// export const finishCurrentTimebox = () => ({ type: "CURRENT_TIMEBOX_FINISH" });