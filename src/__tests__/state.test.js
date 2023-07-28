import { configureStore } from "@reduxjs/toolkit";
import { getAllTimeboxes, timeboxesReducer, getTimeboxById } from "../components/timeboxesReducer";
import { currentTimeboxReducer } from "../components/currentTimeboxReducer";
import { addTimebox, removeTimebox } from "../components/TimeboxesManagerActions";

let store = null;

describe('timeboxes state changes', () => {
    beforeEach(() => {
        store = configureStore({
            reducer: {
                timeboxesManager: timeboxesReducer,
                currentTimebox: currentTimeboxReducer
            }
        });
    })
    test('initially timeboxes are empy', () => {
        const timeboxes = getAllTimeboxes(store.getState().timeboxesManager);
        expect(timeboxes).toEqual([]);
    });

    test('addTimebox action inserts a new timebox', () => {
        const newTimebox = { id: "I am a new timebox" };
        store.dispatch(addTimebox(newTimebox));
        const timeboxes = getAllTimeboxes(store.getState().timeboxesManager);
        expect(timeboxes).toEqual([newTimebox]);
    });

    test('removeTimebox action removes a timebox', () => {
        const aTimebox = { id: "I am a timebox" };
        const anotherTimebox = { id: "I am another timebox" };
        store.dispatch(addTimebox(aTimebox));
        store.dispatch(addTimebox(anotherTimebox));

        store.dispatch(removeTimebox(aTimebox));

        expect(getTimeboxById(store.getState().timeboxesManager, "I am a timebox")).toBe(undefined);
        expect(getTimeboxById(store.getState().timeboxesManager, "I am another timebox")).toBe(anotherTimebox);

    });
});

