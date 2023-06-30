import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import TimeboxManager from "./TimeboxManager"
import EditableTimebox from './EditableTimeboxFunc';
import InspirationalQuote from './InspirationalQuoteFunc';

const headerRoot = document.getElementById("headerRoot");

function AuthenticatedApp({ onLogout }) {
    return (
        <>
            <Portal>
                <Header />
            </Portal>
            <TimeboxManager />
            <EditableTimebox />
            <InspirationalQuote />
        </>

    );
}

export default AuthenticatedApp;


class Portal extends React.Component {
    constructor(props) {
        super(props);

        this.container = headerRoot;
    }
    /*
    componentDidMount() {
        document.appendChild(this.container);
    }
    componentWillUnmount() {
        document.removeChild(this.container);
    }
    */
    render() {
        return ReactDOM.createPortal(this.props.children, this.container);
    }
}
