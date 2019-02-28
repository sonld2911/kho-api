'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Product = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ProductSchema = new _mongoose.default.Schema({
  code: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  manufacturer: {
    type: String,
    trim: true,
    default: ''
  },
  machinePart: {
    type: String,
    trim: true,
    default: ''
  },
  warehouseId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: false
  }
}, {
  timestamps: true
});
ProductSchema.plugin(_mongoosePaginateV.default);
ProductSchema.plugin(_mongooseUniqueValidator.default);

ProductSchema.statics.findByProductCode = function findByProductCode(code) {
  return this.findOne({
    code
  });
};

ProductSchema.statics.isProductCodeExists = function isProductCodeExists(code, warehouseId) {
  return this.findOne({
    code,
    warehouseId
  });
};

ProductSchema.set('toJSON', {
  virtual: true,
  transform: function (doc, props) {
    props.id = props._id;
    props = (0, _lodash.omit)(props, ['_id', '__v']);
    return props;
  }
});

const Product = _mongoose.default.model('Product', ProductSchema);

exports.Product = Product;