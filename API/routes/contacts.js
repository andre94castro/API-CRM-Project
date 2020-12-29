const express = require('express');
const router = express.Router();
const contacts = require('../models/contact');
const bodyParser = require("body-parser");
const { validationResult } = require('express-validator');
const jsonParser = bodyParser.json()

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


router.get('/', function(req, res) {
    contacts.getAllContact(function(err, contact) {
        
        if (err) {
            res.send(err);
        }
        //console.log('res: ', contact);
        res.send(contact);
    });
});

router.get('/ContactName', function(req, res) {
    contacts.getAllContactName(function(err, contact) {
        
        if (err) {
            res.send(err);
        }
        //console.log('res: ', contact);
        res.send(contact);
    });
});

router.get('/:contactId', function(req, res) {
    contacts.getcontactById(req.params.contactId, function(err, contact) {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
});

router.post('/newContact', jsonParser, function(req, res) {
    contacts.newContact(req.body, function(err, contact) {
        //console.log('Called getAllTask');
        let newContact = req.body;
        if (err) {
            res.send(err);
        }
        if (contact) {
            res.send(contact);
        }else{
            res.send(newContact);
        }
        console.log('res: ', contact);
        //enviar json com a validação res.send(contact);, para enviar com o body res.send(newContact)
    }); 
  // console.log(req.body)
});

router.delete('/delete/:contactId', function(req, res) {
    contacts.deleteContactById(req.params.contactId, function(err, contact) {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
});

router.put('/updateContact', jsonParser, function(req, res) {
    contacts.updateContact(req.body, function(err, contact) {
        //console.log('Called getAllTask');
        let newContact = req.body;
        if (err) {
            res.send(err);
        }
        if (contact) {
            res.send(contact);
        }else{
            res.send(newContact);
        }
        console.log('res: ', contact);
        //enviar json com a validação res.send(contact);, para enviar com o body res.send(newContact)
    }); 
  // console.log(req.body)
});

module.exports = router;