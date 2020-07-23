
import { API_URL } from '../settings';

const api = 'getformulaset';

export const formulasetURL = () => {
  return `${API_URL}/${api}`;
};

export const formulasetByIdURL = (id) => {
  return `${API_URL}/${api}/${id}`;
};

