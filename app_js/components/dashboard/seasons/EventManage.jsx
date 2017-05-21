import React from 'react';
import DocumentTitle from 'react-document-title';
import { SITE_NAME } from '../../../constants/conf';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { showSpinner, closeSpinner } from '../../../actions/spinnerActions.js';
import { fetchAllSeasonEventsPromise, fetchAllEventsPromise, fetchEventPromise, 
	createEventPromise, updateEventPromise, deleteEventPromise } from '../../../api.js';

class EventManage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			events: []
		}
	}

	componentWillMount () {
		this.props.showSpinner();
		fetchAllEventsPromise(null, {
          "Authorization": `Bearer{${ this.props.token }}`
        })
        .then(result => result.json())
        .then(events => {
        	this.setState({
        		events
        	}, () => {
        		this.props.closeSpinner();
        	})
        });
	}

	onDelBtnClick (idEvent) {	
		this.props.showSpinner();
		deleteEventPromise({ id : idEvent }, {
          "Authorization": `Bearer{${ this.props.token }}`
        })
        .then(result => {
        	this.setState({
        		events : this.state.events.filter(ev => ev.id != idEvent)
        	}, () => {
        		this.props.closeSpinner();
        	});
        })
        .catch(error => {
        	alert('При удалении произошла ошибка. Мероприятие не было удалено');
        	this.props.closeSpinner();
        })
	}

	createEventsList (data) {
		return data.map(ev => {
			return (<tr key={ ev.id } >
						<td>{ ev.name }</td>
						<td>{ ev.description }</td>
						<td>{ ev.season_name }</td>
						<td>{ ev.date_hold }</td>
						<td>{ ev.created_at }</td>
						<td>
							<Link to={ "/dashboard/seasons/events/edit/" + ev.id } className="groups-item-edit-link">
								<i className="fa fa-pencil" aria-hidden="true"></i>
							</Link>
						</td>
						<td>
							<span onClick={ () => { this.onDelBtnClick(ev.id) } } className="groups-item-delete-link">
								<i className="fa fa-trash" aria-hidden="true"></i>
							</span>
						</td>
					</tr>);
		})
	}

	issetEvents () {
		return this.state.events.length > 0;
	}

	printCreateBtn () {
		return (<div className="form-group">
					<Link to="/dashboard/seasons/events/new">
						<button type="button" className="btn btn-labeled btn-success">
				    		<span className="btn-label">
				    			<i className="fa fa-floppy-o" aria-hidden="true"></i>
				    		</span>
				    		Создать мероприятие
				    	</button>
			    	</Link>
				</div>)
	}

	render () {
		return (
			<DocumentTitle title={ SITE_NAME + ': работа с мероприятиями' }>
				<div className="row col-xs-12">
					<div className="white-wrapper">
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th>Название</th>
									<th>Описание</th>
									<th>Сезон</th>
									<th>Дата проведения</th>									
									<th>Дата создания</th>									
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{ 
									this.issetEvents() ? 
										this.createEventsList(this.state.events) 
										: <tr>
											<td colSpan="7">
												Нет ни одного мероприятия. 
												<Link to="/dashboard/seasons/events/new"> Нажмите, чтобы создать.</Link>
											</td>
										  </tr>
								}
							</tbody>
						</table>	
						{ this.issetEvents() ? this.printCreateBtn() : null }
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

export default connect(mapStateToProps, mapDispatchToProps)(EventManage);