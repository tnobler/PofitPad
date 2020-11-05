const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Property = require('../../../models/Property');
const Profile = require('../../../models/Profile');
const User = require('../../../models/User');

// @route    GET api/v1/properties/me
// @desc     Get current users properties
// @access   Private

router.get('/me', auth, async (req, res) => {
  try {
    const properties = await Property.find({
      user: req.user.id
    });

    if (!properties) {
      return res
        .status(400)
        .json({ msg: 'There are no properties for this user' });
    }

    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/v1/properties
// @desc     Create or update properties
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('streetnumber', 'Street Number is required').not().isEmpty(),
      check('streetname', 'Street Name is required').not().isEmpty(),
      check('city', 'City is required').not().isEmpty(),
      check('state', 'State is required').not().isEmpty(),
      check('zipcode', 'Zip Code is required').not().isEmpty(),
      check('squarefeet', 'Square footage is required').not().isEmpty(),
      check('beds', 'Number of Bedrooms is required').not().isEmpty(),
      check('baths', 'Number of Bathrooms is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
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
    } = req.body;

    // // Build property object
    // const propertyFields = {};
    // propertyFields.user = req.user.id;
    // if (streetnumber) propertyFields.streetnumber = streetnumber;
    // if (streetname) propertyFields.streetname = streetname;
    // if (city) propertyFields.city = city;
    // if (state) propertyFields.state = state;
    // if (zipcode) propertyFields.zipcode = zipcode;
    // if (submarket) propertyFields.submarket = submarket;
    // if (squarefeet) propertyFields.squarefeet = squarefeet;
    // if (lotsize) propertyFields.lotsize = lotsize;
    // if (beds) propertyFields.beds = beds;
    // if (baths) propertyFields.baths = baths;
    // if (askingprice) propertyFields.askingprice = askingprice;

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newProperty = new Property({
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
        user: req.user.id
      });

      const property = await newProperty.save();

      res.json(property);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/v1/properties/:propertyId
// @desc     Get property by property ID
// @access   Private
router.get('/:propertyId', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) return res.status(400).json({ msg: 'Property not found' });

    res.json(property);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Property not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/v1/properties/:id
// @desc     Delete property
// @access   Private
router.delete('/:propertyId', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) return res.status(400).json({ msg: 'Property not found' });

    // Check user
    if (property.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await property.remove();

    res.json({ msg: 'Property Deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Property not found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/v1/properties/:propertyId/comp
// @desc   Add property comps
// @access Private

router.put(
  '/:propertyId/comp',
  [
    auth,
    [
      check('streetnumber', 'Street Number is required').not().isEmpty(),
      check('streetname', 'Street Name is required').not().isEmpty(),
      check('city', 'City is required').not().isEmpty(),
      check('state', 'State is required').not().isEmpty(),
      check('zipcode', 'Zip Code is required').not().isEmpty(),
      check('squarefeet', 'Square footage is required').not().isEmpty(),
      check('beds', 'Number of Bedrooms is required').not().isEmpty(),
      check('baths', 'Number of Bathrooms is required').not().isEmpty(),
      check('soldprice', 'Sold Price is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      mlsnumber,
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
      soldprice
    } = req.body;

    const newComp = {
      mlsnumber,
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
      soldprice
    };

    try {
      const property = await Property.findById(req.params.propertyId);

      property.comps.unshift(newComp);

      await property.save();

      res.json(property);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/v1/properties/:propertyId/comps
// @desc   GET all comps for Property
// @access Private

router.get('/:propertyId/comps', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return res.status(400).json({ msg: 'Cannot find Property' });
    }

    res.json(property.comps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/v1/properties/:propertyId/comps/:compId
// @desc   GET Comp by compID
// @access Private

// @route  DELETE api/v1/properties/:propertyId/comps/:compId
// @desc   Delete comp from Property
// @access Private

router.delete('/:propertyId/comps/:compId', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    // Get remove index
    const removeIndex = property.comps
      .map(item => item.id)
      .indexOf(req.params.compId);

    property.comps.splice(removeIndex, 1);

    await property.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/properties/:propertyId/snapshot
// @desc   Add property snapshot
// @access Private

router.put(
  '/:propertyId/snapshot',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      avgcompprice,
      avgcomppriceperfoot,
      afterrepairvalue,
      margin,
      estimatedrepairs,
      offerprice
    } = req.body;

    const newSnapshot = {
      title,
      description,
      avgcompprice,
      avgcomppriceperfoot,
      afterrepairvalue,
      margin,
      estimatedrepairs,
      offerprice
    };

    try {
      const property = await Property.findById(req.params.propertyId);

      property.snapshots.unshift(newSnapshot);

      await property.save();

      res.json(property);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/v1/properties/:propertyId/snapshots
// @desc   GET all snapshots for Property
// @access Private

router.get('/:propertyId/snapshots', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return res.status(400).json({ msg: 'Cannot find Property' });
    }

    res.json(property.snapshots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/properties/:propertyId/snapshot/:snapshotId
// @desc   Delete snapshot from Property
// @access Private

router.delete('/:propertyId/snapshot/:snapshotId', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    // Get remove index
    const removeIndex = property.snapshots
      .map(item => item.id)
      .indexOf(req.params.snapshotId);

    property.snapshots.splice(removeIndex, 1);

    await property.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
