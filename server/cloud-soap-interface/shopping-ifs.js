/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var util = require('util');
var shoppingObj = require('./object/shoppingObj');

var ShoppingIFS = function (app) {
  this.DS = app.datasources.ShoppingSoap;
  Object.call(this);
};
util.inherits(ShoppingIFS, Object);
exports = module.exports = ShoppingIFS;

ShoppingIFS.prototype.getCartInfo = function (obj, callback) {
  var Shopping = this.DS.models.Shopping;
  var xml = shoppingObj.getCartInfoXML(obj);
  Shopping.CartForGet(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.CartForGetResult));
    } catch (e) {
      console.error('ShoppingIFS getCartInfo Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ShoppingIFS.prototype.addToCart = function (obj, callback) {
  var Shopping = this.DS.models.Shopping;
  var xml = shoppingObj.addToCartXML(obj);
  Shopping.CartForAdd(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.CartForAddResult));
    } catch (e) {
      console.error('ShoppingIFS addToCart Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

ShoppingIFS.prototype.modifyQtyInCart = function (obj, callback) {
  var Shopping = this.DS.models.Shopping;
  var xml = shoppingObj.modifyQtyInCartXML(obj);
  Shopping.CartForModifyQty(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.CartForModifyQtyResult));
    } catch (e) {
      console.error('ShoppingIFS modifyQtyInCart Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
