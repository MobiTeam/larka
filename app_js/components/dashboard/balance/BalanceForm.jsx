import React from 'react'

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

		this.props.setStatus('Сумма успешно зачислена.');
		return false;
	}

	isNumber(value) {
		return !isNaN(parseFloat(value));
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

export default BalanceForm;
