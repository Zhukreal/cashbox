import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidMount() {
        // console.log('ErrorBoundary')
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message

        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <h3>
                        <div>Please, tell <a href="https://t.me/zhukreal" target='_blank'>Yury Zhuk</a> about this</div>
                    </h3>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}