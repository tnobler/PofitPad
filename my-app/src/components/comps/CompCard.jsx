import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { useState } from 'react';

const CompCard = ({
  comp: {
    _id,
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
    askingprice,
    date
  },
  propertyDetail
}) => {
  const [displaySnapshots, toggleSnapshots] = useState(false);

  return (
    <div className='compCard'>
      <div className='compCard-top'>
        <div className='compCard__address'>
          {streetnumber} {streetname}
          <br />
          {city}, {state} {zipcode}
          <br />
          <div className='compCard__submarket'>{submarket} Submarket</div>
          <div className='compCard__date'>
            Created on <Moment format='DD/MM/YYYY'>{date}</Moment>
          </div>
        </div>

        <div className='compCard__property-stats'>
          Asking Price:{' '}
          <NumberFormat
            value={askingprice}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
          <br />
          {beds} bed/{baths} bath
          <br />
          sqft: {squarefeet}
          <br />
          Lot size: {lotsize}
        </div>
      </div>

      {propertyDetail ? (
        <Fragment>
          <div className=''>
            <div>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => toggleSnapshots(!displaySnapshots)}
              >
                View Snapshots
              </button>
              <Link
                to={`/properties/${_id}/add-snapshot`}
                className='btn btn-primary my-1'
              >
                Add Snapshot
              </Link>
            </div>

            {displaySnapshots ? (
              <div className='compCard__snapshot'>Snapshot 1 Snapshot 2</div>
            ) : (
              ''
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='compCard__snapshot'>
            <div>
              <Link to={`/properties/${_id}`} className='btn btn-primary my-1'>
                View Property
              </Link>
              <Link
                to={`/property/${_id}/snapshot`}
                className='btn btn-primary'
              >
                View Snapshots
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

CompCard.propTypes = {};

export default CompCard;
