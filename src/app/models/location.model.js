const mongoose = require('mongoose')

const children=new mongoose.Schema({ 
    childId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location'
    }
});


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
    childs:{
        type:[children],
    },
    isDelete:{
        type: Boolean,
        default: false
    }

})
export default location;