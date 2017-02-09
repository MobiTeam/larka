import React from 'react'
import { Link } from 'react-router'

const Footer = (props) => {
	const year = (new Date()).getFullYear();
	return (
			<div className="row footer">
				<div className="col col-xs-12">
					<Link to="/" className="footer_site-link">Ugra-Fit</Link> - {year} год
				</div>
			</div>
		)
}

export default Footer;