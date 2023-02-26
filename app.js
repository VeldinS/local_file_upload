const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const uploadsRoutes = require('./routes/uploads-routes');

//////////////////////////////////////////////////////////////////
const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{     //FOR CORS ERROR IN BROWSER WHEN SENDING DATA
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use('/api/uploads', uploadsRoutes); //to route only to uploads

app.use((req,res,next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;                //CUSTOM ERROR METHOD
})

app.use((error, req,res,next) => {
   if (res.headerSent){
       return next(error);
   }
   res.status(error.code  || 500);
   res.json({message: error.message || 'An unknown error occurred!'});
});

//CONNECTING TO DATABASE
mongoose
    .connect('mongodb+srv://veldin:V3ldin123@cluster0.kai58d9.mongodb.net/mern?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });
