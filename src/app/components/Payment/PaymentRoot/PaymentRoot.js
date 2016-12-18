import React from 'react';
import { connect } from 'react-redux'
import PaymentMethodComponent from '../PaymentMethod/PaymentMethod'
import CreditCard from '../CreditCard/CreditCard'

const PaymentRoot = ({payment, onSelectPaymentMethod}) => {
    return (
        <div>
            <div className="page-header">
                <h1>Payment</h1>
            </div>
            <div className="row">
                <PaymentMethodComponent selectedPayment={payment.selectedPayment} onSelectPaymentMethod={onSelectPaymentMethod} />
            </div>
            <div className="row">
                <CreditCard/>
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