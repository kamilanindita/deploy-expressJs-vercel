require('./config/db');

const express = require('express');
const path = require('path');
const swig = require('swig');
const bodyparser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
var cookieParser = require('cookie-parser');

//const bukuController = require('./controllers/bukuController');
const indexController = require('./controllers/indexController');
const roleEndpoint = require('./controllers/roleEndpoint');
const userEndpoint = require('./controllers/userEndpoint');
const categoryEndpoint = require('./controllers/categoryEndpoint');
const productEndpoint = require('./controllers/productEndpoint');
const sosmedEndpoint = require('./controllers/sosmedEndpoint');
const otherplatformEndpoint = require('./controllers/otherplatformEndpoint');


var app = express();
// app.use(bodyparser.urlencoded({
//     extended: true
// }));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser())

// adding Helmet to enhance your API's security
app.use(helmet());

// enabling CORS for all requests
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
    // Swig will cache templates for you, but you can disable
    // that and use Express's caching instead, if you like:
app.set('view cache', false);
    // To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });

app.listen(9000, () => {
    console.log('Express server started at port : 9000');
});

app.use('/', indexController);
//app.use('/buku', bukuController);
app.use('/user', userEndpoint);
app.use('/product', productEndpoint);
app.use('/user/role', roleEndpoint);
app.use('/user/sosmed', sosmedEndpoint);
app.use('/user/otherplatform', otherplatformEndpoint);
app.use('/product/category', categoryEndpoint);
