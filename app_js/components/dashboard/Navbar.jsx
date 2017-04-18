import React from 'react'
import { Link } from 'react-router'
import { toggleSidebar } from '../../actions/sidebarActions'
import { connect } from 'react-redux'
import Dropdown from './NavbarDropdown'

class Navbar extends React.Component {
	static propTypes = {
		toggleSidebar : React.PropTypes.func.isRequired,
		pageTitle : React.PropTypes.string.isRequired
	}
	render () {
		return (
			<div className="navbar clearfix">
				<div className="menu-button pull-left">
					<button className="menu-button visible-xs" onClick={ this.props.toggleSidebar }>
						<i className="fa fa-bars" aria-hidden="true"></i>
					</button>
				</div>						
				<span className="pageTitle">{ this.props.pageTitle }</span>
				<div className="profile-informaiton pull-right hidden-xs">
					<Dropdown profile={ this.props.profile } />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		pageTitle : state.currentTitle,
		profile : state.user.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleSidebar : () => dispatch(toggleSidebar())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);