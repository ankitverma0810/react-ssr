import { combineReducers } from 'redux';

import programsReducer from './programs';

export default combineReducers({
    programs: programsReducer
});