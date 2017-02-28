import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class SeasonList extends React.Component {
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': список сезонов' }>
					<div>
						Список сезонов
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

export default connect(null)(SeasonList);

