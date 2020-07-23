
import React, { createContext } from 'react';
import _ from 'underscore';
import { ConnectedAuthenticationController } from './authentication-controller';
import { loginReducerDefaultState } from '../../reducer/authentication';

// Create the context
export const authenticationContextDefaultValue = {
  ...loginReducerDefaultState,
  setFirstTimeLogin: _.noop,
  submitLogin: _.noop,
  requestLogout: _.noop,
  clearServerFormError: _.noop,
};

const AuthenticationContext = createContext(authenticationContextDefaultValue);

// Export Provider and Consumer

export const AuthenticationContextProvider = AuthenticationContext.Provider;
export const AuthenticationContextConsumer = AuthenticationContext.Consumer;

export const withAuthenticationContext = (Component) => (props) => (
  <ConnectedAuthenticationController>
    <AuthenticationContextConsumer>
      {(ctx) => <Component {...props} {...ctx} />}
    </AuthenticationContextConsumer>
  </ConnectedAuthenticationController>
);
