import checkPropTypes from "check-prop-types";
import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 * globals: middlewares.
 * @function storeFactory
 * @param {object} initialState - Initial state for store
 * @returns {Store} - Redux Store
*/
export const storeFactory = (initialState) => {
	const middlewares = [ ReduxThunk ];
	const mockStore = configureStore(middlewares);
	return mockStore(initialState);
}

/**
 * Return shallowWrapper containing node(s) with the given data-test value.
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search value.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`);
}

/**
 * Return shallowWrapper containing node(s) with the given data-test value.
 * @function checkProps
 * @param {function} component - React component.
 * @param {object} conformingProps - Props used by the component.
 * @returns {Boolean}
 */
export const checkProps = (component, conformingProps) => {
	const propError = checkPropTypes(
		component.propTypes,
		conformingProps,
		'props',
		component.name
	);
	expect(propError).toBeUndefined();
}