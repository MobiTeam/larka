import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Seasons extends React.Component {
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': управление сезонами' }>
					<div className='row season-items'>
						<div className="col-xs-12 col-sm-6 sol-md-4 col-lg-3">
							<Link to='/dashboard/seasons/list' className='default-link-style'>
								<div className='dashboard-item actual-seasons-item'>
									<i className="fa fa-clock-o" aria-hidden="true"></i>
									<span>Список сезонов</span>
								</div>
							</Link>
						</div>
						<div className="col-xs-12 col-sm-6 sol-md-4 col-lg-3">
							<Link to='/dashboard/seasons/new' className='default-link-style'>
								<div className='dashboard-item create-seasons-item'>
									<i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
									<span>Создать новый сезон</span>
								</div>
							</Link>
						</div>
	                </div>    
				</DocumentTitle>
		)		
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		statusCode : state.user.statusCode
// 	}
// }

export default connect(null)(Seasons);

