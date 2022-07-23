//we are using const as we dont want var to be overridden by others
const express = require('express');
const app = express();
const port  = 8000;

app.listen(port,function(err){
    if(err){
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
    //interpolation ,embedding the variable inside ${}

})
