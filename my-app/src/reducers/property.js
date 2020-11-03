import { ADD_PROPERTY, GET_PROPERTIES, PROPERTY_ERROR } from '../actions/types';

const initialState = {
  properties: [],
  property: null,
  loading: true,
  error: {}
};

const property = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROPERTIES:
      return {
        ...state,
        properties: payload,
        loading: false
      };
    case ADD_PROPERTY:
      return {
        ...state,
        properties: [payload, ...state.properties],
        loading: false
      };
    case PROPERTY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        property: null
      };

    default:
      return state;
  }
};

export default property;
