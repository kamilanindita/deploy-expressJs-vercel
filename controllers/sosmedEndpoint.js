const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Sosmed = mongoose.model('Sosmed');

//get all
router.get('/all', (req, res) => {
    Sosmed.find().exec(function(err, results) {
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
    Sosmed.findOne({ _id : req.params.id }).exec(function(err, results) {
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

    var sosmed = new Sosmed()
    sosmed.id_user=req.body.id_user
    sosmed.instagram=req.body.instagram
    sosmed.facebook=req.body.facebook
    sosmed.twitter=req.body.twitter
    sosmed.line=req.body.line

	sosmed.save((err, result) => {
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
    Sosmed.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, result) => {
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
    Sosmed.findByIdAndRemove(req.params.id, (err, result) => {
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