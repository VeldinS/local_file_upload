const mongoose = require('mongoose');

//CREATING SCHEMA FOR DATABASE THAT WILL BE CALLED IN CONTROLLERS
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: false}
});

module.exports = mongoose.model('ImageUpload', placeSchema);