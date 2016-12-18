import React from 'react'

class ErrorMessages extends React.PureComponent {
    render() {
        var error = null;
        if (this.props.items) {
            error = this.props.items.map(function (item) {
                return (<div>{item}</div>);
            });
        }
        return (
            <div style={{color: 'red'}}>{error}</div>
        );
    }
}

export default ErrorMessages