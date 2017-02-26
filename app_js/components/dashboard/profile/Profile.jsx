import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'

class Profile extends React.Component {
	static propTypes = {
		profile : React.PropTypes.object.isRequired,
		fetchProfileInfo : React.PropTypes.func.isRequired
	}
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': профиль пользователя' }>
	                    <div className="row profile-wrapper">
							<div className="profile-box">
		                        <div className="col-xs-12 col-sm-3 user-photo-box">
		                            <img alt="Ваша фотография" title="Ваша фотография" src="/img/user-logo-256_2.png" className="img-circle img-responsive profile-img" />
		                        </div>
		                    	<div className="col-xs-12 col-sm-9">
		                        	<div className="clearfix">
			                        	<h2 className="profile-name">{ this.props.profile.family_name || "Пользователь" } { this.props.profile.name } </h2>
			                        	<Link to="/dashboard/profile/edit" className="profile-edit-btn">
			                        		<button className="btn btn-primary">	
			                        			<i className="fa fa-pencil" aria-hidden="true"></i>
			                        			<span className="profile-edit-btn-text">Редактировать</span>
								    		</button>	
								    	</Link>
							    	</div>
								</div>
								<div className="col-xs-12 col-sm-9 col-lg-9">
		                        	<table className="table table-striped table-hover table-user-info">
		                            	<tbody>
			                                <tr>
			                                    <td>
			                                    	<i className="fa fa-envelope" aria-hidden="true"></i>
			                                    	<span className="hidden-xs">
			                                    		Электронная почта
			                                    	</span>
			                                    </td>
			                                    <td>
			                                    	{ this.props.profile.email } 
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <td>
			                                    	<i className="fa fa-phone-square" aria-hidden="true"></i>
			                                    	<span className="hidden-xs">
			                                    		Телефон
			                                    	</span>
			                                    </td>
			                                    <td>
			                                    	{ this.props.profile.phone || "(Не заполнено)" } 
			                                    </td>
			                                </tr>
			                                <tr>
			                                	<td>
			                                		<i className="fa fa-birthday-cake" aria-hidden="true"></i>
			                                		<span className="hidden-xs">
			                                			Дата рождения
			                                		</span>
			                                	</td>
			                                    <td>
			                                    	{ this.props.profile.born_date || "(Не заполнено)" } 
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <td>
			                                    	<i className="fa fa-male" aria-hidden="true"></i>
			                                    	<span className="hidden-xs">
			                                    		Пол
			                                    	</span>
			                                    </td>
			                                    <td>
			                                    	{ this.props.profile.sex == undefined ? "(Не заполнено)" : this.props.profile.sex == 0 ? 'Женский' : 'Мужской' }
			                                    </td>
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

