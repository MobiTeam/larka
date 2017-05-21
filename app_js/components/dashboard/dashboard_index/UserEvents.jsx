import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserEvents } from '../../../api.js';

class UserEvents extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userEvents: null
		}
	}

	componentWillMount() {
		fetchUserEvents(null, { "Authorization": `Bearer{${ this.props.token }}` })
			.then(result => result.json())
			.then(userEvents => {
				this.setState({
					userEvents
				});
			})
	}

	printUserEvents () {
		if (!this.state.userEvents) {
			return;
		}
		return this.state.userEvents.map(uEvent => {
			console.log(uEvent);
		})
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