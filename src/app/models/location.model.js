const mongoose = require('mongoose')



const location= mongoose.model('Location',{
    locationName:{
        type: String,
        trim: true,
        required: true 
    },
    parentId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location',
        default: null 
    },
    level:{
        type: Number,
        default: 0
    },
    isDelete:{
        type: Boolean,
        default: false
    },
    NoOfchildren:{
        type:Number,
        default:0
    },
    hierarchy:{
        type:String,
        default:"0"
    }

})
module.exports= location;