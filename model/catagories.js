var mongoose = require('mongoose');
var catagorySchema = new mongoose.Schema({
    catagory:{
        type:String,
        required:true
    },
    subCatagory:{
        type:String,
        required:true
    },
});

var catagories = mongoose.model('catagories', catagorySchema );
module.exports = {catagories}