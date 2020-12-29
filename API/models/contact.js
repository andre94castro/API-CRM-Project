'use strict';

var db = require('../db/db');

var Contact = function(contact) {
  this.contact = contact.contact;
  this.status = contact.status;
  this.created_at = new Date();
};

function validateEmail(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){           
        return (true);
    }
        return (false);
    };  

function validatePreenchido(nome){
    if(nome == ''){
    return (false);
}
    return (true);
};

function validatePostal(postal){
    if(/^\d{4}-\d{3}?$/.test(postal)){
    return (true);
}
    return (false);
};

Contact.getAllContact = function(result) {
    db.query("Select * from contacts", function(err, res) {
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

Contact.getcontactById = function(contactId, result) {
    db.query("Select * from contacts where id = ? ", contactId,function(err, res) {
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

Contact.newContact = function(newContact, result) {

        let contactValidation = {
            nome: true,
            email: true,
            localidade: true,
            morada: true,
            postal: true
        };
    
        contactValidation.nome = validatePreenchido(newContact.nome);
        contactValidation.email = validateEmail(newContact.email);
        contactValidation.localidade = validatePreenchido(newContact.localidade);
        contactValidation.morada = validatePreenchido(newContact.morada);
        

    if( contactValidation.nome === false || 
        contactValidation.email === false || 
        contactValidation.localidade  === false || 
        contactValidation.morada === false || 
        contactValidation.postal === false){
        result(null,contactValidation)
    }else{
        db.query(
            `   
            Insert into contacts
                VALUES 
                (NULL,  
                '${newContact.nome}',
                '${newContact.cidade}', 
                '${newContact.contato}',
                '${newContact.morada}',
                '${newContact.postal}',
                '${newContact.contribuinte}',
                '${newContact.email}',
                '${newContact.website}');
            ` 
                ,function(err, res) {
            
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                console.log('contacts:', res);
                result(null, newContact); //newContacts para enviar o json do form, res para inviar as rows afetadas na bd
            }
        })
    }; 
};


Contact.deleteContactById = function(contactId, result) {
    db.query("Delete from sawmCrm.contacts where id = ? ", contactId,function(err, res) {
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


Contact.updateContact = function(newContact, result) {
    db.query(
        `   
        update sawmCrm.contacts
            set nome = '${newContact.nome}',
                email = '${newContact.email}', 
                cidade = STR_TO_DATE('${newContact.cidade}', '%d/%c/%Y'),
                morada = '${newContact.morada}',
                postal = '${newContact.postal}',
                contribuinte = '${newContact.contribuinte}',
                contato = '${newContact.contato}',
                website = '${newContact.website}'
            where id = '${newContact.id}';
        ` 
            ,function(err, res) {
        
        if (err) {
            console.log("error: ", err);
            result(null, err);
            
        }
        else {
           
            result(null, res); //newcontacts para enviar o json do form, res para inviar as rows afetadas na bd
        }
    }) 
};

Contact.getAllContactName = function(result) {
    db.query("Select id, nome from contacts order by nome", function(err, res) {
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


module.exports = Contact;