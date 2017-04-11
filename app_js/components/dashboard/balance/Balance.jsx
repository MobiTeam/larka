import React from 'react'
import BalanceForm from './BalanceForm'

class Balance extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			operationStatusText: '',
			err: false
		}
	}

	setOperationStatus(operationStatusText, err = false) {
		this.setState({
			operationStatusText: operationStatusText,
			err: err
		}); 
	}

	printStatusMsg() {
		if (this.state.operationStatusText) {
			return <div className={`alert alert-${ this.state.err ? 'danger' : 'success'}`}>{ this.state.operationStatusText }</div>;
		}
		return null;
	} 

	render() {
		return (
				<div className="balance-wrapper">
					<div>
						{ this.printStatusMsg() }
					</div>
					<div className="row">
						<div className="col col-xs-12 col-sm-4">
							<div className="white-wrapper">
								<h3>Пополнение баланса</h3>
								<BalanceForm setStatus={ this.setOperationStatus.bind(this) } />
								<div className="alert alert-info">
									*Оплата производится посредством Сбербанка
								</div>
							</div>
						</div>
						<div className="col col-xs-12 col-sm-8">
							<div className="white-wrapper">
								<h3>Просмотр истории операций</h3>
							</div>
						</div>
					</div>
				</div>
			)
	}	
}

export default Balance;
