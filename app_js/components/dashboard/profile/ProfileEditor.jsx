import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { localUpdateProfileInfo } from '../../../actions/userActions'
import serialize from 'form-serialize'
import { connect } from 'react-redux'
import DatePicker from "react-datepicker";
import moment from 'moment';

class ProfileEditor extends React.Component {
	state = {
		btnDisabled : true
	}
	onCheckboxChange (event) {
		this.setState({
			btnDisabled : !event.target.checked
		});
	}
	onFormSubmit (event) {
		event.preventDefault();
		console.log(serialize(this.refs.profileInfoForm, { hash: true }))
		return false;
	}
	updateField (fieldName, event) {
		this.props.localUpdateProfileInfo({
			[event.target.name] : event.target.value
		});
		console.log(fieldName, event.target.name, event.target.value);
	}
	checkFieldLength () {

	}
	extractDate (date) {
		if (!date) return []; 
		let dateChunks = date.split('.').reverse();
		// месяц отсчитывается с 0
		dateChunks[1]--;
		return dateChunks;
	}
	render () {
		const date = this.extractDate(this.props.profile.born_date);

		return (
				<DocumentTitle title={ SITE_NAME + ': редактирование профиля' }>
					<div className="profile-editor-wrapper row col-md-8">
						<h4>Форма редактирования профиля</h4>
						<form ref="profileInfoForm" action="" method="POST" className="table-user-information-form" onSubmit={ this.onFormSubmit.bind(this) }>
						    <table className="table profile-editor-table table-hover table-striped">
						    	<tbody>
						            <tr>
						                <td>Имя</td>
						                <td>
						                    <input type="text" name="name" placeholder="Иван" onChange={ this.updateField.bind(this, 'Имя') } value={ this.props.profile.name || '' } className="form-control" />
						                </td>
						            </tr>
						            <tr>
						                <td>Фамилия</td>
						                <td>
						                    <input type="text" name="family_name" placeholder="Иванов" value={ this.props.profile.family_name || '' }  className="form-control" />
						                </td>
						            </tr>
						             <tr>
						                <td>Дата рождения</td>
						                <td> 
						                	<DatePicker dateFormat="DD.MM.YYYY" name="born_date" placeholder="День рождения" selected={ new moment(date) } className="form-control" />
						                </td>
						            </tr>
						            <tr>
						                <td>Пол</td>
						                <td>
						                    <select name="sex" defaultValue={ this.props.profile.sex || 1 } className="form-control">
						                        <option value="0">Женский</option>
						                        <option value="1">Мужской</option>
						                    </select>
						                </td>
						            </tr>
						            <tr>
						                <td>Телефон</td>
						                <td>
						                    <input type="text" name="phone" placeholder="8 900 500 70 77" value={ this.props.profile.phone || '' } className="form-control" />                                        
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

const mapDispatchToProps = (dispatch) => {
	return {
		localUpdateProfileInfo : (payload) => dispatch(localUpdateProfileInfo(payload))
	}
}

export default connect(null, mapDispatchToProps)(ProfileEditor);

















