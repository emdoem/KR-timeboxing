import React from 'react';
import TimeboxEditor from './TimeboxEditor';
import { Timebox } from './TimeboxManager';

import { connect } from 'react-redux';
import { isTimeboxEdited } from './timeboxesReducer';
import { startEditingTimebox, stopEditingTimebox, makeTimeboxCurrent } from './actions';

const mapStateToProps = (state, ownProps) => ({
    isEdited: isTimeboxEdited(state.timeboxesManager, ownProps.timebox)
})
const mapDispatchToProps = (dispatch, ownProps) => {
    const onEdit = () => dispatch(startEditingTimebox(ownProps.timebox.id));
    const onCancel = () => dispatch(stopEditingTimebox());
    const onMakeCurrent = () => dispatch(makeTimeboxCurrent(ownProps.timebox))

    return { onEdit, onCancel, onMakeCurrent };
}

export const EditableTimebox = connect(mapStateToProps, mapDispatchToProps)(
    function EditableTimebox({
        timebox, isEdited, onCancel, onEdit, onUpdate, onDelete, onMakeCurrent }) {
        return <>
            {isEdited ?
                <TimeboxEditor
                    key={timebox.id}
                    initialTitle={timebox.title}
                    initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
                    onCancel={onCancel}
                    onUpdate={onUpdate}
                /> :
                <Timebox
                    key={timebox.id}
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onMakeCurrent={onMakeCurrent}
                />
            }
        </>;
    }
)
