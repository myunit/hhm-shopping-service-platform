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

exports.modifyQtyInCartXML = function (obj) {
  var xmlObj = [{
    CartForModifyQty: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        sysNo: obj.cartId
      },
      {
        qty: obj.qty
      },
      {
        devicename: obj.device
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.deleteInCartXML = function (obj) {
  var xmlObj = [{
    CartForDelete: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        sysNo: obj.cartId
      }
    ]
  }];

  return xml(xmlObj, true);
};
