import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Sidebar from './dashboard/Sidebar'
import Navbar from './dashboard/Navbar'
import needProfileInfo from '../hocs/needProfileInfo'
import { SITE_NAME } from '../constants/conf'
 
const WrappedNavbar = needProfileInfo(Navbar);
 
class Dashboard extends React.Component {
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': личный кабинет' }>
					<div className="container-fluid display-table">
						<div className="row display-table-row">
							<Sidebar userRole={ this.props.role } />
							<div className="dashboard-wrapper col col-md-10 col-sm-11 display-table-cell v-align">
								<div className="row">
									<WrappedNavbar />
								</div>
								<div className="row">
									<div className="pageContentBox">
										{this.props.children}
									</div>
								</div>
							</div>
						</div>
					</div>					
				</DocumentTitle>
			)		
	} 
}

const mapStateToProps = (state) => {
	return {
		role : state.user.role
	}
}

export default connect(mapStateToProps)(Dashboard);