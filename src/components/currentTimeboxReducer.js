export function currentTimeboxReducer(state = initialState, action = {}) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case "TIMER_START": return { ...state, isRunning: true };
        case "TIMER_STOP": return { ...initialState };
        case "TIMER_RUNNING": return {
            ...state,
            elapsedTimeInSeconds: state.elapsedTimeInSeconds + 0.1
        };
        case "PAUSE_TOGGLE": {
            const isPaused = !state.isPaused;
            return {
                ...state,
                isPaused,
                pausesCount: isPaused ? state.pausesCount + 1 : state.pausesCount
            };

        }
        default: return state;
    }
}
export const initialState = {
    isRunning: false,
    isPaused: false,
    pausesCount: 0,
    elapsedTimeInSeconds: 0,
};
export const getPauseStatus = state => state.isPaused;
export const getRunningStatus = state => state.isRunning;
export const getPausesCount = state => state.pausesCount;
export const getElapsedTimeInSeconds = state => state.elapsedTimeInSeconds;