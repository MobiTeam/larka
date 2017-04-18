import React from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { connect } from 'react-redux';
import { fetchUserGroups } from '../../../actions/userActions.js';
import { joinToSeasonGroup, bookingSeasonGroup } from '../../../api.js';
import { showSpinner, closeSpinner } from '../../../actions/spinnerActions';
import { purchaseSuccess } from '../../../actions/userActions';

class ActiveSeasons extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isShowingModal: false,
			groups: [],
			seasonName: '',
			fetchMethod: null
		}
	}

	handleClick = (groups, seasonName) => this.setState({ isShowingModal: true, groups, seasonName });
  	handleClose = () => this.setState({ isShowingModal: false });

	seasonTemplate (season) {
		return (
			<div className="season-wrapper" key={ season.id }>
				<div className="row">
					<div className="col col-xs-12 col-sm-5">
						<img className="img-responsive active-season-image" src={ season.default_image } />
					</div>
					<div className="col col-xs-12 col-sm-7">
						<div className="active-season-information">
							<h4 className="active-season-title">{ season.name }</h4>
							<span>
								<i className="fa fa-calendar active-season-shedule" aria-hidden="true"></i>
								C { season.date_start } по { season.date_finish }
							</span>
							<div className="alert alert-warning active-season-description"><b>Про сезон:</b> { season.description } </div>
						</div>
						<hr />
						<div className="active-season-groups">
							<button className="btn btn-labeled btn-success" onClick={ this.handleClick.bind(this, season.groups, season.name) }>
								<span className="btn-label">
									<i className="fa fa-users" aria-hidden="true"></i>
								</span>
								Список групп
							</button>								
						</div>							
					</div>
 				</div>
				<hr />
			</div>
		)
	}

	printItems (data) {
		return data.map(season => this.seasonTemplate.bind(this)(season));
	}

	
	bookSeasonGroup (data) {
		this.setState({
			fetchMethod: bookingSeasonGroup 
		});

		this.purchase(data.id, data.booking_price);		
	}

	buySeasonGroup (data) {
		this.setState({
			fetchMethod: bookingSeasonGroup 
		});

		this.purchase(data.id, data.price);			
	}

	purchase(id, cost) {
		this.props.showSpinner();
		if (this.props.profile.money >= cost) {
			if (!confirm(`С вашего баланса будет списано ${cost} средств. Вы согласны?`)) return;
			this.state
				.fetchMethod({ id, cost }, { "Authorization": `Bearer{${ this.props.token }}` })
				.then(() => {
					this.props.purchaseSuccess(cost);

					this.props
						.fetchUserGroups(null, {
							redirect: false, 
				            showPreloader: true,
				            additionHeader: {
				              "Authorization": `Bearer{${ this.props.token }}`
				            }
						});		
				})
				.catch(() => {
					this.props.closeSpinner();
				});
		} else {
			if (confirm('На вашем счете не хватает средств. Перейти к пополнению кошелька?')) {
				this.props.router.push(`/dashboard/balance?amount=${ cost - this.props.profile.balance }`);
			}
		}
	}

	render () {
		return (<div>
				<h3>Активные сезоны</h3>
				<hr/>
				{ this.printItems(this.props.data) }
				{
					this.state.isShowingModal &&
			        <ModalContainer onClose={this.handleClose}>
			          <ModalDialog onClose={this.handleClose}>
			          	<div className="seasons-group-wrapper">
				            <h3>Группы сезона "{ this.state.seasonName }"</h3>
				            <hr/>
				            { this.state.groups.map(group => {
								return (
									<div>
										<div className="row" key={ group.id }>
											<div className="col col-xs-12 col-sm-8">
												<div className="col col-xs-12">
													<h4>{ group.name }</h4>
												</div>
												<div className="col col-xs-12">
													<p className="alert alert-info">{ group.description }</p>
												</div>
												<div className="col col-xs-12 col-sm-3">
													<b><i className="fa fa-calendar" aria-hidden="true"></i>Занятий:</b> { group.count_training }
												</div>
												<div className="col col-xs-12 col-sm-3">
													<b><i className="fa fa-users" aria-hidden="true"></i> Мест:</b> { group.capacity }
												</div>
												<div className="col col-xs-12 col-sm-6">
													<div><b><i className="fa fa-check" aria-hidden="true"></i>Стоимость брони:</b> { group.booking_price } RUB</div>
													<div><b><i className="fa fa-credit-card" aria-hidden="true"></i>Стоимость записи:</b> { group.price } RUB</div>
												</div>
											</div>
											<div className="col col-xs-12 col-sm-4">
												<button className="btn btn-labeled btn-warning" onClick={ this.bookSeasonGroup.bind(this, group) }>
													<span className="btn-label">
														<i className="fa fa-check" aria-hidden="true"></i>
													</span>
													Забронировать
												</button>
												<button className="btn btn-labeled btn-success" onClick={ this.buySeasonGroup.bind(this, group) }>
													<span className="btn-label">
														<i className="fa fa-credit-card" aria-hidden="true"></i>
													</span>
													Оплатить сезон
												</button>		
											</div>
										</div>
										<hr/>
									</div>
								)
							}) } 
							<div className="row col col-xs-12 visible-xs">
								<button className="btn btn-large btn-labeled btn-danger" onClick={ this.handleClose }>
									<span className="btn-label">
										<i className="fa fa-times" aria-hidden="true"></i>
									</span>
									Закрыть
								</button>	
							</div>
						</div>
			          </ModalDialog>
			        </ModalContainer>
				}
			</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		token   : state.user.token,
		profile : state.user.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserGroups : (payload, meta) => dispatch(fetchUserGroups(payload, meta)),
		purchaseSuccess : (payload) => dispatch(purchaseSuccess(payload)),
		showSpinner : () => dispatch(showSpinner()),
		closeSpinner : () => dispatch(closeSpinner())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSeasons);
