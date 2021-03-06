import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
//Cross-Site Scripting (XSS) attacks
import serialize from 'serialize-javascript';
import { ChunkExtractor } from '@loadable/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';

import Routes from '../client/Routes';
import appTheme from '../client/theme/appTheme';

export default (req, store, context) => {
    // This is the stats file generated by webpack loadable plugin
    const statsFile = path.resolve('./public/loadable-stats.json');

    // We create an extractor from the statsFile
    const extractor = new ChunkExtractor({ statsFile });

    const sheets = new ServerStyleSheets();

    //To reduce ttfb (Time to first byte) we can use 'renderToNodeStream' method instead of 'renderToString'.
    //But renderToNodeStream will not work in case of authentication or redirects (incase of not login we have to reditect)
    const content = renderToString(
        extractor.collectChunks(
            sheets.collect(
                <Provider store={store}>
                    <StaticRouter location={req.path} context={context}>
                        <ThemeProvider theme={appTheme}>
                            <div>{renderRoutes(Routes)}</div>
                        </ThemeProvider>
                    </StaticRouter>
                </Provider>
            )
        )
    );

    // Grab the CSS from the sheets.
    const css = sheets.toString();

    //renderStatic method will return tags we have set in our react application like in UserListPage.js.
    const helmet = Helmet.renderStatic();

    return `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
                <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"></noscript>
                <link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></noscript>
                ${extractor.getLinkTags()}
                ${extractor.getStyleTags()}
                <style id="jss-server-side">${css}</style>
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.INITIAL_STATE = ${serialize(store.getState())}
                </script>
                ${extractor.getScriptTags()}
            </body>
        </html>
    `;
}

