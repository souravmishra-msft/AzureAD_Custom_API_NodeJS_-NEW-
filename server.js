const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');


const config = require('./config/authConfig.json');

// Include routes
const routes = require('./routes/routes');


//Load main config file
dotenv.config({path: './config/main.env'});

// ----------------------------------------------------
// Configure the Express App. Include the middlewares
// ----------------------------------------------------
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: false}));
app.use(express.json({type: 'application/*+json'}));

// Initialize Passport
app.use(passport.initialize());


// Enable CORS (for local testing only - remove in production/deployment)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Routesy

app.use('/test-api', routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
