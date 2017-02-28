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

    // перед монтированием компонента проверяем есть ли токен
    // в противном случае переводим на страницу логина
    componentWillMount () {
      const { token, role } = this.props.user;
      if (token && (!role || role == "guest")) {
          this.props.reLogIn(token, {
          redirect: false, 
          showPreloader: true,
          additionHeader: {
            "Authorization": `Bearer{${ token }}`
          }
        });
      } else if (!token) {
        this.redirectTo('/login');
      }    
    }

    componentDidUpdate (prevProps) {
      this.checkAndRedirect();
    }

    hasAccess () {
      const { role } = this.props.user;
      const availRoles = typeof roles === "string" ? [roles] : roles;
      return availRoles.indexOf(role) != -1;
    }

    checkAndRedirect () {
      const { logOutFlag, fetchIsComplete } = this.props.user;
      if (logOutFlag) this.redirectTo('/');
      if (!this.hasAccess() && fetchIsComplete) this.redirectTo('/noaccess');
    }

    redirectTo (link) {
      const { router } = this.props;
      router.push(link);
    }

    render () {
      return this.hasAccess() ? (
          <div className="authenticated">
            { <Component { ...this.props } /> }
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
      reLogIn  : (payload, meta) => dispatch(reLogIn(payload, meta))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}

export default enableAuth;
