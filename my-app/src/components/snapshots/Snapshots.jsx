import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSnapshots } from '../../actions/property';

import Spinner from '../layout/Spinner';
import SnapshotItem from './SnapshotItem';

const Snapshots = ({
  property: { snapshots, loading },
  getSnapshots,
  propertyId
}) => {
  useEffect(() => {
    getSnapshots(propertyId);
  }, [getSnapshots]);

  return loading || snapshots === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Snapshots</h1>
      <p className='lead'>
        <i className='fas fa-home'></i> Here are your Snapshots
      </p>
      <div className='properties'>
        {snapshots.length > 0 ? (
          snapshots.map(snapshot => (
            <SnapshotItem
              key={snapshot._id}
              snapshot={snapshot}
              propertyId={propertyId}
            />
          ))
        ) : (
          <Fragment>
            <h4>No snapshots Found...</h4>
            <br />
            <Link
              to={`/properties/${propertyId}/add-snapshot`}
              className='btn btn-light'
            >
              <i className='fas fa-home text-primary'></i> Add Snapshot
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Snapshots.propTypes = {};

const mapStateToProps = state => ({
  property: state.property
});

export default connect(mapStateToProps, { getSnapshots })(Snapshots);
