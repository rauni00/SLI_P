import React from 'react';
import Typography from '@mui/material/Typography';
import Book from '../Book/Book';
import { userCurrentProfile } from '../actions/authActions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
export class Dashboard extends React.Component {
	componentDidMount() {
		this.props.userCurrentProfile();
	}

	render() {
		const { user } = this.props.auth;
		return (
			<div>
				<Typography
					display="flex"
					alignItems="center"
					justifyContent="center"
					component="h1"
					variant="h2"
				>
					DashBoard
				</Typography>
				<Typography
					display="flex"
					alignItems="center"
					justifyContent="center"
					component="h1"
					variant="h5"
				>
					Welcome {user.name}
				</Typography>
				<Book />
			</div>
		);
	}
}
Dashboard.propTypes = {
	userCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { userCurrentProfile })(Dashboard);
