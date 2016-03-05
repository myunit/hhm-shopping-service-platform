/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var xml = require('xml');

exports.getCartInfoXML = function (obj) {
  var xmlObj = [{
    CartForGet: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.addToCartXML = function (obj) {
  var xmlObj = [{
    CartForAdd: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        datas: JSON.stringify(obj.product)
      },
      {
        devicename: obj.device
      }
    ]
  }];

  return xml(xmlObj, true);
};
