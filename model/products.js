var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },
    subCatagory:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'catagories',
        required:true
    },
    product_image:{
        type:Array,
    },
    favorite:{
        type:String,
        default: 0
    },
});

var products = mongoose.model('products', productSchema );
module.exports = {products}