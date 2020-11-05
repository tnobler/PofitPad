import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import SnapshotForm from './SnapshotForm';
import { getPropertyById } from '../../actions/property';

const AddSnapshot = ({ history, match, property }) => {
  const propertyId = match.params.propertyId;

  useEffect(() => {
    getPropertyById(propertyId);
  }, [propertyId]);

  return (
    <Fragment>
      <SnapshotForm
        history={history}
        propertyId={propertyId}
        // property={property}
      />
    </Fragment>
  );
};

AddSnapshot.propTypes = {};

const mapStateToProps = state => ({
  property: state.property
});

export default connect(mapStateToProps, { getPropertyById })(AddSnapshot);
