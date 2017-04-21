import React from 'react';
import { getPaymentsList } from '../../../api.js';
import { connect } from 'react-redux';
import { showSpinner, closeSpinner } from '../../../actions/spinnerActions';

class Payments extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			payments: []
		}
	}

	componentWillMount() {	
		this.props.showSpinner();		
		getPaymentsList(null, { "Authorization": `Bearer{${ this.props.token }}`})
			.then(result => result.json())
			.then(payments => {
				this.setState({
					payments
				});
				this.props.closeSpinner();
			});			
	}

	paymentsTemplate(payment) {
		return (<tr key={ payment.id } className={ payment.type == 1 ? 'success-tr' : 'error-tr' }>
					<td>{ payment.created_at }</td>
					<td>{ payment.type_name }</td>
					<td>{ payment.amount }</td>
					<td>{ payment.isApproved_name }</td>
					<td>{ payment.full_name }</td>
					<td>{ payment.email }</td>
				</tr>);
	}

	printPayments() {
		return (<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>Дата</th>
							<th>Тип</th>
							<th>Сумма (RUB)</th>
							<th>Статус</th>
							<th>ФИО</th>
							<th>email</th>
						</tr>
					</thead>
					<tbody>
						{ this.state.payments.map(payment => this.paymentsTemplate.bind(this)(payment)) }
					</tbody>
				</table>);
	}

	render () {
		return (<div className="white-wrapper">
					<h3>История операций</h3>
					{ this.state.payments.length == 0 ? null : this.printPayments() }
				</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		token : state.user.token
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		showSpinner : () => dispatch(showSpinner()),
		closeSpinner : () => dispatch(closeSpinner())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments);