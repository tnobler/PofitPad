const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');

const RepairItem = require('../../../models/RepairItem');

// @route    GET api/v1/repairitems/me
// @desc     Get current users repairitems
// @access   Private

router.get('/me', auth, async (req, res) => {
  try {
    const repairItems = await RepairItem.find({
      user: req.user.id
    });

    if (!repairItems) {
      return res
        .status(400)
        .json({ msg: 'There are no Repair Items for this user' });
    }

    res.json(repairItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/v1/repairitems
// @desc     Create or update repairitems
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('totalcost', 'Total Cost is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, materialcost, laborcost, totalcost, notes } = req.body;

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newRepairItem = new RepairItem({
        name,
        materialcost,
        laborcost,
        totalcost,
        notes,
        user: req.user.id
      });

      const repairItem = await newRepairItem.save();

      res.json(repairItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/v1/repairitems/:repairItemId
// @desc     Get property by repairItem ID
// @access   Private
router.get('/:repairItemId', auth, async (req, res) => {
  try {
    const repairItem = await RepairItem.findById(req.params.repairItemId);

    if (!repairItem)
      return res.status(400).json({ msg: 'Repair Item not found' });

    res.json(repairItem);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Repair Item not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/v1/repairitems/:id
// @desc     Delete Repair Item
// @access   Private
router.delete('/:repairItemId', auth, async (req, res) => {
  try {
    const repairItem = await RepairItem.findById(req.params.repairItemId);

    if (!repairItem)
      return res.status(400).json({ msg: 'Repair Item not found' });

    // Check user
    if (repairItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await repairItem.remove();

    res.json({ msg: 'Repair Item Deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Repair Item not found.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
