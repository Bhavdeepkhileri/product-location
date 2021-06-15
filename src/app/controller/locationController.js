const ejs= require("ejs");
const Location = require("../models/location.model");
const path = require("path")

exports.mainPage= async(req,res)=>{
    try{
        location= await Location.find({parentId:null});
        console.log(location);
        const html = await ejs.renderFile(path.join(__dirname,'../../view/home.ejs'), {location}, {async: true});
        res.send(html);
    }
    catch(e){
        console.log(e);
        res.send("not done")
    }  
}
exports.addLocation= async(req,res)=>{
    /*{
        req.parent
        req.locationName
    } */
    try{
        var parent={};
        if(!req.body.parent)
        {
            parent._id = null;
            parent.level = 0;
        }
        else{
         parent=await Location.findById(req.body.parent).exec();
        }
        
        const location = new Location(
            {
            locationName : req.body.locationName,
            parentId : parent._id,
            level : parent.level+1,
            })
            await location.save();
        await Location.updateOne({_id: parent._id}, {
            $push: { children: location._id }
          }).exec()
          res.send("done");
        }
    catch(e)
    {
        console.log(e);
        res.send("not done")
    }
}

exports.getLocation=async(req,res)=>{
    try{
        const location = await Location.findOne({_id: req.params.id}).populate('children');
        const html = await ejs.renderFile(path.join(__dirname,'../../view/sublocationpage.ejs'), {location}, {async: true});
        res.send(html);
    }
    catch(e){
        console.log(e);
        res.send({error:e});
    }
}