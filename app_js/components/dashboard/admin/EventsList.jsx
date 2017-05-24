import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { fetchAllUserEvents } from '../../../api.js';
import { showSpinner, closeSpinner } from '../../../actions/spinnerActions';

class EventsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			events : [] 
		}
	}

	componentWillMount() {
		this.props.showSpinner();
		fetchAllUserEvents(null, { "Authorization": `Bearer{${ this.props.token }}` })
			.then(result => result.json())
			.then((groups) => {
				this.setState({
					groups
				});
				this.props.closeSpinner();
			})
	}

	printGroups() {
		if (this.state.groups.length == 0) return 'Нет ни одной группы';
		return (this.state.groups.map(group => {
			return (<div className="row user-list-table" key={ group.id }>
						<div className="col col-xs-12">
							<h4> { group.name } </h4>
							<div>
								{ this.printGroupUsers(group.users) }
							</div>
						</div>
					</div>);
		}));
	}

	printGroupUsers(users) {
		if (!users) return 'В группе нет пользователей.';
		return (<table className="table table-striped table-hover">
					<tbody> 
						{ users.map((user, index) => {
							return (<tr className="row" key={ user.id }>
										<td>{ index + 1 }</td>
										<td>{ user.name + " " + user.family_name }</td>
										<td>{ user.left_payd === 0 ? 'Оплачено полностью' : 'Бронь'}</td>
									</tr>);
						}) }
					</tbody>
		 		</table>);
	}

	render() {
		return (
				<div>
					<div className="row">
						<div className="col col-xs-12 col-sm-8 col-lg-8">
							<div className="white-wrapper">
								<h3>Список пользователей</h3>
								{ this.printGroups() }
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

