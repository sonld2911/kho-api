'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggerMiddleware = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _split = _interopRequireDefault(require("split"));

var _logger = _interopRequireDefault(require("../logger"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoggerMiddleware = (0, _morgan.default)('combined', {
  'stream': (0, _split.default)().on('data', line => {
    _logger.default.info(line);
  }),
  'skip': () => _config.CONFIG.ENV === 'test'
});
exports.LoggerMiddleware = LoggerMiddleware;