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

exports.getCountInCartXML = function (obj) {
  var xmlObj = [{
    GetShoppingCartItemCountByCustomerSysNo: [
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

exports.getFreightXML = function (obj) {
  var xmlObj = [{
    CalculateShippingFee: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        shippingmethod: obj.method
      },
      {
        count: obj.count
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.isExistSecKillInCartXML = function (obj) {
  var xmlObj = [{
    CartForCheckExistSecKill: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        cartItemJson: obj.cartIds.join(',')
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.addSuggestionXML = function (obj) {
  var suggest = {};
  suggest.ContactWay = obj.contact;
  suggest.CustomerSysNo = obj.userId;
  suggest.SuggestionContent = obj.content;
  suggest.SuggestionSysNo = 0;
  var xmlObj = [{
    AddSuggestion: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        customerSysNo: obj.userId
      },
      {
        suggestJson: JSON.stringify(suggest)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.submitOrderXML = function (obj) {
  var order = {};
  order.UId = obj.userId;
  order.ReceiverId = obj.receiverId;
  order.PayMent = obj.payMent;
  order.Logistics = obj.logistics;
  order.DeviceName = obj.device;

  var xmlObj = [{
    SubmitOrderByCartItemSysNo: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        orderdata: JSON.stringify(order)
      },
      {
        cartItemJson: obj.cartIds.join()
      }
    ]
  }];

  return xml(xmlObj, true);
};
