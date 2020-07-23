

import * as types from './types';

export const userPreferencesSuccessActionCreator = (preferences) => {
  return {
    type: types.USER_PREFERENCES_SUCCESS,
    payload: preferences,
  };
};

export const updateUserInfoActionCreator = (userInfo) => {
  return {
    type: types.SET_USER_INFO,
    payload: userInfo,
  };
};
export const userPreferencesFailureActionCreator = (serverErrors) => {
  return {
    type: types.USER_PREFERENCES_FAILURE,
    payload: serverErrors,
  };
};


export const userPreferencesUpdateSuccessActionCreator = (preferences) => {
  return {
    type: types.USER_PREFERENCES_UPDATE_SUCCESS,
    payload: preferences,
  };
};

export const userPreferencesUpdateFailureActionCreator = (serverErrors) => {
  return {
    type: types.USER_PREFERENCES_UPDATE_FAILURE,
    payload: serverErrors,
  };
};


