import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSnapshot, getComps, getPropertyById } from '../../actions/property';
import NumberFormat from 'react-number-format';
import Spinner from '../layout/Spinner';
import CurrencyInput from 'react-currency-input';

// @todo maybe make 2 input fields:
// arv $
// arv $/ft
// each calculates its own value || the other */ sqft

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

  const [showOfferPrice, setShowOfferPrice] = useState(false);
  const [displayNotes, toggleDisplayNotes] = useState(false);
  const [customArv, toggleCustomArv] = useState(false);
  // const [useSuggested, setUseSuggested] = useState(true);
  const [activeButton, setActiveButton] = useState('$');

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

  const logFormData = e => {
    setFormData({
      ...formData,
      avgcompprice: calcAvgCompPrice
    });
    setFormData({
      ...formData,
      avgcomppriceperfoot: avgcomppriceperfoot
    });
    console.log(formData);
  };

  const handleSelectedButton = selectedButton => e => {
    e.preventDefault();
    console.log(selectedButton);
    setActiveButton(selectedButton);
  };

  const handleCalcOfferPrice = e => {
    e.preventDefault();
    const numEstimatedRepairs = Number(
      estimatedrepairs.replace(/[^0-9\.-]+/g, '')
    );

    const numSuggestedArv = Number(afterrepairvalue.replace(/[^0-9\.-]+/g, ''));

    const numCustomArvPerSqft = Number(
      afterrepairvalue.replace(/[^0-9\.-]+/g, '') * property.squarefeet
    );

    if (activeButton === '$') {
      const calcSuggestedOfferPrice =
        numSuggestedArv * (1 - Number(margin)) - numEstimatedRepairs;

      setFormData({
        ...formData,
        offerprice: calcSuggestedOfferPrice.toString()
      });

      setShowOfferPrice(true);
    } else {
      const calcCustomOfferPrice =
        numSuggestedArv * Number(property.squarefeet) * (1 - Number(margin)) -
        numEstimatedRepairs;

      setFormData({ ...formData, offerprice: calcCustomOfferPrice });

      setShowOfferPrice(true);
    }
  };

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  const onChangeCurrency = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.replace(/[^0-9\.-]+/g, '')
    });

  const onSubmit = e => {
    e.preventDefault();
    setFormData({
      ...formData,
      avgcompprice: calcAvgCompPrice
    });
    setFormData({
      ...formData,
      avgcomppriceperfoot: avgcomppriceperfoot
    });

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
              <h1 className='compCard__property-stats'>Comps Summary</h1>
              <table>
                <thead>
                  <tr className='table th'>
                    <th className='table th'>Address</th>
                    <th className='table th'>Sold Price</th>
                    <th className='table th'>Price/Sqft</th>
                  </tr>
                </thead>
                <tbody>
                  {comps.map((comp, i) => (
                    <tr className='' key={i}>
                      <td className='table-td'>
                        {comp.streetnumber} {comp.streetname}:{' '}
                      </td>
                      <td className='table-td'>
                        {
                          <NumberFormat
                            value={comp.soldprice}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                            decimalScale={0}
                          />
                        }
                      </td>
                      <td className='table-td'>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className='table-footer'>
                  <tr>
                    <td>Averages</td>
                    <td className='table-footer__td'>
                      <NumberFormat
                        value={calcAvgCompPrice()}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        decimalScale={0}
                      />
                    </td>
                    <td className='table-footer__td'>
                      <NumberFormat
                        value={calcAvgCompPrice() / calcAvgCompSquarefeet()}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        decimalScale={0}
                      />
                      /sqft
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className='form-group'>
              <h1>Suggested ARV:</h1>

              <h1>
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
              </h1>

              <button
                type='button'
                className='btn my-1'
                onClick={() => {
                  setFormData({
                    ...formData,
                    afterrepairvalue: (
                      (calcAvgCompPrice() / calcAvgCompSquarefeet()) *
                      property.squarefeet
                    ).toFixed()
                  });
                }}
              >
                Use Suggested
              </button>
              <button
                className='btn my-1'
                type='button'
                onClick={() => {
                  toggleCustomArv(!customArv);
                  // setUseSuggested(false);
                }}
              >
                Customize ARV
              </button>

              {customArv && (
                <Fragment>
                  {/* <CurrencyInput
                    type='text'
                    placeholder='* ARV'
                    name='afterrepairvalue'
                    value={afterrepairvalue}
                    onChangeEvent={e => onChangeCurrency(e)}
                    prefix='$'
                    precision='0'
                  /> */}
                  <input
                    type='text'
                    placeholder='* ARV'
                    name='afterrepairvalue'
                    value={afterrepairvalue}
                    onChange={e => onChange(e)}
                  />

                  <div>
                    {['$', '$/sqft'].map(key => (
                      <button
                        className={
                          key === activeButton
                            ? 'btn btn-selected my-1'
                            : 'btn my-1'
                        }
                        type='button'
                        key={key}
                        onClick={handleSelectedButton(key)}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </Fragment>
              )}
            </div>

            <div className='form-group'>
              <p>
                <b>Expected Margin</b>
              </p>
              <input
                type='text'
                placeholder='* Expected Margin (as Decimal Ex .25)'
                name='margin'
                value={margin}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Enter Expected Margin required. (Ex. %20)
              </small>
            </div>

            <div className='form-group'>
              <p>
                <b>Estimated Repairs</b>
              </p>
              {/* <CurrencyInput
                inputType='text'
                placeholder='* Estimated Repairs'
                name='estimatedrepairs'
                value={estimatedrepairs}
                onChangeEvent={e => onChangeCurrency(e)}
                prefix='$'
                precision='0'
              /> */}

              <input
                type='text'
                placeholder='* Estimated Repairs'
                name='estimatedrepairs'
                value={estimatedrepairs}
                onChange={e => onChange(e)}
              />

              <small className='form-text'>
                Enter the total amount of repairs needed. (Ex. $15,000)
              </small>
            </div>

            <div>
              <button
                className='btn my-1'
                type='button'
                onClick={() => {
                  toggleDisplayNotes(!displayNotes);
                }}
              >
                Notes
              </button>
            </div>

            <div>
              {displayNotes && (
                <Fragment>
                  <div className='form-group'>
                    <p>
                      <b>Notes</b>
                    </p>
                    <textarea
                      name='notes'
                      placeholder='Add Notes Here'
                      cols='30'
                      rows='10'
                      value={notes}
                      onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                      Enter the total amount of repairs needed. (Ex. $15,000)
                    </small>
                  </div>
                </Fragment>
              )}
            </div>

            <div>
              {showOfferPrice && (
                <Fragment>
                  <h1 className='offerprice'>
                    Offer Price:{' '}
                    <NumberFormat
                      value={offerprice}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                      decimalScale={0}
                    />
                  </h1>
                </Fragment>
              )}
            </div>

            <div>
              <button
                className='btn my-1'
                type='button'
                onClick={e => {
                  handleCalcOfferPrice(e);
                }}
              >
                Calculate Offer Price
              </button>
            </div>

            <button type='submit' className='btn btn-primary my-1'>
              Save Snapshot
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
      <div>
        <button
          type='button'
          onClick={e => {
            logFormData(e);
          }}
        >
          Log FormData
        </button>
      </div>
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
