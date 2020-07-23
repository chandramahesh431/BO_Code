
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserManagementContextProvider } from './user-management-context';
import { enableRowEdit, getUsers } from '../../actions/user-management';

export class UserManagementController extends Component {
  render() {
    const {
      children,
      usersList,
      roleList,
      countryCodeList,
      userObj,
      selectedRowIndex,
      enableRowEdit,
      getUsers,
    } = this.props;

    return (
      <UserManagementContextProvider
        value={{
          usersList,
          selectedRowIndex,
          enableRowEdit,
          roleList,
          countryCodeList,
          userObj,
          getUsers,
        }}
      >
        {children}
      </UserManagementContextProvider>
    );
  }
}

UserManagementController.propTypes = {
  children: PropTypes.element,
  usersList: PropTypes.array,
  roleList: PropTypes.array,
  countryCodeList: PropTypes.array,
  selectedRowIndex: PropTypes.number,
  enableRowEdit: PropTypes.func,
  userObj: PropTypes.array,
  getUsers: PropTypes.func,
};

const mapStateToProps = ({ userManagement }) => ({ ...userManagement });

const mapDispatchToProps = {
  enableRowEdit,
  getUsers,
};

export const ConnectedUserManagementController = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserManagementController);
