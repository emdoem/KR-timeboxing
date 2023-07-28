import { areTimeboxesLoading, getTimeboxById, timeboxesReducer } from '../components/timeboxesReducer'

test('areTimeboxesLoading return true when state.timeboxesAreLoading is true', () => {
    const state = {
        timeboxesAreLoading: true
    };
    expect(areTimeboxesLoading(state)).toBe(true);
});
test('getTimeboxById returns the proper timebox', () => {
    const timebox1 = {
        id: 1,
        title: 'the right timebox to return'
    }
    const timebox2 = {
        id: 'zonk',
        title: 'the wrong timebox to return'
    }
    const state = {
        timeboxes: [timebox1, timebox2]
    }
    expect(getTimeboxById(state, 1)).toEqual({
        id: 1,
        title: 'the right timebox to return'
    })
})

describe('timeboxesReducer', () => {
    test('adds a timebox when given a TIMEBOX_ADD action', () => {
        const state = {
            timeboxes: []
        }
        const newTimebox = { id: "I'm a new timebox" };
        expect(timeboxesReducer(state, { type: "TIMEBOX_ADD", timebox: newTimebox })).toEqual(
            {
                timeboxes: [newTimebox]
            }
        )
    });
    test('replaces a timebox when given a TIMEBOX_REPLACE action', () => {
        const state = {
            timeboxes: [
                {
                    id: 1,
                    title: "timebox to be replaced"
                },
                {
                    id: 3,
                    title: "timebox to be untouched"
                }
            ]
        }
        const newTimebox = {
            id: 1,
            title: "new timebox"
        };

        expect(timeboxesReducer(state, {
            type: "TIMEBOX_REPLACE",
            replacedTimebox: newTimebox
        })).toEqual({
            timeboxes: [
                {
                    id: 1,
                    title: "new timebox"
                },
                {
                    id: 3,
                    title: "timebox to be untouched"
                }
            ]
        })
    })
})