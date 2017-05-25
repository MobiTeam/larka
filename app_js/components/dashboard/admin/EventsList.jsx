import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { fetchAllUserEvents } from '../../../api.js';
import { showSpinner, closeSpinner } from '../../../actions/spinnerActions';

class EventsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			seasons : [] 
		}
	}

	componentWillMount() {
		this.props.showSpinner();
		fetchAllUserEvents(null, { "Authorization": `Bearer{${ this.props.token }}` })
			.then(result => result.json())
			.then((seasons) => {
				this.setState({
					seasons
				});
				this.props.closeSpinner();
			})
	}

	printUsers(eventTime) {		
		return eventTime.users.map(user => {
			return <tr key={ user.id }>
						<td>{ user.family_name + ' ' + user.name }</td>
						<td>{ user.email }</td>
						<td>{ user.phone }</td>
						<td>{ eventTime.time_hold_start + ' - ' + eventTime.time_hold_finish }</td>
					</tr>;
		});
	}

	printTimes(sEvent) {
		return [ <tr key={ 'event' + sEvent.id }><td colSpan={4}><b>{ sEvent.name }</b></td></tr> ]
					.concat(sEvent.event_time.map(eventTime => this.printUsers(eventTime)));							
	}

	printEvents(events) {
		if (events.length == 0) {
			return <div className="alert alert-warning">В данном сезоне нет мероприятий.</div>
		}
		return  <table className="table table-striped table-hover"><tbody>{ events.map(this.printTimes.bind(this)) }</tbody></table>;
	}
			

	printSeasons(seasons) {
		return seasons.map(season => {
			return <div className="admin-season-wrapper" key={ season.id }>
						<h4>{ season.name }</h4>
						<hr />
						{ this.printEvents(season.event || []) }
					</div>	
		});
	}

	render() {
		return (
				<div>
					<div className="row">
						<div className="col col-xs-10">
							<div className="white-wrapper">
								<h3>Текущие мероприятия</h3>
								{ this.printSeasons(this.state.seasons) }								
							</div>
						</div>
					</div>
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);

