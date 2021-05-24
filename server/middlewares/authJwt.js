/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
import dbConfig from '../db/db.config';

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = null;
  token = req.headers['auth-token'];

  // To work with Swagger
  try {
    if (req.headers['authorization'].indexOf('Bearer ') === 0) {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers['authorization'].split(' ')[1];
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Swagger token error');
  }

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.id = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  dbConfig.User.findByPk(req.id).then(user => {
    if (user.role_id === 1) {
      next();
      return;
    }
    return res.status(403).send({
      message: 'Require Admin Role!',
    });
  });
};

const isEmployeeOrAdmin = (req, res, next) => {
  dbConfig.User.findByPk(req.id).then(user => {
    if (user.role_id === 1 || user.role_id === 2) {
      next();
      return;
    }
    return res.status(403).send({
      message: 'Require Employee or Admin Role!',
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isEmployeeOrAdmin,
};
module.exports = authJwt;
