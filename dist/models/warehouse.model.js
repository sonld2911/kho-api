'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Warehouse = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const WarehouseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});
WarehouseSchema.plugin(_mongoosePaginateV.default);
WarehouseSchema.set('toJSON', {
  transform: function (doc, ret) {
    return mappingResponse(ret);
  }
});

function mappingResponse(props) {
  return {
    id: props._id,
    name: props.name,
    created_at: props.createdAt,
    updated_at: props.updatedAt
  };
}

const Warehouse = _mongoose.default.model('Warehouse', WarehouseSchema);

exports.Warehouse = Warehouse;