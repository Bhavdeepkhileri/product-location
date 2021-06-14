const Location = require("../models/location.model");

exports.mainPage= async(req,res)=>{
    
}
exports.addLocation= async(req,res)=>{
    /*{
        req.parent
        req.locationName
    } */
    try{
        if(req.parent!=="Root")
        {
            var parent=await Location.findById(req.parent).exec();
        }
        const location = new Location(
            {
            locationName=req.locationName,
            parentId=parent._id,
            level=parent.level+1,
            })
            await location.save();
            parent.childs.push({childId:location._id});
    }
    catch(e)
    {
        console.log(e);
    }
}

exports.edit