import React from 'react';
import {connect} from 'react-redux'

const ConfirmationRoot = ({payment}) => {
    return (
        <div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Confirmation</h3>
                        </div>
                        <div className="panel-body">
                            <h3 className="page-header">Payment data</h3>
                            <dl className="dl-horizontal">
                                <dt>Name</dt>
                                <dd>{payment.creditCard.name}</dd>
                            </dl>
                            <dl className="dl-horizontal">
                                <dt>Card number</dt>
                                <dd>{payment.creditCard.cardNumber.replace(/^.{12}/,'XXXXXXXXXXXX')}</dd>
                            </dl>
                            <dl className="dl-horizontal">
                                <dt>Validity</dt>
                                <dd>{payment.creditCard.month.name} {payment.creditCard.year.name}</dd>
                            </dl>
                            <dl className="dl-horizontal">
                                <dt>CVC</dt>
                                <dd>{payment.creditCard.cvc}</dd>
                            </dl>
                        </div>
                    </div>
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
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmationRoot)
