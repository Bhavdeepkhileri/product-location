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
    children:{
        type:[{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Location'
        }],
    },
    isDelete:{
        type: Boolean,
        default: false
    }

})
module.exports= location;