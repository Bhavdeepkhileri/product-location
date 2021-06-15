const ejs= require("ejs");
const Location = require("../models/location.model");
const Product = require("../models/product");
const path = require("path");
const { updateOne } = require("../models/location.model");

exports.mainPage= async(req,res)=>{
    try{
        location= await Location.find({parentId:null, isDelete: false});
        console.log(location);
        const html = await ejs.renderFile(path.join(__dirname,'../../view/home.ejs'), {location}, {async: true});
        res.send(html);
    }
    catch(e){
        console.log(e);
        res.send("not done")
    }  
}
exports.addLocationForm=async(req,res)=>{
    try{
        console.log("working")
        let parent={}
        if(req.params.parent == "null")
        {
            parent._id = "null";
        }
        else{
         parent=await Location.findById(req.params.parent).exec();
        }
        
        const html = await ejs.renderFile(path.join(__dirname,'../../view/addLocationForm.ejs'), {parent}, {async: true});
        res.send(html);
    }
    catch(e){
        console.log(e);
        res.send({error:e});
    }
}
exports.addLocation= async(req,res)=>{
    /*{
        req.parent
        req.locationName
    } */
    try{
        let parent={};
        console.log(req.body);
        if(req.params.parentId=="null")
        {
            parent._id = null;
            parent.level = 0;
            parent.NoOfChildren=0;
            parent.hierarchy="1"
        }
        else{
         parent=await Location.findById(req.params.parentId).exec();
        }
        parent.NoOfchildren+=1;
        let hierarchy=parent.hierarchy+"."+parent.NoOfchildren;
        const location = new Location(
            {
            locationName : req.body.locationName,
            parentId : parent._id,
            level : parent.level+1,
            hierarchy
            })
            await location.save();
        await Location.updateOne({_id: parent._id},{ $inc: { NoOfchildren: 1 }
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
        const locations = await Location.find({parentId: req.params.id, isDelete: false});
        const parent= await Location.findOne({_id : req.params.id})
        const product= await Product.find({parentLocationId:req.params.id});
        //console.log(product);
        const html = await ejs.renderFile(path.join(__dirname,'../../view/sublocationpage.ejs'), {locations,parent,product}, {async: true});
        res.send(html);
    }
    catch(e){
        console.log(e);
        res.send({error:e});
    }
}
exports.addProductForm=async(req,res)=>{
    try{
        let graph=await Location.aggregate([
            {$match:{
                parentId: null
            }},
            {
                $graphLookup: {
                    from: "locations",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parentId",
                    depthField: "depth",
                    as: "childNodes"
                 }
            },
         ] )
         let locationarray=[]
         for(let i=0; i<graph.length ; i++)
         {
             locationarray.push({
                 locationName:graph[i].locationName,
                 level:graph[i].level,
                 _id:graph[i]._id
                })
            graph[i].childNodes.sort(compare);
            locationarray=locationarray.concat(graph[i].childNodes);
         }
         //console.log(locationarray)
         const html = await ejs.renderFile(path.join(__dirname,'../../view/addproduct.ejs'), {locationarray}, {async: true});
         res.send(html)
    }
    catch(e)
    {
        console.log(e);
        res.send({error:e});
    }
}
exports.addProduct= async(req,res)=>{
    try{
        let product= new Product({
            productName:req.body.productName,
            parentLocationId: req.body.location
        })
        await product.save();
        res.send({message:"done"});
    }
    catch(e)
    {
        console.log(e);
        res.send({error:e})
    }
} 
exports.delete= async(req,res)=>{
    try{
        await Location.updateOne({_id : req.params.id},{$set:{isDelete: true}});
        res.send({message:"item deleted"})
    }
    catch(e){
        console.log(e)
        res.send({error:e})
    }
}



function compare( a, b ) {
    if ( a.hierarchy < b.hierarchy ){
      return -1;
    }
    if ( a.hierarchy > b.hierarchy){
      return 1;
    }
    return 0;
  }