import React from 'react'
import BalanceForm from './BalanceForm'
import BalanceOperationList from './BalanceOperationList'
import queryString from 'query-string'
import { connect } from 'react-redux'

class Balance extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			operationStatusText: '',
			err: false
		}
	}

	componentDidMount() {
		const search = queryString.parse(location.search);
		if (!search.status) return; 
		if (search.status == "success") {
			this.setOperationStatus("Операция прошла успешно.", false);
		} else {
			this.setOperationStatus("При выполнении операции произошла ошибка.", true);
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
								<h3>На балансе: { this.props.profile.balance || '0' } RUB</h3>
							</div>
							<div className="white-wrapper">
								<h3>Пополнение баланса</h3>
								<BalanceForm setStatus={ this.setOperationStatus.bind(this) } amount={ queryString.parse(location.search).amount || 0 } />
								<div className="alert alert-info">
									*Оплата производится посредством Сбербанка
								</div>
							</div>
						</div>
						<div className="col col-xs-12 col-sm-8">
							<div className="white-wrapper">
								<h3>Просмотр истории операций</h3>
								<BalanceOperationList />
							</div>
						</div>
					</div>
				</div>
			)
	}	
}

const mapStateToProps = (state) => {
	return {		
		profile : state.user.profile
	}
}

export default connect(mapStateToProps)(Balance);

