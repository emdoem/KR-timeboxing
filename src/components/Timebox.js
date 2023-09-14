import React from 'react';
import PropTypes from 'prop-types';

function Timebox({title, totalTimeInMinutes, onDelete, onEdit, onMakeCurrent}) {
        if (totalTimeInMinutes <= 0) {
            throw new Error("Total time needs to be larger than 0!");
        };
        return (
            <div
                className="Timebox"
            >
                <h3>{title} - {totalTimeInMinutes} min. </h3>
                <button onClick={onDelete} >Delete</button>
                <button onClick={onEdit} >Edit</button>
                <button onClick={onMakeCurrent} >Start now</button>
            </div>
        )
    
}
/*
temporarily off
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
*/
export default Timebox;