import initialState from '../InitialState'

export default (state = initialState.payment, action) => {
    if (action.type === 'SELECT_METHOD') {
        return {
            ...state
            , 'selectedPayment': action.selectedPayment
        };
    } else if (action.type === 'PAYMENT-CREDIT_CARD-SUBMIT') {
        return {
            ...state
            , 'creditCard': action.creditCard
        };
    } else {
        return state;
    }
};