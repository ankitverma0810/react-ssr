import React from 'react';
import { renderRoutes } from 'react-router-config';

import Layout from './components/hocs/Layout';
import useGlobalStyles from './theme/global-classes';

const App = ({ route }) => {
    useGlobalStyles();
    
    return (
        <Layout>
            {renderRoutes(route.routes)}
        </Layout>
    )
};

export default {
    component: App
};