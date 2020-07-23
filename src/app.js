import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import AppDefault from "./pages/old-formula-set/Components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider as ProviderLocalization, LOCALES } from "./locale";
const language = LOCALES.english;

const store = configureStore();
const App = () => (
  <ProviderLocalization locale={language}>
    <Provider store={store}>
      <BrowserRouter>
        <AppDefault />
      </BrowserRouter>
    </Provider>
  </ProviderLocalization>
);

export default App;
