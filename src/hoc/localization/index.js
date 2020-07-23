import React from "react";
import { FormattedMessage } from "react-intl";

const RenderText = (id) => {
  return <FormattedMessage id={id}></FormattedMessage>;
};

const Localization = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return WrappedComponent({ ...this.props, localizeText: RenderText });
    }
  };
};

export default Localization;
