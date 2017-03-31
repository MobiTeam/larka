import React from 'react';
import { connect } from 'react-redux'
import SelectEl from '../../common/Select'
import { localUpdateGroup, fetchSesonsBrief } from '../../../actions/groupActions'
import serialize from 'form-serialize'

class GroupEditForm extends React.Component {

	static defaultProps = {
		dispatchAction : () => {},
		formTitle : 'Форма',
		submitBtnTitle : 'Отправить'
	}
	
	static propTypes = {
		localUpdateGroup : React.PropTypes.func.isRequired,
		fetchSesonsBrief : React.PropTypes.func.isRequired,
		briefs 			 : React.PropTypes.array
	}

	componentWillMount() {
		this.props.fetchSesonsBrief(this.props.token, {
			redirect: false, 
            showPreloader: true,
            additionHeader: {
              "Authorization": `Bearer{${ this.props.token }}`
            }
		})
	}

	handleFieldChange (event) {
		this.props.localUpdateGroup({
			[event.target.name]: event.target.value
		})
	}

	onSubmit (event) {
		event.preventDefault();
		const data = serialize(this.refs.groupForm, { hash: true });
		this.props.dispatchAction(data);
		return false;
	}

	render () {	
		return (		
			<div>		
				<form ref="groupForm" action="" method="POST" onSubmit={ this.onSubmit.bind(this) }>
					<h4>{ this.props.formTitle }</h4>
					<div className="form-group">
					    <label htmlFor="groupSeason">Сезон</label>
					    <SelectEl name="season_id" className="form-control" id="groupSeason" onChange={ this.handleFieldChange.bind(this) } selValue={ this.props.data.season_id } data={ this.props.briefs } />
					</div>
					<div className="form-group">
					    <label htmlFor="groupName">Название группы</label>
					    <input name="name" type="text" className="form-control" id="groupName" onChange={ this.handleFieldChange.bind(this) } value={ this.props.data.name } placeholder="Группа 1" required/>
					</div>
					<div className="form-group">
					    <label htmlFor="groupDescription">Описание группы</label>
					    <textarea name="description" className="form-control" id="groupDescription" onChange={ this.handleFieldChange.bind(this) } value={ this.props.data.description } placeholder="Группа для вечерних тренировок">
					    </textarea>
					</div>
					<div className="form-group">
					    <label htmlFor="groupCapacity">Количество человек</label>
					    <input name="capacity" type="number" className="form-control" id="groupCapacity" onChange={ this.handleFieldChange.bind(this) } value={ this.props.data.capacity } placeholder="30" required/>
					</div>
					<div className="form-group">
					    <label htmlFor="groupCount">Количество занятий</label>
					    <input name="count_training" type="number" className="form-control" id="groupCount" onChange={ this.handleFieldChange.bind(this) } value={ this.props.data.count_training } placeholder="30" required/>
					</div>
					<div className="form-group">
					    <label htmlFor="groupPrice">Стоимость записи на весь сезон</label>
					    <input name="price" type="number" className="form-control" id="groupPrice" onChange={ this.handleFieldChange.bind(this) } value={ this.props.data.price } placeholder="10000" required/>
					</div>
					<div className="form-group">
					    <label htmlFor="groupDayPrice">Стоимость разового занятия</label>
					    <input name="day_price" type="number" className="form-control" id="groupDayPrice" onChange={ this.handleFieldChange.bind(this) } value={ this.props.data.day_price } placeholder="500" required/>
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
		localUpdateGroup : (payload) => dispatch(localUpdateGroup(payload)),	
		fetchSesonsBrief : (payload, params) => dispatch(fetchSesonsBrief(payload, params))	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupEditForm);

