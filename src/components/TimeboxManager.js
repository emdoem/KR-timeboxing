import React, { useEffect, useContext, useReducer } from 'react';

import TimeboxCreator from "./TimeboxCreatorFunc";
// import Timebox from "./Timebox";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/FetchTimeboxesAPI"
import AuthenticationContext from '../contexts/AuthenticationContexts';
import { TimeboxesList } from './TimeboxesList';
import ReadOnlyTimebox from './ReadOnlyTimebox';
import TimeboxEditor from './TimeboxEditor';

export const Timebox = React.lazy(() => import('./Timebox'));

// insert custom URL in the call below:
const TimeboxesAPI = createTimeboxesAPI("http://localhost:5000/timeboxes/");

const stateReducer = (prevState, stateChanges) => {
    let newState = prevState;

    if (typeof stateChanges === "function") {
        newState = stateChanges(prevState)
    } else {
        newState = {
            ...prevState,
            ...stateChanges
        }
    }
    return newState;
}

function TimeboxManager() {
    const initialState = {
        timeboxes: [],
        editIndex: null,
        loading: true,
        error: null
    }

    const [state, setState] = useReducer(stateReducer, initialState);
    const { accessToken } = useContext(AuthenticationContext);

    useEffect(() => {
        TimeboxesAPI.getAllTimeboxes(accessToken).then(
            (timeboxes) => setState({ timeboxes })
        ).catch(
            (error) => setState({ error })
        ).finally(
            () => setState({ loading: false })
        )
    }, [])

    const addTimebox = (timebox) => {
        TimeboxesAPI.addTimebox(timebox, accessToken).then(
            (addedTimebox) => setState(prevState => {
                const timeboxes = [...prevState.timeboxes, addedTimebox];
                return { timeboxes };
            }
            )
        )

    }

    const removeTimebox = (indexToRemove) => {
        TimeboxesAPI.removeTimebox(state.timeboxes[indexToRemove], accessToken).then(
            () => setState(prevState => {
                const timeboxes = prevState.timeboxes.filter((timebox, index) =>
                    index !== indexToRemove
                );
                return { timeboxes };
            })
        )
    }

    const updateTimebox = (indexToUpdate, timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
            .then(
                (updatedTimebox) => setState(prevState => {
                    const timeboxes = prevState.timeboxes.map((timebox, index) =>
                        index === indexToUpdate ? updatedTimebox : timebox
                    );
                    return { timeboxes };
                })
            )

    }

    const handleCreate = (createdTimebox) => {
        try {
            addTimebox(createdTimebox);
        } catch (error) {
            console.log("Wystąpił błąd przy tworzeniu timeboxa: ", error);
        }
    }

    const renderTimebox = (timebox, index) => {
        return <>

            {state.editIndex === index ?
                <TimeboxEditor
                    initialTitle={timebox.title}
                    initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
                    onCancel={() => setState({ editIndex: null })}
                    onUpdate={(updatedTimebox) => {
                        updateTimebox(index, {
                            ...timebox,
                            ...updatedTimebox
                        });
                        setState({ editIndex: null });
                    }}
                /> :
                <Timebox
                    key={timebox.id}
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() => removeTimebox(index)}
                    onEdit={() => setState({ editIndex: index })} />
            }
        </>
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

