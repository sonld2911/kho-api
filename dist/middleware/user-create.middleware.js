'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserCreateMiddleware = void 0;

var _check = require("express-validator/check");

var _lodash = require("lodash");

var _enums = require("../enums");

const UserCreateMiddleware = () => {
  return (0, _check.checkSchema)({
    name: {
      trim: true,
      custom: {
        options: value => {
          return !(0, _lodash.isEmpty)(value);
        }
      },
      errorMessage: 'REQUIRED'
    },
    email: {
      isEmail: true,
      normalizeEmail: true
    },
    password: {
      isLength: {
        options: {
          min: 6
        }
      }
    },
    role: {
      in: {
        options: {}
      }
    }
  });
};

exports.UserCreateMiddleware = UserCreateMiddleware;