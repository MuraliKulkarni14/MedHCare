const express = require('express');
const {json,urlencoded} = express; 
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');


//app

const app = express();

//db
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(()=> console.log("DB Connected")).catch(err => console.log("DB connection error",err));

//middleware
app.use(morgan("dev"));
app.use(cors({origin:true,credentials:true}));
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressValidator());

//routes
const userRoutes = require("./routes/user");
app.use("/",userRoutes);

//port
const port = process.env.PORT || 8080;


//listeners
const server = app.listen(port,()=> console.log(`Server is Running on port ${port}`));
