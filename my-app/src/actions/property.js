import axios from 'axios';
import { setAlert } from './alert';
import { ADD_PROPERTY, PROPERTY_ERROR, GET_PROPERTIES } from './types';

// Get current user's properties
export const getProperties = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/properties/me');

    dispatch({
      type: GET_PROPERTIES,
      payload: res.data
    });
  } catch (err) {
    // dispatch({ type: CLEAR_PROPERTIES })
    dispatch({
      type: PROPERTY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Property
export const addProperty = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/v1/properties', formData, config);

    dispatch({
      type: ADD_PROPERTY,
      payload: res.data
    });

    dispatch(setAlert('Property Added', 'success'));

    history.push('/properties');
  } catch (err) {
    console.error(err);
    const errors = err.response.data.errors;
    console.log(err.response);
    console.log(err.response.data);
    console.log(err.response.data.errors);

    if (err.response.data && errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROPERTY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
