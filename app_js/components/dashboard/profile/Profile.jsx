import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchProfileInfo } from '../../../actions/userActions'

class Profile extends React.Component {
	static propTypes = {
		profile : React.PropTypes.object.isRequired,
		fetchProfileInfo : React.PropTypes.func.isRequired
	}
	componentDidUpdate() {
		if (!this.props.profile.id && this.props.token) this.props.fetchProfileInfo(null, {
	        redirect: false, 
	        showPreloader: true,
	        additionHeader: {
	          "Authorization": `Bearer{${ this.props.token }}`
	        }
      });
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
		                        	<h2>{ this.props.profile.family_name } { this.props.profile.name }
			                        	<Link to="/dashboard/profile/edit">
			                        		<button className="btn btn-primary profile-edit-btn">	
			                        			<i className="fa fa-pencil" aria-hidden="true"></i>
			                        			<span className="profile-edit-btn-text">Редактировать</span>
								    		</button>	
								    	</Link>
							    	</h2>
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
			                                    	{ this.props.profile.sex || "(Не заполнено)" }
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

const mapStateToProps = (state) => {
	return {
		token : state.user.token,
		profile : state.user.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfileInfo : (payload, meta) => { dispatch(fetchProfileInfo(payload, meta)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

