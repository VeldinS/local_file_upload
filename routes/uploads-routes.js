const express = require('express');
const { check } = require('express-validator')
const uploadsControllers = require('../controllers/uploads-controllers');

/////////////////////////////////////////////////////
const router = express.Router();

router.post('/',     //IMPORTING ROUTE FOR CREATING NEW UPLOAD
    [
        check('title')      //VALIDATIONS FOR INPUT FIELDS
            .not()
            .isEmpty(),
        check('description').isLength({min: 5})
    ],
    uploadsControllers.createUpload);


module.exports = router;