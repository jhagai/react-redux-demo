import React from 'react';

export default ({input, label, type, meta: {touched, error, warning}}) => {

    let feedBack = touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>));

    return (
        <div className={'form-group ' + (touched && error ? 'has-error' : '')}>
            <input {...input} placeholder={label} type={type} className="form-control"/>
            <div className="control-label">
                {feedBack}
            </div>

        </div>
    );
}