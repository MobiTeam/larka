import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'

class ProfileEditor extends React.Component {
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': редактирование профиля' }>
					<div className="profile-editor-wrapper row col-md-8">
						<h4>Форма редактирования профиля</h4>
						<form action="" method="POST" className="table-user-information-form">
						    <table className="table profile-editor-table table-hover table-striped">
						    	<tbody>
						            <tr>
						                <td>Имя</td>
						                <td>
						                    <input type="text" name="name" placeholder="Иван" className="form-control" />
						                </td>
						            </tr>
						            <tr>
						                <td>Фамилия</td>
						                <td>
						                    <input type="text" name="family_name" placeholder="Иванов" className="form-control" />
						                </td>
						            </tr>
						            <tr>
						                <td>Телефон</td>
						                <td>
						                    <input type="text" name="phone" placeholder="8 900 500 70 77" className="form-control" />                                        
						                </td>
						            </tr>
						            <tr>
						                <td>Пол</td>
						                <td>
						                    <select name="sex" defaultValue="1" className="form-control">
						                        <option value="0">Женский</option>
						                        <option value="1">Мужской</option>
						                    </select>
						                </td>
						            </tr>
						        </tbody>
						    </table>
					     	<button type="button" className="btn btn-labeled btn-success save-user-profile">
					    		<span className="btn-label">
					    			<i className="fa fa-floppy-o" aria-hidden="true"></i>
					    		</span>
					    		Сохранить изменения
					    	</button>
						</form>
					</div>				
				</DocumentTitle>
		)		
	}
}

export default ProfileEditor;

















