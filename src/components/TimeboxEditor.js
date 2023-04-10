import React from 'react';

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

export default TimeboxEditor;