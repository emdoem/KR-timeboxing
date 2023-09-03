import React, { useEffect, useContext, useReducer } from 'react';

import TimeboxCreator from "./TimeboxCreatorFunc";
// import Timebox from "./Timebox";
import Error from "./ErrorBoundary";
import TimeboxesAPI from "../api/FakeTimeboxesAPI"
import AuthenticationContext from '../contexts/AuthenticationContexts';
import { RemainingTimeboxesList, FinishedTimeboxesList } from './TimeboxesList';
import ReadOnlyTimebox from './ReadOnlyTimebox';
import { areTimeboxesLoading, getTimeboxesLoadingError } from './timeboxesReducer';
import { fetchAllTimeboxes, removeTimeboxRemotely, updateTimeboxRemotely, addTimebox } from './actions';

import { useDispatch, useSelector } from 'react-redux';
import { EditableTimebox } from './EditableTimebox.1';
import CurrentTimebox from './CurrentTimebox';

export const Timebox = React.lazy(() => import('./Timebox'));

// insert custom URL in the call below:
// const TimeboxesAPI = createTimeboxesAPI("http://localhost:5000/timeboxes/");

function TimeboxManager() {

    const dispatch = useDispatch();
    const timeboxesLoading = useSelector(areTimeboxesLoading);
    const timeboxesLoadingError = useSelector(getTimeboxesLoadingError);
    const { accessToken } = useContext(AuthenticationContext);

    useEffect(() => {
        dispatch(fetchAllTimeboxes(accessToken))
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
        const onUpdate = (updatedTimebox) => dispatch(updateTimeboxRemotely(timebox, updatedTimebox, accessToken))
        const onDelete = () => dispatch(removeTimeboxRemotely(timebox, accessToken))

        return <EditableTimebox
            timebox={timebox}
            onUpdate={onUpdate}
            onDelete={onDelete}
        />

    }

    function renderReadOnlyTimebox(timebox) {
        const onDelete = () => dispatch(removeTimeboxRemotely(timebox, accessToken))

        return <ReadOnlyTimebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={onDelete}

        />
    }


    return (
        <>
            <TimeboxCreator onCreate={handleCreate} />
            {timeboxesLoading ? "Timeboxy się ładują..." : null}
            {timeboxesLoadingError ? "Coś się wykrzaczyło w liście :(" : null}
            <Error message="Coś się wykrzaczyło w liście :(">
                <p>Remaining Tasks</p>
                <RemainingTimeboxesList
                    renderTimebox={renderTimebox}
                />
            </Error>
            <CurrentTimebox/>
            <p>Finished Tasks</p>
            <FinishedTimeboxesList
                renderTimebox={renderReadOnlyTimebox}
            />

        </>
    )

}
TimeboxManager.contextType = AuthenticationContext;

export default TimeboxManager;

