const mongoose = require('mongoose');

var bukuSchema = new mongoose.Schema({
	penulis: {
        type: String
    },
    judul: {
        type: String
    },
    kota: {
        type: String
    },
	penerbit: {
        type: String
    },
	tahun: {
        type: Number
    }
	
});


mongoose.model('Buku', bukuSchema,'buku');