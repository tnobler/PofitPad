import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import PropertyForm from './PropertyForm';

const CreateProperty = ({ history }) => {
  return (
    <Fragment>
      <PropertyForm history={history} />
    </Fragment>
  );
};

export default connect(null, {})(CreateProperty);
