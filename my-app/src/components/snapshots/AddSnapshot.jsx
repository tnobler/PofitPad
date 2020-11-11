import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import SnapshotForm from './SnapshotForm';
import { addSnapshot } from '../../actions/property';

const AddSnapshot = ({ history, match }) => {
  const propertyId = match.params.propertyId;

  return (
    <Fragment>
      <SnapshotForm history={history} propertyId={propertyId} />
    </Fragment>
  );
};

export default connect(null, { addSnapshot })(AddSnapshot);
