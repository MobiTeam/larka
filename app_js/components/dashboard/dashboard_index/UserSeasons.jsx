import React from 'react';
import { fetchUserGroups } from '../../../actions/userActions.js';
import { connect } from 'react-redux';

class UserSeasons extends React.Component {

	componentWillMount() {		
		this.props.fetchUserGroups(null, {
			redirect: false, 
            showPreloader: true,
            additionHeader: {
              "Authorization": `Bearer{${ this.props.token }}`
            }
		});		
	}

	userGroupTemplate(group) {
		return (<tr>
					<td>{ group.name }</td>
					<td>{ group.leftPayd == 0 ? "Оплачена" : `Необходимо заплатить ${ group.leftPayd } RUB`}</td>
					<td>
						{ group.leftPayd != 0 ? 
							<button className="btn btn-labeled btn-success" onClick={ () => {} }>
								<span className="btn-label">
									<i className="fa fa-credit-card" aria-hidden="true"></i>
								</span>
								Выкупить
							</button> : null }	
					</td>
				</tr>);
	}

	printUsersGroups() {
		return (<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>Название</th>
							<th>Сатус</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{ this.props.groups.map(group => this.userGroupTemplate.bind(this)(group)) }
					</tbody>
				</table>);
	}

	render () {
		return (<div>
					<h3>Группы</h3>
					{ !this.props.groups || this.props.groups.length == 0 ? 
							<div className="alert alert-danger">Опа! Вы еще не записались ни в одну из групп. Можете выбрать себе подходящую в разделе "Активные сезоны"</div>
							 : this.printUsersGroups() }
				</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		token   : state.user.token,
		groups  : state.user.groups
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserGroups : (payload, meta) => dispatch(fetchUserGroups(payload, meta))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSeasons);