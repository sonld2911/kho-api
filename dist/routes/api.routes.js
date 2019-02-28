'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiRoutes = void 0;

var _express = require("express");

var _auth = require("../auth");

var _middleware = require("../middleware");

var _controllers = require("../controllers");

// import { UploadAvatarMiddleware } from '../middleware';
const routes = (0, _express.Router)();
exports.apiRoutes = routes;
routes.use('/me', (0, _auth.authenticate)());
routes.get('/me', _controllers.MeController.profile);
routes.patch('/me', _controllers.MeController.changeProfile);
routes.post('/auth/login', _controllers.AuthController.login);
routes.use('/users', (0, _auth.authenticate)());
routes.get('/users', _controllers.UserController.list);
routes.get('/users/:id', _controllers.UserController.findOne);
routes.post('/users', _controllers.UserController.create);
routes.patch('/users/:id', _controllers.UserController.update);
routes.delete('/users/:id', _controllers.UserController.remove);
routes.use('/purchase-orders', (0, _auth.authenticate)());
routes.get('/purchase-orders', _controllers.PurchaseOrderController.find);
routes.get('/purchase-orders/:id', _controllers.PurchaseOrderController.findOne);
routes.post('/purchase-orders', _controllers.PurchaseOrderController.create);
routes.patch('/purchase-orders/:id', _controllers.PurchaseOrderController.update);
routes.delete('/purchase-orders/:id', _controllers.PurchaseOrderController.remove);
/*routes.post('/avatars',
    authenticate(),
    UploadAvatarMiddleware,
    AvatarController.upload
);*/

routes.use('/warehouses', (0, _auth.authenticate)());
routes.get('/warehouses', _controllers.WarehouseController.list);
routes.post('/warehouses', _controllers.WarehouseController.create);
routes.patch('/warehouses/:id', _controllers.WarehouseController.update);
routes.delete('/warehouses/:id', _controllers.WarehouseController.remove);
routes.use('/products', (0, _auth.authenticate)());
routes.get('/products', _controllers.ProductController.find);
routes.get('/products/:id', _controllers.ProductController.findOne);
routes.post('/products', _controllers.ProductController.create);
routes.patch('/products/:id', _controllers.ProductController.update);
routes.delete('/products/:id', _controllers.ProductController.remove);