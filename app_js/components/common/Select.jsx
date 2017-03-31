import React from 'react';

class SelectEl extends React.Component {

	static defaultProps = {
		data 	 	: [],
		onChange 	: () => {},
		id 			: 'custom-selector',
		className 	: 'custom-selector',
		name 		: 'custom-selector',
		selValue 	: ''
	}

	printOptions (data) {
		return data.map((el) => {
			return <option key={ el.id } value={ el.id }>{ el.name }</option>
		})
	}

	render () {
		return (
			<select name={ this.props.name } id={ this.props.id } defaultValue={ this.props.selValue } className={ this.props.className } onChange={ this.props.onChange } >
				{ this.printOptions(this.props.data) }
			</select>
		)		
	}
}

export default SelectEl;