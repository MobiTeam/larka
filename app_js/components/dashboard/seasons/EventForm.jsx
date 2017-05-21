import React from 'react';
import { connect } from 'react-redux';
import { localUpdateGroup, fetchSesonsBrief } from '../../../actions/groupActions';
import { showSpinner, closeSpinner } from '../../../actions/spinnerActions.js';
import { createEventTimePromise, updateEventTimePromise, deleteEventTimePromise } from '../../../api.js';
import serialize from 'form-serialize';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru');
import TimePicker from 'rc-time-picker';
import uniqid from 'uniqid';

class EventForm extends React.Component {

	static defaultProps = {
		data: {},
		submitBtnTitle : 'Создать',
		formTitle: 'Форма для создания мероприятия',
		sendMethod: () => {},
		isError: false,
		eventTimes: []
	}

	constructor (props) {
		super(props);
		this.state = {
			selectedSeason: props.data.season_id,
			date: props.data.date_hold ? this.createMomentDate(props.data.date_hold) : moment(),
			statusMsg: '',
			eventTimes: props.eventTimes,
			deletedTimes: []
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

	createTimesPromises () {
		// create / update / delete
		const auth = { "Authorization": `Bearer{${ this.props.token }}` };
		return this.state.eventTimes.map(item => item.isNew ? createEventTimePromise(item, auth) : updateEventTimePromise(item, auth))
					.concat(this.state.deletedTimes.filter(item => !item.isNew)
								.map((item) => deleteEventTimePromise(item, auth)));
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

		if (this.state.eventTimes.length === 0) {
			alert('Необходимо указать время проведения!');
			return false;
		}

		let data = serialize(this.refs.editForm, { hash: true });
		if (this.props.data.id) {
			data.id = this.props.data.id;
		} 

		this.props.showSpinner();
		this.setState({
			statusMsg: ''
		});

		this.props.sendMethod(data, { "Authorization": `Bearer{${ this.props.token }}` })
			  .then(result => {			  	
			  	Promise.all(this.createTimesPromises())
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
			  		.catch(() => alert('При добавлении време проведения произошла ошибка. Перезагрузите страницу и повторите попытку!'))
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

	// to-do refactor
	handleSelectChange (event) {
		this.setState({
			selectedSeason: event.target.value
		});
	}

	handleCapacityInput (event) {		
		this.setState({
			capacity: event.target.value
		});
	}

	handleDateChange (date) {
		this.setState({
			date
		});
	}

	updateEventTime (id, type, value) {
		this.setState({
			eventTimes: this.state.eventTimes.map(item => { 
				if (item.id == id) {
					item[type] = this.dateToString(value);				
				}
				return item;
			})
		});
	}

	updateCapacity (id, event) {
		this.setState({
			eventTimes: this.state.eventTimes.map(item => { 
				if (item.id == id) {
					item.capacity = event.target.value;					
				}
				return item;
			})
		});
	}

	deleteEventTime (time) {
		this.setState({
			eventTimes: this.state.eventTimes.filter(item => item.id != time.id),
			deletedTimes: [ ...this.state.deletedTimes, time ]
		});
	}

	printEventTimes () {
		if (this.state.eventTimes.length == 0) {
			return <div className="alert alert-danger">Необходимо назначить время для данного мероприятия и указать количество человек!</div>
		}
		
		return this.state.eventTimes.map((item) => {			
		
			const fromTimeChunks = item.time_hold_start.split(':');
			const toTimeChunks = item.time_hold_finish.split(':');

			const fromTime = moment().set('hour', fromTimeChunks[0]).set('minute', fromTimeChunks[1]);
			const toTime = moment().set('hour', toTimeChunks[0]).set('minute', toTimeChunks[1]);

			return (<div className="row add-time-wrapper" key={ item.id }>
						<div className="from-time">
							<label>С</label>
							<TimePicker value={ fromTime } showSecond={false} onChange={ this.updateEventTime.bind(this, item.id, 'time_hold_start')} />
						</div>
						<div className="to-time">
							<label>По</label>
							<TimePicker value={ toTime } showSecond={false} onChange={ this.updateEventTime.bind(this, item.id, 'time_hold_finish')} />
						</div>	
						<div className="capacity-block">					    			
			    			<input type="number" className="form-control" value={ item.capacity } onChange={ this.updateCapacity.bind(this, item.id) } placeholder="Количество мест" />
			      		</div>
						<span className="btn btn-danger" onClick={ this.deleteEventTime.bind(this, item) }>
							Удалить
						</span>		
					</div>);
		});
	}

	dateToString(date) {
		if (!date) {
			return '11:00';
		}
		return date.format('HH:mm');
	}

	handleEventTimeClick () {
		const newTime = {
			'id': uniqid(),
			'event_id': this.props.data.id,
			'name': '',
			'description': '', 
			'time_hold_start': this.dateToString(this.state.timeFrom), 
			'time_hold_finish': this.dateToString(this.state.timeTo),
			'capacity': this.state.capacity || 10,
			'isNew': true
		};	

		this.setState({
			eventTimes: [ ...this.state.eventTimes, newTime ]
		});		
	}

	changeTime (type, value) {
		this.setState({
			[type]: value
		});
	}

	render () {	
		const defaultDate = moment().set('hour', 11).set('minute', 0);		

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
						<div>
					    	<label>Время проведения</label>
					    </div>
					    { this.printEventTimes() }
					    <div>
					    	<div className="row add-time-wrapper">
					    		<div className="from-time">
					    			<label>С</label>
					    			<TimePicker value={this.state.timeFrom || defaultDate} onChange={ this.changeTime.bind(this, 'timeFrom')} showSecond={false} />
					    		</div>
					    		<div className="to-time">
					    			<label>По</label>
					    			<TimePicker value={this.state.timeTo || defaultDate} onChange={ this.changeTime.bind(this, 'timeTo')} showSecond={false} />
					    		</div>
					    		<div className="capacity-block">					    			
					    			<input type="number" name="capacity" className="form-control" defaultValue={ 10 } value={ this.state.capacity } onChange={ this.handleCapacityInput.bind(this) } placeholder="Количество мест" />
					      		</div>
					    		<span className="btn btn-labeled btn-primary" onClick={ this.handleEventTimeClick.bind(this) }>
				    				<span className="btn-label">
					    				<i className="fa fa-plus" aria-hidden="true"></i>
					    			</span>
					    			{ this.state.eventTimes.length == 0 ? 'Указать' : 'Добавить' }
							    </span>
					    	</div>					    	
					    </div>
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