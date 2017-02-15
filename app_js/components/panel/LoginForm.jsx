import React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logIn, logInError } from '../../actions/userActions'
import { SITE_NAME } from '../../constants/conf'
 
class LoginForm extends React.Component {
	static propTypes = {
		logIn: React.PropTypes.func.isRequired,
		logInError: React.PropTypes.func.isRequired,
		authMsg: React.PropTypes.string.isRequired
	}
	onLoginFormSubmit (e) {
		e.preventDefault();
		const email = this.refs.loginInput.value;
		const password = this.refs.passInput.value;
		
		if (email == "" || password == "") {
			this.props.logInError({
				status: 422 
			});
		} else {
			this.props.logIn({
				email,
				password
			}, {
				redirect: this.redirectTo.bind(this, '/dashboard'),
				showPreloader: true
			});	
		}
		return false;	
	}
	redirectTo (link) {
      	const { router } = this.props;
      	router.push(link);
    }
    showHelperText (authMsg) {
    	return authMsg ? (<div className="login-helper alert alert-danger">
					{ authMsg }
				</div>) : null;
    }
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': авторизация' }>
					<div className="login-form-wrapper">
						<div className="login-form-box light-shadow">
							<h4>Для входа в систему необходимо ввести логин и пароль</h4>
							<form method="POST" className="login-form" onSubmit={this.onLoginFormSubmit.bind(this)}>
								<div className="form-group">
									<input type="text" ref="loginInput" className="form-control" name="login" placeholder="Логин" />
								</div>
								<div className="form-group">
									<input type="password" ref="passInput" className="form-control" name="password" placeholder="Пароль" />
								</div>
								<button type="submit" className="btn btn-labeled btn-primary login-btn">
				            		<span className="btn-label">
				            			<i className="fa fa-sign-in" aria-hidden="true"></i>
				            		</span>
				            		Вход
				            	</button>
				            	<Link to='/registration'>      
								    <button type="button" className="btn btn-labeled btn-success register-btn">
							    		<span className="btn-label">
							    			<i className="fa fa-user-plus" aria-hidden="true"></i>
							    		</span>
							    		Регистрация
							    	</button>
						    	</Link>    
								{ this.showHelperText(this.props.authMsg) }
							</form>							
						</div>
					</div>		
				</DocumentTitle>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		authMsg : state.user.authMsg
	}
}

function mapDispatchToProps (dispatch) {
	return {
		logIn: (payload, meta) => dispatch(logIn(payload, meta)),
		logInError: (payload) => dispatch(logInError(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

