const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
//const randomId = require('./randomIdGenerator'); //IF WORKING WITH DUMMY DATA AND NOT REAL DATABASE
const Upload = require('../models/Upload')
const HttpError = require("../models/http-error");

////////////////////////////////////////////////////////
//NEW UPLOAD
const createUpload = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }
    const { title, description} = req.body;
    //NEW UPLOAD
    const createdUpload = new Upload({
        title,
        description,
    });

    //SAVING OUR UPLOAD INFORMATION TO DATABASE
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdUpload.save({session: sess});
        user.places.push(createdUpload);
        await user.save({session: sess});
        await sess.commitTransaction();
    }catch(err){
        const error = new HttpError('Upload to database failed, please try again.', 500);
        return next(error);
    }
    res.status(201).json({upload:createdUpload}) //RETURNING RESPONSE
};


////////////////////////////////////////////////////////////
exports.createUpload = createUpload;
