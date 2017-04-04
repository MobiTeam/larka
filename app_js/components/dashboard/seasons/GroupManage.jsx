import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import GroupList from './GroupList'
import { fetchAllGroups, deleteGroup } from '../../../actions/groupListActions'

class GroupManage extends React.Component {
	
	static propTypes = {
		fetchAllGroups : React.PropTypes.func.isRequired
	}

	static defaultProps = {
		groups : []
	}

	componentWillMount () {
		this.props.fetchAllGroups(this.props.token, {
			redirect: false, 
            showPreloader: true,
            additionHeader: {
              "Authorization": `Bearer{${ this.props.token }}`
            }
		})
	}

	onDelBtnClick (idGroup) {		
		this.props.deleteGroup({ id : idGroup }, {
			redirect: false, 
		    showPreloader: true,
            additionHeader: {
              "Authorization": `Bearer{${ this.props.token }}`
            }
		});		
	}

	render () {
		return (
			<DocumentTitle title={ SITE_NAME + ': управление группами' }>
				<div className="row col-xs-12">
					<GroupList data={ this.props.groups } deleteGroupBtnClick={ this.onDelBtnClick.bind(this) } />					
				</div>
			</DocumentTitle>
		)		
	}
}

const mapStateToProps = (state) => {
	return {
		token : state.user.token,
		groups : state.groupList.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllGroups : (payload, meta) => { dispatch(fetchAllGroups(payload, meta)) },
		deleteGroup : (payload, meta) => { dispatch(deleteGroup(payload, meta)) }
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(GroupManage);

