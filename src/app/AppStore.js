import initialState from './InitialState'
import PaymentReducer from './reducers/PaymentReducer'
import NeedsReducer from './reducers/NeedsReducer'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import { browserHistory } from 'react-router'


//const middleware = routerMiddleware(browserHistory);

var myStore = createStore(
    combineReducers(
        {
            needs: NeedsReducer
            , payment: PaymentReducer
            , form: formReducer
            , routing: routerReducer
        }
        //,applyMiddleware(middleware)
    )
    , initialState
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default myStore;