import { authorized, admin, user } from '../../constants/acl' 
const baseLink = '/dashboard';

const items = [
				{
					'title' : 'Главная',
					'link' :  baseLink,
					'roles' : authorized,
					'iconClass' : 'fa fa-home'	
				},
				{
					'title' : 'Сезоны',
					'link' :  baseLink + "/seasons",
					'roles' : [admin],
					'iconClass' : 'fa fa-clock-o'	
				},
				{
					'title' : 'Админ панель',
					'link' :  baseLink + "/admin",
					'roles' : [admin],
					'iconClass' : 'fa fa-cogs'	
				},
				{
					'title' : 'Баланс',
					'link' :  baseLink  + "/balance",
					'roles' : authorized,
					'iconClass' : 'fa fa-credit-card'	
				},
				// {
				// 	'title' : 'Статистика',
				// 	'link' :  baseLink + "/stats",
				// 	'roles' : authorized,
				// 	'iconClass' : 'fa fa-bar-chart'	
				// },
				// {
				// 	'title' : 'Календарь',
				// 	'link' :  baseLink + "/calendar",
				// 	'roles' : authorized,
				// 	'iconClass' : 'fa fa-calendar'	
				// },
				// {
				// 	'title' : 'Настройки',
				// 	'link' :  baseLink + "/settings",
				// 	'roles' : authorized,
				// 	'iconClass' : 'fa fa-cog'	
				// }
				{
					'title' : 'Профиль',
					'link' :  baseLink + "/profile",
					'roles' : authorized,
					'iconClass' : 'fa fa-user'	
				},
				{
					'title' : 'Выход',
					'link' :  "/logout",
					'roles' : authorized,
					'iconClass' : 'fa fa-sign-out'	
				}
			];


export default items;
