import initialState from './InitialState'
import PaymentReducer from './reducers/PaymentReducer'
import NeedsReducer from './reducers/NeedsReducer'
import QuotesReducer from './reducers/QuotesReducer'
import InformationReducer from './reducers/InformationReducer'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'

var myStore = createStore(
    combineReducers(
        {
            needs: NeedsReducer
            , quotes: QuotesReducer
            , information: InformationReducer
            , payment: PaymentReducer
            , form: formReducer
            , routing: routerReducer
        }
    )
    , initialState
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default myStore;