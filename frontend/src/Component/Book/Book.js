import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import AddBook from './AddBook';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteBook, getBooks } from '../actions/bookActions';
import ClipLoader from 'react-spinners/ClipLoader';
import { withRouter } from 'react-router-dom';
import EditBook from './EditBook';
import swal from 'sweetalert';
import { logoutUser } from '../actions/authActions';

export class Book extends React.Component {
	constructor() {
		super();
		this.state = {
			addBook: false,
			editToggle: false,
			editId: '',
		};
		this.toggle = this.toggle.bind(this);
		this.toggleCancel = this.toggleCancel.bind(this);
	}
	componentDidMount() {
		this.props.getBooks();
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			addBook: nextProps.books.toggleForm,
		});
	}
	deleteBook(id) {
		swal({
			icon: 'success',
			title: 'Deleted',
		});
		this.props.deleteBook(id);
	}
	toggle() {
		this.setState({ addBook: true });
	}
	toggleCancel() {
		this.setState({ addBook: false, editToggle: false });
	}
	EditBook(id) {
		this.setState({ editId: id, editToggle: true });
	}
	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
		this.props.history.push('/login');
	}

	render() {
		const { addBook, editToggle } = this.state;
		const { books, loading } = this.props.books;
		let bookItem;
		if (loading) {
			bookItem = <ClipLoader />;
		} else {
			if (books === null) {
				bookItem = (
					<Typography
						display="flex"
						alignItems="center"
						justifyContent="center"
						component="h1"
						variant="h5"
					>
						No Book Found
					</Typography>
				);
			} else {
				if (books.length === 0) {
					bookItem = (
						<Typography
							display="flex"
							alignItems="center"
							justifyContent="center"
							component="h1"
							variant="h5"
						>
							No Book Found
						</Typography>
					);
				} else {
					bookItem = (
						<>
							{books.map((book) => (
								<TableRow key={book.name}>
									<TableCell
										component="th"
										scope="row"
										sx={{ fontWeight: 'bold' }}
									>
										{book.name}
									</TableCell>
									<TableCell align="right" sx={{ color: 'green' }}>
										&#8377;
										{book.price}
									</TableCell>
									<TableCell align="right">{book.author}</TableCell>
									<TableCell align="right">{book.description}</TableCell>
									<TableCell sx={{ m: -3 }} align="right">
										<Tooltip title="Delete">
											<IconButton>
												<DeleteIcon
													sx={{ ':hover': { color: 'red' } }}
													onClick={this.deleteBook.bind(
														this,
														book._id
													)}
												/>
											</IconButton>
										</Tooltip>
										<Tooltip title="Edit">
											<IconButton>
												<ModeEditOutlineSharpIcon
													onClick={this.EditBook.bind(
														this,
														book._id
													)}
												/>
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))}
						</>
					);
				}
			}
		}
		return (
			<Container maxWidth="md" sx={{ marginTop: 2 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						p: 1,
						m: 1,
						borderRadius: 1,
					}}
				>
					{!addBook && (
						<Button variant="outlined" onClick={this.toggle}>
							add book
						</Button>
					)}
					<Button
						variant="outlined"
						onClick={this.onLogoutClick.bind(this)}
						color="error"
					>
						Logout
					</Button>
				</Box>
				{addBook && <AddBook onCancel={this.toggleCancel} />}
				{editToggle && <EditBook id={this.state.editId} onCancel={this.toggleCancel} />}

				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontSize: 20 }}>Book Name</TableCell>
								<TableCell sx={{ fontSize: 20 }} align="right">
									Price
								</TableCell>
								<TableCell sx={{ fontSize: 20 }} align="right">
									Author Name
								</TableCell>
								<TableCell sx={{ fontSize: 20 }} align="right">
									Description
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody> {bookItem} </TableBody>
					</Table>
				</TableContainer>
			</Container>
		);
	}
}
Book.propTypes = {
	getBooks: PropTypes.func.isRequired,
	deleteBook: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	books: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	books: state.books,
});
export default connect(mapStateToProps, { getBooks, deleteBook, logoutUser })(withRouter(Book));
