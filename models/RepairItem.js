const mongoose = require('mongoose');

const RepairItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  materialcost: {
    type: Number
  },
  laborcost: {
    type: Number
  },
  totalcost: {
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
});

module.exports = RepairItem = mongoose.model('RepairItem', RepairItemSchema);
