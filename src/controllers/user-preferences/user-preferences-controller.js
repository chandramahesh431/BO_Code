
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserPreferencesContextProvider } from './user-preferences-context';
import {
  requestUserPreferences,
  updateUserPreferences,
  getUserInfo,
  getCurrentUserPermissions,
} from '../../actions/user-preferences';

export class UserPreferencesController extends Component {
  render() {
    const {
      children,
      language,
      userInfo,
      requestUserPreferences,
      updateUserPreferences,
      getUserInfo,
      currentUserPermissions,
      getCurrentUserPermissions,
    } = this.props;

    return (
      <UserPreferencesContextProvider
        value={{
          language,
          userInfo,
          requestUserPreferences,
          updateUserPreferences,
          getUserInfo,
          currentUserPermissions,
          getCurrentUserPermissions,
        }}
      >
        {children}
      </UserPreferencesContextProvider>
    );
  }
}

UserPreferencesController.propTypes = {
  children: PropTypes.element,
  language: PropTypes.string,
  userInfo: PropTypes.object,
  requestUserPreferences: PropTypes.func,
  updateUserPreferences: PropTypes.func,
  getUserInfo: PropTypes.func,
  currentUserPermissions: PropTypes.array,
  getCurrentUserPermissions: PropTypes.func,
};

const mapStateToProps = ({ userPreferences }) => ({ ...userPreferences });

const mapDispatchToProps = {
  requestUserPreferences,
  updateUserPreferences,
  getUserInfo,
  getCurrentUserPermissions,
};

export const ConnectedUserPreferencesController = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPreferencesController);
