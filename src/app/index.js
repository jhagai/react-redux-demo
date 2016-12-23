import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import myStore from './AppStore'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, myStore)

const rootEl = document.getElementById('root');
ReactDOM.render(
    <Provider store={myStore}>
        <AppContainer>
            <Router history={history}>
                <Route path="/" component={App}/>
            </Router>
            {/*<App />*/}
        </AppContainer>
    </Provider>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./App', () => {
        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const NextApp = require('./App').default;
        ReactDOM.render(
            <Provider store={myStore}>
                <AppContainer>
                    { /* Tell the Router to use our enhanced history */ }
                    <Router history={history}>
                        <Route path="/" component={NextApp}/>
                    </Router>
                    {/*<NextApp />*/}
                </AppContainer>
            </Provider>,
            rootEl
        );
    });
}