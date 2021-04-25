const express = require('express');

const router = express.Router();

const {
  getAllInvoices, getInvoice, addInvoice,
} = require('../controllers/cardItem');

router.get('/', getAllInvoices);
router.get('/:id', getInvoice);
router.post('/', addInvoice);

module.exports = router;