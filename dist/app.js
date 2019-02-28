'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listen = listen;
exports.app = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _throw = require("throw.js");

var _config = require("./config");

var _models = require("./models");

var _logger = _interopRequireDefault(require("./logger"));

var _routes = require("./routes");

var _middleware = require("./middleware");

var auth = _interopRequireWildcard(require("./auth"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
/**
 * LOGGER MIDDLEWARE REGISTER
 */

exports.app = app;
app.use(_middleware.LoggerMiddleware);
/**
 * SECURITY MIDDLEWARE
 */

app.use((0, _cors.default)());
/**
 * SINGLETON APP MODELS
 */

app.set('models', _models.models);
/**
 * OTHER MIDDLEWARE
 */

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
/**
 * PASSPORT INITIALIZE
 */

app.use(auth.initialize());
/**
 * API ROUTES REGISTER
 */

app.use('/api', _routes.apiRoutes);
/**
 * CATCH 404 ERROR HANDLER
 */

app.use((req, res, next) => {
  return next(new _throw.NotFound());
});
/**
 * CATCH ALL ERRORS HANDLER
 */
// eslint-disable-next-line no-unused-vars

app.use((err, req, res, next) => {
  _logger.default.error(err);

  return res.status(err.statusCode || 500).json({
    'status': 'error',
    'message': err.message,
    'code': err.errorCode
  });
});

function listen() {
  app.listen(_config.CONFIG.PORT, () => _logger.default.info(`App is listening on port ${_config.CONFIG.PORT}`));
}