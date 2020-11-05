import React from 'react';
import { Redirect } from 'react-router';

import App from './App';
import ProgramsPage from './pages/ProgramsPage';
import NotFoundPage from './pages/NotFoundPage';

export default [
    {
        ...App,
        routes: [
            {
                path: '/',
                exact: true,
                component: () => <Redirect to="/programs"/>
            },
            {
                path: '/programs',
                ...ProgramsPage
            },
            {
                /* by not mentioning any path, react router will render this page if no route is matched above */
                component: NotFoundPage
            }
        ]
    }
];