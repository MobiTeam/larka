import React from 'react'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { SITE_NAME } from '../../../constants/conf.js';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

class Admin extends React.Component {
	render() {
		return (
				<DocumentTitle title={ SITE_NAME + ': админ панель' }>
					<div className='row season-items'>
						<div className="col-xs-12 col-sm-6 sol-md-4 col-lg-3">
							<Link to='/dashboard/admin/users' className='default-link-style'>
								<div className='dashboard-item manage-group-item'>
									<i className="fa fa-users" aria-hidden="true"></i>
									<span>Пользователи</span>
								</div>
							</Link>
						</div>
	                </div>    
				</DocumentTitle>
			)
	}	
}

const mapStateToProps = (state) => {
	return {
		token : state.user.token		
	}
}

export default connect(mapStateToProps)(Admin);

