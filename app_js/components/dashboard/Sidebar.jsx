import React from 'react'
import Menu from './Menu'
import { Link } from 'react-router'
import { SITE_NAME } from '../../constants/conf'
import { connect } from 'react-redux'

class Sidebar extends React.Component {
	static propTypes = {
		hideSidebarOnSmallScr : React.PropTypes.bool.isRequired
	}
	render () {
		return (
				<div className={ (this.props.hideSidebarOnSmallScr ? "hidden-xs " : "") + "left-sidebar col col-md-2 col-sm-1 col-xs-1 display-table-cell v-align" }>
					<div className="logo">
						<Link to="/">
							<object className="sidebar-logo-img" data="/img/ugra-fit-logo.svg"></object>
							<div className="hidden-sm hidden-xs">
	                    		<span className="logo-text">{ SITE_NAME }</span>     
	                    	</div>
                    	</Link>
					</div>
					<div className="navi">
						<Menu userRole={ this.props.userRole } />
					</div>	
				</div>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		hideSidebarOnSmallScr : state.hideSidebarOnSmallScr
	}
}

export default connect(mapStateToProps)(Sidebar);