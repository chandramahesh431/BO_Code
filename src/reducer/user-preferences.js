import * as actionTypes from '../actions/user-preferences/types';


export const userPreferencesInitialState = {
  language: 'en',
}; 

export default (state = userPreferencesInitialState, action = {}) => {
  switch (action.type) {
    case actionTypes.USER_PREFERENCES_SUCCESS:
    case actionTypes.USER_PREFERENCES_UPDATE_SUCCESS:
      return {
        ...state,
        language: action.payload.language,
        isFetching: false,
        serverErrors: null,
      };
    case actionTypes.USER_PREFERENCES_FAILURE:
    case actionTypes.USER_PREFERENCES_UPDATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        serverErrors: action.payload,
      };
    case actionTypes.SET_USER_INFO:
      return { ...state, userInfo: { ...action.payload } };
    case actionTypes.CURRENT_USER_PERMISSION_SUCCESS:
      return {
        ...state,
        currentUserPermissions: action.payload,
      };
    default:
      return state;
  }
};
