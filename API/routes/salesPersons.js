const express = require('express');
const router = express.Router();
const salesPersons = require('../models/salesPerson');
const bodyParser = require("body-parser");
const { validationResult } = require('express-validator');
const jsonParser = bodyParser.json()

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.post('/newSalesPerson', jsonParser, function(req, res) {
    salesPersons.newSalesPerson(req.body, function(err, salesPerson) {
        //console.log('Called getAllTask');
        let newSalesPerson = req.body;
        if (err) {
            res.send(err);
        }
        if (salesPerson) {
            res.send(salesPerson);
        }else{
            res.send(newSalesPerson);
        }
        console.log('res: ', salesPerson);
        //enviar json com a validação res.send(salesPerson);, para enviar com o body res.send(newSalesPerson)
    }); 
  // console.log(req.body)
});

router.get('/', function(req, res) {
    salesPersons.getAllSalesPerson(function(err, salesPerson) {
        
        if (err) {
            res.send(err);
        }
        //console.log('res: ', salesPerson);
        res.send(salesPerson);
    });
});

router.get('/SalesPersonName', function(req, res) {
    salesPersons.getAllSalesPersonName(function(err, salesPerson) {
        
        if (err) {
            res.send(err);
        }
        //console.log('res: ', salesPerson);
        res.send(salesPerson);
    });
});
router.get('/:salesPersonId', function(req, res) {
    salesPersons.getsalesPersonById(req.params.salesPersonId, function(err, salesPerson) {
        if (err) {
            res.send(err);
        }
        res.json(salesPerson);
    });
});

router.delete('/delete/:salesPersonId', function(req, res) {
    salesPersons.deletePersonById(req.params.salesPersonId, function(err, salesPerson) {
        if (err) {
            res.send(err);
        }
        res.json(salesPerson);
    });
});

router.put('/updateSalesPerson', jsonParser, function(req, res) {
    salesPersons.updateSalesPerson(req.body, function(err, salesPerson) {
        //console.log('Called getAllTask');
        
        let newSalesPerson = req.body;
        if (err) {
            res.send(err);
        }
        if (salesPerson) {
            res.send(salesPerson);
        }else{
            res.send(newSalesPerson);
        }
        console.log('res: ', salesPerson);
        //enviar json com a validação res.send(salesPerson);, para enviar com o body res.send(newSalesPerson)
    }); 
  // console.log(req.body)
});


module.exports = router;