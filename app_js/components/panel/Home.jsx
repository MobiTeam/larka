import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import Motivator from '../index/Motivator'
import ButtonBlock from '../index/ButtonBlock'
import { SITE_NAME } from '../../constants/conf'

class Home extends React.Component {
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': главная страница' }>
					<div className='container home-wrapper'>
						<div className="row">
							<div className="col col-xs-12">
								<Motivator />
							</div>
							<div className="col col-xs-12">
								<ButtonBlock />
							</div>
						</div>					
					</div>
				</DocumentTitle>
			)
	}
}

export default Home;