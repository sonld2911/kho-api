'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadAvatarMiddleware = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const avatarStorage = _multer.default.diskStorage({
  destination: _config.CONFIG.UPLOAD_TEMP_PATH,
  filename: (req, file, done) => {
    const ext = _path.default.extname(file.originalname.toLowerCase());

    const filename = (0, _v.default)(file.originalname);
    return done(null, `${filename}${ext}`);
  }
});

const options = {
  storage: avatarStorage,
  limits: {
    fileSize: _config.CONFIG.AVATAR_MAX_FILE_SIZE
  },
  fileFilter: (req, file, done) => {
    const allowedTypes = /jpeg|jpg|png|bmp/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(_path.default.extname(file.originalname.toLowerCase()));

    if (mimeType && extName) {
      return done(null, true);
    } // TODO: handle error


    return done(new Error());
  }
};

(async () => {
  try {
    await _fsExtra.default.ensureDir(`${_config.CONFIG.ROOT_DIR}/${_config.CONFIG.UPLOAD_TEMP_PATH}`);
    await _fsExtra.default.ensureDir(`${_config.CONFIG.ROOT_DIR}/${_config.CONFIG.AVATAR_UPLOAD_PATH}`);
  } catch (err) {
    throw new Error(err);
  }
})();

const UploadAvatarMiddleware = (0, _multer.default)(options).single('avatar');
exports.UploadAvatarMiddleware = UploadAvatarMiddleware;