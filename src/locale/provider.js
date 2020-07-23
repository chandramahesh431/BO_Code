import React, { Fragment } from "react";
import { LOCALES } from "./locales";
import { IntlProvider } from "react-intl";
import messages from "./messages/index";

const Provider = ({ children, locale = LOCALES.english }) => (
  <IntlProvider
    locale={locale}
    textComponent={Fragment}
    messages={messages[locale]}
  >
    {children}
  </IntlProvider>
);

export default Provider;
