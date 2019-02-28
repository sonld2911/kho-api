"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PurchaseOrder = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

var _lodash = require("lodash");

var _enums = require("../enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PurchaseOrderSchema = new _mongoose.default.Schema({
  areas: String,
  location: String,
  subtotal: {
    type: Number,
    default: 0,
    min: 0
  },
  managerDepartment: String,
  products: [{
    product: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'Product'
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
      required: true
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
      required: true
    },
    productType: {
      type: String,
      enum: (0, _lodash.values)(_enums.PRODUCT_TYPES),
      required: true,
      default: _enums.PRODUCT_TYPES.NEW
    },
    amount: {
      type: Number,
      min: 0,
      default: 0
    }
  }],
  inputDate: {
    type: Date
    /*required: true,*/

    /*default: new Date(),*/

  },
  outputDate: {
    type: Date
    /*required: false,*/

  },
  orderType: {
    type: String,
    enum: (0, _lodash.values)(_enums.PURCHASE_ORDER_TYPES),
    required: true
  },
  status: {
    type: String,
    enum: (0, _lodash.values)(_enums.PURCHASE_ORDER_STATUS),
    required: true,
    default: _enums.PURCHASE_ORDER_STATUS.PENDING
  },
  warehouseId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },
  createdBy: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  updatedBy: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true
});
PurchaseOrderSchema.plugin(_mongoosePaginateV.default);
PurchaseOrderSchema.set('toJSON', {
  transform: function (doc, props) {
    props.id = props._id;
    props.products = props.products.map(product => {
      product.id = product._id;
      product = (0, _lodash.omit)(product, ['_id']);
      return product;
    });
    props = (0, _lodash.omit)(props, ['_id', '__v']);
    return props;
  }
});
PurchaseOrderSchema.pre('find', function () {
  this.populate('products.product');
});
PurchaseOrderSchema.pre('save', function (next) {
  this.products = this.products.map(product => {
    product.price = parseInt(product.price, 10);
    product.quantity = parseInt(product.quantity, 10);
    product.amount = product.price * product.quantity;
    return product;
  });
  this.subtotal = (0, _lodash.sumBy)(this.products, 'amount');
  next();
});
PurchaseOrderSchema.post('save', async function (document, next) {
  await document.populate('products.product').execPopulate();
  next();
});

const PurchaseOrder = _mongoose.default.model('PurchaseOrder', PurchaseOrderSchema);

exports.PurchaseOrder = PurchaseOrder;