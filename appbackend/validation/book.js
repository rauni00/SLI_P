const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBook(data) {
	let errors = {};
	data.name = !isEmpty(data.name) ? data.name : '';
	data.price = !isEmpty(data.price) ? data.price : '';
	data.author = !isEmpty(data.author) ? data.author : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	if (Validator.isEmpty(data.price)) {
		errors.price = 'Price field is require';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'name field is required';
	}
	if (Validator.isEmpty(data.description)) {
		errors.description = 'Description field is required';
	}
	if (Validator.isEmpty(data.author)) {
		errors.author = 'author field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
