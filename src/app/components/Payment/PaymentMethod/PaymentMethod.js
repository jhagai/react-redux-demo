import React from 'react'
import myStore from '../../../AppStore'
import PaymentMethodTemplate from './PaymentMethodTemplate'

class PaymentMethodComponent extends React.PureComponent {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        myStore.dispatch({
            'type': 'SELECT_METHOD'
            , 'selectedPayment': e.target.value
        })
    }

    render() {
        return PaymentMethodTemplate(this);
    }
}

export default PaymentMethodComponent;