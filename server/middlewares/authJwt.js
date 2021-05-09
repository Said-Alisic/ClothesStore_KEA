/* eslint-disable consistent-return */
import User from '../models/User';

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['auth-token'];
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
  User.findByPk(req.id).then(user => {
    if (user.role_id === 1) {
      next();
      return;
    }
    return res.status(403).send({
      message: 'Require Admin Role!',
    });
  });
};

// NOTE: Might not need!
const isEmployee = (req, res, next) => {
  User.findByPk(req.id).then(user => {
    if (user.role_id === 2) {
      next();
      return;
    }
    return res.status(403).send({
      message: 'Require Employee Role!',
    });
  });
};

const isEmployeeOrAdmin = (req, res, next) => {
  User.findByPk(req.id).then(user => {
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
  isEmployee,
  isEmployeeOrAdmin,
};
module.exports = authJwt;
