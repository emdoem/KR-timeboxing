import React, { useEffect, useContext, useReducer } from 'react';

import TimeboxCreator from "./TimeboxCreatorFunc";
// import Timebox from "./Timebox";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/FetchTimeboxesAPI"
import AuthenticationContext from '../contexts/AuthenticationContexts';
import { AllTimeboxesList } from './TimeboxesList';
import ReadOnlyTimebox from './ReadOnlyTimebox';
import { areTimeboxesLoading, getTimeboxesLoadingError } from './timeboxesReducer';
import { fetchAllTimeboxes, setTimeboxes, setError, disableLoadingIndicator, addTimebox, stopEditingTimebox, replaceTimebox, removeTimebox, startEditingTimebox } from './TimeboxesManagerActions';

import { useDispatch, useSelector } from 'react-redux';
import { EditableTimebox } from './EditableTimebox.1';

export const Timebox = React.lazy(() => import('./Timebox'));

// insert custom URL in the call below:
const TimeboxesAPI = createTimeboxesAPI("http://localhost:5000/timeboxes/");

function TimeboxManager() {

    const dispatch = useDispatch();
    const timeboxesLoading = useSelector(areTimeboxesLoading);
    const timeboxesLoadingError = useSelector(getTimeboxesLoadingError);
    const { accessToken } = useContext(AuthenticationContext);

    useEffect(() => {
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
            {timeboxesLoading ? "Timeboxy się ładują..." : null}
            {timeboxesLoadingError ? "Coś się wykrzaczyło w liście :(" : null}
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

