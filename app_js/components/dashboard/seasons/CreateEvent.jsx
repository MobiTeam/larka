import React from 'react';
import DocumentTitle from 'react-document-title';
import { SITE_NAME } from '../../../constants/conf';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createEventPromise } from '../../../api.js';
import EventForm from './EventForm.jsx';

class CreateEvent extends React.Component {
	render () {
		return (
			<DocumentTitle title={ SITE_NAME + ': создать мероприятие' }>
				<div className="row col-xs-12 col-md-8">
					<div className="white-wrapper">
						<EventForm sendMethod={ createEventPromise } />
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

export default connect(mapStateToProps)(CreateEvent);

