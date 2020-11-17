const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'properties'
  },
  amount: {
    type: Number,
    required: true
  },
  categories: [
    {
      name: {
        type: String,
        required: true
      },
      amount: {
        type: Number
      },
      items: [
        {
          repairItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'repairitems',
            required: true
          },
          quantity: {
            type: Number
          },
          price: {
            type: Number
          },
          total: {
            type: Number,
            required: true
          },
          notes: {
            type: String
          },
          createdAt: {
            type: Date,
            default: Date.now
          }
        }
      ],
      notes: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Budget = mongoose.model('Budget', BudgetSchema);
