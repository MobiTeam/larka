import React from 'react'
import { logOut } from '../actions/userActions'
import { connect } from 'react-redux'
 
class Logout extends React.Component {
	static propTypes = {
		logOut : React.PropTypes.func.isRequired
	}
	componentWillMount() {
		localStorage.clear();
		this.props.logOut();
	}
	render () {
		return null;	
	} 
}

const mapDispatchToProps = (dispatch) => {
	return {
		logOut: () => {
			dispatch(logOut());
		}
	}
} 


export default connect(null, mapDispatchToProps)(Logout);