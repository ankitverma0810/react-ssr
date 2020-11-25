import React from 'react';
import loadable from '@loadable/component';
import { Redirect } from 'react-router';

import App from './App';
import ProgramsPage from './pages/ProgramsPage';
import NotFoundPage from './pages/NotFoundPage';

const TestPage = loadable(() => import('./pages/TestPage'));

export default [
    {
        ...App,
        routes: [
            {
                path: '/',
                exact: true,
                component: () => <Redirect to="/programs" />
            },
            {
                path: '/programs',
                ...ProgramsPage
            },
            {
                path: '/test',
                render: (props) => <TestPage {...props} />
            },
            {
                /* by not mentioning any path, react router will render this page if no route is matched above */
                component: NotFoundPage
            }
        ]
    }
];