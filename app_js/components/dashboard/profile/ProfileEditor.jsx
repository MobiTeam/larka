import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'

class ProfileEditor extends React.Component {
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': редактирование профиля' }>
					<form action="" method="POST" className="table-user-information-form">
					    <table className="table">
					    	<tbody>
					            <tr>
					                <td>Логин:</td>
					                <td>
					                    <input type="text" name="login" value="user" className="form-control" />
					                </td>
					            </tr>
					            <tr>
					                <td>ФИО:</td>
					                <td>
					                    <input type="text" name="fullname" value="Иванов Иван Иванович" className="form-control" />
					                </td>
					            </tr>
					            <tr>
					                <td>Пол</td>
					                <td>
					                    <select name="sex" className="form-control">
					                        <option value="0">Женский</option>
					                        <option value="1" selected>Мужской</option>
					                    </select>
					                </td>
					            </tr>
					            <tr>
					                <td>Телефон:</td>
					                <td>
					                    <input type="text" name="phone" value="+7 999 777 123 34" className="form-control" />                                        
					                </td>
					            </tr>
					            <tr>
					                <td>Электронная почта:</td>
					                <td>
					                    <input type="text" name="mail" value="user@mail.ru" className="form-control" />                                            
					                </td>
					            </tr>
					            <tr>
					                <td colspan="2">
					                    <button className="btn btn-success save-user-profile">
					                        Сохранить изменения
					                    </button>
					                </td>
					            </tr>
					        </tbody>
					    </table>
					</form>				
				</DocumentTitle>
		)		
	}
}

export default ProfileEditor;

















