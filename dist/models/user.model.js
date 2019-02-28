"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

var _config = require("../config");

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _lodash = require("lodash");

var _enums = require("../enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SALT_WORK_FACTOR = 10;
const UserSchema = new _mongoose.default.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String
  },
  name: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: (0, _lodash.values)(_enums.GENDER)
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: (0, _lodash.values)(_enums.ROLE),
    default: _enums.ROLE.USER
  },
  warehouseId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: false,
    default: null
  }
}, {
  timestamps: true
});
UserSchema.plugin(_mongoosePaginateV.default);
UserSchema.plugin(_mongooseUniqueValidator.default);
/**
 * Helper method for validating user's password.
 */

UserSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return new Promise(resolve => {
    _bcryptNodejs.default.compare(candidatePassword, this.password, (err, isMatched) => {
      return resolve(isMatched);
    });
  });
};
/**
 * Helper method for generate access token
 */


UserSchema.methods.generateJWT = function generateJWT() {
  const payload = {
    id: this.id
  };
  const options = {
    expiresIn: _config.CONFIG.JWT_EXPIRATION
  };
  return _jsonwebtoken.default.sign(payload, _config.CONFIG.JWT_ENCRYPTION, options);
};

UserSchema.methods.hasRole = function hasRole(name) {
  return this.role === name;
};
/**
 * Helper method for find a user by email
 * @param {String} email
 */


UserSchema.statics.findByEmail = function findByEmail(email) {
  return this.findOne({
    email
  });
};
/**
 * Helper method for find a user by username
 * @param username
 */


UserSchema.statics.findByUsername = function findByUsername(username) {
  return this.findOne({
    username
  });
};

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    return mappingResponse(ret);
  }
});
/**
 * BEFORE SAVE MIDDLEWARE
 */

UserSchema.pre('save', function (next) {
  const self = this;

  if (!self.isModified('password')) {
    return next();
  }

  _bcryptNodejs.default.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    _bcryptNodejs.default.hash(self.password, salt, null, function (err, hash) {
      if (err) return next(err);
      self.password = hash;
      next();
    });
  });
});

function mappingResponse(props = {}) {
  const data = {
    id: props._id,
    username: props.username,
    email: props.email,
    name: props.name,
    gender: props.gender,
    role: props.role,
    is_active: props.isActive,
    created_at: props.createdAt,
    updated_at: props.updatedAt,
    warehouse: props.warehouseId
  };
  return data;
}

const User = _mongoose.default.model('User', UserSchema);

exports.User = User;