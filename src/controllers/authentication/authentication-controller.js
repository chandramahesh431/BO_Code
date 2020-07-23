
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AuthenticationContextProvider } from './authentication-context';
import {
  setFirstTimeLogin,  
  loginSuccessActionCreator,
} from '../../actions/authentication';

export class AuthenticationController extends Component {
  render() {
    const {
      children,
      isAuthenticated,
      isFetching,
      token,
      isFirstTimeLogin,
      serverFormErrors,
      userId,
      setFirstTimeLogin,
      loginSuccessActionCreator,
    } = this.props;

    return (
      <AuthenticationContextProvider
        value={{
          isAuthenticated,
          isFetching,
          token,
          isFirstTimeLogin,
          serverFormErrors,
          userId,
          setFirstTimeLogin,
          loginSuccessActionCreator,
        }}
      >
        {children}
      </AuthenticationContextProvider>
    );
  }
}

const mapStateToProps = ({ authentication }) => {
  return {
    ...authentication,
  };
};

const mapDispatchToProps = {
  setFirstTimeLogin, 
  loginSuccessActionCreator,
};

AuthenticationController.propTypes = {
  children: PropTypes.element,
  isAuthenticated: PropTypes.bool,
  isFetching: PropTypes.bool,
  token: PropTypes.string,
  isFirstTimeLogin: PropTypes.bool,
  serverFormErrors: PropTypes.string,
  userId: PropTypes.string,
  setFirstTimeLogin: PropTypes.func,
  submitLogin: PropTypes.func,
  requestLogout: PropTypes.func,
  clearServerFormError: PropTypes.func,
  loginSuccessActionCreator: PropTypes.func,
};

export const ConnectedAuthenticationController = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticationController);
