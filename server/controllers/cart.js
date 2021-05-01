/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import Cart from '../models/Cart.js';

const getAllCarts = async (req, res) => {
  try {
    await Cart.findAll()
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        return res.send(err);
      });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const getCart = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9]*$/)) {
      return res.status(404).json('Wrong cart id format. Try again.');
    }

    await Cart.findByPk(req.params.id)
      .then(data => { 
        return res.status(200).json(data);
      })
      .catch(err => {
        return res.send(err);
      })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const addCart = asyncHandler(async (req, res) => {
  try {
    await Cart.create(req.body)
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(err => {
        return res.send(err);
      })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
});


module.exports.getAllCarts = getAllCarts;
module.exports.getCart = getCart;
module.exports.addCart = addCart;

