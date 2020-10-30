import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import reducers from '../client/store/reducers/index';

export default (req) => {
    const axiosInstance = axios.create({
        baseURL: process.env.API_URL,
        headers: { cookie: req.get('cookie') || '' }
    });

    const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));
    return store;
}