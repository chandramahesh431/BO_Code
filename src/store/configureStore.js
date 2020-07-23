
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import * as appReducers from '../reducer';
import { RESET_STORE } from '../actions/authentication/types';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appReducer = combineReducers({ ...appReducers });

const rootReducer = (state, action) => {
  return appReducer(action.type === RESET_STORE ? {} : state, action);
};

export default () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(reduxThunk)),
  );
};
