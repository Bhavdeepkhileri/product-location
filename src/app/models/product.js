const mongoose = require('mongoose')
const validator = require('validator')
//#why
const Product = mongoose.model('Product', {
    productName:{
        type: String,
        trim: true,
        required: true 
    },
    price:{
        type:Number,
        required: true,
        default: 0,
        trim:true
    },
    quantity:{
        type: Number,
        min:0,
        required: true,
        default: 1
    },
    IsDelete: {
        type: Boolean,
        default: false
    },
    img:
    {
        type: String,
        default: null
    },
    parentLocationId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports= Product;