import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { fetchSeason } from '../../../actions/seasonActions'
import { connect } from 'react-redux'
import EditForm from './EditForm'

class EditSeason extends React.Component {
	componentWillMount () {
		this.loadSeasonData();
	}
	loadSeasonData () {
		const { seasonId } = this.props.params;
		if (seasonId) {
			this.props.fetchSeason({ id : seasonId }, {
				redirect: false, 
	            showPreloader: true,
	            additionHeader: {
	              "Authorization": `Bearer{${ this.props.token }}`
	            }
			})
		}
	}
	componentDidMount () {
		this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this))
  	}
	routerWillLeave () {
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
		return this.props.errFlag ? this.printErrorMsg() : this.printSuccessMsg(); 		
	}
	printSuccessMsg () {
		return (<div className='alert alert-success'>
					{ this.props.statusText }
				</div>);
	}
	printErrorMsg () {
		return (<div className='alert alert-danger'>
					{ this.props.statusText }
					<span className='reload-span-season' onClick={ this.loadSeasonData.bind(this) }>Нажмите для повторной загрузки</span>
				</div>);
	}
	printForm () {
		return (<div className='create-season-wrapper'>
					<EditForm formTitle='Форма редактирования сезона' submitBtnTitle='Сохранить изменения' />
				</div>);
	}
	render () {
		return (
			<DocumentTitle title={ SITE_NAME + ': редактирование сезона' }>
				<div className="row col-xs-12 col-md-8 col-lg-7">
					{ this.printStatusText() }
					{ !this.props.errFlag ? this.printForm() : null }											
				</div>
			</DocumentTitle>
		)		
	}
}

const mapStateToProps = (state) => {
	return {
		statusText : state.season.statusText,
		errFlag    : state.season.errFlag,
		isPersist  : state.season.isPersist,
		token      : state.user.token
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchSeason : (payload, meta) => { dispatch(fetchSeason(payload, meta)) }
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(EditSeason);

