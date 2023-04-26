import React from 'react';

import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
import Error from "./Error";


class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { title: "Uczę się list", totalTimeInMinutes: 25 },
            { title: "Uczę się formularzy", totalTimeInMinutes: 15 },
            { title: "Uczę się srutututu", totalTimeInMinutes: 5 },
            { title: "Uczę się życia", totalTimeInMinutes: 2 }
        ],
        hasError: false
    }       
    
    

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }

    removeTimebox = (indexToRemove)=> {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => 
                index !== indexToRemove
            );
            return { timeboxes };
        })
    }

    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) =>
                index === indexToUpdate ? updatedTimebox : timebox
            );
            return { timeboxes};
        })
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
                <Error message="Coś się wykrzaczyło w liście :(">
                { 
                   this.state.timeboxes.map((timebox, index) => (
                       <Error message="Coś się wykrzaczyło w timeboksie :(">
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
                       </Error>
                   ))
                }
                </Error>
                
                                 
            </>
        )
    }
}

export default TimeboxList;