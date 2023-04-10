import React from 'react';
import {v4 as uuidv4} from "uuid";

import Clock from "./Clock";

function TimeboxEditor(props) {
    const { 
            title, 
            totalTimeInMinutes,
            isEditable,
            onTitleChange,
            onTotalTimeInMinutesChange,
            onConfirm, 
    } = props;
    return (
            <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
                <label>
                    Co robisz? 
                    <input 
                        disabled={false}
                        value={title}
                        onChange={onTitleChange}
                        type="text" 
                    />
                </label><br />
                <label>
                    Ile minut? 
                    <input 
                        disabled={false}
                        value={totalTimeInMinutes} 
                        onChange={onTotalTimeInMinutesChange}
                        type="number" 
                    />
                    </label><br />
                <button
                    onClick={onConfirm}
                    disabled={false}
                >Zatwierdź zmiany</button>
            </div>
    )    
        
    
}



function ProgressBar({ className = "", percent = 33, timeLeft = 15*60, totalTime = 30*60 }) {
    // passing state variables into timeLeft/totalTime to make ProgressBar follow the timer
    percent = timeLeft/totalTime*100
    return (
        <div className={"ProgressBar " + className}>
            <div style={{width: `${percent}%`}}></div>
        </div>
    );
}

class CurrentTimebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        }
        this.handleStart = this.handleStart.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.togglePause = this.togglePause.bind(this)
    }
    handleStart(event) {
        this.setState({
            isRunning: true,
        })
        this.startTimer();
    }
    handleStop(event) {
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        })
        this.stopTimer();
    }
    startTimer() {
        this.intervalId = window.setInterval(
            () => {
                this.setState(
                    (prevState) => ({ elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1})
                )
            },
            100
        )
    }
    stopTimer() {
        window.clearInterval(this.intervalId);
    }
    togglePause() {
        this.setState(
            function(prevState) {
                const isPaused = !prevState.isPaused;
                if (isPaused) {
                    this.stopTimer();
                } else {
                    this.startTimer();
                }
                return {
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount +1 : prevState.pausesCount
                }
            }
        )
    }
    //below: passing state into ProgressBar
    render() {
        const { isPaused, isRunning, pausesCount, elapsedTimeInSeconds } = this.state;
        const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;
        const totalTimeInSeconds = totalTimeInMinutes*60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const minutesLeft = Math.floor(timeLeftInSeconds/60);
        const secondsLeft = Math.floor(timeLeftInSeconds%60);
        return (
            <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
                <h1>{title}</h1>
                <Clock 
                    minutes={minutesLeft} 
                    seconds={secondsLeft} 
                    className={isPaused ? "inactive" : ""} 
                />
                <ProgressBar 
                    className={isPaused ? "inactive" : ""} 
                    timeLeft={timeLeftInSeconds} 
                    totalTime={totalTimeInSeconds} 
                />          
                <button onClick={onEdit} disabled={isEditable}>Edytuj</button>
                <button onClick={this.handleStart} disabled={isRunning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
                <button onClick={this.togglePause} disabled={!isRunning}>{isPaused ? "Resume" : "Pause"}</button>
                Liczba przerw: {pausesCount}
            </div>
        )
    }
}

class EditableTimebox extends React.Component {
    state = {
        title: "Uczę się wyciągać w górę!",
        totalTimeInMinutes: 20,
        isEditable: true
    }
    handleTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }
    handleTotalTimeInMinutesChange = (event) => {
        this.setState({ totalTimeInMinutes: event.target.value })
    }
    handleConfirm = () => {
        this.setState({ isEditable: false });
    }
    handleEdit = () => {
        this.setState({ isEditable: true });
    }
    render() {
        const { title, totalTimeInMinutes, isEditable } = this.state;
        return (
            <>    
                <TimeboxEditor 
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onConfirm={this.handleConfirm}
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                />
                <CurrentTimebox 
                    isEditable={isEditable}
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes} 
                    onEdit={this.handleEdit}
                />
            </>
        )
    }
}

class TimeboxCreator extends React.Component {
    constructor(props) {
        super(props);
        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
    }
    handleSubmit = (event) => {
        event.preventDefault(); 
        this.props.onCreate({
            id: uuidv4(),
            title: this.titleInput.current.value,
            totalTimeInMinutes: this.totalTimeInMinutesInput.current.value
        }); 
        this.titleInput.current.value = "";
        this.totalTimeInMinutesInput.current.value = "";
    }
    render() {
        return (
            <form 
                onSubmit= {this.handleSubmit}
                className="TimeboxCreator"
            >
                <label>
                    Co robisz? 
                    <input                             
                        ref={this.titleInput}
                        type="text" 
                    />
                </label><br />
                <label>
                    Ile minut? 
                    <input 
                        ref={this.totalTimeInMinutesInput}
                        type="number" 
                    />
                    </label><br />
                <button
                    
                >Dodaj Timebox</button>
            </form>
        )    
    }
}

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

class Timebox extends React.Component {
    constructor(props) {
        super(props);
        this.updatedTitleInput = React.createRef();
    }
    handleEdit = (event) => {
        //event.preventDefault;
        this.props.onEdit({
            updatedTitle: this.updatedTitleInput.current.value
        });
        this.updatedTitleInput.current.value = "";
    }
    
    render () {
        const updatedTitle = this.updatedTitleInput.current;
        const { title, totalTimeInMinutes, onDelete, onEdit } = this.props;
        return (
            <div 
                className="Timebox"
            >
                <h3>{title} - {totalTimeInMinutes} min. </h3>
                <button onClick={onDelete} >Usuń</button>
                <button onClick={this.handleEdit} >Zmień</button>
                <input
                    ref={this.updatedTitleInput}
                    type="text"  
                />
            </div>
        )
    }
}

export { TimeboxList, EditableTimebox };