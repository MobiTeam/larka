import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { dropSeason } from '../../../actions/seasonActions'
import { connect } from 'react-redux'
import EditForm from './EditForm'

class CreateSeason extends React.Component {
	static propTypes = {
		dropSeason : React.PropTypes.func.isRequired
	}
	componentWillMount () {
		this.props.dropSeason();
	}
	componentDidMount () {
		this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this))
  	}
	routerWillLeave() {
		if (!this.props.isPersist) {
			return window.confirm('Вы уверены что хотите перейти? Данный сезон не был сохранен.');
		}
		return true;
	}
	handleFieldChange (event) {
		this.props.localUpdateSeason({
			[event.target.name]: event.target.value
		})
	}
	handleDateChange (key, date) {
		this.props.localUpdateSeason({
			[key]: date
		})
	}
	printStatusText () {
		if (this.props.statusText == '') return null;
		return (
				<div className={ 'alert alert-' + (this.props.isPersist ? 'success' : 'danger') }>
					{ this.props.statusText }
				</div>
			)
	}
	render () {
		return (
			<DocumentTitle title={ SITE_NAME + ': создать новый сезон' }>
				<div className="row col-xs-12 col-md-8 col-lg-7">
					{ this.printStatusText() }
					<div className='create-season-wrapper'>
						<EditForm />
					</div>						
				</div>
			</DocumentTitle>
		)		
	}
}

const mapStateToProps = (state) => {
	return {
		statusText : state.season.statusText,
		isPersist : state.season.isPersist
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dropSeason : () => { dispatch(dropSeason()) }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateSeason);

