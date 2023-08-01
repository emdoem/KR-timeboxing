export function timeboxesReducer(state = initialState, action = {}) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case "TIMEBOX_MAKE_CURRENT": {
            const {timebox} = action;
            return { ...state, currentTimeboxId: timebox.id};
        }
        case "CURRENT_TIMEBOX_FINISH": {
            return {...state, currentTimeboxId: null}
        }
        case "TIMEBOXES_SET": {
            const { timeboxes } = action;
            return { ...state, timeboxes };
        }
        case "LOADING_INDICATOR_DISABLE":
            return { ...state, timeboxesAreLoading: false };
        case "ERROR_SET": {
            const { timeboxesLoadingError } = action;
            return { ...state, timeboxesLoadingError };
        }
        case "TIMEBOX_ADD": {
            const { timebox } = action;
            const timeboxes = [...state.timeboxes, timebox];
            return { ...state, timeboxes };
        }
        case "TIMEBOX_REMOVE": {
            const { removedTimebox } = action;
            const timeboxes = state.timeboxes.filter((timebox) => timebox.id !== removedTimebox.id);
            const currentTimeboxId = state.currentTimeboxId === removedTimebox.id ? null : state.currentTimeboxId;
            return { ...state, timeboxes, currentTimeboxId };
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
    timeboxesAreLoading: true,
    timeboxesLoadingError: null,
    currentTimeboxId: null
};

export const getAllTimeboxes = (state) => state.timeboxes;
export const areTimeboxesLoading = (state) => state.timeboxesAreLoading;
export const getTimeboxesLoadingError = (state) => state.timeboxesLoadingError;
export const isTimeboxEdited = (state, timebox) => state.currentlyEditedTimeboxId && state.currentlyEditedTimeboxId === timebox.id;
export const getTimeboxById = (state, timeboxId) => state.timeboxes.find(timebox => timebox.id === timeboxId);
export const getCurrentlyEditedTimebox = (state) => getTimeboxById(state, state.currentlyEditedTimeboxId);
export const isAnyTimeboxEdited = (state) => !!state.currentlyEditedTimeboxId;
export const isAnyTimeboxCurrent = state => !!state.currentTimeboxId;
export const getCurrentTimebox = state => isAnyTimeboxCurrent(state) ? getTimeboxById(state, state.currentTimeboxId) : null;