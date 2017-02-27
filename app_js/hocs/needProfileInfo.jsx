import React from 'react';
import { connect } from 'react-redux'
import { fetchProfileInfo } from '../actions/userActions'

const needProfileInfo = (Component) => {
  class userComponent extends React.Component {
    static propTypes = {
      profile : React.PropTypes.object.isRequired,
      fetchProfileInfo : React.PropTypes.func.isRequired
    }
    componentDidMount() {
      this.fetchData();
    }
    componentDidUpdate() {
      this.fetchData();
    }
    fetchData() {
      // информация из профиля не загружена и релогин успешно произошел  
      if (!this.props.profile.id && this.props.role != "guest") {
        if (this.props.statusCode < 300) {
          this.props.fetchProfileInfo(null, {
            redirect: false, 
            showPreloader: true,
            additionHeader: {
              "Authorization": `Bearer{${ this.props.token }}`
            }
          });
        } 
      }        
    }
    render () {
      return <Component {...this.props} />
    }
  }
  const mapStateToProps = (state) => {
    return {
      statusCode : state.user.statusCode,
      role : state.user.role,
      token : state.user.token,
      profile : state.user.profile
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchProfileInfo : (payload, meta) => { dispatch(fetchProfileInfo(payload, meta)) }
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(userComponent);
}

export default needProfileInfo;
