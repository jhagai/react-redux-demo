import React from 'react';
import {connect} from 'react-redux'
import PaymentMethodComponent from '../PaymentMethod/PaymentMethod'
import CreditCard from '../CreditCard/CreditCard'
import Paypal from '../Paypal/Paypal'

const PaymentRoot = ({payment, onSelectPaymentMethod}) => {

    let displayCreditCard = payment.selectedPayment === 'CreditCard' ? 'block' : 'none';
    let displayPaypal = payment.selectedPayment === 'Paypal' ? 'block' : 'none';

    return (
        <div>
            <div className="page-header">
                <h1>Payment</h1>
            </div>
            <div className="row">
                <PaymentMethodComponent selectedPayment={payment.selectedPayment}
                                        onSelectPaymentMethod={onSelectPaymentMethod}/>
            </div>
            <div className="row">
                <div style={{display: displayCreditCard}}>
                    <CreditCard/>
                </div>
                <div style={{display: displayPaypal}}>
                    <Paypal/>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        payment: state.payment
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectPaymentMethod: (method) => {
            dispatch({
                'type': 'SELECT_METHOD'
                , 'selectedPayment': method
            })
        }
    }
}

const PaymentRootComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentRoot)

export default PaymentRootComp