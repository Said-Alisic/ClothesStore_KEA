import {
  authJwt,
  authParams,
} from '../../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllInvoices,
  getInvoice,
  addInvoice,
} = require('../../controllers/invoice');

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     description: Use to request all invoices
 *     tags:
 *       - invoices
 *     security:
 *       bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response, returned all invoices
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require employee or admin role
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add invoice and add cart item - SQL transaction
 *     tags:
 *       - invoices
 *       - cart items
 *     parameters:
 *       - in: body
 *         name: invoice
 *         description: The invoice to be created
 *         schema:
 *           type: object
 *           required:
 *            - card_type_id
 *            - card_number
 *            - card_holder
 *            - user_id
 *            - product_id
 *            - invoice_id
 *            - quantity
 *            - unit_price
 *           properties:
 *             invoice:
 *               type: object
 *               properties:
 *                 card_type_id:
 *                   type: integer
 *                 card_number:
 *                   type: integer
 *                 card_holder:
 *                   type: string
 *                 date:
 *                   type: string
 *                 total_price:
 *                    type: integer
 *             cart_items:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                 product_id:
 *                   type: integer
 *                 invoice_id:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *                 unit_price:
 *                    type: number
 *     responses:
 *       '201':
 *         description: Created, added new invoice and cart item
 *       '500':
 *         description: Internal server error
 * /api/invoices/{id}:
 *   get:
 *     description: Use to request invoice
 *     tags:
 *       - invoices
 *     security:
 *       bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the invoice to return
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A successful response, returned invoice
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '500':
 *         description: Internal server error
 */

router.get('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getAllInvoices]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getInvoice]);
router.post('/', addInvoice);

module.exports = router;
