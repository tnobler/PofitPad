import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPropertyById } from '../../actions/property';

import PropertyCard from '../properties/PropertyCard';
// import Comps from './Comps';
import Spinner from '../layout/Spinner';
import Comps from '../comps/Comps';
import Snapshots from '../snapshots/Snapshots';

export const Property = ({
  getPropertyById,
  property: { property, loading, propertyDetail },
  match
}) => {
  const propertyId = match.params.propertyId;

  const [displaySnapshots, toggleSnapshots] = useState(false);
  const [displayComps, toggleComps] = useState(false);

  useEffect(() => {
    getPropertyById(propertyId);
  }, [getPropertyById, propertyId]);
  return (
    <Fragment>
      {property === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <PropertyCard property={property} propertyDetail={propertyDetail} />

          <div className='propertyCard'>
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
                      to={`/properties/${propertyId}/add-snapshot`}
                      className='btn btn-primary my-1'
                    >
                      Add Snapshot
                    </Link>
                  </div>

                  {displaySnapshots ? (
                    <>
                      <div className='compCard__snapshots'>
                        <Snapshots propertyId={propertyId} />
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className='propertyCard__snapshot'>
                  <div>
                    <Link
                      to={`/properties/${propertyId}`}
                      className='btn btn-primary my-1'
                    >
                      View Property
                    </Link>
                    <Link
                      to={`/property/${propertyId}/snapshot`}
                      className='btn btn-primary'
                    >
                      View Snapshots
                    </Link>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
          <br />
          <div className='compCard'>
            <div className='compCard__links'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => toggleComps(!displayComps)}
              >
                View Comps
              </button>
              <br />
              <Link
                className='btn btn-primary'
                to={`/properties/${propertyId}/add-comp`}
              >
                Add Comp
              </Link>
            </div>

            <div className='my-1'>
              {displayComps ? (
                <>
                  <div className='compCard__comps'>
                    <Comps propertyId={propertyId} />
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  property: state.property
});

export default connect(mapStateToProps, { getPropertyById })(Property);
