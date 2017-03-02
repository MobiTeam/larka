import React from 'react';
import DocumentTitle from 'react-document-title'
import { SITE_NAME } from '../../../constants/conf'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchAllSeasons, seasonDelete } from '../../../actions/seasonListActions'
import SeasonItem from './SeasonItem'

class SeasonList extends React.Component {
	static propTypes = {
		fetchAllSeasons : React.PropTypes.func.isRequired,
		seasonDelete : React.PropTypes.func.isRequired
	}
	componentWillMount () {
		this.props.fetchAllSeasons(this.props.token, {
			redirect: false, 
            showPreloader: true,
            additionHeader: {
              "Authorization": `Bearer{${ this.props.token }}`
            }
		})
	}
	printFetchStatus () {
		return this.props.seasonList == null ? (
				<div className="alert alert-danger">
					При загрузке списка сезонов произошла ошибка, повторите попытку позже.
				</div>
			) : null;
	}
	onDelBtnClick (idSeason) {		
		this.props.seasonDelete({ id : idSeason }, {
				redirect: false, 
			    showPreloader: true,
	            additionHeader: {
	              "Authorization": `Bearer{${ this.props.token }}`
	            }
			});		
	}
	createSeasonList (data) {
		if (data == null) return null;
		if (data.length == 0) return (<tr><td colSpan="7">Вы не создали еще ни одного сезона.</td></tr>);
		return data.map((el) => {
			return <SeasonItem { ...el } key={ el.id } onDelBtnClick={ this.onDelBtnClick.bind(this, el.id) } />
		}) 
	}
	render () {
		return (
				<DocumentTitle title={ SITE_NAME + ': список сезонов' }>
					<div className="row col-xs-12 col-lg-9">
						{ this.printFetchStatus() }
						<div className="season-list-wrapper">
							<table className="table table-striped table-hover season-list-table">
								<thead>
									<tr>
										<th>Название</th>
										<th>Краткое описание</th>
										<th>Дата начала</th>
										<th>Дата окончания</th>
										<th>Создан</th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{ this.createSeasonList(this.props.seasonList) }
								</tbody>
							</table>	
						</div>
					</div>
				</DocumentTitle>
		)		
	}
}

const mapStateToProps = (state) => {
	return {
		token : state.user.token,
		seasonList : state.seasonList.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllSeasons : (payload, meta) => { dispatch(fetchAllSeasons(payload, meta)) },
		seasonDelete    : (payload, meta) => { dispatch(seasonDelete(payload, meta)) }
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(SeasonList);

