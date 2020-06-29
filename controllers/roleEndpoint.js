const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Role = mongoose.model('Role');

//get all
router.get('/all', (req, res) => {
    Role.find((err, results) => {
        if (!err) {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode=200;
            res.end(JSON.stringify({"status": "success", "message": "Data found", "data": results}));
        }
        else {
            console.log(err);
        }
    });
});

//get one by _id
router.get('/:id', (req, res) => {
    Role.findOne({ _id: req.params.id }).exec(function(err, results) {
        if (!err) {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode=200;
            res.end(JSON.stringify({"status": "success", "message": "Data found", "data": results}));
        }
        else {
            console.log(err);
        }
    });
});

//add
router.post('/', (req, res) => {

    var role = new Role();
    role.name=req.body.name
	role.save((err, result) => {
        if (!err){
			//res.setHeader('Content-Type', 'application/json');
			res.statusCode=201;
            res.end(JSON.stringify({"status": "success", "message": "Data has ben created", "data": []}));
        }else{
            console.log(err); 
        }
    }); 
});

//update
router.put('/:id', (req, res) => {
    Role.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, result) => {
        if (!err) { 
            res.statusCode=201;
            res.end(JSON.stringify({"status": "success", "message": "Data has ben updated", "data": []})); 
        }else{
            console.log(err); 
        }
    });
});

//delete
router.delete('/:id', (req, res) => {
    Role.findByIdAndRemove(req.params.id, (err, result) => {
        if (!err) {
            res.statusCode=201;
            res.end(JSON.stringify({"status": "success", "message": "Data has ben deleted", "data": []})); 
        }
        else{ 
            console.log(err); 
        }
    });
});



module.exports = router;