import React from 'react'
import { Link } from 'react-router'

const ButtonBlock = () => {
	
	// <Link to="/registration">
	// 	<button type="button" className="btn btn-labeled btn-success register-btn">
 //    		<span className="btn-label">
 //    			<i className="fa fa-user-plus" aria-hidden="true"></i>
 //    		</span>
 //    		Зарегистрироваться
 //    	</button>
	// </Link>

	return (
			<div className="buttonBlock">
				<Link to="/dashboard">
					<button type="button" className="btn btn-labeled btn-primary login-btn">
	            		<span className="btn-label">
	            			<i className="fa fa-sign-in" aria-hidden="true"></i>
	            		</span>
	            		Перейти в личный кабинет
	            	</button>
            	</Link>
			</div>
		)
}

export default ButtonBlock;