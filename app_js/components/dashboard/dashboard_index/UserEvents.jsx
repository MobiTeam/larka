import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAvailUserEvents } from '../../../api.js';

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

	printEventTimes (uEvent) {

		return <select>
					<option selected="true" disabled="disabled">время..</option>   
					{ uEvent.eventTime
						.filter(this.issetPlaces)
						.map(time => {
							return <option key={ time.id } value={ time.id }>
										{ `${this.sliceSeconds(time.time_hold_start)} - ${this.sliceSeconds(time.time_hold_finish)}` }
									</option>
					}) }
				</select>
	}

	eventCancel () {

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
					<th></th>
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
								{ uEvent.status == 0 ? this.printEventTimes(uEvent)
										: <button className="button warning" onClick={ this.eventCancel.bind(this, uEvent) }>
											Отказаться
										  </button>
									}
								
							</td>
						</tr>;
						console.log(uEvent);
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

export default connect(mapStateToProps)(UserEvents);