import React from 'react'
import { connect } from 'react-redux'

class Spinner extends React.Component {
	render () {
		return this.props.spinner ? (
				<div className="overlay" title="Подождите, идет загрузка...">
					<div className="spinner">
						<div id="circularG">
							<div id="circularG_1" className="circularG"></div>
							<div id="circularG_2" className="circularG"></div>
							<div id="circularG_3" className="circularG"></div>
							<div id="circularG_4" className="circularG"></div>
							<div id="circularG_5" className="circularG"></div>
							<div id="circularG_6" className="circularG"></div>
							<div id="circularG_7" className="circularG"></div>
							<div id="circularG_8" className="circularG"></div>
						</div>
					</div>
				</div>
			) : null;
	}
}

const mapDispatchToProps = (state) => {
	return {
		spinner : state.spinner
	}
}

export default connect(mapDispatchToProps)(Spinner);