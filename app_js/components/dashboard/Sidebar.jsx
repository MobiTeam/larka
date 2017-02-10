import React from 'react'
import Menu from './Menu'
import { Link } from 'react-router'
import { SITE_NAME } from '../../constants/conf'

class Sidebar extends React.Component {
	render () {
		return (
				<div className="left-sidebar hidden-xs col col-md-2 col-sm-1 display-table-cell v-align">
					<div className="logo">
						<Link to="/">
	                    	<img src="/img/ugra-fit-logo.svg" alt="UGRA-FIT" />
	                    	<div className="hidden-sm">
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

export default Sidebar