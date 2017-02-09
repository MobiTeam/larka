import React from 'react';

const Motivator = (props) => {
	return (
			<div className="motivator">
				<div className="motivator_text light-shadow">
					<h4>Всего 3 шага отделяют Вас от заветной цели!</h4>
					Хватит искать себе оправдания! Просто:
					<ul id="spinned-list-items">
						<li>Зарегистрируйтесь</li>
						<li>Запишитесь на занятия</li>
						<li>Начните тренироваться</li>
					</ul>
				</div>
			</div>
		)
}

export default Motivator;