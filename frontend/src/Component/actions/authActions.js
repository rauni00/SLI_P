import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, GET_PROFILE, PROFILE_LOADING, SET_CURRENT_USER } from './types';
import swal from 'sweetalert';

// Register User
export const registerUser = (userData, history) => (dispatch) => {
	axios.post('/api/users/register', userData)
		.then((res) => {
			swal('Good job!', 'Your Account Created Successfully!', 'success');
			history.push('/login');
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Login Get User Token -
export const loginUser = (userData) => (dispatch) => {
	axios.post('/api/users/testLogin', userData)
		.then((res) => {
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

export const userCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios.get('/api/users/')
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch((err) => {});
};
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	};
};

//  Log user out
export const logoutUser = () => (dispatch) => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
