import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
class ErrorBoundary extends React.Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { hasError: false }
        });
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return _jsx("h2", { children: "Something went wrong while rendering the chart." });
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
