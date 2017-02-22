import React from 'react';
import { connect } from 'react-redux';

const needProfileInfo = (Component) => {
  class userComponent extends React.Component {
    componentWillMount () {
      if (this.props.token != null) this.redirectTo('/dashboard');
    }
    
    redirectTo (link) {
      const { router } = this.props;
      router.push(link);
    }

    render () {
      return <Component {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    return {
      token: state.user.token
    }
  };

  return connect(mapStateToProps)(userComponent);
}

export default needProfileInfo;
