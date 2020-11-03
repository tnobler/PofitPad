import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProperty } from '../../actions/property';
import PropertyForm from './PropertyForm';

const CreateProperty = ({ addProperty }) => {
  return (
    <Fragment>
      <PropertyForm submitAction={addProperty} />
    </Fragment>
  );
};

CreateProperty.propTypes = {
  addProperty: PropTypes.func.isRequired
};

export default connect(null, { addProperty })(CreateProperty);
