import React from 'react';
import DocumentTitle from 'react-document-title';
import { SITE_NAME } from '../../../constants/conf';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { updateEventPromise, fetchEventPromise } from '../../../api.js';
import EventForm from './EventForm.jsx';
import { showSpinner, closeSpinner } from '../../../actions/spinnerActions.js';

class EditEvent extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			ev : {}
		};
	}

	componentWillMount () {
		this.loadEventData();
	}

	loadEventData () {
		const { eventId } = this.props.params;
		if (eventId) {
			this.props.showSpinner();
			fetchEventPromise({ id : eventId }, {
              "Authorization": `Bearer{${ this.props.token }}`
            })
            .then(result => result.json())
			.then(({ 'event': ev }) => {				
				this.setState({
					ev
				}, () => {
					this.props.closeSpinner();
				});
			})
			.catch((error) => {
				this.props.closeSpinner();
			});
		}
	}

	render () {
		return (
			<DocumentTitle title={ SITE_NAME + ': создать мероприятие' }>
				<div className="row col-xs-12 col-md-8">
					<div className="white-wrapper">
					{ this.state.ev.id ? 
						<EventForm sendMethod={ updateEventPromise } 
							   submitBtnTitle={ 'Сохранить' }
						                 data={ this.state.ev } 
						            formTitle={ 'Форма редактирования мероприятия' } /> : null }
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

const mapDispatchToProps = (dispatch) => {
	return {
		showSpinner : () => dispatch(showSpinner()),
		closeSpinner : () => dispatch(closeSpinner())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);