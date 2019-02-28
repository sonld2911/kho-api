'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;

var _throw = require("throw.js");

var _lodash = require("lodash");

var _enums = require("../enums");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function list(req, res, next) {
  const {
    User
  } = req.app.get('models');
  const limit = parseInt((0, _lodash.get)(req.query, 'limit', _enums.DEFAULT_PAGE_LIMIT));
  const page = parseInt((0, _lodash.get)(req.query, 'page', 1));
  const filter = JSON.parse((0, _lodash.get)(req.query, 'filter', '{}'));
  const query = {};

  if (filter.username) {
    query.username = {
      '$regex': filter.username
    };
  }

  const options = {
    page,
    limit,
    populate: (0, _lodash.get)(filter, 'populate', {})
  };

  try {
    const results = await User.paginate(query, options);
    const count = results.totalDocs;
    const users = results.docs;
    return res.json({
      items: users,
      count
    });
  } catch (err) {
    return next(new _throw.InternalServerError(err));
  }
}

async function create(req, res, next) {
  const data = req.body;
  const {
    User
  } = req.app.get('models');

  try {
    if ((0, _lodash.isEmpty)(data.warehouseId)) {
      delete data.warehouseId;
    }

    const user = await User.create(data);
    return res.json(user);
  } catch (err) {
    return next(new _throw.UnprocessableEntity(err));
  }
}

async function update(req, res, next) {
  const {
    id
  } = req.params;
  const data = req.body;
  const {
    User
  } = req.app.get('models');

  try {
    const user = await User.findById(id);

    if (!user) {
      return next(new _throw.NotFound());
    }

    if ((0, _lodash.isEmpty)(data.password)) {
      delete data.pass;
    }

    if ((0, _lodash.isEmpty)(data.warehouseId)) {
      data.warehouseId = null;
    }

    user.set(_objectSpread({}, data));
    await user.save();
    return res.json(user);
  } catch (err) {
    return next(new _throw.UnprocessableEntity(err));
  }
}

async function remove(req, res, next) {
  const {
    id
  } = req.params;
  const {
    User
  } = req.app.get('models');

  try {
    await User.findByIdAndDelete(id);
    return res.status(204).json({});
  } catch (err) {
    return next(new _throw.InternalServerError());
  }
}

async function findOne(req, res, next) {
  const {
    id
  } = req.params;
  const {
    User
  } = req.app.get('models');

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error('404 user not found');
    }

    return res.json(user);
  } catch (err) {
    // TODO: handle error
    return next(err);
  }
}

const UserController = {
  list,
  create,
  update,
  remove,
  findOne
};
exports.UserController = UserController;