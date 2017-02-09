import React from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logIn } from '../../actions/userActions'
 
class LoginForm extends React.Component {
	state = {
		authStatus : null
	}
	onLoginFormSubmit (e) {
		e.preventDefault();
		const login = this.refs.loginInput.value;
		const pass = this.refs.passInput.value;
		
		console.log({
			login,
			pass
		});
		this.props.logIn({
			'role' : login
		});
		this.redirectTo('/dashboard');
	}
	redirectTo (link) {
      	const { router } = this.props;
      	router.push(link);
    }
    showHelperText (authStatus) {
    	return authStatus ? (<div className="login-helper alert alert-danger">
					Пользователя с данным логином не существует.
				</div>) : null;
    }
	render () {
		return (
				<DocumentTitle title='Ugra-Fit: авторизация'>
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
								{ this.showHelperText(this.state.authStatus) }
							</form>
						</div>
					</div>		
				</DocumentTitle>
			)
	}
}

function mapDispatchToProps (dispatch) {
	return {
		logIn: (payload) => {
			dispatch(logIn(payload));
		}
	}
}

export default connect(null, mapDispatchToProps)(LoginForm);

