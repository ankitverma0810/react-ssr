import React from 'react';

const NotFoundPage = ({ staticContext = {} }) => {
    /**
     * renderer.js file will pass 'context' as 'staticContext' to all the rendered components.
     * staticContext will ony be available if component gets rendered through server side code. Only staticRouter will pass context as staticContext to the component
     * staticContext will not be available if component gets rendered on browser. Browser router doesn't pass context to the component.
     */
    staticContext.notFound = true;
    return <h1>Ooops, route not found.</h1>
};

export default NotFoundPage;