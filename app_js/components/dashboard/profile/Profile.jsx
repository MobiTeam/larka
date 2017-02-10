import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'

class Profile extends React.Component {
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': профиль пользователя' }>
					<div>
						Страница профиля пользователя
					</div>
				</DocumentTitle>
		)		
	}
}

export default Profile;