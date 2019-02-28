'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WarehouseController = void 0;

var _enums = require("../enums");

var _lodash = require("lodash");

var _httpStatus = _interopRequireDefault(require("http-status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function list(req, res, next) {
  const {
    Warehouse
  } = req.app.get('models');
  const limit = parseInt((0, _lodash.get)(req.query, 'limit', _enums.DEFAULT_PAGE_LIMIT));
  const page = parseInt((0, _lodash.get)(req.query, 'page', 1));
  const query = {};
  const options = {
    page,
    limit
  };

  try {
    const results = await Warehouse.paginate(query, options);
    const count = results.totalDocs;
    const warehouses = results.docs;
    return res.json({
      items: warehouses,
      count
    });
  } catch (err) {
    // TODO: handle error response
    return next(err);
  }
}

async function create(req, res, next) {
  const {
    Warehouse
  } = req.app.get('models');
  const data = req.body;

  try {
    // TODO: validate before create
    const warehouse = await Warehouse.create(data); // TODO: handle response content

    return res.json(warehouse);
  } catch (err) {
    // TODO: handle error response
    return next(err);
  }
}

async function update(req, res, next) {
  const {
    Warehouse
  } = req.app.get('models');
  const {
    id
  } = req.params;
  const data = req.body;

  try {
    const warehouse = await Warehouse.findById(id);

    if (!warehouse) {
      // TODO: handle model not found error response
      return next('404');
    } // TODO: validate data before save


    warehouse.set(_objectSpread({}, data));
    await warehouse.save(); // TODO: handle response

    return res.json(warehouse);
  } catch (err) {
    // TODO: handle error response
    return next(err);
  }
}

async function remove(req, res, next) {
  const {
    Warehouse
  } = req.app.get('models');
  const {
    id
  } = req.params;

  try {
    await Warehouse.findByIdAndDelete(id);
    return res.status(_httpStatus.default.NO_CONTENT).json({});
  } catch (err) {
    // TODO: handle error response
    return next(err);
  }
}

const WarehouseController = {
  list,
  create,
  update,
  remove
};
exports.WarehouseController = WarehouseController;