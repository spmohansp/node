const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongooseConnection = require('../db/mongooseConnection');
const { catagories } = require('../model/catagories');
const { products } = require('../model/products');

//file upload using multer
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/productImages')
    },
    filename: (req, file, callback) => {
        var filetype = file.mimetype;
        var fileformate = filetype.split("/")[1];
        callback(null, req.body.product_name + '_' + Date.now() + '.' + fileformate);
    }
});
var upload = multer({ storage: storage });




router.get('/addProducts', (req, res) => {
    res.render('addProducts');
})

router.get('/addProducts/:id', (req, res) => {
    products.findById(req.params.id).then((data) => {
        res.render('editProducts', {
            productsData: data
        });
    })
})


// insert product data
router.post('/addProducts', upload.any(), (req, res) => {
    var productData = new products({
        product_name: req.body.product_name,
        price: req.body.price,
        description: req.body.description,
        catagory: req.body.catagory,
        subCatagory: req.body.subCatagory,
        product_image: req.files,
        favorite: req.body.favorite
    });
    // console.log(productData);
    productData.save().then((data) => {
        res.redirect('/');
    })
})

// update product data
router.post('/addProducts/:id', upload.any(), (req, res) => {
    products.findById(req.params.id).then((data) => {
        var imageupdate = req.files.concat(data.product_image);


        products.findByIdAndUpdate(req.params.id, {
            $set: {
                product_name: req.body.product_name,
                price: req.body.price,
                description: req.body.description,
                catagory: req.body.catagory,
                subCatagory: req.body.subCatagory,
                product_image: imageupdate,
                favorite: req.body.favorite
            }
        }).then((data) => {
            res.redirect('/products/viewProducts');
        })

    })
})

router.get('/viewProducts', (req, res) => {
    products.find().populate('subCatagory').then((data) => {
        res.render('viewProducts', {
            product: data
        });

    })
})


router.get('/addCatagory', (req, res) => {
    catagories.find().then((catagories) => {
        res.render('addCatagory', {
            catagoryData: catagories
        });
    })
})

router.delete('/addProducts/:id', (req, res) => {
    products.findByIdAndRemove(req.params.id).then((data) => {
        res.redirect('/');
    })
})

router.post('/addCatagory', (req, res) => {
    var catagoryData = new catagories(req.body);
    catagoryData.save().then(() => {
        res.redirect('/');
    })
})

router.get('/addCatagory/:id', (req, res) => {
    catagories.findById(req.params.id).then((catagories) => {
        res.render('editCatagory', {
            catagoryData: catagories
        });
    })
})


router.post('/addCatagory/:id', (req, res) => {
    catagories.findByIdAndUpdate(req.params.id, {
        $set: {
            subCatagory: req.body.subCatagory,
        }
    }).then((data) => {
        res.redirect('/products/addCatagory');
    })
})


// get catagory to product page
router.post('/getCatagory', (req, res) => {
    catagories.find(req.body).then((data) => {
        res.json(data);
    })
})

module.exports = router;