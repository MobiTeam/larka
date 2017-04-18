import React from 'react';
import ActiveSeasons from './dashboard_index/ActiveSeasons.jsx';
import UserSeasons from './dashboard_index/UserSeasons.jsx';
import { connect } from 'react-redux';
import { fetchActiveSeasons } from '../../actions/activeSeasonsActions.js'

class Index extends React.Component {

	componentWillMount() {		
		this.props.fetchActiveSeasons(null, {
			redirect: false, 
            showPreloader: true,
            additionHeader: {
              "Authorization": `Bearer{${ this.props.token }}`
            }
		});				
	}

	render () {
		return (
				<div>
					<div className="row"></div>
					<div className="row">
						<div className="col col-xs-12 col-sm-7">
							{
								this.props.seasons.data != undefined ? 
									<div className="white-wrapper">
										<UserSeasons />
									</div>
									: null
							}							
							<div className="white-wrapper">
								<ActiveSeasons data={ this.props.seasons.data || [] } router={ this.props.router } />
							</div>
						</div>
						<div className="col col-xs-12 col-sm-7">
						</div>
					</div>
				</div>
			)
	}
}


const mapStateToProps = (state) => {
	return {
		token   : state.user.token,
		profile : state.user.profile,
		seasons : state.activeSeasons,
		groups  : state.user.groups
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchActiveSeasons : (payload, meta) => dispatch(fetchActiveSeasons(payload, meta))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);