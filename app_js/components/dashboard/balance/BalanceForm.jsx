import React from 'react'
import { createBankOrder } from '../../../api.js'
import { connect } from 'react-redux'
import { showSpinner, closeSpinner } from '../../../actions/spinnerActions'

class BalanceForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			summ: 0
		}
	}

	static defaultProps() {
		setStatus: () => {}
	}

	onSubmit(event) {
		event.preventDefault();
		if (!this.isNumber(this.state.summ)) {
		 	this.props.setStatus('Введенная сумма должна быть числом.', true);
		 	return;	
		}

		this.props.showSpinner();
		createBankOrder({
			amount: this.state.summ,
		},{
            "Authorization": `Bearer{${ this.props.token }}`
		}).then((result) => result.json())
		  .then((order) => {
		  	if (order.error || !order.formUrl) {
				this.props.setStatus('При генерации заказа произошла ошибка, повторите попытку позже.', true);
			} else {
				location.href = order.formUrl;
			} 
			this.props.closeSpinner();
		  });

		return false;
	}

	isNumber(number) {
		const value = parseFloat(number);
		return !isNaN(value) && value > 0;
	}

	summChange(event) {
		this.setState({
			summ : event.target.value
		});
	}

	render() {
		return (
				<form className="balalce-form" action="" method="POST" onSubmit={ this.onSubmit.bind(this) } >
					<div className="form-group">
					    <label htmlFor="summ">Сумма</label>
					    <input name="summ" className="form-control" id="summ" onChange={ this.summChange.bind(this) } value={ this.state.summ } placeholder="Сумма" required/>
					</div>
					<div className="form-group">
						<button type="submit"className="btn btn-success">
							Оплатить
						</button>
					</div>
				</form>
			)
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceForm);
