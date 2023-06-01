import EditableTimebox from "../../components/EditableTimebox";
import { render, cleanup, fireEvent, userEvent } from '@testing-library/react';
import React from "react";

describe('EditableTimebox />', () => {
    afterEach(cleanup)
    xit('shows edit button', () => {
        const { debug, getByText } = render(<EditableTimebox />);
        debug()
        expect( () => {
            getByText("Edytuj")
        }).not.toThrow()
    });

    xit('allows editing the timebox', () => {
        const { getByText } = render(<EditableTimebox />);
        
        fireEvent.click(getByText("Edytuj"))

        fireEvent.click(getByText(/zmiany/))

        expect( () => { 
            getByText("Edytuj")
        }).not.toThrow()
    });

    it('allows editing the timebox title', () => {
        const { debug, getByText, getByLabelText } = render(<EditableTimebox />);
        
        fireEvent.click(getByText("Edytuj"))
        debug()
        fireEvent.change(getByLabelText(/robisz/), "Uczę się testować!")
        fireEvent.click(getByText(/zmiany/))

        expect( () => { 
            getByText("Uczę się testować!")
        }).not.toThrow()
    });
});
