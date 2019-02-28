'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

require("winston-daily-rotate-file");

var _moment = _interopRequireDefault(require("moment"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';
const logger = new _winston.default.Logger({
  transports: [new _winston.default.transports.Console({
    name: 'app_console_log',
    level: process.env.APP_LOG_LEVEL || 'info',
    colorize: true,
    timestamp: () => {
      return (0, _moment.default)().format(TIMESTAMP_FORMAT);
    }
  }), new _winston.default.transports.DailyRotateFile({
    name: 'app_daily_log',
    filename: _path.default.resolve(__dirname, '../', 'logs', 'app.%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    prepend: true,
    zippedArchive: true,
    level: process.env.APP_LOG_LEVEL || 'info',
    timestamp: function () {
      return (0, _moment.default)().format(TIMESTAMP_FORMAT);
    }
  })]
});
var _default = logger;
exports.default = _default;