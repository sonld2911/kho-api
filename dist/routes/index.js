"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api.routes");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});