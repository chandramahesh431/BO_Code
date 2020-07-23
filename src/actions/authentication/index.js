import axios from 'axios';
import {
  formulasetURL,
} from '../../services/formula-sets';
import { RESPONSE_CODE } from '../../constants/api';
import {
  SET_IS_FIRST_TIME_LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE, 
} from './types';

export const setFirstTimeLogin = (isFirstTimeLogin = false) => ({
  type: SET_IS_FIRST_TIME_LOGIN,
  isFirstTimeLogin,
});

export const loginRequestActionCreator = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccessActionCreator = (auth) => {
  return {
    type: LOGIN_SUCCESS,
    payload: auth,
  };
};

export const loginFailureActionCreator = (formErrors) => {
  return {
    type: LOGIN_FAILURE,
    payload: formErrors,
  };
};

export const updateStoreForFormulaSet = (data) => {
  return {
    type: 'GetFormulaSet',
    payload: data,
  };
};

export const getFormulaSets = (
  id,
) => async (dispatch) => {
  try {
    const { status, data } = await axios.get(
      `${formulasetURL()}`,
    );
    if (status === RESPONSE_CODE.SUCCESS) {
      dispatch(updateStoreForFormulaSet(data));
    }
  } catch (error) {
    // No action on error
  }
};



