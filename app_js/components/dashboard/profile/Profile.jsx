import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'

class Profile extends React.Component {
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': профиль пользователя' }>
	                    <div className="row profile-wrapper">
							<div className="profile-box">
		                        <div className="col-xs-12 col-sm-3 user-photo-box">
		                            <img alt="Ваша фотография" title="Ваша фотография" src="/img/user-logo-256_2.png" className="img-circle img-responsive profile-img" />
		                        </div>
		                    	<div className="col-xs-12 col-sm-9">
		                        	<h2>Петроченко Владислав
			                        	<Link to="/dashboard/profile/edit">
			                        		<button className="btn btn-primary profile-edit-btn">	
			                        			<i className="fa fa-pencil" aria-hidden="true"></i>
			                        			<span className="profile-edit-btn-text">Редактировать</span>
								    		</button>	
								    	</Link>
							    	</h2>
								</div>
								<div className="col-xs-12 col-sm-9 col-lg-9">
		                        	<table className="table table-user-info">
		                            	<tbody>
			                                <tr>
			                                    <td>Логин:</td>
			                                    <td>user</td>
			                                </tr>
			                                <tr>
			                                    <td>ФИО:</td>
			                                    <td>Иванов Иван Иванович</td>
			                                </tr>
			                                <tr>
			                                    <td>Пол</td>
			                                    <td>Мужской</td>
			                                </tr>
			                                <tr>
			                                    <td>Телефон:</td>
			                                    <td>+7 999 777 123 34</td>
			                                </tr>
			                                <tr>
			                                    <td>Электронная почта:</td>
			                                    <td>user@mail.ru</td>
			                                </tr>
		                                </tbody>
		                            </table>	                            
	                        	</div>
		                    </div>
	                    </div>
				</DocumentTitle>
		)		
	}
}

export default Profile;

