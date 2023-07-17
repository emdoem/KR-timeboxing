export function timeboxesReducer(state = initialState, action = {}) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case "TIMEBOXES_SET": {
            const { timeboxes } = action;
            return { ...state, timeboxes };
        }
        case "LOADING_INDICATOR_DISABLE":
            return { ...state, loading: false };
        case "ERROR_SET": {
            const { error } = action;
            return { ...state, error };
        }
        case "TIMEBOX_ADD": {
            const { timebox } = action;
            const timeboxes = [...state.timeboxes, timebox];
            return { ...state, timeboxes };
        }
        case "TIMEBOX_REMOVE": {
            const { removedTimebox } = action;
            const timeboxes = state.timeboxes.filter((timebox) => timebox.id !== removedTimebox.id);
            return { ...state, timeboxes };
        }
        case "TIMEBOX_REPLACE": {
            const { replacedTimebox } = action;
            const timeboxes = state.timeboxes.map((timebox) => timebox.id === replacedTimebox.id ? replacedTimebox : timebox
            );
            return { ...state, timeboxes };
        }
        case "TIMEBOX_EDIT_STOP":
            return { ...state, currentlyEditedTimeboxId: null };
        case "TIMEBOX_EDIT_START": {
            const { currentlyEditedTimeboxId } = action;
            return { ...state, currentlyEditedTimeboxId };
        }
        default:
            return state;
    }

}
const initialState = {
    timeboxes: [],
    editIndex: null,
    loading: true,
    error: null
};
