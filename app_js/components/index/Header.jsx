import React from 'react';
import { SITE_NAME } from '../../constants/conf'

const Header = (props) => {
	return (
			<div className="header" className="noselect">
				<div className="col col-xs-12 header_inner">
					<span className="header_company-logo">
						<object className="logo-image hidden-xs" data="/img/ugra-fit-logo.svg"></object>
		 				{ SITE_NAME }
					</span>
					<div className="company-text">
						Меняйтесь в лучшую сторону вместе с нами!
					</div>
				</div>
			</div>		
		)
}

export default Header;