import { setTimeboxes, replaceTimebox } from '../components/TimeboxesManagerActions'

test('setTimeboxes emits TIMEBOXES_SET action', () => {
    expect(setTimeboxes([])).toEqual(
        { type: "TIMEBOXES_SET", timeboxes: [] }
    )
});
test('replaceTimebox emits TIMEBOX_REPLACE action', () => {
   expect(replaceTimebox({})).toEqual(
    { type: "TIMEBOX_REPLACE", replacedTimebox: {} }
   )
});