import React, { useRef } from 'react';

function TimeboxCreator(props) {
    const titleInput = useRef();
    const totalTimeInMinutesInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onCreate({
            title: titleInput.current.value,
            totalTimeInMinutes: totalTimeInMinutesInput.current.value,
            finished: false
        });
        titleInput.current.value = "";
        totalTimeInMinutesInput.current.value = "";
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
                    type="text"
                />
            </label><br />
            <label>
                Ile minut?
                <input
                    ref={totalTimeInMinutesInput}
                    type="number"
                    step="0.01"
                />
            </label><br />
            <button

            >Dodaj Timebox</button>
        </form>
    )

}

export default TimeboxCreator;