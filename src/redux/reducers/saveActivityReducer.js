import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function saveActivityReducer(state = initialState.savedActivity, action) {
    switch (action.type) {
        case actionTypes.UPDATE_ACTIVITY_SUCCESS:
            return action.payload;
        case actionTypes.CREATE_ACTIVITY_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}