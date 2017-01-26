import React from 'react';
import Main from './components/Main'
import Quotes from './components/Quotes/Quotes'
import Information from './components/Information/Information'
import Payment from './components/Payment/Payment'
import Needs from './components/Needs/Needs'
import Confirmation from './components/Confirmation/Confirmation'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import myStore from './AppStore'


// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, myStore)

const App = () => {
    return (
        <Router history={history}>
            <Route path="/" component={Main}>
                <IndexRoute component={Needs}/>
                <Route path="/quotes" component={Quotes}/>
                <Route path="/information" component={Information}/>
                <Route path="/payment" component={Payment}/>
                <Route path="/confirmation" component={Confirmation}/>
            </Route>
        </Router>
    );
}

export default App;