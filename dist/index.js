'use strict';

var _app = require("./app");

var _models = require("./models");

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_models.db.on('error', err => {
  _logger.default.error(err);

  process.exit();
}).on('disconnected', _models.connect).once('open', _app.listen);