import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getComps } from '../../actions/property';

import Spinner from '../layout/Spinner';
import CompItem from './CompItem';

const Comps = ({ property: { comps, loading }, getComps, propertyId }) => {
  useEffect(() => {
    getComps(propertyId);
  }, [getComps]);

  return loading || comps === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Comps</h1>
      <p className='lead'>
        <i className='fas fa-home'></i> Here are your Comps
      </p>
      <div className='properties'>
        {comps.length > 0 ? (
          comps.map(comp => (
            <CompItem key={comp._id} comp={comp} propertyId={propertyId} />
          ))
        ) : (
          <Fragment>
            <h4>No Comps Found...</h4>
            <br />
            <Link
              to={`/properties/${propertyId}/add-comp`}
              className='btn btn-light'
            >
              <i className='fas fa-home text-primary'></i> Add Comp
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Comps.propTypes = {};

const mapStateToProps = state => ({
  property: state.property
});

export default connect(mapStateToProps, { getComps })(Comps);
