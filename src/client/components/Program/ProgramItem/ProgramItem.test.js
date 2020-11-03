import React from 'react';
import { shallow } from 'enzyme';

import { checkProps, findByTestAttr } from '../../../test/testUtils';
import ProgramItem from './ProgramItem';

const defaultProps = {
    program: {
        mission_id: [],
        flight_number: 1,
        mission_name: 'FalconSat',
        links: {
            mission_patch_small: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png'
        },
        launch_year: '2006',
        launch_success: false,
        land_success: null
    }
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<ProgramItem {...setupProps} />);
}

test('does not throw warning with expected props', () => {
    checkProps(ProgramItem, defaultProps);
});

test('renders without crashing', () => {
	const wrapper = setup();
	const programListComponent = findByTestAttr(wrapper, 'component-program-item');
	expect(programListComponent.length).toBe(1);
});
