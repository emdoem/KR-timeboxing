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
                What are you doing?
                <input
                    ref={titleInput}
                    type="text"
                />
            </label><br />
            <label>
                How much time will it take?
                <input
                    ref={totalTimeInMinutesInput}
                    type="number"
                    step="0.01"
                />
            </label><br />
            <button

            >Add Timebox</button>
        </form>
    )

}

export default TimeboxCreator;