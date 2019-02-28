'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvatarController = void 0;

var _sharp = _interopRequireDefault(require("sharp"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function upload(req, res, next) {
  const {
    file
  } = req;

  if (!file) {
    // TODO: handle error
    return next(new Error());
  }

  const avatarPath = `${_config.CONFIG.AVATAR_UPLOAD_PATH}/${file.filename}`;

  try {
    // resize, convert to jpg and save to avatar path
    await (0, _sharp.default)(file.path).resize({
      width: 200,
      height: 200,
      fit: 'cover',
      position: 'centre'
    }).toFormat('jpg').toFile(avatarPath); // delete original file

    await _fsExtra.default.remove(file.path);
    return res.json({
      filename: file.filename,
      path: avatarPath
    });
  } catch (err) {
    return next(err);
  }
}

const AvatarController = {
  upload
};
exports.AvatarController = AvatarController;