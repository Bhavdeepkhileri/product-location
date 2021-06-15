const router=require("express").Router();
const locationController= require("../controller/locationController");
const multer=require("multer");
const upload= multer()
router.get("/",locationController.mainPage);
router.post("/addLocation/:parentId",upload.none(),locationController.addLocation);
router.get("/addLocationForm/:parent",locationController.addLocationForm);
router.get("/getLocation/:id",locationController.getLocation);
router.get("/addProductForm",locationController.addProductForm);
router.post("/addProduct",upload.none(),locationController.addProduct)
router.post("/editLocation");
router.get("/delete/:id",locationController.delete);
router.post("/location");

module.exports = router;