import {
  authJwt,
  authParams,
} from '../../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllRoles,
  getRole,
  updateRole,
  addRole,
  deleteRole,
} = require('../../controllers/role');

/**
 * @swagger
 * /api/roles:
 *   get:
 *     description: Use to request all roles
 *     tags:
 *       - roles
 *     responses:
 *       '200':
 *         description: A successful response, returned all roles
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '404':
 *         description: Page not found
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add role
 *     tags:
 *       - roles
 *     responses:
 *       '201':
 *         description: Created, added new role
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '404':
 *         description: Page not found
 *       '500':
 *         description: Internal server error
 * /api/roles/:id:
 *   get:
 *     description: Use to request role
 *     tags:
 *       - roles
 *     responses:
 *       '200':
 *         description: A successful response, returned role
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or requires admin role
 *       '404':
 *         description: Page not found
 *       '500':
 *         description: Internal server error
 *   put:
 *     description: Use to update role
 *     tags:
 *       - roles
 *     responses:
 *       '200':
 *         description: A successful response, updated role
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '404':
 *         description: Page not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete role
 *     tags:
 *       - roles
 *     responses:
 *       '204':
 *         description: No content, deleted role
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '404':
 *         description: Page not found
 *       '500':
 *         description: Internal server error
 */

router.get('/', [authJwt.verifyToken, authJwt.isAdmin, getAllRoles]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, getRole]);
router.post('/', [authJwt.isAdmin, authJwt.verifyToken, addRole]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, updateRole]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteRole]);

module.exports = router;