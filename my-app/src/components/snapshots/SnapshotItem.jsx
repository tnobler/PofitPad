import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { deleteSnapshot } from '../../actions/property';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const SnapshotItem = ({
  snapshot: {
    _id,
    title,
    description,
    avgcompprice,
    avgcomppriceperfoot,
    afterrepairvalue,
    margin,
    estimatedrepairs,
    offerprice,
    notes,
    date
  },
  propertyId,
  deleteSnapshot
}) => {
  const [showNotes, setShowNotes] = useState(false);

  const handleDelete = e => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this Snapshot??',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteSnapshot(propertyId, _id)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  const handleShowNotes = e => {
    e.preventDefault();

    setShowNotes(!showNotes);
  };

  return (
    <Fragment>
      <div className='snapCard'>
        <div className='snapCard-top'>
          <div className='snapCard__summary'>
            <div className='snapCard__title'>{title}</div>
            <div className='snapCard__description'>{description}</div>

            <div className='snapCard__offerprice'>
              Offer Price:{' '}
              <NumberFormat
                value={offerprice}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={0}
              />
            </div>

            {avgcompprice && <div>{avgcompprice}</div>}
            {avgcomppriceperfoot && <div>{avgcomppriceperfoot}</div>}
            <br />
            <div className='snapCard__assumptions'>
              <div className='snapCard__assumptions-comps'>
                <div>ARV: {afterrepairvalue}</div>
                <div>Avg Comp Price: {avgcompprice}</div>
                <div>Avg Comp $/sqft: {avgcomppriceperfoot}</div>
              </div>

              <div className='snapCard__assumptions-user'>
                <div>Margin: {margin}</div>
                <div>Estimated Repairs: {estimatedrepairs}</div>
              </div>
            </div>
          </div>
        </div>

        <div className='snapCard__property-stats'>
          <div className='snapCard__date'>
            Snapshot Added <Moment format='DD/MM/YYYY'>{date}</Moment>
          </div>

          <div className='snapCard__notes'>
            <button
              className='btn btn-snapshot-notes'
              onClick={e => {
                handleShowNotes(e);
              }}
            >
              Show Notes
            </button>

            {showNotes && <div>Notes: {notes}</div>}
          </div>

          <button
            className='btn btn-danger btn-snapshot'
            onClick={e => {
              handleDelete(e);
            }}
          >
            Delete Snapshot
          </button>
          <br />
        </div>
      </div>
    </Fragment>
  );
};

SnapshotItem.propTypes = {};

export default connect(null, { deleteSnapshot })(SnapshotItem);
