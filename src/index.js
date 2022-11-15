const express = require("express");
const privateConfig = require('./config/private-config.json');
const { getQueryParameters } = require('./openHIM/initialize.js');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");

// middleware
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))

// routers
const router = require('./routes/apiRouter')
app.use('/api', router)
app.all('*', (req, res) => {
    try {
        // Starts when a new request is received by the server
        res.send(`${new Date().toUTCString('en-GB', { timeZone: 'UTC' })} : The Sante Endpoint Mediator has received ${req.method} request. \n`);
    } catch (error) {
        // Starts when a new request is received by the server
        res.send(error);
    }
});

//Server PORT
app.listen(privateConfig.appConfig.PORT, (err) => {
    if (err) console.log(`Error: ${err}`)
    console.log(`${privateConfig.appConfig.mediatorName}  listening on port ${privateConfig.appConfig.PORT}...  \n`);
    //openHIM
    getQueryParameters();
})