import React from 'react';
import { connect } from 'react-redux'
import { fetchOperationList } from '../../../actions/operationListActions.js'

class BalanceOperationList extends React.Component {

	componentWillMount() {
		this.props.fetchOperationList(null, {
			redirect: false, 
            showPreloader: true,
            additionHeader: {
              "Authorization": `Bearer{${ this.props.token }}`
            }
		});
	}

	printOperationsList () {
		if (this.props.operationList.data.length == 0) return 'Вы не производили ни одной операции.'
		const statuses = ['Отклонена', 'Утверждена'];
		console.log(this.props);
		return (<table className="table table-hover">
					<thead>
						<tr>
							<th>Номер</th>
							<th>Сумма</th>
							<th>Статус</th>
							<th>Дата операции</th>
						</tr>
					</thead>
					<tbody>
						{  
							this.props.operationList.data.map((operation) => {
								return (
									<tr>
										<td>{ operation.id }</td>
										<td>{ operation.amount }</td>
										<td>{ statuses[operation.isApproved] }</td>
										<td>{ operation.created_at }</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>);			
	}

	

	render() {		
		return (
			<div>
				{ this.printOperationsList() }
			</div>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		token         : state.user.token,
		operationList : state.operationList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchOperationList : (payload, meta) => dispatch(fetchOperationList(payload, meta)) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceOperationList);