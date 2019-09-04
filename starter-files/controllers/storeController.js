const mongoose = require('mongoose');
const Store = mongoose.model('Store');
// Models/Store.js를 get한다.
// Mongoose uses a concept called a singleton, which allows us
// to only import our models once and then reference them anywhere

// It's sort of like in React, we have lifecycle hooks
exports.myMiddleware = (req, res, next) => {
  req.name = 'Wes';
  /*if(req.name === 'Wes') {
    throw Error('That is a stupid name');
  }*/
  next();
};

exports.homePage = (req, res) => {
  console.log(req.name);
  /* req.flash('error', 'Something Happend');
  req.flash('info', 'Something Happend');
  req.flash('warning', 'Something Happend');
  req.flash('success', 'Something Happend'); */
  res.render('index');
};

exports.addStroe = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
}

exports.createStroe = async (req, res) => {
  // console.log(req.body);
  // res.json(req.body);
  const store = await (new Store(req.body)).save();
  req.flash('success', `successfully created ${store.name}. care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
}

exports.getStores = async (req, res) => {
  // 1. query the database for a list of all stores
  const stores = await Store.find();
  // console.log(stores);
  res.render('stores', { title: 'Stores', stores });
}

exports.editStore = async (req, res) => {
  // 1. Finde the store given the ID
  // res.json(req.params);
  const store = await Store.findOne({ _id: req.params.id });
  // res.json(store);

  // 2 confirm they are the owner of the store

  // 3. render out the edit form so the user can update theor store
  res.render('editStore', { title: `Edit ${store.name}`, store });
}

exports.updateStore = async (req, res) => {
  // 1. Find and update the store
  // 3개의 인자를 받는데 query / data / options
  const store = await Store.findOneAndUpdate({ _id: req.params.id}, req.body, {
    new: true, // return new store instead of the old one
    runValidators: true
  }).exec();

  req.flash('success', `successfully updated <strong>${store.name}</strong>. <a href='/stores/${store.slug}'>view store</a>`);
  // 2. Redirect them to the store and tell them it worked
  res.redirect(`/stores/${store._id}/edit`);
}
