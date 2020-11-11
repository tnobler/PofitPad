import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CompForm from './CompForm';

const AddComp = ({ history, match }) => {
  const propertyId = match.params.propertyId;

  return (
    <Fragment>
      <CompForm history={history} propertyId={propertyId} />
    </Fragment>
  );
};

export default connect(null, {})(AddComp);
