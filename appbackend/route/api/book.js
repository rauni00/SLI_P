const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateBook = require('../../validation/book');
const Book = require('../../Model/Book');

router.post('/addBook', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateBook(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	// Trim the Category name and convert into Title Case
	var a = req.body.name.trim();
	Book.findOne({ name: a }).then((already) => {
		if (already) {
			errors.name = 'Book already exists';
			return res.status(400).json(errors);
		} else {
			const newBook = new Book({
				user: req.user.id,
				name: req.body.name,
				price: req.body.price,
				author: req.body.author,
				description: req.body.description,
			});
			newBook
				.save()
				.then((nBook) => {
					Book.find({ user: req.user.id }).then((all) => {
						res.json(all);
					});
				})
				.catch((err) => console.log(err));
		}
	});
});
// Get all Book
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
	Book.find({ user: req.user.id })
		.then((book) => {
			res.json(book);
		})
		.catch((err) => {
			res.status(500).send('Something went wrong');
		});
});

//Get book byId
router.get('/getBook/:id', (req, res) => {
	var id = req.params.id;
	Book.findOne({ _id: id })
		.then((oneBook) => {
			res.json(oneBook);
		})
		.catch((err) => console.log(err));
});

//Edit book
router.post('/editBook/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateBook(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	var id = req.params.id;
	const updateBook = {
		price: req.body.price,
		name: req.body.name,
		description: req.body.description,
		author: req.body.author,
	};
	Book.findOneAndUpdate({ _id: id }, { $set: updateBook }, { new: true })
		.then((updatedBook) => {
			Book.find({ user: req.user.id }).then((all) => {
				res.json(all);
			});
		})
		.catch((err) => console.log(err));
});

// Delete the book
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	var id = req.params.id;
	Book.findOneAndDelete({ _id: id })
		.then((del) => {
			Book.find({ user: req.user.id }).then((all) => {
				res.json(all);
			});
		})
		.catch((err) => console.log(err));
});

module.exports = router;
