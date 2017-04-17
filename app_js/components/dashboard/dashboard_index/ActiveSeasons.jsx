import React from 'react';

class ActiveSeasons extends React.Component {

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
								<h4>Группы</h4>
								{ season.groups.map(group => {
									return (
											<div>
												<b>{ group.name } : { group.count_training } занятий(я)</b>
												<p>{ group.description }</p>
												<p>Количество мест: { group.capacity }</p>
												<p>Стоимость записи: { group.price }</p>
											</div>
										)
								}) }
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

	render () {
		return (<div>
				<h3>Активные сезоны</h3>
				<hr/>
				{ this.printItems(this.props.data) }
			</div>)
	}
}

export default ActiveSeasons;