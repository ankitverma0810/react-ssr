import * as actionTypes from './actionTypes';

export const getPrograms = (options) => async (dispatch, getState, api) => {
    dispatch({ type: actionTypes.GET_PROGRAMS_START });
    try {
        const response = await api.get('/launches', { params: { ...options } });
        if (response && response.status === 200) {
            dispatch({ type: actionTypes.GET_PROGRAMS_SUCCESS, payload: response.data });
        } else {
            throw ({ message: response.statusText });
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_PROGRAMS_FAIL, error: error.message || 'Something went wrong!' });
    }
}