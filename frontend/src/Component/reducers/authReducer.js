/* eslint-disable import/no-anonymous-default-export */
import isEmpty from '../validation/is-empty';
import { GET_PROFILE, PROFILE_LOADING, SET_CURRENT_USER } from '../actions/types';
const initialState = {
	isAuthenticated: false,
	user: {},
};
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		case GET_PROFILE:
			return {
				...state,
				user: action.payload,
				loading: false,
			};
		case PROFILE_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
