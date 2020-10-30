import '@babel/polyfill'; //to support aync operations for server side code
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import axios from 'axios';
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ThemeProvider } from '@material-ui/core/styles';

import reducers from './store/reducers/index';
import Routes from './Routes';
import appTheme from './theme/appTheme';
import './client.css';

const Main = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.API_URL
    });

    const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

    const store = createStore(reducers, window.INITIAL_STATE, composeEnhancers(
        applyMiddleware(thunk.withExtraArgument(axiosInstance))
    ));

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={appTheme}>
                    <div>{renderRoutes(Routes)}</div>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    )
};

loadableReady(() => {
    ReactDOM.hydrate(
        <Main />,
        document.querySelector('#root')
    );
});