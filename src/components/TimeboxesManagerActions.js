export const setTimeboxes = timeboxes => ({ type: "TIMEBOXES_SET", timeboxes });
export const setError = error => ({ type: "ERROR_SET", error });
export const disableLoadingIndicator = () => ({ type: "LOADING_INDICATOR_DISABLE" });
export const addTimebox = timebox => ({ type: "TIMEBOX_ADD", timebox });
export const removeTimebox = removedTimebox => ({ type: "TIMEBOX_REMOVE", removedTimebox });
export const replaceTimebox = replacedTimebox => ({ type: "TIMEBOX_REPLACE", replacedTimebox });
export const startEditingTimebox = currentlyEditedTimeboxId => ({ type: "TIMEBOX_EDIT_START", currentlyEditedTimeboxId });
export const stopEditingTimebox = () => ({ type: "TIMEBOX_EDIT_STOP" });
