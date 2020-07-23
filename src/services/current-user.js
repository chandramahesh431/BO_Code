
import { API_URL } from '../settings';

export const currentUserApi = 'current-user';
export const userInfoAPI = 'users';

export const preferencesURL = () => {
  return `${API_URL}/${currentUserApi}/preferences`;
};

export const userInfoURL = (userId) => {
  return `${API_URL}/${userInfoAPI}/${userId}`;
};


