import React from 'react';
import PropTypes from 'prop-types';

class Timebox extends React.Component {
    constructor(props) {
        super(props);
        this.updatedTitleInput = React.createRef();
    }
    /*
    handleEdit = (event) => {
        //event.preventDefault;
        this.props.onEdit({
            updatedTitle: this.updatedTitleInput.current.value
        });
        this.updatedTitleInput.current.value = "";
    }
    */



    render() {
        const updatedTitle = this.updatedTitleInput.current;
        const { title, totalTimeInMinutes, onDelete } = this.props;
        if (totalTimeInMinutes <= 0) {
            throw new Error("Całkowity czas musi być większy niż zero!");
        };
        return (
            <div
                className="Timebox"
            >
                <h3>{title} - {totalTimeInMinutes} min. </h3>
                <button onClick={onDelete} >Usuń</button>
                <button onClick={this.props.onEdit} >Zmień</button>

                {/* 
                <input
                    ref={this.updatedTitleInput}
                    type="text"  
                /> 
                */}

            </div>
        )
    }
}
Timebox.defaultProps = {
    onDelete: console.log('Delete has been issued.'),
    onEdit: console.log('Edit has been issued.')
}
Timebox.propTypes = {
    key: PropTypes.string.isRequired, // ={timebox.id} 
    title: PropTypes.string.isRequired, // ={timebox.title} 
    totalTimeInMinutes: PropTypes.number.isRequired, // ={timebox.totalTimeInMinutes} 
    onDelete: PropTypes.func.isRequired, // ={() => this.removeTimebox(index)}
    onEdit: PropTypes.func.isRequired
}

export default Timebox;