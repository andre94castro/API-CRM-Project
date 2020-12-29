'use strict';

var db = require('../db/db');

var Order = function(order) {
  this.order = order.order;
  this.status = order.status;
  this.created_at = new Date();
};


Order.newOrder = function(newOrder, result) {

    db.query(
        `   
        Insert into orders
            VALUES 
            (NULL,  
            '${newOrder.idVend}',
            '${newOrder.idCont}', 
            '${newOrder.valorTshirt}',
            '${newOrder.qttTshirt}',
            '${newOrder.valorCamisola}',
            '${newOrder.qttCamisola}',
            '${newOrder.valorSapatilhas}',
            '${newOrder.qttSapatilhas}');
        ` 
            ,function(err, res) {
        
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('contacts:', res);
            result(null, res); //newOrders para enviar o json do form, res para inviar as rows afetadas na bd
        }
    })
}; 

Order.getAllOrders = function(result) {
    db.query("Select * from orders", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            //console.log('contacts:', res);
            result(null, res);
        }
    });
};

Order.getOrderByContactId = function(contactId, result) {
    db.query("select idcont, sum(valorTshirt) tValorTshirt, sum(qttTshirt) tQttTshirt, sum(valorCamisola) tValorCamisola, sum(qttCamisola) tQttCamisola, sum(qttSapatilhas) tQttSapatilhas, sum(valorSapatilhas) tValorSapatilhas from sawmCrm.orders where idCont = ? group by idcont", contactId,function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('contacts:', res);
            result(null, res);
        }
    });
};

module.exports = Order;