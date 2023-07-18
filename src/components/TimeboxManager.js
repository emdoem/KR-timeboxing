import React, { useEffect, useContext, useReducer } from 'react';

import TimeboxCreator from "./TimeboxCreatorFunc";
// import Timebox from "./Timebox";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/FetchTimeboxesAPI"
import AuthenticationContext from '../contexts/AuthenticationContexts';
import { TimeboxesList } from './TimeboxesList';
import ReadOnlyTimebox from './ReadOnlyTimebox';
import TimeboxEditor from './TimeboxEditor';
import { timeboxesReducer } from './timeboxesReducer';
import { setTimeboxes, setError, disableLoadingIndicator, addTimebox, stopEditingTimebox, replaceTimebox, removeTimebox, startEditingTimebox } from './TimeboxesManagerActions';

export const Timebox = React.lazy(() => import('./Timebox'));

// insert custom URL in the call below:
const TimeboxesAPI = createTimeboxesAPI("http://localhost:5000/timeboxes/");

function TimeboxManager() {

    const [state, dispatch] = useReducer(timeboxesReducer, undefined, timeboxesReducer);
    const { accessToken } = useContext(AuthenticationContext);

    useEffect(() => {
        TimeboxesAPI.getAllTimeboxes(accessToken).then(
            (timeboxes) => dispatch(setTimeboxes(timeboxes))
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
        return <>

            {state.currentlyEditedTimeboxId === timebox.id ?
                <TimeboxEditor
                    initialTitle={timebox.title}
                    initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
                    onCancel={() => dispatch(stopEditingTimebox())}
                    onUpdate={(updatedTimebox) => {
                        TimeboxesAPI.replaceTimebox({ ...timebox, ...updatedTimebox }, accessToken)
                            .then(
                                (replacedTimebox) => dispatch(replaceTimebox(replacedTimebox))
                            )
                        dispatch(stopEditingTimebox());
                    }}
                /> :
                <Timebox
                    key={timebox.id}
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() => TimeboxesAPI.removeTimebox(timebox, accessToken)
                        .then(
                            () => dispatch(removeTimebox(timebox))
                        )}
                    onEdit={() => dispatch(startEditingTimebox(timebox.id))} />
            }
        </>
    }
    /* renderProps excercise:
    function renderReadOnlyTimebox(timebox, index) {
        return <ReadOnlyTimebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
        />
    }
    */
    return (
        <>
            <TimeboxCreator onCreate={handleCreate} />
            {state.loading ? "Timeboxy się ładują..." : null}
            {state.error ? "Coś się wykrzaczyło w liście :(" : null}
            <Error message="Coś się wykrzaczyło w liście :(">
                <TimeboxesList
                    timeboxes={state.timeboxes}
                    renderTimebox={renderTimebox}
                />
            </Error>


        </>
    )

}
TimeboxManager.contextType = AuthenticationContext;

export default TimeboxManager;

