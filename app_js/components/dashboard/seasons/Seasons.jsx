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
						<div className="col-xs-12 col-sm-4 sol-md-3 col-lg-3">
							<div className='dashboard-item actual-seasons-item'>
								<span>Действующие сезоны</span>
								<i className="fa fa-clock-o" aria-hidden="true"></i>
							</div>
						</div>
						<div className="col-xs-12 col-sm-4 sol-md-3 col-lg-3">
							<div className='dashboard-item create-seasons-item'>
								<span>Создать новый сезон</span>
								<i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
							</div>
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

