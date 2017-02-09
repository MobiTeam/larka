import React from 'react'
import NavLink from './NavLink'
import items from './menuItems'

class Menu extends React.Component {
	available (el, i) {
		return el.roles.indexOf(this.props.userRole) != -1;
	}
	print (items) {
		return items.map((el, i) => {
			return (<li>
						<NavLink to={ el.link } key={ i }>
							<i className={el.iconClass} aria-hidden="true"></i>
					  		<span className="hidden-xs hidden-sm">{ el.title }</span>
						</NavLink>
					</li>)
		})
	}
	render () {
		const availItems = items.filter(this.available.bind(this));
		return <ul>
			   	{ this.print(availItems) }
			   </ul>	
	}
}

export default Menu