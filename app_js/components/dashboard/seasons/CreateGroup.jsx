import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import GroupEditForm from './GroupEditForm'
import { groupCreate, dropGroup } from '../../../actions/groupActions'

class CreateGroup extends React.Component {
		
	static propTypes = {
		groupCreate : React.PropTypes.func.isRequired,
		dropGroup : React.PropTypes.func.isRequired	
	}

	componentWillMount () {
		this.props.dropGroup();
	}

	sendGroupData (data) {
		this.props.groupCreate(data, {
			redirect: false, 
            showPreloader: true,
            additionHeader: {
              "Authorization": `Bearer{${ this.props.token }}`
            }
		});		
	}

	printStatus () {
		if (this.props.group.statusText) {
			return (<div className={ (this.props.group.err ? 'alert-danger' : 'alert-success') + ' alert'}>{ this.props.group.statusText }</div>)
		}
		return null; 
	}

	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': создание группы' }>
					<div>
						{ this.printStatus() }
						<div className="row col-xs-12 col-lg-9 group-form-wrapper">
							<GroupEditForm formTitle="Создание группы" submitBtnTitle="Создать" data={ this.props.group } dispatchAction={ this.sendGroupData.bind(this) } />
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
		groupCreate : (data, props) => dispatch(groupCreate(data, props)),	
		dropGroup : () => dispatch(dropGroup())	
	}		
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);

