import {
  ADD_PROPERTY,
  GET_PROPERTIES,
  GET_PROPERTY,
  PROPERTY_ERROR,
  CLEAR_PROPERTY,
  UPDATE_PROPERTY,
  GET_COMPS,
  COMP_ERROR,
  CLEAR_COMPS,
  REMOVE_COMP
} from '../actions/types';

const initialState = {
  property: null,
  properties: [],
  loading: true,
  error: {},
  propertyDetail: false,
  comps: []
};

const property = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROPERTY:
    case UPDATE_PROPERTY:
      return {
        ...state,
        property: payload,
        loading: false,
        propertyDetail: true
      };
    case GET_PROPERTIES:
      return {
        ...state,
        properties: payload,
        loading: false,
        propertyDetail: false
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
    case CLEAR_PROPERTY:
      return {
        ...state,
        property: null,
        loading: false,
        propertyDetail: false
      };
    case CLEAR_COMPS:
      return {
        ...state,
        comps: null,
        loading: false,
        propertyDetail: false
      };
    case GET_COMPS:
      return {
        ...state,
        comps: payload,
        loading: false
      };

    case COMP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        comps: null
      };
    case REMOVE_COMP:
      return {
        ...state,
        comps: state.comps.filter(comp => comp._id !== payload),
        loading: false
      };

    default:
      return state;
  }
};

export default property;
