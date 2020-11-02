import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    company,
    website,
    location,
    position
  }
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <h2>{name}</h2>
      <p>
        {position} {company && <span> at {company}</span>}
      </p>
      <p className='my-1'>{location && <span>{location}</span>}</p>
      <p>{website && <span>{website}</span>}</p>

      <Link to={`/profile/${_id}`} className='btn btn-primary'>
        View Profile
      </Link>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
