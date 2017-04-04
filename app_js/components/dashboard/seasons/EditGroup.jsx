import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import GroupEditForm from './GroupEditForm'
import { fetchGroup, updateGroup } from '../../../actions/groupActions'

class EditGroup extends React.Component {

	componentWillMount () {
		this.loadGroupData();
	}

	loadGroupData () {
		const { groupId } = this.props.params;
		if (groupId) {
			this.props.fetchGroup({ id : groupId }, {
				redirect: false, 
	            showPreloader: true,
	            additionHeader: {
	              "Authorization": `Bearer{${ this.props.token }}`
	            }
			})
		}
	}

	updateGroupInfo () {
		this.props.updateGroup(this.props.group, {
			redirect: false, 
		    showPreloader: true,
		    additionHeader: {
		 	    "Authorization": `Bearer{${ this.props.token }}`
		    }
		});
	}

	printStatusText () {
		if (this.props.group.statusText == '') return null;
		return (
			<div className={ 'alert alert-' + (this.props.group.isPersist ? 'success' : 'danger') }>
				{ this.props.group.statusText }
			</div>
		)
	}
	
	render () {
		return (
			<DocumentTitle title={ SITE_NAME + ': редактирование группы' }>
				<div>
					{ this.printStatusText() }
					<div className="row col-xs-12 col-lg-9 group-form-wrapper">
						{ this.props.group.season_id != undefined ? <GroupEditForm formTitle="Создание группы" submitBtnTitle="Сохранить" data={ this.props.group } dispatchAction={ this.updateGroupInfo.bind(this) } /> : null }
					</div>
				</div>
			</DocumentTitle>
		)		
	}
}

const mapStateToProps = (state) => {
	return {
		token : state.user.token,
		group : state.group
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchGroup : (payload, meta) => dispatch(fetchGroup(payload, meta)),
		updateGroup : (payload, meta) => dispatch(updateGroup(payload, meta))		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGroup);

