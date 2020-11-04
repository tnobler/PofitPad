import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { deleteComp } from '../../actions/property';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CompItem = ({
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
    soldprice,
    date
  },
  propertyId,
  deleteComp
}) => {
  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this comp??',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteComp(propertyId, _id)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  return (
    <Fragment>
      <div className='compCard__address'>
        <div className='compCard-top'>
          <div className='compCard__address'>
            {streetnumber} {streetname}
            <br />
            {city}, {state} {zipcode}
            <br />
            <div className='compCard__submarket'>{submarket} Submarket</div>
            <div className='compCard__date'>
              Comp Added <Moment format='DD/MM/YYYY'>{date}</Moment>
            </div>
            <div className='compCard__links'>
              <Link to='#!' className='px-1'>
                Edit Comp
              </Link>
              <button
                onClick={() => {
                  handleDelete();
                }}
                className='px-1 delete'
              >
                Delete Comp
              </button>
            </div>
          </div>

          <div className='compCard__property-stats'>
            Sold Price:{' '}
            <NumberFormat
              value={soldprice}
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
      </div>
      <hr />
    </Fragment>
  );
};

CompItem.propTypes = {};

export default connect(null, { deleteComp })(CompItem);
