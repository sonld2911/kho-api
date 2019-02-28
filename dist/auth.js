'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;
exports.authenticate = authenticate;

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _passportJwt = require("passport-jwt");

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SIGN IN USING USERNAME AND PASSWORD
 */
function localStrategy() {
  const options = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  };
  return new _passportLocal.Strategy(options, async function (req, username, password, next) {
    const {
      User
    } = req.app.get('models');

    try {
      const user = await User.findByUsername(username);

      if (!user) {
        return next(null, false);
      }

      if (false === (await user.comparePassword(password))) {
        return next(null, false);
      }

      return next(null, user);
    } catch (err) {
      return next(err);
    }
  });
}
/**
 * AUTHENTICATE USER BY ACCESS TOKEN
 */


const AUTH_SCHEME = 'bearer';
const TOKEN_QUERY_PARAMETER_NAME = 'access_token';

function jwtStrategy() {
  const options = {
    jwtFromRequest: _passportJwt.ExtractJwt.versionOneCompatibility({
      authScheme: AUTH_SCHEME,
      tokenQueryParameterName: TOKEN_QUERY_PARAMETER_NAME
    }),
    secretOrKey: _config.CONFIG.JWT_ENCRYPTION,
    passReqToCallback: true
  };
  return new _passportJwt.Strategy(options, async function (req, payload, next) {
    const {
      User
    } = req.app.get('models');
    const {
      id
    } = payload;

    try {
      const user = await User.findById(id);

      if (!user) {
        return next(null, false);
      }

      return next(null, user);
    } catch (err) {
      return next(err);
    }
  });
}

_passport.default.use(localStrategy());

_passport.default.use(jwtStrategy());

function initialize() {
  return _passport.default.initialize();
}

function authenticate() {
  return _passport.default.authenticate('jwt', {
    session: false
  });
}