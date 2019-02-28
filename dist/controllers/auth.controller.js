'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthController = void 0;

var _throw = require("throw.js");

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function login(req, res, next) {
  return _passport.default.authenticate('local', {
    session: false
  }, function authenticate(err, user) {
    if (err || false === user) {
      return next(new _throw.BadRequest());
    }

    const accessToken = user.generateJWT();
    const data = {
      access_token: accessToken
    };
    return res.json(data);
  })(req, res, next);
}

const AuthController = {
  login
};
exports.AuthController = AuthController;