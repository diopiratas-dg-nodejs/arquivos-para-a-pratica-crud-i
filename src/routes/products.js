// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path  = require('path');
const {body, check} = require('express-validator')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Middleware Require ************

const verifyUserLogged = require('../middlewares/verifyUserLogged')

// ************ Multer ************
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/products')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', verifyUserLogged, productsController.create); 
router.post('/', upload.any(),[
    check('name').isEmpty().withMessage('Você deve digitar um nome para o produto'),
    check('category').isEmpty().withMessage('Você deve selecionar uma categoria para o produto'),
    check('description').isLength({min: 1}).withMessage('Você deve escrever uma descrição para o produto'),
    body('price').custom(value => {
        if (isNaN(value)){
            throw new Error('Você deve digitar um valor númerico no preço')
        }else{
            return true;
        }
    })
], productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', upload.any(),productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
