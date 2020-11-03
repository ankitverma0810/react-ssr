import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from './test/testUtils';
import AppComponent from './App';

const setup = () => {
    const App = AppComponent.component;
    const route = { routes: [{ path: '/', render: ''  }] };
    return shallow(<App route={route} />);
}

describe('App Component', () => {
    test('renders without error', () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'component-app');
        expect(component.length).toBe(1);
    });
});