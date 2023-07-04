import React, { useRef } from 'react';

function TimeboxEditor(props) {
    const titleInput = useRef();
    const totalTimeInMinutesInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        props.onUpdate({
            title: titleInput.current.value,
            totalTimeInMinutes: totalTimeInMinutesInput.current.value
        });

        resetToInitialValues();
    }

    const handleCancel = () => {
        props.onCancel();
        resetToInitialValues();
    }

    const resetToInitialValues = () => {
        titleInput.current.value = props.initialTitle;
        totalTimeInMinutesInput.current.value = props.initialTotalTimeInMinutes;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="TimeboxCreator"
        >
            <label>
                Co robisz?
                <input
                    ref={titleInput}
                    defaultValue={props.initialTitle}
                    type="text"
                />
            </label><br />
            <label>
                Ile minut?
                <input
                    ref={totalTimeInMinutesInput}
                    defaultValue={props.initialTotalTimeInMinutes}
                    type="number"
                />
            </label><br />
            <a onClick={handleCancel}>Anuluj</a>
            <button>Zapisz zmiany</button>
        </form>
    )

}

export default TimeboxEditor;