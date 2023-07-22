import React, { useEffect, useContext, useReducer } from 'react';

import TimeboxCreator from "./TimeboxCreatorFunc";
// import Timebox from "./Timebox";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/FetchTimeboxesAPI"
import AuthenticationContext from '../contexts/AuthenticationContexts';
import { AllTimeboxesList } from './TimeboxesList';
import ReadOnlyTimebox from './ReadOnlyTimebox';
import { areTimeboxesLoading, getTimeboxesLoadingError } from './timeboxesReducer';
import { setTimeboxes, setError, disableLoadingIndicator, addTimebox, stopEditingTimebox, replaceTimebox, removeTimebox, startEditingTimebox } from './TimeboxesManagerActions';

import { useForceUpdate } from './reduxStore';
import { useStore } from 'react-redux';
import { EditableTimebox } from './EditableTimebox.1';

export const Timebox = React.lazy(() => import('./Timebox'));

// insert custom URL in the call below:
const TimeboxesAPI = createTimeboxesAPI("http://localhost:5000/timeboxes/");

function TimeboxManager() {

    // const [state, dispatch] = useReducer(timeboxesReducer, undefined, timeboxesReducer);
    const store = useStore();
    const forceUpdate = useForceUpdate();
    const state = store.getState().timeboxesManager;
    const dispatch = store.dispatch;
    useEffect(() => store.subscribe(forceUpdate), []);

    const { accessToken } = useContext(AuthenticationContext);

    useEffect(() => {
        TimeboxesAPI.getAllTimeboxes(accessToken).then(
            (timeboxes) => {
                dispatch(setTimeboxes(timeboxes))
            }
        ).catch(
            (error) => dispatch(setError(error))
        ).finally(
            () => dispatch(disableLoadingIndicator())
        )
    }, [])

    const handleCreate = (createdTimebox) => {
        try {
            TimeboxesAPI.addTimebox(createdTimebox, accessToken).then(
                (addedTimebox) => dispatch(addTimebox(addedTimebox))
            );
        } catch (error) {
            console.log("Wystąpił błąd przy tworzeniu timeboxa: ", error);
        }
    }

    const renderTimebox = (timebox) => {
        const onUpdate = (updatedTimebox) => {
            TimeboxesAPI.replaceTimebox({ ...timebox, ...updatedTimebox }, accessToken)
                .then(
                    (replacedTimebox) => dispatch(replaceTimebox(replacedTimebox))
                )
            dispatch(stopEditingTimebox());
        };
        const onDelete = () => TimeboxesAPI.removeTimebox(timebox, accessToken)
            .then(
                () => dispatch(removeTimebox(timebox))
            );

        return <EditableTimebox
            timebox={timebox}
            onUpdate={onUpdate}
            onDelete={onDelete}
        />

    }

    function renderReadOnlyTimebox(timebox, index) {
        return <ReadOnlyTimebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
        />
    }

    return (
        <>
            <TimeboxCreator onCreate={handleCreate} />
            {areTimeboxesLoading(state) ? "Timeboxy się ładują..." : null}
            {getTimeboxesLoadingError(state) ? "Coś się wykrzaczyło w liście :(" : null}
            <Error message="Coś się wykrzaczyło w liście :(">
                <AllTimeboxesList
                    renderTimebox={renderTimebox}
                />
            </Error>


        </>
    )

}
TimeboxManager.contextType = AuthenticationContext;

export default TimeboxManager;

