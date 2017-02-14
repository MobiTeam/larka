import React from 'react';
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import { SITE_NAME } from '../../constants/conf'
import { register, openHelper, registerError, registerReset } from '../../actions/registerActions'
import { connect } from 'react-redux'


class RegistrationForm extends React.Component {
	static propTypes = {
		openHelper: React.PropTypes.func.isRequired,
		register: React.PropTypes.func.isRequired,
		registerError: React.PropTypes.func.isRequired,
		registerReset: React.PropTypes.func.isRequired,
		showHelper: React.PropTypes.bool.isRequired,
		errorFlag: React.PropTypes.bool.isRequired,
		success: React.PropTypes.bool.isRequired,
		errorMsg: React.PropTypes.string.isRequired
	}
	onFormSubmit (event) {
		event.preventDefault();
	}
	showHelperText (showHelper) {
		if (!this.props.showHelper) return null;
		return this.props.errorFlag ? (
				<div className="alert alert-danger registration-info">
					{ this.props.errorMsg }
				</div>
			) : this.props.success ? (
				<div className="alert alert-success registration-info">
					Спасибо за регистрацию! Письмо с дальнейшими инструкциями отправлено на почту.
				</div>
			) : (
				<div className="alert alert-info registration-info">
					На данный адрес будет отправлено письмо с дальнейшими инструкциями
				</div>
			);		
	}
	onInputFocus (event) {
		this.props.registerReset();
		if (!this.props.errorFlag && !this.props.success && this.props.showHelper) return;
		this.props.openHelper();		
	}
	emailIsValid (email) {
		return /.+@.+\..+/.test(email);
	}
	onRegisterBtnClick (event) {
		const email = this.refs.emailInput.value;
		const emailIsValid = this.emailIsValid(email);
		
		if (emailIsValid) {
			this.props.register({
				email
			}); 
		} else {
			this.props.registerError(422);
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
								  <input type="text" ref="emailInput" className="form-control" name="email" placeholder="email" onChange={ this.onInputFocus.bind(this) } onFocus={ this.onInputFocus.bind(this) } />
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
		errorFlag  : state.registration.errorFlag,
		errorMsg  : state.registration.errorMsg,
		success  : state.registration.success
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register : (payload) => {
			return dispatch(register(payload));
		},
		openHelper: (payload) => {
			return dispatch(openHelper(payload));
		},
		registerError: (payload) => {
			return dispatch(registerError(payload));
		},
		registerReset: (payload) => {
			return dispatch(registerReset(payload));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

