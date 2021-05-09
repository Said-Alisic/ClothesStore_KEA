/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import dbConfig from '../db/db.config';

const asyncHandler = require('express-async-handler');

const getAllInvoices = async (req, res) => {
  try {
    await dbConfig.Invoice.findAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const getInvoice = async (req, res) => {
  try {
    await dbConfig.Invoice.findByPk(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

// Unmanaged transactions: https://sequelize.org/master/manual/transactions.html

const addInvoice = asyncHandler(async (req, res) => {
  const t = await dbConfig.Sequelize.transaction();
  try {
    // const cart = await dbConfig.Cart.create(req.body.cart, { transaction: t });
    // const invoice = await Invoice.create(req.body.invoice, { transaction: t });
    // const cart_items = await dbConfig.CartItem.create(req.body.cart_items, { transaction: t });

    await t.commit().then(() => res.status(200));
  } catch (err) {
    await t.rollback().then(() => res.status(500).json(`Internal server error: ${err}`));
  }
});

// const addInvoice = asyncHandler(async (req, res) => {
//   try {
//     await dbConfig.Invoice.create(req.body)
//       .then(data => {
//         return res.status(200).json(data)
//       })
//       .catch(err => {
//         return res.send(err);
//       })
//
//   } catch (err) {
//     return res.status(500).json('Internal server error');
//   }
// });

module.exports.getAllInvoices = getAllInvoices;
module.exports.getInvoice = getInvoice;
module.exports.addInvoice = addInvoice;
