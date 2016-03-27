/**
 * @author qianqing
 * @create by 16-3-27
 * @description
 */
var xml = require('xml');

exports.getNewCustomerPromotionXML = function (obj) {
  var xmlObj = [{
    GetMKTNewCustomer: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: obj.userId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getCustomerGroupPromotionXML = function (obj) {
  var xmlObj = [{
    GetMKTCustomerGroupPromotion: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: obj.userId
      },
      {
        cartItemJson: obj.cartIds
      }
    ]
  }];

  return xml(xmlObj, true);
};
