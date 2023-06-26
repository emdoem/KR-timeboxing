import React from 'react';

import TimeboxCreator from "./TimeboxCreator";
// import Timebox from "./Timebox";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/FetchTimeboxesAPI"
import AuthenticationContext from '../contexts/AuthenticationContexts';

const Timebox = React.lazy(() => import('./Timebox'));

// insert custom URL in the call below:
const TimeboxesAPI = createTimeboxesAPI("http://localhost:5000/timeboxes/");

class TimeboxList extends React.Component {
    state = {
        timeboxes: [],
        loading: true,
        error: null
    }
     
    componentDidMount() {
        TimeboxesAPI.getAllTimeboxes(this.context.accessToken).then(
            (timeboxes) => this.setState({ timeboxes })
        ).catch(
            (error) => this.setState({ error })
        ).finally(
            () => this.setState({loading: false})
        )
    }
    
    addTimebox = (timebox) => {
        TimeboxesAPI.addTimebox(timebox, this.context.accessToken).then(
           (addedTimebox) => this.setState(prevState => {
                const timeboxes = [...prevState.timeboxes, addedTimebox];
                return { timeboxes };
            }
        ) 
        )
        
    }

    removeTimebox = (indexToRemove)=> {
        TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToRemove], this.context.accessToken).then(
            () => this.setState(prevState => {
                const timeboxes = prevState.timeboxes.filter((timebox, index) => 
                    index !== indexToRemove
                );
                return { timeboxes };
            })
        )
    }

    updateTimebox = (indexToUpdate, timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, this.context.accessToken)
            .then(
                (updatedTimebox) => this.setState(prevState => {
                    const timeboxes = prevState.timeboxes.map((timebox, index) =>
                        index === indexToUpdate ? updatedTimebox : timebox
                    );
                    return { timeboxes };
                })
            )
        
    }

    handleCreate = (createdTimebox) => {
        try {
            this.addTimebox(createdTimebox);
        } catch (error) {
            console.log("Wystąpił błąd przy tworzeniu timeboxa: ", error);
        }
    }

    render () {
        console.table(this.state.timeboxes);
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate} />
                { this.state.loading ? "Timeboxy się ładują..." : null }
                { this.state.error ? "Coś się wykrzaczyło w liście :(" : null}
                <Error message="Coś się wykrzaczyło w liście :(">
                { 
                   this.state.timeboxes.map((timebox, index) => (
                       <Error message="Coś się wykrzaczyło w timeboksie :(">
                            <React.Suspense fallback={"timebox loading"}>
                                <Timebox 
                                    key={timebox.id} 
                                    title={timebox.title} 
                                    totalTimeInMinutes={timebox.totalTimeInMinutes} 
                                    onDelete={() => this.removeTimebox(index)}
                                    onEdit={(updatedTimebox) => {
                                        this.updateTimebox(index, {
                                            ...timebox, 
                                            title: updatedTimebox.updatedTitle
                                        });
                                    }}
                                />    
                            </React.Suspense>
                       
                       </Error>
                   ))
                }
                </Error>
                
                                 
            </>
        )
    }
}
TimeboxList.contextType = AuthenticationContext;

export default TimeboxList;