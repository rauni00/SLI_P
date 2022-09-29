import axios from 'axios';
import {
	ADD_BOOK,
	BOOK_LOADING,
	GET_BOOKS,
	SINGLE_BOOK,
	GET_ERRORS,
	DELETE_BOOK,
	EDIT_BOOK,
} from './types';
import swal from 'sweetalert';

export const getBooks = () => (dispatch) => {
	dispatch(BookLoading());
	axios.get('/api/book/all')
		.then((res) => {
			dispatch({
				type: GET_BOOKS,
				payload: res.data,
			});
		})
		.catch((err) => {});
};
export const BookLoading = () => {
	return {
		type: BOOK_LOADING,
	};
};

export const addBook = (newBook) => (dispatch) => {
	axios.post('/api/book/addBook', newBook)
		.then((res) => {
			swal({
				icon: 'success',
				title: 'Book Added',
			});
			dispatch({
				type: ADD_BOOK,
				payload: res.data,
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const getSingleBook = (id) => (dispatch) => {
	axios.get(`/api/book/getBook/${id}`)
		.then((res) => {
			dispatch({
				type: SINGLE_BOOK,
				payload: res.data,
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
export const editBook = (id, editBook) => (dispatch) => {
	axios.post(`/api/book/editBook/${id}`, editBook)
		.then((res) => {
			swal({
				icon: 'success',
				title: 'Book Edited',
			});
			dispatch({
				type: EDIT_BOOK,
				payload: res.data,
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const deleteBook = (id) => (dispatch) => {
	axios.delete(`/api/book/delete/${id}`).then((res) => {
		dispatch({
			type: DELETE_BOOK,
			payload: res.data,
		});
	});
};
