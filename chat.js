//we are using const as we dont want var to be overridden by others
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port  = 8000;

//const expressLayouts = require('express-ejs-layouts');
//const db = require('./config/mongoose');
app.use(express.urlencoded());
app.use(cookieParser());

//use express router
app.use('/',require('./routes/index'));

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
    //interpolation ,embedding the variable inside ${}

})
