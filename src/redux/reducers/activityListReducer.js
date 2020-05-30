import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function activityListReducer(state = initialState.activities, action){
    switch (action.type) {
        case actionTypes.GET_ACTIVITIES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}