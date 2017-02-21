import React from 'react'
import { Link } from 'react-router'
import { toggleSidebar } from '../../actions/sidebarActions'
import { connect } from 'react-redux'

class Navbar extends React.Component {
	static propTypes = {
		toggleSidebar : React.PropTypes.func.isRequired,
		pageTitle : React.PropTypes.string.isRequired
	}
	render () {
		return (
				<div className="navbar">
					<div className="menu-button pull-left">
						<button className="menu-button visible-xs" onClick={ this.props.toggleSidebar }>
							<i className="fa fa-bars" aria-hidden="true"></i>
						</button>
					</div>						
					<span className="pageTitle">{ this.props.pageTitle }</span>
				</div>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		pageTitle : state.currentTitle
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleSidebar : () => dispatch(toggleSidebar())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

// dropdown
// <ul className="list-inline header-top pull-right">
//     <li>
//     	<a href="#">
//     		<i className="fa fa-envelope" aria-hidden="true"></i>
//     	</a>
//     </li>
//     <li>
//         <a href="#" className="icon-info">
//             <i className="fa fa-bell" aria-hidden="true"></i>
//             <span className="label label-primary">3</span>
//         </a>
//     </li>
//     <li className="dropdown">
//         <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
//         	<i className="fa fa-user" aria-hidden="true"></i>
//             <b className="caret"></b>
//         </a>
//         <ul className="dropdown-menu">
//             <li>
//                 <div className="navbar-content">
//                     <span>JS Krishna</span>
//                     <p className="text-muted small">
//                         me@jskrishna.com
//                     </p>
//                     <div className="divider">
//                     </div>
//                     <a href="#" className="view btn-sm active">View Profile</a>
//                 </div>
//             </li>
//         </ul>
//     </li>
// </ul>