import React from 'react'
import Spinner from '../components/Spinner'

class App extends React.Component {
	render () {
		return (
				<div>
					{this.props.children}
					<Spinner />
				</div>
			)		
	} 
}

export default App;