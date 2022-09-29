import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBook } from '../actions/bookActions';

export class AddBook extends React.Component {
	constructor() {
		super();
		this.state = {
			errors: {},
		};
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const newBook = {
			name: data.get('name'),
			price: data.get('price'),
			author: data.get('author'),
			description: data.get('description'),
		};
		this.props.addBook(newBook);
	};
	cancel() {
		this.props.onCancel();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	render() {
		const { errors } = this.state;
		return (
			<>
				<Container maxWidth="xs" component="main">
					<Box>
						<Typography component="h1" variant="h5">
							Add Book
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
								Add Book
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
AddBook.propTypes = {
	addBook: PropTypes.func.isRequired,
	books: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	books: state.books,
	errors: state.errors,
});
export default connect(mapStateToProps, { addBook })(AddBook);
