import React from 'react'
import PaypalTemplate from './PaypalTemplate'
import {reduxForm} from 'redux-form';

class Paypal extends React.PureComponent {

    constructor() {
        super();
    }

    render() {
        return PaypalTemplate(this);
    }
}

//export default Paypal;

export default reduxForm(
    {
        form: 'paypalForm' // a unique name for this form
    }
)(Paypal);