"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LoggerMiddleware", {
  enumerable: true,
  get: function () {
    return _logger.LoggerMiddleware;
  }
});
Object.defineProperty(exports, "UploadAvatarMiddleware", {
  enumerable: true,
  get: function () {
    return _uploadAvatar.UploadAvatarMiddleware;
  }
});
Object.defineProperty(exports, "UserCreateMiddleware", {
  enumerable: true,
  get: function () {
    return _userCreate.UserCreateMiddleware;
  }
});

var _logger = require("./logger.middleware");

var _uploadAvatar = require("./upload-avatar.middleware");

var _userCreate = require("./user-create.middleware");