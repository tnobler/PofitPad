const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  streetnumber: {
    type: String,
    required: true
  },
  streetname: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  submarket: {
    type: String
  },
  squarefeet: {
    type: String,
    required: true
  },
  lotsize: {
    type: String
  },
  beds: {
    type: String,
    required: true
  },
  baths: {
    type: String,
    required: true
  },
  askingprice: {
    type: String
  },
  comps: [
    {
      mlsnumber: {
        type: String
      },
      streetnumber: {
        type: String,
        required: true
      },
      streetname: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zipcode: {
        type: String,
        required: true
      },
      submarket: {
        type: String
      },
      squarefeet: {
        type: String,
        required: true
      },
      lotsize: {
        type: String
      },
      beds: {
        type: String,
        required: true
      },
      baths: {
        type: String,
        required: true
      },
      soldprice: {
        type: String,
        required: true
      }
    }
  ],
  snapshots: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      avgcompprice: {
        type: String
      },
      avgcomppriceperfoot: {
        type: String
      },
      afterrepairvalue: {
        type: String
      },
      margin: {
        type: String
      },
      estimatedrepairs: {
        type: String
      },
      offerprice: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Property = mongoose.model('property', PropertySchema);
