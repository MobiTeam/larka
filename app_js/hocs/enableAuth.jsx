import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const enableAuth = (Component, roles) => {
  class AuthenticatedComponent extends React.Component {
    componentDidMount () {
      this._checkAndRedirect();
    }

    componentDidUpdate () {
      this._checkAndRedirect();
    }

    _checkAndRedirect () {
      console.log(this.props);
      const { role } = this.props.user;
      const availRoles = typeof roles === "string" ? [roles] : roles;
      if (!availRoles.includes(role)) this._redirectTo('/login');
    }

    _redirectTo (link) {
      const { router } = this.props;
      router.push(link);
    }

    render () {
      return this.props.user ? (
          <div className="authenticated">
            <Component {...this.props} />
          </div>
        ) : null;
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}

export default enableAuth;
