import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import GroupItem from './GroupItem'
// import { fetchAllSeasons, seasonDelete } from '../../../actions/seasonListActions'

class GroupList extends React.Component {
	// static propTypes = {
	// 	fetchAllSeasons : React.PropTypes.func.isRequired,
	// 	seasonDelete : React.PropTypes.func.isRequired
	// }
	// componentWillMount () {
	// 	this.props.fetchAllSeasons(this.props.token, {
	// 		redirect: false, 
 //            showPreloader: true,
 //            additionHeader: {
 //              "Authorization": `Bearer{${ this.props.token }}`
 //            }
	// 	})
	// }
	// printFetchStatus () {
	// 	return this.props.seasonList == null ? (
	// 			<div className="alert alert-danger">
	// 				При загрузке списка сезонов произошла ошибка, повторите попытку позже.
	// 			</div>
	// 		) : null;
	// }
	// onDelBtnClick (idSeason) {		
	// 	this.props.seasonDelete({ id : idSeason }, {
	// 			redirect: false, 
	// 		    showPreloader: true,
	//             additionHeader: {
	//               "Authorization": `Bearer{${ this.props.token }}`
	//             }
	// 		});		
	// }
	createGroupList (data) {
		if (data == null) return null;
		if (data.length == 0) return (<tr><td colSpan="8">Нет ни одной активной группы. <Link to="/dashboard/seasons/groups/new">Нажмите, чтобы создать.</Link></td></tr>);
		return data.map((el) => {
			return <SeasonItem { ...el } key={ el.id } onDelBtnClick={ this.onDelBtnClick.bind(this, el.id) } />
		}) 
	}
	render () {
		return (
			<div className="season-list-wrapper">
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>Название</th>
							<th>Краткое описание</th>
							<th>Количество человек</th>
							<th>Количество тренировок</th>
							<th>Стоимость за сезон</th>
							<th>Стоимость за занятие</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{ this.createGroupList(this.props.groups) }
					</tbody>
				</table>	
			</div>
		)		
	}
}

const mapStateToProps = (state) => {
	return {
		// token : state.user.token,
		groups : state.seasonList.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// fetchAllSeasons : (payload, meta) => { dispatch(fetchAllSeasons(payload, meta)) },
		// seasonDelete    : (payload, meta) => { dispatch(seasonDelete(payload, meta)) }
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(GroupList);

