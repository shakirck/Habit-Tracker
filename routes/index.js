const express = require('express');
const router = express.Router();
const url = require('url');

const homeController = require('../controllers/home_controller.js');
const habitController = require('../controllers/habit_controller.js');



router.get('/',homeController.home);
router.post('/create',homeController.create);
router.get('/show-details/:id',habitController.showDetails);
router.post('/update',habitController.update);
router.get("/update/:id/:day/:value",habitController.update);
router .get('/delete/:id',homeController.delete);
module.exports = router;