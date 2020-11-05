import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_PROPERTY,
  PROPERTY_ERROR,
  GET_PROPERTIES,
  GET_PROPERTY,
  CLEAR_PROPERTY,
  UPDATE_PROPERTY,
  GET_COMPS,
  COMP_ERROR,
  CLEAR_COMPS,
  REMOVE_COMP,
  GET_SNAPSHOTS,
  SNAPSHOT_ERROR,
  REMOVE_SNAPSHOT
} from './types';

// Get current user's properties
export const getProperties = () => async dispatch => {
  dispatch({ type: CLEAR_PROPERTY });
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
    const errors = err.response.data.errors;

    if (err.response.data && errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROPERTY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Property by ID
export const getPropertyById = propertyId => async dispatch => {
  dispatch({ type: CLEAR_PROPERTY });
  try {
    const res = await axios.get(`/api/v1/properties/${propertyId}`);

    dispatch({
      type: GET_PROPERTY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROPERTY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Comparable Property
export const addComp = (propertyId, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      `/api/v1/properties/${propertyId}/comp`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROPERTY,
      payload: res.data
    });

    dispatch(setAlert('Comparable Added', 'success'));

    history.push(`/properties/${propertyId}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (err.response.data && errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROPERTY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all comps by propertyId
export const getComps = propertyId => async dispatch => {
  // dispatch({ type: CLEAR_COMPS });
  try {
    const res = await axios.get(`/api/v1/properties/${propertyId}/comps`);

    dispatch({
      type: GET_COMPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comp by compId
export const deleteComp = (propertyId, compId) => async dispatch => {
  try {
    await axios.delete(`/api/v1/properties/${propertyId}/comps/${compId}`);

    dispatch({
      type: REMOVE_COMP,
      payload: compId
    });

    dispatch(setAlert('Comp Removed', 'success'));
  } catch (err) {
    dispatch({
      type: COMP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Property Snapshot
export const addSnapshot = (
  propertyId,
  formData,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      `/api/v1/properties/${propertyId}/snaphot`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROPERTY,
      payload: res.data
    });

    dispatch(setAlert('Snapshot Added', 'success'));

    history.push(`/properties/${propertyId}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (err.response.data && errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SNAPSHOT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all snapshots by snapshotId
export const getSnapshots = propertyId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/properties/${propertyId}/snapshots`);

    dispatch({
      type: GET_SNAPSHOTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SNAPSHOT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Snapshot by snapshotId

// Delete snapshot by snapshotId
export const deleteSnapshot = (propertyId, compId) => async dispatch => {
  try {
    await axios.delete(`/api/v1/properties/${propertyId}/comps/${compId}`);

    dispatch({
      type: REMOVE_SNAPSHOT,
      payload: compId
    });

    dispatch(setAlert('Comp Removed', 'success'));
  } catch (err) {
    dispatch({
      type: SNAPSHOT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Calculate
