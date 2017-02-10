import React from 'react';

const Header = (props) => {
	return (
			<div className="header" className="noselect">
				<div className="col col-xs-12 header_inner">
					<span className="header_company-logo">
		 				<img className="logo-image hidden-xs" src="/img/ugra-fit-logo.svg" />
						Ugra-Fit
					</span>
					<div className="company-text">
						Меняйтесь в лучшую сторону вместе с нами!
					</div>
				</div>
			</div>		
		)
}

export default Header;