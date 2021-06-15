const router=require("express").Router();
const locationController= require("../controller/locationController");

router.get("/",locationController.mainPage);
router.post("/addLocation",locationController.addLocation);
router.get("/getLocation/:id",locationController.getLocation);
router.post("/editLocation");
router.post("/deleteLocation");
router.post("/location");

module.exports = router;