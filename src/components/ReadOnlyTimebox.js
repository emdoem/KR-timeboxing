import React from 'react';

class ReadOnlyTimebox extends React.Component {
    constructor(props) {
        super(props);
        this.updatedTitleInput = React.createRef();
    }
    
    render () {
        const { title, totalTimeInMinutes, onDelete } = this.props;
        if (totalTimeInMinutes <= 0) {
            throw new Error("Całkowity czas musi być większy niż zero!");
        };
        return (
            <div 
                className="Timebox finished"
            >
                <h3>{title} - {totalTimeInMinutes} min. </h3>
                <button onClick={onDelete} >Usuń</button>

            </div>
        )
    }
}

export default ReadOnlyTimebox;