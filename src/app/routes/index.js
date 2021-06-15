const express =require('express')
const location = require('./locationRoutes');


const router = express.Router();

router.use(location);


module.exports = router;