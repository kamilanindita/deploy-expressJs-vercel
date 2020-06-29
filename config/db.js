const mongoose = require('mongoose');

const uri='mongodb://node:kMZpZdvJO7Zs2OsX@cluster0-shard-00-00-wdyin.mongodb.net:27017,cluster0-shard-00-01-wdyin.mongodb.net:27017,cluster0-shard-00-02-wdyin.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

//require('../models/buku.model');
require('../models/role.model');
require('../models/sosmed.model');
require('../models/otherplatform.model');
require('../models/user.model');
require('../models/category.model');
require('../models/product.model');