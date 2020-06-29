const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Buku = mongoose.model('Buku');


router.get('/', (req, res) => {
    Buku.find((err, results) => {
        if (!err) {
            res.render('buku/index',{title:"Buku",data:results});
        }
        else {
            console.log(err);
        }
    });
});


router.get('/add', (req, res) =>{    
    res.render('buku/tambah', {title: 'Tambah Buku'});
});


router.post('/add', (req, res) => {
    var buku = new Buku();
    buku.penulis = req.body.penulis;
    buku.judul = req.body.judul;
    buku.kota = req.body.kota;
    buku.penerbit = req.body.penerbit;
    buku.tahun=req.body.tahun;

    buku.save((err, result) => {
        if (!err){
            res.redirect('/buku'); 
        }else{
            console.log(err); 
        }
    }); 
});


router.get('/edit/:id', (req, res) => {
    Buku.findById(req.params.id, (err, result) => {
        if (!err) {
            res.render('buku/edit', {
                title: 'Edit Buku', 
                data:result,                    
            });
        }
        else {
            console.log(err);
        }
    });
});


router.post('/update/:id', (req, res) => {
    Buku.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, result) => {
        if (!err) { 
            res.redirect('/buku'); 
        }else{
            res.render('buku/edit', {
                title: 'Edit Buku',
                data:req.body,
            });
        }
    });
});


router.get('/delete/:id', (req, res) => {
    Buku.findByIdAndRemove(req.params.id, (err, result) => {
        if (!err) {
            res.redirect('/buku');
        }
        else{ 
            console.log(err); 
        }
    });
});



module.exports = router;