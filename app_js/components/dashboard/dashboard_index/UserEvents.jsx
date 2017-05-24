import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAvailUserEvents, createUserEventsRelation, deleteUserEventsRelation } from '../../../api.js';
import { showSpinner, closeSpinner } from '../../../actions/spinnerActions';

class UserEvents extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userEvents: null
		}
	}

	componentWillMount() {
		fetchAvailUserEvents(null, { "Authorization": `Bearer{${ this.props.token }}` })
			.then(result => result.json())
			.then(userEvents => {
				this.setState({
					userEvents: userEvents.filter(item => !!item.eventTime)
				});
			})
	}

	issetPlaces = eventTime => eventTime.capacity > 0; 

	sliceSeconds = timeStr => {
		if (timeStr.length < 4) {
			return timeStr;
		}

		const timeChunks = timeStr.split(':');

		return `${timeChunks[0]}:${timeChunks[1]}`;
	}

	handleTimeSelectChange (userEvent, event) {
		event.persist();
		this.changeUserEventRelation(userEvent, createUserEventsRelation, 1, event.target.value)
			.then(() => {
					this.setState({
						userEvents: this.state.userEvents.map(uEvent => {
								if (uEvent.id == userEvent.id) {
									uEvent.eventTimeId = event.target.value;
								}
								return uEvent;
							})
					});
			});
	}

	printEventTimes (uEvent) {
		if (!uEvent.eventTime) {
			alert('При загрузке произошла ошибка. Обновите страницу');
		}

		return <select value={ uEvent.eventTimeId || 0 } onChange={ this.handleTimeSelectChange.bind(this, uEvent) }>
					<option value={0} disabled="disabled">время..</option>   
					{ uEvent.eventTime
						.filter(this.issetPlaces)
						.map(time => {
							return <option key={ time.id } value={ time.id }>
										{ `${this.sliceSeconds(time.time_hold_start)} - ${this.sliceSeconds(time.time_hold_finish)}` }
									</option>
					}) }
				</select>
	}

	changeUserEventRelation (userEvent, method, code, event_id) {
		this.props.showSpinner();
		return method({ event_time_id : event_id || userEvent.eventTimeId }, { "Authorization": `Bearer{${ this.props.token }}` })
				.then(result => {
					this.props.closeSpinner();
					if (code == 0) {
						this.setState({
							userEvents: this.state.userEvents.map(uEvent => {
								if (uEvent.id == userEvent.id) {
									delete uEvent.eventTimeId;
								}
								return uEvent;
							})
						});		
					}
				})
				.catch(error => {
					alert(error);
					this.props.closeSpinner();
				});
	}

	getSelectedTimeStr (uEvent) {
		const selectedTime = uEvent.eventTime.find(time => time.id == uEvent.eventTimeId);
		return `${this.sliceSeconds(selectedTime.time_hold_start)} - ${this.sliceSeconds(selectedTime.time_hold_finish)}`;
	}

	printUserEvents () {
		if (!this.state.userEvents || this.state.userEvents.length == 0) {
			return <div>Пока ничего не запланировано.</div>;
		}

		return (<table className="table table-striped table-hover">
			<thead>
				<tr>
					<th>Название</th>
					<th>Описание</th>
					<th>Дата</th>
					<th>Время</th>
				</tr>
			</thead>
			<tbody>
				{
					this.state.userEvents.map(uEvent => {
						return <tr key={ uEvent.id }>
							<td>{ uEvent.name }</td>
							<td>{ uEvent.description }</td>
							<td>{ uEvent.date_hold }</td>
							<td>
								{ uEvent.eventTimeId == undefined ? 
									<div>
										{ this.printEventTimes(uEvent) }
									</div>
									: <div>
										<span>{ this.getSelectedTimeStr(uEvent) }</span>
										<button className="btn btn-warning" onClick={ this.changeUserEventRelation.bind(this, uEvent, deleteUserEventsRelation, 0, null) }>
									       <i className="fa fa-pencil" aria-hidden="true"></i>
									   </button>
									</div> }								
							</td>
						</tr>;
					})
				}
			</tbody>
		</table>);
			
	}

	render() {
		return (
			<div>
				<h3>Ближайшие события</h3>
				{ this.printUserEvents() }				
			</div>
		);
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

export default connect(mapStateToProps, mapDispatchToProps)(UserEvents);