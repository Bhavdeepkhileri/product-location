const router=require("express").Router();
const locationController= require("../controller/locationController");

router.post("/addLocation");
router.post("/editLocation");
router.post("/deleteLocation");
router.post("/location");