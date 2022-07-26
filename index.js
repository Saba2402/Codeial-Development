//we are using const as we dont want var to be overridden by others
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port  = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const passportLocal =require('./config/passport-local-strategy');
const sassMiddleware = require('node-sass-middleware');

//write just before restarting of server
app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'

}));


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo  store is used to store the session cookie in the db
app.use(session({
    name :'codeial',
    secret :'blahsomething',
    saveUnitialized : false,
    //user not logged in
    resave : false,
    //remove and rewrite again and again
    cookie : {
    maxAge : (1000*60*100)
    //calculated in the miliseconds
    },
    store : MongoStore.create(
        {
            mongoUrl : 'mongodb://localhost/codeial_development',
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
    //interpolation ,embedding the variable inside ${}

});
