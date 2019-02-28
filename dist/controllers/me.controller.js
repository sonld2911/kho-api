'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeController = void 0;

var _lodash = require("lodash");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function profile(req, res, next) {
  const {
    User
  } = req.app.get('models');
  const id = (0, _lodash.get)(req, 'user');

  if (!id) {
    // TODO: handle error
    return next('404');
  }

  try {
    const user = await User.findById(id).populate('warehouseId'); // TODO: check if user is exists

    return res.json(user);
  } catch (err) {
    // TODO: handle error
    return next(err);
  }
}

async function changeProfile(req, res, next) {
  const {
    User
  } = req.app.get('models');
  const currentUser = req.user;

  try {
    const user = await User.findById(currentUser.id);

    if (!user) {
      // TODO: handle error
      return next(new Error());
    }

    const data = (0, _lodash.pick)(req.body, ['name', 'email', 'password', 'gender']);

    if ((0, _lodash.isEmpty)(data.password)) {
      delete data.password;
    }

    user.set(_objectSpread({}, data));
    await user.save();
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

const MeController = {
  profile,
  changeProfile
};
exports.MeController = MeController;