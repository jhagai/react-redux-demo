import React from 'react';

export default (props, options) => {
    const {input, meta: {touched, error, warning}} = props;

    return (
        <div className={'form-group ' + (touched && error ? 'has-error' : '')}>
            <select {...input} className="form-control">
                {options}
            </select>
            <div className="control-label">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
}