import React from 'react'
import DocumentTitle from 'react-document-title'
import Footer from './index/Footer'
import Header from './index/Header'

import { connect } from 'react-redux'
import { logIn } from '../actions/userActions'


class Panel extends React.Component {
	render () {
		return (
			<div className="container home-wrapper">
				<Header />
				{ this.props.children }
				<hr />
				<Footer />
			</div>
		)		
	}
}


export default Panel;