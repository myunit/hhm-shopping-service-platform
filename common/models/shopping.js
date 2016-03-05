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

    //将商品添加到购物车
    Shopping.addToCart = function (data, cb) {
      shoppingIFS.addToCart(data, function (err, res) {
        if (err) {
          console.log('addToCart err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('addToCart result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, promotionAmount: res.PromotionAmount, msg: ''});
        }
      });
    };

    Shopping.remoteMethod(
      'addToCart',
      {
        description: [
          '将商品添加到购物车.返回结果-status:操作结果 0 失败 1 成功, promotionAmount:促销金额, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '将商品添加到购物车 {"userId":int, "product":[{"pId":int, "pItemId":int, "qty":int, "shoppingSource":"string"}],',
              '"device":"string"}',
              'pId:商品编号, pItemId商品sku编号, qty:数量, shoppingSource:组合商品字段(非组合商品时传空字符), device:设备识别码(限制购买时使用)'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-to-cart', verb: 'post'}
      }
    );

    //修改购物车内商品数量
    Shopping.modifyQtyInCart = function (data, cb) {
      shoppingIFS.modifyQtyInCart(data, function (err, res) {
        if (err) {
          console.log('modifyQtyInCart err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          console.error('modifyQtyInCart result err: ' + res.ErrorDescription);
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: ''});
        }
      });
    };

    Shopping.remoteMethod(
      'modifyQtyInCart',
      {
        description: [
          '修改购物车内商品数量.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '修改购物车内商品数量 {"userId":int, "cartId":int, "qty":int, "device":"string"}',
              'cartId:购物车编号, qty:数量, device:设备识别码(限制购买时使用)'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/modify-qty-in-cart', verb: 'post'}
      }
    );

  });
};
