import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSingleBook, editBook } from '../actions/bookActions';

export class EditBook extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			price: '',
			author: '',
			description: '',
			errors: {},
		};
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		this.props.getSingleBook(this.props.id);
		setTimeout(() => {
			const { name, price, author, description } = this.props.books.book;
			this.setState({
				name: name,
				price: price,
				author: author,
				description: description,
			});
		}, 500);
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const editedBook = {
			name: data.get('name'),
			price: data.get('price'),
			author: data.get('author'),
			description: data.get('description'),
		};
		this.props.editBook(this.props.id, editedBook);
	};
	cancel() {
		this.props.onCancel();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	render() {
		const { errors, name, price, author, description } = this.state;
		return (
			<>
				<Container maxWidth="xs" component="main">
					<Box>
						<Typography component="h1" variant="h5">
							Edit Book
						</Typography>
						<Box
							component="form"
							onSubmit={this.handleSubmit.bind(this)}
							sx={{ mt: 2 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										autoComplete="given-name"
										name="name"
										value={name}
										onChange={this.onChange}
										size="small"
										fullWidth
										id="name"
										label="name"
									/>
									{errors.name && (
										<div style={{ color: 'red' }}>{errors.name}</div>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										type="number"
										size="small"
										value={price}
										onChange={this.onChange}
										fullWidth
										id="price"
										label="price"
										name="price"
									/>
									{errors.price && (
										<div style={{ color: 'red' }}>{errors.price}</div>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										size="small"
										name="author"
										value={author}
										onChange={this.onChange}
										label="author"
										id="author"
									/>
									{errors.author && (
										<div style={{ color: 'red' }}>
											{errors.author}
										</div>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										size="small"
										value={description}
										onChange={this.onChange}
										name="description"
										label="description"
										id="description"
									/>
									{errors.description && (
										<div style={{ color: 'red' }}>
											{errors.description}
										</div>
									)}
								</Grid>
							</Grid>
							<Button
								type="submit"
								size="small"
								variant="contained"
								sx={{ mt: 3, mb: 2, m: 1 }}
							>
								Edit Book
							</Button>
							<Button
								onClick={this.cancel.bind(this)}
								size="small"
								variant="outlined"
								color="error"
								sx={{ mt: 5, mb: 2, m: 1 }}
							>
								cancel
							</Button>
						</Box>
					</Box>
				</Container>
			</>
		);
	}
}
EditBook.propTypes = {
	getSingleBook: PropTypes.func.isRequired,
	editBook: PropTypes.func.isRequired,
	books: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	books: state.books,
	errors: state.errors,
});
export default connect(mapStateToProps, { getSingleBook, editBook })(EditBook);
