import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSnapshot, getComps, getPropertyById } from '../../actions/property';
import NumberFormat from 'react-number-format';
import Spinner from '../layout/Spinner';
import CurrencyInput from 'react-currency-input';

const SnapshotForm = ({
  addSnapshot,
  getPropertyById,
  getComps,
  history,
  propertyId,
  propertyData: { property, comps, loading }
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    avgcompprice: '',
    avgcomppriceperfoot: '',
    afterrepairvalue: '',
    margin: '',
    estimatedrepairs: '',
    offerprice: '',
    notes: ''
  });

  const {
    title,
    description,
    avgcompprice,
    avgcomppriceperfoot,
    afterrepairvalue,
    margin,
    estimatedrepairs,
    offerprice,
    notes
  } = formData;

  const handleCalcOfferPrice = () => console.log('Handle Cacl Offer Price');

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addSnapshot(propertyId, formData, history);
  };

  const calcAvgCompPrice = () =>
    comps.reduce((sum, i) => (sum += Number(i.soldprice)), 0) / comps.length;

  const calcAvgCompSquarefeet = () =>
    comps.reduce((sum, i) => (sum += Number(i.squarefeet)), 0) / comps.length;

  useEffect(() => {
    getPropertyById(propertyId);
    getComps(propertyId);
  }, [getComps, getPropertyById, propertyId]);

  return (
    <Fragment>
      {comps === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Add New Snapshot</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Add a new snapshot analysis for the
            property.
          </p>

          <small>* = required field</small>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Title'
                name='title'
                value={title}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                What do you want to call this snapshot? Ex. 10% Margin, $30k
                repairs, etc.
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Description'
                name='description'
                value={description}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Add any details to remind you what this snapshot includes.{' '}
              </small>
            </div>
            <div className='form-group'>
              <h1 className='compCard__property-stats'>Comps Sold Price</h1>
              <ul className='compCard__property-stats'>
                {comps.map((comp, i) => (
                  <li className='' key={i}>
                    {comp.streetnumber} {comp.streetname}:{' '}
                    {
                      <NumberFormat
                        value={comp.soldprice}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        decimalScale={0}
                      />
                    }
                  </li>
                ))}
              </ul>

              <p>
                <b>
                  Average Comp Sold Price:{' '}
                  <NumberFormat
                    value={calcAvgCompPrice()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale={0}
                  />
                </b>
              </p>

              <CurrencyInput
                type='text'
                placeholder='Avg Comp Price'
                name='avgcompprice'
                value={avgcompprice}
                onChangeEvent={e => onChange(e)}
                prefix='$'
                precision='0'
              />
              <small className='form-text'>
                This is the Average of the Sold Prices of the Comps for this
                Property (ex: Enter Number above ${calcAvgCompPrice().toFixed()}
                ).
              </small>
            </div>

            {/* /ft */}

            <div className='form-group'>
              <h1 className='compCard__property-stats'>Comps $/sqft</h1>
              <ul className='compCard__property-stats'>
                {comps.map((comp, i) => (
                  <li className='' key={i}>
                    {comp.streetnumber} {comp.streetname}:{' '}
                    {
                      <NumberFormat
                        value={comp.soldprice / comp.squarefeet}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        decimalScale={0}
                      />
                    }
                    /sqft
                  </li>
                ))}
              </ul>

              <p>
                <b>
                  Average Comp Sold Price/sqft:{' '}
                  <NumberFormat
                    value={calcAvgCompPrice() / calcAvgCompSquarefeet()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale={0}
                  />
                  /sqft
                </b>
              </p>

              <CurrencyInput
                type='text'
                placeholder='Avg Comp Price/sqft'
                name='avgcomppriceperfoot'
                value={avgcomppriceperfoot}
                onChangeEvent={e => onChange(e)}
                prefix='$'
                precision='0'
              />
              <small className='form-text'>
                This is the Average of the Sold Prices/sqft of the Comps for
                this Property (ex: Enter Number above $
                {(calcAvgCompPrice() / calcAvgCompSquarefeet()).toFixed()}
                ).
              </small>
            </div>

            <div className='form-group'>
              <p>
                <b>ARV</b>
                <br />
                <b>
                  Average Comp Sold Price/sqft * Subject Sqft:{' '}
                  <NumberFormat
                    value={
                      property &&
                      (calcAvgCompPrice() / calcAvgCompSquarefeet()) *
                        property.squarefeet
                    }
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale={0}
                  />
                </b>
              </p>

              <CurrencyInput
                type='text'
                placeholder='* ARV'
                name='afterrepairvalue'
                value={afterrepairvalue}
                onChangeEvent={e => onChange(e)}
                prefix='$'
                precision='0'
              />
              <small className='form-text'>
                Enter the Expected After Repair Value. (Ex. Enter Number above $
                {property &&
                  (
                    (calcAvgCompPrice() / calcAvgCompSquarefeet()) *
                    property.squarefeet
                  ).toFixed()}
                )
              </small>
            </div>

            <div className='form-group'>
              <input
                type='text'
                placeholder='* Expected Margin'
                name='margin'
                value={margin}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Enter Expected Margin required. (Ex. %20)
              </small>
            </div>

            <div className='form-group'>
              <CurrencyInput
                type='text'
                placeholder='* Estimated Repairs'
                name='estimatedrepairs'
                value={estimatedrepairs}
                onChangeEvent={e => onChange(e)}
                prefix='$'
                precision='0'
              />
              <small className='form-text'>
                Enter the total amount of repairs needed. (Ex. $15,000)
              </small>
            </div>
            <div>
              <button type='button' onClick={handleCalcOfferPrice()}>
                Calculate Offer Price
              </button>
            </div>

            <button type='submit' className='btn btn-primary my-1'>
              Submit
            </button>
            <Link
              className='btn btn-light my-1'
              to={`/properties/${propertyId}`}
            >
              Go Back
            </Link>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

SnapshotForm.propTypes = {
  addSnapshot: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  propertyData: state.property
});

export default connect(mapStateToProps, {
  addSnapshot,
  getPropertyById,
  getComps
})(SnapshotForm);
