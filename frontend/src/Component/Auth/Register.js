import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';

export class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			errors: {},
		};
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const newUser = {
			name: data.get('name'),
			email: data.get('email'),
			password: data.get('password'),
		};
		this.props.registerUser(newUser, this.props.history);
	};
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	render() {
		const { errors } = this.state;
		return (
			<>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							boxShadow: 2,
							borderRadius: 3,
							p: 3,
							m: -5,
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
						<Typography component="h1" variant="h5">
							Sign up
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={this.handleSubmit.bind(this)}
							sx={{ mt: 3 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										autoComplete="given-name"
										name="name"
										required
										fullWidth
										id="name"
										label="name"
										autoFocus
									/>
									{errors.name && (
										<div style={{ color: 'red' }}>{errors.name}</div>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
									/>
									{errors.email && (
										<div style={{ color: 'red' }}>{errors.email}</div>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="new-password"
									/>
									{errors.password && (
										<div style={{ color: 'red' }}>
											{errors.password}
										</div>
									)}
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign Up
							</Button>
							<Grid container justifyContent="flex-end">
								<Grid item>
									<Link to="/login">
										Already have an account? Sign in
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
