/**
 * @author qianqing
 * @create by 16-3-3
 * @description
 */
var loopback = require('loopback');
var ShoppingIFS = require('../../server/cloud-soap-interface/shopping-ifs');

module.exports = function (Shopping) {
  Shopping.getApp(function (err, app) {

    var shoppingIFS = new ShoppingIFS(app);

    //获取购物车信息
    Shopping.getCartInfo = function (data, cb) {
      shoppingIFS.getCartInfo(data, function (err, res) {
        if (err) {
          console.log('getCartInfo err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('getCartInfo result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, cart: res.Datas, msg: ''});
        }
      });
    };

    Shopping.remoteMethod(
      'getCartInfo',
      {
        description: [
          '获取购物车信息.返回结果-status:操作结果 0 失败 1 成功, cart:购物车信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '获取购物车信息 {"userId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-cart-info', verb: 'post'}
      }
    );

  });
};
