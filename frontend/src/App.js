import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './Component/Dashboard/Dashboard';
import setAuthToken from './Component/utils/setAuthToken';
import { logoutUser, setCurrentUser } from './Component/actions/authActions';

if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// decode token and  get user info and exp
	const decode = jwt_decode(localStorage.jwtToken);
	//set user and  isAuthenticate
	store.dispatch(setCurrentUser(decode));
	//check for the expire token
	const currentTime = Date.now() / 1000;
	if (decode.exp < currentTime) {
		//logout user
		store.dispatch(logoutUser());
		//Clear current Profile
		//Redirect to login
		window.location.href = '/login';
	}
}
function App() {
	return (
		<Provider store={store}>
			<Router>
				<Route exact path="/" component={Register}></Route>
				<Route exact path="/login" component={Login}></Route>
				<Route exact path="/dashboard" component={Dashboard}></Route>
			</Router>
		</Provider>
	);
}

export default App;
