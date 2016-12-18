import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

var payment = (state = initalState.payment, action) => {
    if (action.type === 'SELECT_METHOD') {
        return {
            ...state
            , 'selectedPayment': action.selectedPayment
        };
    } else if (action.type === 'UPDATE_CARD_NUMBER') {
        return {
            ...state
            , 'cardNumber': {
                value: action.cardNumber
                , pristine: false

            }
        };
    } else if (action.type === 'UPDATE_SECURITY_CODE') {
        return {
            ...state
            , 'securityCode': {
                value: action.securityCode
                , pristine: true
            }
        };
    } else {
        return state;
    }
}


var initalState = {
    payment: {
        'selectedPayment': 'CreditCard'
        , 'name': {
            value: ''
            , prisitine: true
        }
        , 'cardNumber': {
            value: ''
            , prisitine: true
        }
        , 'securityCode': {
            value: ''
            , prisitine: true
        }
        , 'month': {
            value: undefined
            , prisitine: true
        }
        , 'year': {
            value: undefined
            , prisitine: true
        }
    }

};

var myStore = createStore(
    combineReducers({payment, form:formReducer})
    , initalState
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default myStore;