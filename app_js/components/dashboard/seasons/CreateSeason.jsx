import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import serialize from 'form-serialize'
import { createNewSeason } from '../../../actions/seasonActions'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru');

class CreateSeason extends React.Component {
	static propTypes = {
		createNewSeason: React.PropTypes.func.isRequired		
	}
	state = {
		startDate : moment(),
		endDate : moment()
	}
	onFormSubmit (event) {
		event.preventDefault();
		const formData = serialize(this.refs.seasonForm, { hash: true });
		const emptyFields = [];
		
		if (!formData.name) emptyFields.push('"Название сезона"');
		if (!formData.description) emptyFields.push('"Краткое описание"');
		if (!formData.date_start) emptyFields.push('"Начало сезона"');
		if (!formData.date_finish) emptyFields.push('"Окончание сезона"');

		if (emptyFields.length == 0) {
			this.props.createNewSeason(formData, {
				redirect: false, 
			    showPreloader: true,
			    additionHeader: {
			 	    "Authorization": `Bearer{${ this.props.token }}`
			    }
			});
		} else {
			alert(`Пол${ emptyFields.length == 1 ? 'е' : 'я' } ${ emptyFields.join(', ') } необходимо заполнить`);
		}

		return false;
	}
	handleChangeStart (date) {
		this.setState({
			startDate: date
		})
	}
	handleChangeEnd (date) {
		this.setState({
			endDate: date
		})
	}
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': создать новый сезон' }>
					<div className='row col-xs-12 col-md-8 col-lg-7 create-season-wrapper'>
						<form ref="seasonForm" action="" method="POST" onSubmit={ this.onFormSubmit.bind(this) }>
							<h4>Форма создания сезона</h4>
							<div className="form-group">
							    <label htmlFor="sezName">Название сезона</label>
							    <input name="name" type="text" className="form-control" id="sezName" placeholder="Тянись-2017" />
							</div>
							<div className="form-group">
								<label htmlFor="sezDesc">Краткое описание</label>
							    <textarea name="description" className="form-control" id="sezDesc" placeholder="Сезон будет проходить в Болгарии..."></textarea>
							</div>
							<div className="form-group">
							    <label className="season-date-label">Начало сезона</label>
							    <DatePicker
							    	name="date_start"
							    	className="form-control"
							    	id="sezDateStart"
									selected={ this.state.startDate }
									selectsStart  startDate={ this.state.startDate }
									endDate={ this.state.endDate }
									onChange={ this.handleChangeStart.bind(this) } 
									placeholderText="ДД.ММ.ГГГГ"
									  />
							</div>
							<div className="form-group">
								<label className="season-date-label">Окончание сезона</label>
								<DatePicker
									name="date_finish"
									className="form-control" 
									id="sezDateEnd"
									selected={ this.state.endDate }
									selectsEnd  startDate={this.state.startDate}
									endDate={ this.state.endDate }
									onChange={ this.handleChangeEnd.bind(this) }
									placeholderText="ДД.ММ.ГГГГ"
									 />
							</div>
							<div className="form-group">
								<button type="submit" className="btn btn-labeled btn-success">
						    		<span className="btn-label">
						    			<i className="fa fa-floppy-o" aria-hidden="true"></i>
						    		</span>
						    		Создать сезон
						    	</button>
							</div>		
						</form>
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
		createNewSeason : (payload, meta) => { dispatch(createNewSeason(payload, meta)) }	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSeason);
