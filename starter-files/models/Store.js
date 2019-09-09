const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

// MongoDB is our database
// mongoose is the package that we use to interface.

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    },
  },
  photo: String
});

// 여기서는 arrow function을 쓰지 않는다.
storeSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from runnig
  }
  this.slug = slug(this.name);
  // find other stores that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if(storesWithSlug) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }
  next();
  // TODO make more resilient so slugs are unique
});

module.exports = mongoose.model('Store', storeSchema);
