import React from 'react';
import { shallow, mount } from 'enzyme';

import { storeFactory, findByTestAttr } from '../test/testUtils';
import ProgramsPage, { UnconnectedProgramsPage } from './ProgramsPage';

const defaultPrograms = {
	data: [
		{
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
	]
};

const defaultState = {
	programs: []
}

const mockGetPrograms = jest.fn();

const shallowSetup = (initialState = {}) => {
	const Programs = ProgramsPage.component;
	const store = storeFactory({ ...defaultState, ...initialState });
	const wrapper = shallow(<Programs store={store} />).dive();
	return wrapper;
}

const mountSetup = ({ programs = [] }) => {
	return mount(
		<UnconnectedProgramsPage
			programs={programs}
			getPrograms={mockGetPrograms} />
	)
}

describe('redux properties', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallowSetup({ programs: defaultPrograms });
	});

	test('has access to `programs` state', () => {
		const programsProp = wrapper.props().programs;
		expect(programsProp).toEqual(defaultPrograms.data);
	});

	test('has access to `getPrograms` action creator', () => {
		const getProgramsProp = wrapper.props().getPrograms;
		expect(getProgramsProp).toBeInstanceOf(Function);
	});
});

describe('On app mount', () => {
	let wrapper;
	beforeEach(() => {
		process.env = { LIMIT: 10 };
		wrapper = mountSetup({ programs: defaultPrograms.data });
	});

	test('getPrograms gets called on app mount', () => {
		expect(mockGetPrograms.mock.calls.length).toBe(1);
	});

	test('getPrograms does not gets called on app update', () => {
		mockGetPrograms.mockClear();
		wrapper.setProps();
		expect(mockGetPrograms).not.toHaveBeenCalled();
	});

	test('setSites gets called on app mount with init state', () => {
		expect(mockGetPrograms.mock.calls[0][0]).toEqual({ limit: 10, launch_year: undefined, launch_success: undefined, land_success: undefined });
	});

	test('renders page title', () => {
		const title = findByTestAttr(wrapper, 'page-title');
		expect(title.length).toBe(1);
	});

	test('renders page filter', () => {
		const filter = findByTestAttr(wrapper, 'page-filter');
		expect(filter.length).toBe(1);
	});

	test('renders programs list', () => {
		const programsList = findByTestAttr(wrapper, 'programs-list');
		expect(programsList.length).toBe(1);
	});
});

describe('on launch year change', () => {
	let mockSetLaunchYear = jest.fn();
	let wrapper;

	beforeEach(() => {
		mockGetPrograms.mockClear();
		mockSetLaunchYear.mockClear();
		React.useState = jest.fn(() => [null, mockSetLaunchYear]);		
		wrapper = mountSetup({ programs: defaultPrograms.data });
		const launchButton = findByTestAttr(wrapper, 'launch-year').find('button').first();
		launchButton.simulate('click', { preventDefault() {} });
	});

	test('state updates when value of launch year change', () => {
		expect(mockSetLaunchYear).toHaveBeenCalledWith(2006);
	});

	test('getPrograms gets called when value of launch year change', () => {
		expect(mockGetPrograms.mock.calls.length).toBe(1);
	});
});

describe('on successfulLaunch change', () => {
	let mockSuccessfulLaunch = jest.fn();
	let wrapper;

	beforeEach(() => {
		mockGetPrograms.mockClear();
		mockSuccessfulLaunch.mockClear();
		React.useState = jest.fn(() => [null, mockSuccessfulLaunch]);		
		wrapper = mountSetup({ programs: defaultPrograms.data });
		const successLaunchButton = findByTestAttr(wrapper, 'successful-launch').find('button').first();
		successLaunchButton.simulate('click', { preventDefault() {} });
	});

	test('state updates when value of successful launch change', () => {
		expect(mockSuccessfulLaunch).toHaveBeenCalledWith(true);
	});

	test('getPrograms gets called when value of successful launch change', () => {
		expect(mockGetPrograms.mock.calls.length).toBe(1);
	});
});

describe('on successfulLand change', () => {
	let mockSuccessfulLand = jest.fn();
	let wrapper;

	beforeEach(() => {
		mockGetPrograms.mockClear();
		mockSuccessfulLand.mockClear();
		React.useState = jest.fn(() => [null, mockSuccessfulLand]);		
		wrapper = mountSetup({ programs: defaultPrograms.data });
		const successLaunchButton = findByTestAttr(wrapper, 'successful-landing').find('button').first();
		successLaunchButton.simulate('click', { preventDefault() {} });
	});

	test('state updates when value of successful landing change', () => {
		expect(mockSuccessfulLand).toHaveBeenCalledWith(true);
	});

	test('getPrograms gets called when value of successful landing change', () => {
		expect(mockGetPrograms.mock.calls.length).toBe(1);
	});
});