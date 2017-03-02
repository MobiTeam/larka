import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

class NotAccess extends React.Component {
	render () {
		return (
			<DocumentTitle title='Нет прав для просмотра страницы! (401)'>
				<div className="container not-found-wrapper">
					<div className="not-found-box">
						<i className="fa fa-exclamation-circle not-found-exclamation hidden-xs hidden-sm" aria-hidden="true"></i>
						<h2 className="not-found-h">Нет прав для просмотра страницы</h2>
						<p className="not-found-info">Для просмотра данной страницы у Вас недостаточно прав.<br/> Если это произошло по ошибке, то свяжитесь с администрацией сайта - <a href="mailto:webmaster@в-форме.рф">webmaster@в-форме.рф</a></p>
						<Link to="/dashboard">
							<button type="button" className="btn btn-labeled btn-danger forward-btn">
								<span className="btn-label">
				           			<i className="fa fa-arrow-left" aria-hidden="true"></i>
				           		</span>
				           		Вернуться на главную
				          	</button>
			          	</Link>	
					</div>	
				</div>
			</DocumentTitle>
		)
	}	
}

export default NotAccess; 