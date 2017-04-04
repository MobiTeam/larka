import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import GroupItem from './GroupItem'

class GroupList extends React.Component {
	
	issetGroups () {
		return this.props.data && this.props.data.length > 0;
	}

	createGroupList (data) {
		return data.map((el) => <GroupItem onDelBtnClick={ this.props.deleteGroupBtnClick } { ...el } key={ el.id } />);
	}

	printCreateBtn () {
		return (<div className="form-group">
					<Link to="/dashboard/seasons/groups/new">
						<button type="button" className="btn btn-labeled btn-success">
				    		<span className="btn-label">
				    			<i className="fa fa-floppy-o" aria-hidden="true"></i>
				    		</span>
				    		Создать группу
				    	</button>
			    	</Link>
				</div>)
	}

	render () {		
		return (
			<div className="season-list-wrapper">
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>Название</th>
							<th>Сезон</th>
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
						{ 
							this.issetGroups() ? this.createGroupList(this.props.data) : <tr><td colSpan="8">Нет ни одной активной группы. <Link to="/dashboard/seasons/groups/new">Нажмите, чтобы создать.</Link></td></tr>
						}
					</tbody>
				</table>	
				{ this.issetGroups() ? this.printCreateBtn() : null }
			</div>
		)		
	}
}

export default GroupList;

