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

ShoppingIFS.prototype.getCategory = function (obj, callback) {
  var Shopping = this.DS.models.Shopping;
  var xml = shoppingObj.getCategoryXML(obj);
  Shopping.GetCategoryTree(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetCategoryTreeResult));
    } catch (e) {
      console.error('ProductIFS getCategory Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
