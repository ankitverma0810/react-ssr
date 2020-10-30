import '@babel/polyfill'; //to support aync operations for server side code
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';

import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import Routes from './client/Routes';

const app = express();

app.use('/api', proxy(process.env.API_URL));

app.use(express.static('public'));
app.get('*', (req, res) => {
    const store = createStore(req);

    const promises = matchRoutes(Routes, req.path)
        .map(({ route }) => {
            return route.loadData ? route.loadData(store) : null;
        })
        //for handling errors.
        //If any loadData methods return error then our Promise.all should not get fail.
        .map(promise => {
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve);
                });
            }
        });

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        //StaticRouter add action(replace) and url properties to context object if we have used <Redirect /> in the react app.
        //url will only be present in context if we have used '<Redirect />' component inside React app.
        //Like in this case we have used in 'requireAuth' HOC which was further used in AdminListPage.js. 
        if (context.url) {
            return res.redirect(301, context.url);
        }

        //setting 'notfound' property in context object from NotFoundPage.js file
        if (context.notFound) {
            res.status(404);
        }
        res.send(content);
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});