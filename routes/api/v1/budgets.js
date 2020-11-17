const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');
const mongodb = require('mongodb');

const Budget = require('../../../models/Budget');
const Property = require('../../../models/Property');
const User = require('../../../models/User');

const ObjectId = mongodb.ObjectId;

// @route    GET api/v1/budgets/me
// @desc     Get current users budgets
// @access   Private

router.get('/me', auth, async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user.id
    });

    if (!budgets) {
      return res
        .status(400)
        .json({ msg: 'There are no budgets for this user' });
    }

    res.json(budgets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/v1/budgets/:propertyId
// @desc     Create or update budgets
// @access   Private
router.post(
  '/:propertyId',
  [auth, [check('amount', 'Amount is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount } = req.body;

    const budgetFields = {};
    budgetFields.user = req.user.id;
    // budgetFields.property = req.params.propertyId;
    if (amount) budgetFields.amount = amount;

    try {
      let budget = await Budget.findById(req.params.propertyId);

      if (budget) {
        // Update
        budget = await Budget.findOneAndUpdate(
          { user: req.user.id },
          { $set: budgetFields },
          { new: true }
        );

        return res.json(budget);
      }

      // Create
      budget = new Budget(budgetFields);

      await budget.save();

      res.json(budget);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  PUT api/v1/budgets/:budgetId/category
// @desc   Add budget category
// @access Private

router.put(
  '/:budgetId/category',
  [auth, [check('name', 'Category Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, amount, notes } = req.body;

    const newCategory = {
      name,
      amount,
      notes
    };

    try {
      const budget = await Budget.findById(req.params.budgetId);

      budget.categories.unshift(newCategory);

      await budget.save();

      res.json(budget);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/v1/budgets/:budgetId/categories
// @desc   GET all categories for Property
// @access Private

router.get('/:budgetId/categories', auth, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.budgetId);

    if (!budget) {
      return res.status(400).json({ msg: 'Cannot find Budget' });
    }

    res.json(budget.categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/v1/budgets/:budgetId/categories/:categoryId
// @desc   GET category by categoryId
// @access Private

router.get('/:budgetId/categories/:categoryId', auth, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.budgetId);

    if (!budget) {
      return res.status(400).json({ msg: 'Cannot find Budget' });
    }

    const categoryIndex = budget.categories
      .map(category => category.id)
      .indexOf(req.params.categoryId);

    const category = budget.categories[categoryIndex];

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/v1/budgets/:budgetId/categories/:categoryId
// @desc   Update category by categoryId
// @access Private

router.put('/:budgetId/categories/:categoryId', auth, async (req, res) => {
  const { name, amount, notes, items } = req.body;
  // const catId = req.body._id;

  // Build category object
  const categoryFields = {};
  // if (catId) categoryFields._id = categoryId;
  if (name) categoryFields.name = name;
  if (amount) categoryFields.amount = amount;
  if (notes) categoryFields.notes = notes;
  if (items) categoryFields.items = items;

  try {
    let budget = await Budget.findById(req.params.budgetId);

    if (!budget) {
      return res.status(400).json({ msg: 'Cannot find Budget' });
    }

    const categoryIndex = budget.categories
      .map(category => category.id)
      .indexOf(req.params.categoryId);

    let category = budget.categories[categoryIndex];

    if (!category) {
      return res.status(400).json({ msg: 'Cannot find Category' });
    }

    // Update
    budget = await Budget.findOneAndUpdate(
      { _id: req.params.budgetId },
      { $set: { 'categories.$[category]': categoryFields } },
      { arrayFilters: [{ 'category._id': req.params.categoryId }] },
      { new: true }
    );

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/v1/budgets/:budgetId/categories/:categoryId/item
// @desc   Add budget category item
// @access Private

router.put(
  '/:budgetId/categories/:categoryId/item',
  [auth, [check('total', 'Item Total is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { repairItem, quantity, price, total, notes } = req.body;

    const newItem = {
      repairItem,
      quantity,
      price,
      total,
      notes
    };

    try {
      const budget = await Budget.findOneAndUpdate(
        { _id: req.params.budgetId },
        { $push: { 'categories.$[category].items': newItem } },
        { arrayFilters: [{ 'category._id': req.params.categoryId }] }
      );

      await budget.save();

      res.json(budget);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/v1/budgets/:budgetId/categories/:categoryId/items
// @desc   GET all budget Items for a category
// @access Private

router.get(
  '/:budgetId/categories/:categoryId/items',
  auth,
  async (req, res) => {
    try {
      const budget = await Budget.findById(req.params.budgetId);

      if (!budget) {
        return res.status(400).json({ msg: 'Cannot find Budget' });
      }

      const categoryIndex = budget.categories
        .map(category => category.id)
        .indexOf(req.params.categoryId);

      const category = budget.categories[categoryIndex];

      res.json(category.items);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/v1/budgets/:budgetId/categories/:categoryId/items/:itemId
// @desc   GET budget Item for a category
// @access Private

router.get(
  '/:budgetId/categories/:categoryId/items/:itemId',
  auth,
  async (req, res) => {
    try {
      const budget = await Budget.findById(req.params.budgetId);

      if (!budget) {
        return res.status(400).json({ msg: 'Cannot find Budget' });
      }

      const categoryIndex = budget.categories
        .map(category => category.id)
        .indexOf(req.params.categoryId);

      const itemIndex = budget.categories[categoryIndex].items
        .map(item => item.id)
        .indexOf(req.params.itemId);

      const category = budget.categories[categoryIndex];

      const item = category.items[itemIndex];

      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
