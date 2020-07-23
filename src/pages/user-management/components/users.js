import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withUserManagementContext } from "../../../controllers/user-management/user-management-context";
import Localization from "../../../hoc/localization";

let UserManagement = (props) => {
  const { getUsers } = props;
  console.log("User management");
  console.log(props);
  useEffect(() => {
    getUsers();
    //loginSuccessActionCreator('authtest')
  }, []);
  return <div>{props.localizeText("UserList")}</div>;
};

UserManagement.propTypes = {
  usersList: PropTypes.array,
};

export default Localization(withUserManagementContext(UserManagement));
