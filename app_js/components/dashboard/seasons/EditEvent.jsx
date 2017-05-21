import React from 'react';
import DocumentTitle from 'react-document-title';
import { SITE_NAME } from '../../../constants/conf';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { updateEventPromise, fetchEventPromise, fetchEventTimePromise } from '../../../api.js';
import EventForm from './EventForm.jsx';
import { showSpinner, closeSpinner } from '../../../actions/spinnerActions.js';

class EditEvent extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			ev : {},
			times: null
		};
	}

	componentWillMount () {
		this.loadEventData();
		this.loadEventTimes();
	}

	loadEventTimes () {
		const { eventId } = this.props.params;
		if (eventId) {
			this.props.showSpinner();
			fetchEventTimePromise({ id : eventId }, {
              "Authorization": `Bearer{${ this.props.token }}`
            })
            .then(result => result.json())
			.then(times => {				
				this.setState({
					times
				}, () => {
					this.props.closeSpinner();
				});
			})
			.catch((error) => {
				this.props.closeSpinner();
			});
		}
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
					{ this.state.ev.id && this.state.times != null ? 
						<EventForm sendMethod={ updateEventPromise } 
							   submitBtnTitle={ 'Сохранить' }
						                 data={ this.state.ev }
						           eventTimes={ this.state.times } 
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