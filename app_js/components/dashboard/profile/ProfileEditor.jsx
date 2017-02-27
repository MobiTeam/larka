import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { localUpdateProfileInfo, updateProfileInfo } from '../../../actions/userActions'
import serialize from 'form-serialize'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'moment/locale/ru'
moment.lang('ru');


class ProfileEditor extends React.Component {
	static propTypes = {
		localUpdateProfileInfo: React.PropTypes.func.isRequired,
		updateProfileInfo: React.PropTypes.func.isRequired
	}
	state = {
		btnDisabled : true
	}
	componentDidMount() {
		this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this))
  	}
	routerWillLeave() {
		if (!this.props.isPersist && this.props.token) {
			return window.confirm('Вы уверены что хотите перейти? Все изменения будут утеряны.');
		}
		return true;
	}
	onCheckboxChange (event) {
		this.setState({
			btnDisabled : !event.target.checked
		});
	}
	onFormSubmit (event) {
		event.preventDefault();
		const formData = serialize(this.refs.profileInfoForm, { hash: true });
		const emptyFields = [];
		
		if (!formData.name) emptyFields.push('"Имя"');
		if (!formData.family_name) emptyFields.push('"Фамилия"');
		if (emptyFields.length == 0) {
			if (this.props.token) {
				this.props.updateProfileInfo(formData, {
				  redirect: false, 
				  showPreloader: true,
				  additionHeader: {
				    "Authorization": `Bearer{${ this.props.token }}`
				  }
				});
			}  
		} else {
			alert(`Пол${ emptyFields.length == 1 ? 'е' : 'я' } ${ emptyFields.join(' и ') } необходимо заполнить`);
		}

		return false;
	}
	updateField (event) {
		this.props.localUpdateProfileInfo({
			[event.target.name] : event.target.value
		});
	}
	updateDate (date) {
		this.props.localUpdateProfileInfo({
			'born_date' : date.format('DD.MM.YYYY')
		});
	}
	extractDate (date) {
		if (!date) return []; 
		let dateChunks = date.split('.').reverse();
		// месяц отсчитывается с 0
		dateChunks[1]--;
		return dateChunks;
	}
	showPersistStatus () {
		return this.props.persistStatus ? 
					(<div className={ `alert alert-${ this.props.isPersist ? 'success' : 'danger' }`} >
						{ this.props.persistStatus }
					</div>) : null;
	}
	render () {
		const date = this.extractDate(this.props.profile.born_date);
		return (
				<DocumentTitle title={ SITE_NAME + ': редактирование профиля' }>
					<div className="profile-editor-wrapper row col-md-8">
						<h4>Форма редактирования профиля</h4>
						{ this.showPersistStatus() }
						<form ref="profileInfoForm" action="" method="POST" className="table-user-information-form" onSubmit={ this.onFormSubmit.bind(this) }>
						    <table className="table profile-editor-table table-hover table-striped">
						    	<tbody>
						            <tr>
						                <td>Имя</td>
						                <td>
						                    <input type="text" name="name" placeholder="Иван" onChange={ this.updateField.bind(this) } value={ this.props.profile.name || '' } className="form-control" />
						                </td>
						            </tr>
						            <tr>
						                <td>Фамилия</td>
						                <td>
						                    <input type="text" name="family_name" placeholder="Иванов" onChange={ this.updateField.bind(this) } value={ this.props.profile.family_name || '' }  className="form-control" />
						                </td>
						            </tr>
						             <tr>
						                <td>Дата рождения</td>
						                <td> 
						                	<DatePicker locale="ru" dateFormat="DD.MM.YYYY" name="born_date" selected={ moment(date) } onChange={ this.updateDate.bind(this) } className="form-control" disabledKeyboardNavigation/>
						                </td>
						            </tr>
						            <tr>
						                <td>Пол</td>
						                <td>
						                    <select name="sex" value={ this.props.profile.sex == null ? '-1' : this.props.profile.sex } onChange={ this.updateField.bind(this) } className="form-control">
						                        <option value="-1">Не заполнено</option>
						                        <option value="0">Женский</option>
						                        <option value="1">Мужской</option>
						                    </select>
						                </td>
						            </tr>
						            <tr>
						                <td>Телефон</td>
						                <td>
						                    <input type="text" name="phone" placeholder="8 900 500 70 77" onChange={ this.updateField.bind(this) } value={ this.props.profile.phone || '' } className="form-control" />                                        
						                </td>
						            </tr>
						        </tbody>
						    </table>
						    <div className="clearfix">
							    <span className="checkboxText">Даю согласие на обработку персональных данных (*)</span>
							    <input type="checkbox" defaultChecked={ false } onChange={ this.onCheckboxChange.bind(this) }/>
						    </div>
						    <div className="btn-group profile-send-btn">
						     	<button type="submit" className="btn btn-labeled btn-success save-user-profile" disabled={ this.state.btnDisabled }>
						    		<span className="btn-label">
						    			<i className="fa fa-floppy-o" aria-hidden="true"></i>
						    		</span>
						    		Сохранить изменения
						    	</button>
					    	</div>
						</form>
						<div className="alert alert-warning personal-info-warn">
							(*) При заполнении информации профиля Вы даете согласие на обработку, хранение и публичное использование персональных данных.
						</div>
					</div>				
				</DocumentTitle>
		)		
	}
}

const mapStateToProps = (state) => {
	return {
		isPersist : state.user.isPersist,
		persistStatus : state.user.persistStatus,
		token : state.user.token
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		localUpdateProfileInfo : (payload) => dispatch(localUpdateProfileInfo(payload)),
		updateProfileInfo : (payload, meta) => dispatch(updateProfileInfo(payload, meta))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);

















