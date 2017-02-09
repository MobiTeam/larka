import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import { logOut } from '../actions/userActions'
import { connect } from 'react-redux'
import Sidebar from './dashboard/Sidebar'
 
class Dashboard extends React.Component {
	render () {
		return (
				<DocumentTitle title='Ugra-Fit: личный кабинет'>
					<div className="container-fluid display-table">
						<div className="row display-table-row">
							<Sidebar userRole={this.props.user.role } />
							<button onClick={this.props.logOut}>Выход</button>
							{this.props.children}
						</div>
					</div>					
				</DocumentTitle>
			)		
	} 
}

const mapDispatchToProps = (dispatch) => {
	return {
		logOut: () => {
			dispatch(logOut());
		}
	}
} 


export default connect(null, mapDispatchToProps)(Dashboard);