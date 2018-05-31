const express = require('express');//initialize express
const app = express();
app.set('view engine', 'ejs');//routing for ejs files
app.use(express.static(__dirname + '/public'));//initialize a static folder public(used for css & js)
app.set('port', process.env.PORT || 3000);//port initialization
const bodyParser = require('body-parser');//body praser to get data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
const mongooseConnection = require('./db/mongooseConnection');

const { catagories } = require('./model/catagories');
const { products } = require('./model/products');

// include routing pages
var admin = require('./routes/admin');
app.use('/products',admin);

app.get('/', (req, res) => {
    res.render('dashboard');
})




app.listen(app.get('port'));