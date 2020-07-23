
import React, { createContext } from 'react';
import { ConnectedUserManagementController } from './user-management-controller';

// Create the context
export const userManagementContextDefaultValue = {
  usersList: [],
  selectedRowIndex: -1,
};

const UserManagementContext = createContext(userManagementContextDefaultValue);

// Export Provider and Consumer
export const UserManagementContextProvider = UserManagementContext.Provider;
export const UserManagementContextConsumer = UserManagementContext.Consumer;

export const withUserManagementContext = (Component) => (props) => (
  <ConnectedUserManagementController>
    <UserManagementContextConsumer>
      {(ctx) => <Component {...props} {...ctx} />}
    </UserManagementContextConsumer>
  </ConnectedUserManagementController>
);
