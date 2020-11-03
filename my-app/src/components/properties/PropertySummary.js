import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PropertySummary = ({
  property: {
    user: { _id, name, avatar },
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
    askingprice
  }
}) => {
  return (
    <div className='property bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>
          {streetnumber} {streetname}
        </h2>
        <h2>
          {city}, {state} {zipcode}
        </h2>
        {/* <p>
          {squarefeet} {lotsize && <span> at {lotsize}</span>}
        </p>
        <p className='my-1'>{beds && <span>{beds}</span>}</p> */}
        <Link to={`/property/${_id}`} className='btn btn-primary'>
          View Property
        </Link>
      </div>
      {/* <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'>{skill}</i>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

PropertySummary.propTypes = {
  property: PropTypes.object.isRequired
};

export default PropertySummary;
