import React from 'react';

import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { title: "Uczę się list", totalTimeInMinutes: 25 },
            { title: "Uczę się formularzy", totalTimeInMinutes: 15 },
            { title: "Uczę się srutututu", totalTimeInMinutes: 5 },
            { title: "Uczę się życia", totalTimeInMinutes: 2 }
        ]
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
        this.addTimebox(createdTimebox)
    }

    render () {
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate} />
                {this.state.timeboxes.map((timebox, index) => (
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
                ))}
                                 
            </>
        )
    }
}

export default TimeboxList;