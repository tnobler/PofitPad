import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

const PropertyCard = ({
  property: {
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
  // const [displaySnapshots, toggleSnapshots] = useState(false);

  return (
    <div className='propertyCard'>
      <div className='propertyCard-top'>
        <div className='propertyCard__address'>
          {streetnumber} {streetname}
          <br />
          {city}, {state} {zipcode}
          <br />
          <div className='propertyCard__submarket'>{submarket} Submarket</div>
          <div className='propertyCard__date'>
            Created on <Moment format='DD/MM/YYYY'>{date}</Moment>
          </div>
        </div>

        <div className='propertyCard__property-stats'>
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
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <div className='propertyCard__snapshot'>
            <div>
              <Link to={`/properties/${_id}`} className='btn btn-primary my-1'>
                View Property
              </Link>
              <Link
                // to={`/property/${_id}/snapshot`}
                to={'#1'}
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

PropertyCard.propTypes = {};

export default PropertyCard;
