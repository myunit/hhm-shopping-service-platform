/**
 * @author qianqing
 * @create by 16-3-27
 * @description
 */
var util = require('util');
var mktObj = require('./object/MKTObj');

var MktIFS = function (app) {
  this.DS = app.datasources.MKTSoap;
  Object.call(this);
};
util.inherits(MktIFS, Object);
exports = module.exports = MktIFS;

MktIFS.prototype.getNewCustomerPromotion = function (obj, callback) {
  var MKT = this.DS.models.MKT;
  var xml = mktObj.getNewCustomerPromotionXML(obj);
  MKT.GetMKTNewCustomer(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetMKTNewCustomerResult));
    } catch (e) {
      console.error('MktIFS getNewCustomerPromotion Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

MktIFS.prototype.getCustomerGroupPromotion = function (obj, callback) {
  var MKT = this.DS.models.MKT;
  var xml = mktObj.getCustomerGroupPromotionXML(obj);
  MKT.GetMKTCustomerGroupPromotion(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetMKTCustomerGroupPromotionResult));
    } catch (e) {
      console.error('MktIFS getCustomerGroupPromotion Exception: ' + e);
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};
