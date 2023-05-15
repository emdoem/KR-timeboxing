import React from "react";
import PropTypes from 'prop-types';

function ErrorMessage({ hasError, message, children }) {
    return hasError ? message : children;
}

class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error rseporting service
        console.log("Wystąpił następujący błąd: ", error, errorInfo);
    }
    render() {
        const { message, children } = this.props;
        return (
            <ErrorMessage 
                hasError={this.state.hasError}
                message={message}
                children={children}
            />
        )
    }
}
ErrorBoundary.propTypes = {
    message: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
}

export default ErrorBoundary;