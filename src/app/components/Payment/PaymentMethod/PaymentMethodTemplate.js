import React from 'react'

export default function (component) {

    return (
        <div className="col-xs-12">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Choose your payment method</h3>
                </div>
                <div className="panel-body">
                    <div className="radio">
                        <label><input type="radio" name="selectedPayment" value="CreditCard" checked={component.props.selectedPayment === 'CreditCard'}
                                      onChange={() => component.props.onSelectPaymentMethod('CreditCard')}/>Credit card</label>
                    </div>
                    <div className="radio">
                        <label><input type="radio" name="selectedPayment" value="Paypal" checked={component.props.selectedPayment === 'Paypal'}
                                      onChange={() => component.props.onSelectPaymentMethod('Paypal')}/>Paypal</label>
                    </div>
                </div>
            </div>
        </div>
    );
}