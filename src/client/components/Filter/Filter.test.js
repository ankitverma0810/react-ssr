import React from 'react';
import { mount } from 'enzyme';

import { checkProps, findByTestAttr } from '../../test/testUtils';
import Filter from './Filter';

const mockSetLaunchYear = jest.fn();
const mockSetSuccessfulLaunch = jest.fn();
const mockSetSuccessfulLanding = jest.fn();

const defaultProps = {
	launchYear: null,
	setLaunchYear: mockSetLaunchYear,
	successfulLaunch: undefined,
	setSuccessfulLaunch: mockSetSuccessfulLaunch,
	successfulLanding: undefined,
	setSuccessfulLanding: mockSetSuccessfulLanding
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return mount(<Filter {...setupProps} />);
}

test('does not throw warning with expected props', () => {
	checkProps(Filter, defaultProps);
});

describe('validate changes', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = setup();
	});

	test('on launch year change', () => {
		const launchYearButton = findByTestAttr(wrapper, 'launch-year').find('button').first();
		launchYearButton.simulate('click', { preventDefault() {} });
		expect(mockSetLaunchYear).toHaveBeenCalledWith(2006);
	});

	test('on successful launch change', () => {
		const successfulLaunchChange = findByTestAttr(wrapper, 'successful-launch').find('button').first();
		successfulLaunchChange.simulate('click', { preventDefault() {} });
		expect(mockSetSuccessfulLaunch).toHaveBeenCalledWith(true);
	});

	test('on successful land change', () => {
		const successfulLandChange = findByTestAttr(wrapper, 'successful-landing').find('button').first();
		successfulLandChange.simulate('click', { preventDefault() {} });
		expect(mockSetSuccessfulLanding).toHaveBeenCalledWith(true);
	});
});