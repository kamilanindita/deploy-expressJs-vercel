const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const multer = require("multer");
var fs = require('fs');
const withAuth = require('./middleware')

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null,file.originalname);
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("file_img");

//summary
router.get('/summary/:id', function(req, res) {
    var data=[{}]

    Product.find({ id_user: req.params.id }).count().exec(function(err, results) {
        if (!err) {
            data[0].totalProduct=results

            Product.aggregate(
                [
                    {   $match: { 
                                "id_user" : mongoose.Types.ObjectId(req.params.id) 
                        } 
                    },
                    {   $group: {
                                _id: null,
                                "totalSold": {
                                    $sum: "$sold"
                                },
                                "rate": {
                                    $sum: "$rate"
                                },
                        }
                    }
                ],
                function(error, result) {
                    if (!error) {
                        data[0].totalSold=result[0].totalSold
                        data[0].rate=result[0].rate/data[0].totalProduct
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode=200;
                        res.end(JSON.stringify({"status": "success", "message": "Data found", "data": data }));
                    } else {
                        console.log(error);
                    }
                }
            );
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.statusCode=200;
            res.end(JSON.stringify({"status": "failed", "message": "Data not found", "data": []  }));
            console.log(err);
        }
    })
	
});

//get by categoty
router.get('/bycategory/:id', (req, res) => {
	Product.find({ id_category: req.params.id }).populate('id_user',['name']).populate('id_category',['name']).exec(function(err, results) {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode=200;
            res.end(JSON.stringify({"status": "success", "message": "Data found", "data": results}));
        }else{
            console.log(err);
        }
	});
});

//get by user
router.get('/user/:id', (req, res) => {
	Product.find({ id_user: req.params.id }).populate('id_user',['name']).populate('id_category',['name']).exec(function(err, results) {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode=200;
            res.end(JSON.stringify({"status": "success", "message": "Data found", "data": results}));
        }else{
            console.log(err);
        }
	});
});

//get 6 latest
router.get('/latest', (req, res) => {
	Product.find({}).populate('id_user',['name']).populate('id_category',['name']).sort({create_at: 'desc'}).limit(8).exec(function(err, results) {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode=200;
            res.end(JSON.stringify({"status": "success", "message": "Data found", "data": results}));
        }else{
            console.log(err);
        }
	});
});

//get all
router.get('/', (req, res) => {
	Product.find({}).populate('id_user',['name']).populate('id_category',['name']).exec(function(err, results) {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode=200;
            res.end(JSON.stringify({"status": "success", "message": "Data found", "data": results}));
        }else{
            console.log(err);
        }
	});
});


//get one by user
router.get('/umkm/:id', (req, res) => {
	Product.find({ id_user : req.params.id }).populate('id_user',['name']).populate('id_category',['name']).exec(function(err, results) {
        if (!err) { 
            res.setHeader('Content-Type', 'application/json');
            res.statusCode=200;
            res.end(JSON.stringify({"status": "success", "message": "Data found", "data": results}));
        }else{
            console.log(err);
        }
    });
	
});

//get one by _id
router.get('/:id', (req, res) => {
	Product.findOne({ _id: req.params.id }).populate('id_user',['name']).populate('id_category',['name']).exec(function(err, results) {
        if (!err) { 
            res.setHeader('Content-Type', 'application/json');
            res.statusCode=200;
            res.end(JSON.stringify({"status": "success", "message": "Data found", "data": results}));
        }else{
            console.log(err);
        }
    });
	
});


//add
router.post('/', (req, res) => {

    upload(req, res, (err) => {
        var product = new Product();
        product.id_user=req.body.id_user
        product.id_category=req.body.id_category
        product.name=req.body.name
        product.description=req.body.description
        if(req.body.img){
            product.img=req.body.img
        }else{
            product.img='default.jpg'
        }
        product.price=req.body.price
        product.stock=req.body.stock
        product.sold=0
        product.rate=2


        product.save((error, result) => {
            if (!error){
                //res.setHeader('Content-Type', 'application/json');
                res.statusCode=201;
                res.end(JSON.stringify({"status": "success", "message": "Data has ben created", "data": []}));
            }else{
                console.log(error); 
            }
        }); 
    });
});


// //update
router.put('/:id', (req, res) => {

    Product.findOne({ _id: req.params.id }).exec(function(error, results) {
        if (!error) { 
            if(results.img!="default.jpg"){
                if(results.img!=req.body.img){
                    fs.unlink('./public/uploads/'+results.img, function (err) {
                        if (!err)
                        // if no error, file has been deleted successfully
                        console.log('File deleted!');
                    });
                }
            }
        }else{
            console.log(error);
        }

    });

    upload(req, res, (err) => {
        
        req.body.update_at= new Date()
        Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, result) => {
            if (!error) { 
                res.statusCode=201;
                res.end(JSON.stringify({"status": "success", "message": "Data has ben updated", "data": []})); 
            }else{
                console.log(error); 
            }
        });
    });
});

//delete
router.delete('/:id', (req, res) => {
    Product.findOne({ _id: req.params.id }).exec(function(err, results) {

        if (!err) { 
            if(results.img!="default.jpg"){
                fs.unlink('./public/uploads/'+results.img, function (error) {
                    if (!error)
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            }
        }else{
            console.log(err);
        }

        Product.findByIdAndRemove(req.params.id, (error, result) => {
            if (!error) {
                res.statusCode=201;
                res.end(JSON.stringify({"status": "success", "message": "Data has ben deleted", "data": []})); 
            }
            else{ 
                console.log(error); 
            }
        });

    });
});



module.exports = router;