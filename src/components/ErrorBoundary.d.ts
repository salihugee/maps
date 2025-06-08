import React from "react";
declare class ErrorBoundary extends React.Component {
    state: {
        hasError: boolean;
    };
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): any;
}
export default ErrorBoundary;
