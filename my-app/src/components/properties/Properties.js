import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProperties } from '../../actions/property';
import PropertyCard from './PropertyCard';

const Properties = ({ getProperties, property: { properties, loading } }) => {
  useEffect(() => {
    getProperties();
  }, [getProperties]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Properties</h1>
      <p className='lead'>
        <i className='fas fa-home'></i> Here are your Properties
      </p>
      <div className='properties'>
        {properties.length > 0 ? (
          properties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <Fragment>
            <h4>No Properties Found...</h4>
            <br />
            <Link to='/add-property' className='btn btn-light'>
              <i className='fas fa-home text-primary'></i> Add Property
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Properties.propTypes = {
  property: PropTypes.object.isRequired,
  getProperties: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  property: state.property
});

export default connect(mapStateToProps, { getProperties })(Properties);
