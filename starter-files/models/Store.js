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
  tags: [String]
});

// 여기서는 arrow function을 쓰지 않는다.
storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from runnig
  }
  this.slug = slug(this.name);
  next();
  // TODO make more resilient so slugs are unique
});

module.exports = mongoose.model('Store', storeSchema);
