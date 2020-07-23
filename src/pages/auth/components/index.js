import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withAuthenticationContext } from "../../../controllers/authentication/authentication-context";
import Localization from "../../../hoc/localization";

const AuthManagement = (props) => {
  const { loginSuccessActionCreator } = props;
  console.log("authentication");
  console.log(props);
  useEffect(() => {
    //getUsers()
    loginSuccessActionCreator("authtest");
  }, []);
  return <div>{props.localizeText("authentication")}</div>;
};

AuthManagement.propTypes = {
  usersList: PropTypes.array,
};

export default Localization(withAuthenticationContext(AuthManagement));
