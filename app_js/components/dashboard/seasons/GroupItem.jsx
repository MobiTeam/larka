import React from 'react';
import { Link } from 'react-router'

class GroupItem extends React.Component {
	render () {
		return (
			<tr>
				<td>{ this.props.name }</td>
				<td>{ this.props.season_name }</td>
				<td>{ this.props.description }</td>
				<td>{ this.props.capacity }</td>
				<td>{ this.props.count_training }</td>
				<td>{ this.props.price }</td>				
				<td>{ this.props.booking_price }</td>				
				<td>
					<Link to={ "/dashboard/seasons/groups/edit/" + this.props.id } className="groups-item-edit-link">
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</Link>
				</td>
				<td>
					<span onClick={ () => { this.props.onDelBtnClick(this.props.id) } } className="groups-item-delete-link">
						<i className="fa fa-trash" aria-hidden="true"></i>
					</span>
				</td>
			</tr>
		)		
	}
}

export default GroupItem;

