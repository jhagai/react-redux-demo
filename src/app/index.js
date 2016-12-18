import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import myStore from './AppStore'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

const rootEl = document.getElementById('root');
ReactDOM.render(
    <Provider store={myStore}>
        <AppContainer>
            <App />
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
                    <NextApp />
                </AppContainer>
            </Provider>,
            rootEl
        );
    });
}