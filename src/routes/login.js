// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const loginController = require('../controllers/loginController');

router.get('/', loginController.index); 
router.post('/', loginController.login); 

module.exports = router;
