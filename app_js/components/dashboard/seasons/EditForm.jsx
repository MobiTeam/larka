import React from 'react';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import serialize from 'form-serialize'
import { createNewSeason, localUpdateSeason } from '../../../actions/seasonActions'
import Dropzone from 'react-dropzone'
import uniqid from 'uniqid'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru');

class EditForm extends React.Component {
	static propTypes = {
		createNewSeason: React.PropTypes.func.isRequired,		
		localUpdateSeason: React.PropTypes.func.isRequired		
	}
	static defaultProps = { 
		date_start : moment(),
		date_finish : moment(),
		name : '',
		description : '',
		formTitle : 'Форма создания сезона',
		submitBtnTitle : 'Создать сезон'
	}
	onFormSubmit (event) {
		event.preventDefault();

		// проверка на возможность работы с FormData
		if (!FormData || !(new FormData().getAll)) {
			alert('Версия вашего браузера устарела, пожалуйста обновитесь до более новой.');
			return false;
		}

		const formData = new FormData(this.refs.seasonForm); 

		for (var obj of this.props.acceptedFiles) {
			formData.append('file[]', obj.file);
		}

		const emptyFields = [];
		
		if (!formData.get('name')) emptyFields.push('"Название сезона"');
		if (!formData.get('description')) emptyFields.push('"Краткое описание"');
		if (!formData.get('date_start')) emptyFields.push('"Начало сезона"');
		if (!formData.get('date_finish')) emptyFields.push('"Окончание сезона"');

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
	handleFieldChange (event) {
		this.props.localUpdateSeason({
			[event.target.name]: event.target.value
		})
	}
	handleDateChange (key, date) {
		this.props.localUpdateSeason({
			[key]: date
		})
	}
	createMomentDate (date) {
		let dateChunks;
		if (!date) {
			dateChunks = [];
		} else if (typeof(date) == "string"){
			dateChunks = date.split('.').reverse();
			dateChunks[1]--;
		} else {
			return date;
		}
		return moment(dateChunks);
	}
	onDrop (acceptedFiles, rejectedFiles) {
		this.props.localUpdateSeason({
			'acceptedFiles' : [...this.props.acceptedFiles, ...acceptedFiles.map(file => { return { file, id: uniqid() } })]
		})
    }
    deleteAcceptedImage (imageId, event) {
    	this.props.localUpdateSeason({
			'acceptedFiles' : this.props.acceptedFiles.filter(file => file.id != imageId)
		})
    }
    printThumbImage (obj) {
    	return (<div className="image-thumb-wrapper" key={ obj.id }>
	    			<span className="image-thumb-delete-span" onClick={ this.deleteAcceptedImage.bind(this, obj.id) }>
	    				<i className="fa fa-trash" aria-hidden="true"></i> Удалить
	    			</span>
	    			<img className="img-thumbnail img-responsive" alt="Превью-изображение" src={ obj.file.preview } />
    			</div>);
    }
    printAcceptedFiles () {
    	if (this.props.acceptedFiles.length == 0) return null;
    	return (
			<div className="form-group">
				<span className="selected-image-span">Выбранные фотографии</span>
				{ this.props.acceptedFiles.map(this.printThumbImage.bind(this)) }
			</div>
		)
    }
    printLoadedImages () {
    	if (this.props.images.length == 0) return null;
    	return (
    			<div className="form-group">
					<label className="gallery-label">Загруженные фотографии</label>	
					{ 
						this.props.images.map((el) => {
							return (<div key={ el.id } >
								<a href={'/' + el.source } target="blank">{ el.name }</a>
							</div>)
						}) 
					}
				</div>
    		)
    }
	render () {
		const sDate = this.createMomentDate(this.props.date_start);
		const fDate = this.createMomentDate(this.props.date_finish);
		return (				
			<form ref="seasonForm" encType="multipart/form-data" action="" method="POST" onSubmit={ this.onFormSubmit.bind(this) }>
				<h4>{ this.props.formTitle }</h4>
				<div className="form-group">
				    <label htmlFor="sezName">Название сезона</label>
				    <input name="name" type="text" className="form-control" id="sezName" onChange={ this.handleFieldChange.bind(this) } value={ this.props.name } placeholder="Тянись-2017" />
				</div>
				<div className="form-group">
					<label htmlFor="sezDesc">Краткое описание</label>
				    <textarea name="description" className="form-control" id="sezDesc" onChange={ this.handleFieldChange.bind(this) } value={ this.props.description } placeholder="Сезон будет проходить в Болгарии..."></textarea>
				</div>
				<div className="form-group">
				    <label className="season-date-label">Начало сезона</label>
				    <DatePicker
				    	name="date_start"
				    	className="form-control"
				    	id="sezDateStart"
						selected={ sDate }
						selectsStart  startDate={ sDate }
						endDate={ fDate }
						onChange={ this.handleDateChange.bind(this, 'date_start') } 
						placeholderText="ДД.ММ.ГГГГ"
						  />
				</div>
				<div className="form-group">
					<label className="season-date-label">Окончание сезона</label>
					<DatePicker
						name="date_finish"
						className="form-control" 
						id="sezDateEnd"
						selected={ fDate }
						selectsEnd  startDate={ sDate }
						endDate={ fDate }
						onChange={ this.handleDateChange.bind(this, 'date_finish') }
						placeholderText="ДД.ММ.ГГГГ"
						 />
				</div>
				{ this.printLoadedImages() }
				<div className="form-group">
					<label className="gallery-label">Добавить фотографии</label>
					<Dropzone onDrop={ this.onDrop.bind(this) } className="photo-drop-zone" accept="image/*">
              			<div>Для загрузки фотографий переместите их сюда либо кликните внутри пунктирной области</div>
            		</Dropzone>	
				</div>
				{ this.printAcceptedFiles() }
				<div className="form-group">
					<button type="submit" className="btn btn-labeled btn-success">
			    		<span className="btn-label">
			    			<i className="fa fa-floppy-o" aria-hidden="true"></i>
			    		</span>
			    		{ this.props.submitBtnTitle } 
			    	</button>
				</div>		
			</form>						
		)		
	}
}

const mapStateToProps = (state) => {
	return {
		token : state.user.token,
		statusText : state.season.statusText,
		isPersist : state.season.isPersist,
		date_start : state.season.date_start,
		date_finish : state.season.date_finish,
		name : state.season.name,
		description : state.season.description,
		acceptedFiles : state.season.acceptedFiles,
		loadedFiles : state.season.loadedFiles,
		images : state.season.images
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createNewSeason   : (payload, meta) => { dispatch(createNewSeason(payload, meta)) },	
		localUpdateSeason : (payload) => { dispatch(localUpdateSeason(payload)) }	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);

