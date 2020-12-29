const express = require('express');
const router = express.Router();
const orders = require('../models/order');
const bodyParser = require("body-parser");
const { validationResult } = require('express-validator');
const jsonParser = bodyParser.json()

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  router.post('/newOrder', jsonParser, function(req, res) {
    orders.newOrder(req.body, function(err, order) {
        //console.log('Called getAllTask');
        let newOrder = req.body;
        if (err) {
            res.send(err);
        }
        if (order) {
            res.send(order);
        }else{
            res.send(newOrder);
        }
        console.log('res: ', order);
        //enviar json com a validação res.send(salesPerson);, para enviar com o body res.send(newOrder)
    }); 
  // console.log(req.body)
});

router.get('/', function(req, res) {
  orders.getAllOrders(function(err, order) {
      
      if (err) {
          res.send(err);
      }
      //console.log('res: ', salesPerson);
      res.send(order);
  });
});

router.get('/:orderId', function(req, res) {
    orders.getOrderByContactId(req.params.orderId, function(err, order) {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });
});

module.exports = router;