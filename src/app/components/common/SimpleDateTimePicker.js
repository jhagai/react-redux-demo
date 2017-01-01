import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'

export default (props) => {
    let {input, meta: {touched, error, warning}, dateFormat, ...rest} = props;

    return (
        <div className={'form-group ' + (touched && error ? 'has-error' : '')}>
            <DateTimePicker {...input} {...rest} format={dateFormat} onBlur={() => input.onBlur(input.value)}/>
            <div className="control-label">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
}