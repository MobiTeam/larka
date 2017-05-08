import React from 'react';
import { connect } from 'react-redux';
import { localUpdateGroup, fetchSesonsBrief } from '../../../actions/groupActions';
import { showSpinner, closeSpinner } from '../../../actions/spinnerActions.js';
import serialize from 'form-serialize';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru');


class EventForm extends React.Component {

	static defaultProps = {
		data: {},
		submitBtnTitle : 'Создать',
		formTitle: 'Форма для создания мероприятия',
		sendMethod: () => {},
		isError: false
	}

	constructor (props) {
		super(props);
		this.state = {
			selectedSeason: props.data.season_id,
			date: props.data.date_hold ? this.createMomentDate(props.data.date_hold) : moment(),
			statusMsg: ''
		}
	}
	
	componentWillMount() {
		this.props.fetchSesonsBrief(this.props.token, {
			redirect: false, 
            showPreloader: true,
            additionHeader: {
              "Authorization": `Bearer{${ this.props.token }}`
            }
		});
	}

	createMomentDate (dateString) {		
		let dateChunks = dateString.split('.').reverse();
		dateChunks[1]--;		
		return moment(dateChunks);
	}

	showStatusMsg() {		
		if (this.state.statusMsg == '') {
			return null;
		} 
		return <div className={ "alert alert-" + (this.state.isError ? "danger" : "success") }>{ this.state.statusMsg }</div>
	} 

	onSubmit (event) {
		event.preventDefault();

		let data = serialize(this.refs.editForm, { hash: true });
		if (this.props.data.id) {
			data.id = this.props.data.id;
		} 

		this.props.showSpinner();
		this.setState({
			statusMsg: ''
		});

		this.props.sendMethod(data, { "Authorization": `Bearer{${ this.props.token }}` })
				  .then(() => {
				  	if (!this.props.data.id) {
				  		this.refs.editForm.reset();
				  	}
				  	this.props.closeSpinner();
				  	this.setState({
				  		statusMsg: 'Мероприятие было успешно сохранено.',
				  		isError: false
				  	});
				  })
				  .catch(() => {
				  	this.setState({
				  		statusMsg: 'Произошла ошибка, данные не были сохранены.',
				  		isError: true
				  	});
				  	this.props.closeSpinner();
				  });

		return false;
	}

	handleSelectChange (event) {
		this.setState({
			selectedSeason: event.target.value
		});
	}

	handleDateChange (date) {
		this.setState({
			date
		});
	}

	render () {			
		return (		
			<div>		
				{ this.showStatusMsg() }
				<form ref="editForm" action="" method="POST" onSubmit={ this.onSubmit.bind(this) }>
					<h4>{ this.props.formTitle }</h4>
					<div className="form-group">
					    <label htmlFor="eventName">Название события</label>
					    <input name="name" type="text" className="form-control" id="eventName" defaultValue={ this.props.data.name || '' } placeholder="Субботний сбор" required />
					</div>
					<div className="form-group">
					    <label htmlFor="eventDescription">Описание события</label>
					    <textarea name="description" className="form-control" id="eventDescription" defaultValue={ this.props.data.description || '' } placeholder="Собираемся у ЮКИОР" required />
					</div>
					<div className="form-group">
					    <label htmlFor="eventSeason">Сезон</label>
					    <select name="season_id" className="form-control" id="eventSeason" value={ this.state.selectedSeason } onChange={ this.handleSelectChange.bind(this) } >
							{ this.props.briefs.map((el) => {
									return <option key={ el.id } value={ el.id }>{ el.name }</option>
								}) }
						</select>					
					</div>
					<div className="form-group">
					    <div>
					    	<label htmlFor="eventDate">Дата проведения</label>
					    </div>
					    <DatePicker
					    	name="date_hold"
					    	className="form-control"
					    	id="sezDateStart"
							selected={ this.state.date }
							onChange={ this.handleDateChange.bind(this) } 
							placeholderText="ДД.ММ.ГГГГ"
							readOnly
							  />					    
					</div>					
					<div className="form-group">
						<button type="submit" className="btn btn-labeled btn-success">
				    		<span className="btn-label">
				    			<i className="fa fa-floppy-o" aria-hidden="true"></i>
				    		</span>
				    		{ this.props.submitBtnTitle } 
				    	</button>
					</div>
				</form>
			</div>						
		)		
	}
}

const mapStateToProps = (state) => {
	return {
		token : state.user.token,
		briefs : state.group.seasonsBrief	
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		showSpinner : () => dispatch(showSpinner()),
		closeSpinner : () => dispatch(closeSpinner()),
		fetchSesonsBrief : (payload, params) => dispatch(fetchSesonsBrief(payload, params))	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);