import React from 'react'
import Breadcrumbs from 'react-breadcrumbs';

class CustomBreadcrumbs extends React.Component {
	render () {
		return (
				<div>
					<Breadcrumbs 
						routes={ this.props.routes }
						params={ this.props.params }
					/>
				</div>
			)
	}
}

export default CustomBreadcrumbs;