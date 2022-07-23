const express = require('express');
//instance passing will take place for express
//as being called from the chat.js as well

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeController.home);

module.exports=router;