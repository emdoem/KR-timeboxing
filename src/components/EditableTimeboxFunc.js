import React, { useState } from 'react';

import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";


function EditableTimebox() {
    const [title, setTitle] = useState("Uczę się hooków!");
    const [totalTimeInMinutes, setTotalTimeInMinutes] = useState(20);
    const [isEditable, toggleEditable] = useState(false);
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTotalTimeInMinutesChange = (event) => {
        setTotalTimeInMinutes(event.target.value);
    };

    const handleConfirm = () => {
        toggleEditable(false);
    }; 

    const handleEdit = () => {
        toggleEditable(true);
    };

    
        return (
            <>  
                <React.StrictMode>
                    { isEditable ? (
                        <TimeboxEditor 
                            title={title}
                            totalTimeInMinutes={totalTimeInMinutes}
                            isEditable={isEditable}
                            onConfirm={handleConfirm}
                            onTitleChange={handleTitleChange}
                            onTotalTimeInMinutesChange={handleTotalTimeInMinutesChange}
                        />
                    ) : (
                        <CurrentTimebox 
                            isEditable={isEditable}
                            title={title} 
                            totalTimeInMinutes={totalTimeInMinutes} 
                            onEdit={handleEdit}
                        />
                    )} 
                </React.StrictMode>
                 
            </>
        )
    
}

export default EditableTimebox;