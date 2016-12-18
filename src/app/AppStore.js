import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

var payment = (state = initalState.payment, action) => {
    if (action.type === 'SELECT_METHOD') {
        return {
            ...state
            , 'selectedPayment': action.selectedPayment
        };
    } else {
        return state;
    }
}


var initalState = {
    payment: {
        'selectedPayment': 'CreditCard'
    }

};

var myStore = createStore(
    combineReducers({payment, form:formReducer})
    , initalState
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default myStore;