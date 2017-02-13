import React from 'react';
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import { SITE_NAME } from '../../constants/conf'
import { register } from '../../actions/registerActions'
import { connect } from 'react-redux'


class RegistrationForm extends React.Component {
	onFormSubmit (event) {
		event.preventDefault();
	}
	showHelperText (showHelper) {
		if (!this.props.showHelper) return null;
		return this.props.errorFlag ? (
				<div className="alert alert-danger registration-info">
					Указан некорректный email-адрес. 
				</div>
			) : (
				<div className="alert alert-info registration-info">
					На данный адрес будет отправлено письмо с дальнейшими инструкциями
				</div>
			);		
	}
	onInputFocus (event) {
		if (this.props.showHelper) return;
		// this.setState({
		// 	showHelper : true
		// })
	}
	emailIsValid (email) {
		return /.+@.+\..+/.test(email);
	}
	onRegisterBtnClick (event) {
		const email = this.refs.emailInput.value;
		const emailIsValid = this.emailIsValid(email);
		
		// this.setState({
		// 		errorFlag: !emailIsValid
		// 	}) 

		if (emailIsValid) {
			this.props.register({
				email
			}); 
		}
	}
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': регистрация' }>
					<div className="login-form-wrapper">
						<div className="login-form-box light-shadow">
							<h5 className="register-text">Для регистрации в системе введите свой адрес электронной почты</h5>
							<form method="POST" className="register-form" onSubmit={this.onFormSubmit.bind(this)}>
								<div className="input-group">
								  <input type="text" ref="emailInput" className="form-control" name="email" placeholder="email" onFocus={ this.onInputFocus.bind(this) } />
								  <div className="input-group-btn">
								    <input type="submit" className="btn btn-success" onClick={ this.onRegisterBtnClick.bind(this) } value="Зарегистрироваться" />
								  </div>
								</div>
				            	<Link to='/login' className="clearfix">      
								    <span className="pull-left">
								    	<i className="fa fa-arrow-left icon-margin" aria-hidden="true"></i>
								    	Вернуться назад
								    </span>	
							    </Link>    
								{ this.showHelperText(this.props.showHelper) }
							</form>
						</div>
					</div>		
				</DocumentTitle>
				
				)		
	}
}

const mapStateToProps = (state) => {
	return {
		showHelper : state.registration.showHelper,
		errorFlag  : state.registration.errorFlag
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register : (payload) => {
			return dispatch(register(payload));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

