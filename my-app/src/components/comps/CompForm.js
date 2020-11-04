import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComp } from '../../actions/property';

const CompForm = ({ addComp, history, propertyId }) => {
  const [formData, setFormData] = useState({
    streetnumber: '',
    streetname: '',
    city: '',
    state: '',
    zipcode: '',
    submarket: '',
    squarefeet: '',
    lotsize: '',
    beds: '',
    baths: '',
    soldprice: ''
  });

  const {
    streetnumber,
    streetname,
    city,
    state,
    zipcode,
    submarket,
    squarefeet,
    lotsize,
    beds,
    baths,
    soldprice
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addComp(propertyId, formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add New Comp</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Add a new comparable property to the
        subject.
      </p>

      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Street Number'
            name='streetnumber'
            value={streetnumber}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Ex. 123 or 18408</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Street Name'
            name='streetname'
            value={streetname}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Ex. Main Street or Lubbock Road</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* City'
            name='city'
            value={city}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Ex. Lubbock, Dallas, New York...</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* State'
            name='state'
            value={state}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Ex. Texas, TX, or Tx</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Zipcode'
            name='zipcode'
            value={zipcode}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Ex. 79401</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Neighborhood/Submarket'
            name='submarket'
            value={submarket}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Ex. "Melonie Park" or "Heart of Lubbock"
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Squarefootage'
            name='squarefeet'
            value={squarefeet}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Living Area SQFT, Ex. 1200</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Lot Size'
            name='lotsize'
            value={lotsize}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Lot size in Square Feet Ex. 30,000
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* # of Beds'
            name='beds'
            value={beds}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Number of Bedrooms Ex. 3</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* # of Baths'
            name='baths'
            value={baths}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Number of Bathrooms Ex. 2</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Sold Price'
            name='soldprice'
            value={soldprice}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>How much did this comp Sell for?</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to={`/properties/${propertyId}`}>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CompForm.propTypes = {
  addComp: PropTypes.func.isRequired
};

export default connect(null, { addComp })(CompForm);
