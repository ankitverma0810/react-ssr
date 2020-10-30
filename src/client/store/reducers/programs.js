import * as actionTypes from '../actions/actionTypes';

const initialState = {
	error: null,
	loading: false,
	data: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_PROGRAMS_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.GET_PROGRAMS_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
				data: action.payload
			};
		case actionTypes.GET_PROGRAMS_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			};
		default:
			return state;
	}
};

export default reducer;