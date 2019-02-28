'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONFIG = void 0;

var _lodash = require("lodash");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const CONFIG = {
  ROOT_DIR: _path.default.join(__dirname, '../..'),
  ENV: (0, _lodash.get)(process.env, 'APP_ENV', 'development'),
  PORT: (0, _lodash.get)(process.env, 'PORT', 3000),
  SESSION_SECRET: (0, _lodash.get)(process.env, 'SESSION_SECRET', 'session secret'),
  MONGODB_URI: (0, _lodash.get)(process.env, 'APP_MONGODB_URI'),
  JWT_ENCRYPTION: (0, _lodash.get)(process.env, 'JWT_ENCRYPTION', 'jwt_secret'),
  JWT_EXPIRATION: (0, _lodash.get)(process.env, 'JWT_EXPIRATION', '30d'),
  LOG_LEVEL: (0, _lodash.get)(process.env, 'APP_LOG_LEVEL', 'debug'),
  UPLOAD_TEMP_PATH: (0, _lodash.get)(process.env, 'UPLOAD_TEMP_PATH', 'uploads/_temp'),
  // eslint-disable-next-line
  AVATAR_UPLOAD_PATH: (0, _lodash.get)(process.env, 'AVATAR_UPLOAD_PATH', 'uploads/avatars'),
  AVATAR_MAX_FILE_SIZE: (0, _lodash.get)(process.env, 'AVATAR_MAX_FILE_SIZE', 1000000)
};
exports.CONFIG = CONFIG;