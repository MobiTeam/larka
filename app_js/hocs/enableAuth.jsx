import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reLogIn } from '../actions/userActions'

const enableAuth = (Component, roles) => {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      user : React.PropTypes.shape({
        token : React.PropTypes.string
      }),
      reLogIn : React.PropTypes.func.isRequired
    }

    componentWillMount() {
      const { token, role } = this.props.user;
      if (token && (!role || role == "guest")) this.props.reLogIn(token, {
        redirect: false, 
        showPreloader: true,
        additionHeader: {
          "Authorization": `Bearer{${ token }}`
        }
      });
    }

    componentDidMount () {
      this._checkAndRedirect();
    }

    componentDidUpdate () {
      this._checkAndRedirect();
    }

    _checkAndRedirect () {
      const { role, token } = this.props.user;
      const availRoles = typeof roles === "string" ? [roles] : roles;
      if (!availRoles.includes(role) && token == null) this._redirectTo('/login');
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

  const mapDispatchToProps = (dispatch) => {
    return {
      reLogIn: (payload, meta) => dispatch(reLogIn(payload, meta))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}

export default enableAuth;
