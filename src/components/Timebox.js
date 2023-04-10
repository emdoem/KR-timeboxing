import React from 'react';

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

export default Timebox;