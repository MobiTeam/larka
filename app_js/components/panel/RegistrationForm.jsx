import React from 'react';
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'

class RegistrationForm extends React.Component {
	state = {
		showHelper : false
	}
	onFormSubmit (event) {
		event.preventDefault();
	}
	showHelperText (showHelper) {
		return this.state.showHelper ? (<div className="alert alert-info registration-info">
					На данный адрес будет отправлено письмо с дальнейшими инструкциями
				</div>) : null;
	}
	onInputFocus (event) {
		if (this.state.showHelper) return;
		this.setState({
			showHelper : true
		})
	}
	render () {
		return (
				<DocumentTitle title='Ugra-Fit: регистрация'>
					<div className="login-form-wrapper">
						<div className="login-form-box light-shadow">
							<h5 className="register-text">Для регистрации в системе введите свой адрес электронной почты</h5>
							<form method="POST" className="register-form" onSubmit={this.onFormSubmit.bind(this)}>
								<div className="input-group">
								  <input type="text" className="form-control" name="email" placeholder="email" onFocus={this.onInputFocus.bind(this)} />
								  <div className="input-group-btn">
								    <input type="submit" className="btn btn-success" value="Зарегистрироваться" />
								  </div>
								</div>
				            	<Link to='/login' className="clearfix">      
								    <span className="pull-left">
								    	<i className="fa fa-arrow-left icon-margin" aria-hidden="true"></i>
								    	Вернуться назад
								    </span>	
							    </Link>    
								{ this.showHelperText(this.state.showHelper) }
							</form>
						</div>
					</div>		
				</DocumentTitle>
				
				)		
	}
}

export default RegistrationForm;

