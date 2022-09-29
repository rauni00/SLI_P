/* eslint-disable import/no-anonymous-default-export */
import {
	ADD_BOOK,
	BOOK_LOADING,
	DELETE_BOOK,
	EDIT_BOOK,
	GET_BOOKS,
	SINGLE_BOOK,
} from '../actions/types';
const initialState = {
	books: null,
	book: null,
	loading: false,
	toggleForm: false,
	toggleEdit: false,
};
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_BOOKS:
			return {
				...state,
				books: action.payload,
				toggleForm: false,
				loading: false,
			};
		case SINGLE_BOOK:
			return {
				...state,
				book: action.payload,
			};
		case BOOK_LOADING:
			return {
				...state,
				loading: true,
			};
		case ADD_BOOK:
			return {
				...state,
				books: action.payload,
			};
		case EDIT_BOOK:
			return {
				...state,
				books: action.payload,
				toggleEdit: false,
			};
		case DELETE_BOOK:
			return {
				...state,
				books: action.payload,
			};
		default:
			return state;
	}
}
