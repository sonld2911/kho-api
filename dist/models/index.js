"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;
exports.models = exports.db = void 0;

var _config = require("../config");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _camelcase = _interopRequireDefault(require("camelcase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const basename = _path.default.basename(__filename);

const models = {};
exports.models = models;

_fs.default.readdirSync(__dirname).filter(file => {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(file => {
  const filename = file.split('.')[0];
  const modelName = (0, _camelcase.default)(filename, {
    pascalCase: true
  });

  const model = require(`./${file}`);

  models[modelName] = model[modelName];
});

_mongoose.default.Promise = global.Promise;

function connect() {
  _mongoose.default.connect(_config.CONFIG.MONGODB_URI);

  return _mongoose.default.connection;
}

_mongoose.default.set('useCreateIndex', true);

_mongoose.default.set('useNewUrlParser', true);

const db = connect();
exports.db = db;