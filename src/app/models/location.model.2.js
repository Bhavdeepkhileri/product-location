const mongoose=require("mongoose");
const location = require('location',{
   locationName:{
    type:String,
    required: true
   },
   parentId:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'location',
       default:'/'
   },    
   path:{
       type: String,
       required: true
   },
   productId:{

   }
}) 
/*{
    locationName: "floor1",
    parentId: #vittorcloud
    path: "/vittorcloud/floor"
} */