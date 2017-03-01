import React from 'react';
import { Link } from 'react-router'

class SeasonItem extends React.Component {
	render () {
		return (
			<tr>
				<td>{ this.props.name }</td>
				<td>{ this.props.description }</td>
				<td>{ this.props.date_start }</td>
				<td>{ this.props.date_finish }</td>
				<td>{ this.props.created_at }</td>
				<td>
					<Link to={ "/dashboard/seasons/edit/" + this.props.id } className="season-item-edit-link">
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</Link>
				</td>
				<td>
					<span onClick={ this.props.onDelBtnClick } className="season-item-delete-link">
						<i className="fa fa-trash" aria-hidden="true"></i>
					</span>
				</td>
			</tr>
		)		
	}
}

export default SeasonItem;

