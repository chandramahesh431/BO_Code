
import React, { createContext } from 'react';
import { ConnectedUserPreferencesController } from './user-preferences-controller';
import { userPreferencesInitialState } from '../../constants/preferences';

// Create the context
export const userPreferencesContextDefaultValue = {
  ...userPreferencesInitialState,
};

const UserPreferencesContext = createContext(
  userPreferencesContextDefaultValue,
);

// Export Provider and Consumer
export const UserPreferencesContextProvider = UserPreferencesContext.Provider;
export const UserPreferencesContextConsumer = UserPreferencesContext.Consumer;

export const withUserPreferencesContext = (Component) => (props) => (
  <ConnectedUserPreferencesController>
    <UserPreferencesContextConsumer>
      {(ctx) => <Component {...props} {...ctx} />}
    </UserPreferencesContextConsumer>
  </ConnectedUserPreferencesController>
);
