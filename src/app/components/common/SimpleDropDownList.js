import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList'

export default (props) => {
    let {input, meta: {touched, error, warning}, ...rest} = props;

    return (
        <div className={'form-group ' + (touched && error ? 'has-error' : '')}>
            <DropdownList {...input} {...rest}/>
            <div className="control-label">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
}