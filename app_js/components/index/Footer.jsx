import React from 'react'
import { Link } from 'react-router'
import { SITE_NAME } from '../../constants/conf'

const Footer = (props) => {
	const year = (new Date()).getFullYear();
	return (
			<div className="row footer">
				<div className="col col-xs-12">
					<Link to="/" className="footer_site-link">{ SITE_NAME }</Link> - {year} год
				</div>
			</div>
		)
}

export default Footer;