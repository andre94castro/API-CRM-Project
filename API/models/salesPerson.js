'use strict';

var db = require('../db/db');

var salesPerson = function(salesPerson) {
  this.salesPerson = salesPerson.salesPerson;
  this.status = salesPerson.status;
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

salesPerson.getAllSalesPerson = function(result) {
    db.query("Select id,nome,apelido,dataNascimento,email,contato from salesPerson", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('salesPersons:', res);
            result(null, res);
        }
    });
};

salesPerson.getsalesPersonById = function(salesPersonId, result) {
    db.query("Select * from salesPerson where id = ? ", salesPersonId,function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('salesPersons:', res);
            result(null, res);
        }
    });
};


salesPerson.newSalesPerson = function(newSalesPerson, result) {
       
        let salesPersonValidation = {
            nome: true,
            apelido: true,
            dataNasc: true,
            email: true,
            contato: true
        };
    
        salesPersonValidation.nome = validatePreenchido(newSalesPerson.nome);
        salesPersonValidation.apelido = validatePreenchido(newSalesPerson.apelido);
        salesPersonValidation.dataNasc = validatePreenchido(newSalesPerson.dataNasc);
        salesPersonValidation.email = validateEmail(newSalesPerson.email);
        salesPersonValidation.contato = validatePreenchido(newSalesPerson.contato);
        
    if( salesPersonValidation.nome === false || 
        salesPersonValidation.apelido === false || 
        salesPersonValidation.dataNasc  === false || 
        salesPersonValidation.email === false || 
        salesPersonValidation.contato === false){
        result(null,salesPersonValidation)
    }else{
        db.query(
            `   
            Insert into salesPerson
                VALUES 
                (NULL,  
                '${newSalesPerson.nome}',
                '${newSalesPerson.apelido}', 
                STR_TO_DATE('${newSalesPerson.dataNasc}', '%d/%c/%Y'),
                '${newSalesPerson.email}',
                '${newSalesPerson.contato}');
            ` 
                ,function(err, res) {
            
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                console.log('salesPersons:', res);
                result(null, newSalesPerson); //newsalesPersons para enviar o json do form, res para inviar as rows afetadas na bd
            }
        })
    }; 
};


salesPerson.deletePersonById = function(salesPersonId, result) {
    db.query("Delete from sawmCrm.salesPerson where id = ? ", salesPersonId,function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('salesPersons:', res);
            result(null, res);
        }
    });
};


salesPerson.updateSalesPerson = function(newSalesPerson, result) {
    db.query(
        `   
        update salesPerson
            set nome = '${newSalesPerson.nome}',
                apelido = '${newSalesPerson.apelido}', 
                dataNascimento = STR_TO_DATE('${newSalesPerson.dataNasc}', '%d/%c/%Y'),
                email = '${newSalesPerson.email}',
                contato = '${newSalesPerson.contato}'
            where id = '${newSalesPerson.id}';
        ` 
            ,function(err, res) {
        
        if (err) {
            console.log("error: ", err);
            result(null, err);
            
        }
        else {
           
            result(null, res); //newsalesPersons para enviar o json do form, res para inviar as rows afetadas na bd
        }
    }) 
};

salesPerson.getAllSalesPersonName = function(result) {
    db.query("Select id,nome,apelido from salesPerson order by nome", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('salesPersons:', res);
            result(null, res);
        }
    });
};


module.exports = salesPerson;