const express = require('express');
const app = express();

const mongoose = require('./db/Db');
const todosRouter = require('./routes/TodoRoutes');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/api", todosRouter);


app.use((err, req, res, next) => {
    res.status(err.status || 500); 
    if(err.status == 500){
        err.message = "Error, please try again";
    }
    res.json({
        message: err.message
    });
});

const port = process.env.PORT || 5000;
app.listen(port);
