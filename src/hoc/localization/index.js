import React from "react";
import { FormattedMessage } from "react-intl";

const RenderText = (id) => {
  return <FormattedMessage id={id}></FormattedMessage>;
};

const Localization = (WrappedComponent) => {
  return (props) => {
    return WrappedComponent({ ...props, localizeText: RenderText });
  };
};

export default Localization;
